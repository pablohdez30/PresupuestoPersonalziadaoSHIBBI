-- ============================================================
-- 002_briefs.sql
--
-- Tabla `briefs`: solicitudes que llegan desde /rapido y /guiado.
-- Bucket de Storage `inspiracion`: imágenes que sube el cliente.
-- Políticas RLS: anon puede insertar (vía API con service-role),
-- nadie excepto service-role puede leer.
--
-- Ejecutar en SQL Editor de Supabase tras schema.sql + rls.sql.
-- Es idempotente: se puede correr varias veces sin romper nada.
-- ============================================================

create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------
-- TABLA briefs
-- ------------------------------------------------------------
create table if not exists briefs (
  id              uuid primary key default uuid_generate_v4(),

  -- 'rapido' = formulario corto · 'guiado' = wizard de 6 pasos
  tipo_brief      text not null check (tipo_brief in ('rapido', 'guiado')),

  -- Solo guiado: tipo de mueble + respuestas específicas (clave-valor)
  tipo_mueble     text check (tipo_mueble in ('mesa', 'silla', 'estanteria', 'espejo', 'aparador', 'cabecero', 'otro')),
  especifico      jsonb not null default '{}'::jsonb,

  -- Solo guiado: contexto común
  estilo          text,
  estancia        text,
  plazo           text,
  presupuesto     text,

  -- Rápido usa `mensaje` (texto libre), guiado usa `notas` (notas adicionales)
  mensaje         text,
  notas           text,

  -- Rutas dentro del bucket `inspiracion` (no URLs)
  imagenes        text[] not null default '{}',

  -- Datos del cliente
  nombre          text not null,
  email           text not null,
  telefono        text,
  ciudad          text,
  cp              text,
  entrega         text,
  canal_preferido text not null default 'email'
                    check (canal_preferido in ('email', 'whatsapp', 'llamada')),

  -- Gestión interna
  estado          text not null default 'pendiente'
                    check (estado in ('pendiente', 'contactado', 'presupuestado', 'cerrado', 'descartado')),
  notas_internas  text,

  -- Diagnóstico
  user_agent      text,
  ip              inet,

  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists briefs_estado_idx     on briefs (estado, created_at desc);
create index if not exists briefs_email_idx      on briefs (email);
create index if not exists briefs_tipo_brief_idx on briefs (tipo_brief, created_at desc);

-- updated_at automático (reusa la función definida en schema.sql)
drop trigger if exists briefs_updated_at on briefs;
create trigger briefs_updated_at before update on briefs
  for each row execute function set_updated_at();

-- ------------------------------------------------------------
-- RLS
-- ------------------------------------------------------------
alter table briefs enable row level security;

-- Sin policies de select/insert/update/delete:
--   anon  → no puede hacer nada
--   admin → service-role bypasea RLS, así que sí puede.
-- La inserción pública se hace desde /api/briefs (server-side) usando
-- el service-role tras validar los datos.

-- ------------------------------------------------------------
-- BUCKET inspiracion
-- ------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('inspiracion', 'inspiracion', false)
on conflict (id) do nothing;

-- Política: anon puede subir archivos al bucket `inspiracion`.
-- Subimos desde el navegador con la clave anon, así que necesita esta policy.
drop policy if exists "Anon puede subir a inspiracion" on storage.objects;
create policy "Anon puede subir a inspiracion"
  on storage.objects for insert
  to anon, authenticated
  with check (bucket_id = 'inspiracion');

-- Sin policy de select para anon: las imágenes no son accesibles
-- públicamente. Para que el equipo las vea desde el email, generamos
-- signed URLs en /api/briefs (válidas durante 30 días).
