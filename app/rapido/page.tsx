'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container } from '@/components/primitives/Container';
import { LineInput } from '@/components/primitives/LineInput';
import { PrimaryButton } from '@/components/primitives/PrimaryButton';
import { RadioCircle } from '@/components/primitives/RadioCircle';
import { uploadInspiracion } from '@/lib/briefs/upload';

type Canal = 'email' | 'whatsapp' | 'llamada';

const MAX_IMAGENES = 10;
const MAX_TAMANO_MB = 8;

const CANALES: { id: Canal; label: string; hint: string }[] = [
  { id: 'email',    label: 'Email',    hint: 'Te respondemos por escrito' },
  { id: 'whatsapp', label: 'WhatsApp', hint: 'Te escribimos al móvil' },
  { id: 'llamada',  label: 'Llamada',  hint: 'Te llamamos cuando te venga bien' }
];

type FormData = {
  nombre: string;
  email: string;
  telefono: string;
  ciudad: string;
  mensaje: string;
  canal: Canal;
};

const INICIAL: FormData = {
  nombre: '',
  email: '',
  telefono: '',
  ciudad: '',
  mensaje: '',
  canal: 'email'
};

type ImagenLocal = {
  id: string;
  file: File;
  preview: string;
};

export default function RapidoPage() {
  const router = useRouter();
  const [data, setData] = useState<FormData>(INICIAL);
  const [imagenes, setImagenes] = useState<ImagenLocal[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitProgress, setSubmitProgress] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);

  const update = <K extends keyof FormData>(k: K, v: FormData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  // Limpiar object URLs al desmontar
  useEffect(() => {
    return () => {
      imagenes.forEach((i) => URL.revokeObjectURL(i.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function aceptarArchivos(files: FileList | null) {
    if (!files) return;
    const nuevas: ImagenLocal[] = [];
    const errores: string[] = [];
    const huecoLibre = MAX_IMAGENES - imagenes.length;

    Array.from(files).slice(0, huecoLibre).forEach((file) => {
      if (!file.type.startsWith('image/')) {
        errores.push(`"${file.name}" no es una imagen.`);
        return;
      }
      if (file.size > MAX_TAMANO_MB * 1024 * 1024) {
        errores.push(`"${file.name}" supera ${MAX_TAMANO_MB} MB.`);
        return;
      }
      nuevas.push({
        id: `${file.name}-${file.size}-${file.lastModified}-${Math.random()}`,
        file,
        preview: URL.createObjectURL(file)
      });
    });

    if (files.length > huecoLibre) {
      errores.push(`Máximo ${MAX_IMAGENES} imágenes.`);
    }

    setImagenes((prev) => [...prev, ...nuevas]);
    setErrors((e) => ({ ...e, imagenes: errores.join(' ') || '' }));
  }

  function quitarImagen(id: string) {
    setImagenes((prev) => {
      const found = prev.find((p) => p.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return prev.filter((p) => p.id !== id);
    });
  }

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (!data.nombre.trim()) e.nombre = 'Indícanos cómo te llamas.';
    if (!data.email.trim()) e.email = 'Necesitamos un email para responderte.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      e.email = 'Revisa el formato del email.';
    }
    if (!data.mensaje.trim() || data.mensaje.trim().length < 10) {
      e.mensaje = 'Cuéntanos un poco más sobre el mueble que buscas.';
    }
    if ((data.canal === 'whatsapp' || data.canal === 'llamada') && !data.telefono.trim()) {
      e.telefono = `Necesitamos tu teléfono si prefieres ${data.canal === 'whatsapp' ? 'WhatsApp' : 'que te llamemos'}.`;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    setSubmitError(null);
    if (!validate()) {
      const firstError = document.querySelector('[data-error="true"]');
      firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setSubmitting(true);

    try {
      let imagenPaths: string[] = [];
      if (imagenes.length > 0) {
        setSubmitProgress(`Subiendo ${imagenes.length} ${imagenes.length === 1 ? 'imagen' : 'imágenes'}…`);
        imagenPaths = await uploadInspiracion(imagenes.map((i) => i.file));
      }

      setSubmitProgress('Enviando consulta…');
      const res = await fetch('/api/briefs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo_brief: 'rapido',
          nombre: data.nombre,
          email: data.email,
          telefono: data.telefono || null,
          ciudad: data.ciudad || null,
          canal_preferido: data.canal,
          mensaje: data.mensaje,
          imagenes: imagenPaths
        })
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || 'No pudimos enviar tu consulta. Vuelve a intentarlo.');
      }

      router.push('/enviado?tipo=rapido');
    } catch (e) {
      setSubmitError(e instanceof Error ? e.message : 'Error desconocido');
      setSubmitting(false);
      setSubmitProgress(null);
    }
  }

  return (
    <Container>
      <form
        onSubmit={onSubmit}
        style={{ paddingTop: 64, paddingBottom: 96, maxWidth: 720 }}
        noValidate
      >
        <span className="eyebrow" style={{ display: 'inline-block', marginBottom: 16 }}>
          Rápido · 2 minutos
        </span>
        <h1
          className="display"
          style={{
            fontSize: 'clamp(40px, 6vw, 64px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            marginBottom: 16
          }}
        >
          Cuéntanos qué tienes en mente.
        </h1>
        <p style={{ fontSize: 18, color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 64 }}>
          Te respondemos en 24-48 horas con propuesta personal.
        </p>

        <FieldGroup titulo="Tus datos">
          <div data-error={!!errors.nombre}>
            <LineInput
              label="Nombre"
              value={data.nombre}
              onChange={(v) => update('nombre', v)}
              error={errors.nombre}
              size="md"
            />
          </div>
          <div data-error={!!errors.email}>
            <LineInput
              label="Email"
              value={data.email}
              onChange={(v) => update('email', v)}
              type="email"
              inputMode="email"
              error={errors.email}
              size="md"
            />
          </div>
          <div data-error={!!errors.telefono}>
            <LineInput
              label="Teléfono (opcional)"
              value={data.telefono}
              onChange={(v) => update('telefono', v)}
              type="tel"
              inputMode="tel"
              error={errors.telefono}
              size="md"
            />
          </div>
          <LineInput
            label="Ciudad (opcional)"
            value={data.ciudad}
            onChange={(v) => update('ciudad', v)}
            size="md"
          />
        </FieldGroup>

        <FieldGroup titulo="Cuéntanos qué mueble buscas">
          <div data-error={!!errors.mensaje}>
            <Textarea
              value={data.mensaje}
              onChange={(v) => update('mensaje', v)}
              placeholder="Una mesa de comedor de roble, unos 200×100, con patas hairpin negras…"
              error={errors.mensaje}
            />
            <p style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 8 }}>
              Si te ayuda: para qué la usarás, dónde irá, medidas aproximadas, materiales que te
              gustan.
            </p>
          </div>
        </FieldGroup>

        <FieldGroup titulo={`Imágenes de inspiración (opcional, hasta ${MAX_IMAGENES})`}>
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragOver(false);
              aceptarArchivos(e.dataTransfer.files);
            }}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
            style={{
              border: `1px dashed ${dragOver ? 'var(--text)' : 'var(--border)'}`,
              background: dragOver ? 'var(--accent-bg)' : 'transparent',
              borderRadius: 8,
              padding: 32,
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'border-color 150ms ease, background 150ms ease'
            }}
          >
            <div style={{ fontSize: 15, marginBottom: 6 }}>
              Arrastra aquí tus fotos o haz clic para subir
            </div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>
              JPG, PNG o WebP · Máximo {MAX_TAMANO_MB} MB por imagen
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => {
                aceptarArchivos(e.target.files);
                e.target.value = '';
              }}
              style={{ display: 'none' }}
            />
          </div>

          {errors.imagenes && (
            <div style={{ fontSize: 13, color: 'var(--error)', marginTop: 8 }}>
              {errors.imagenes}
            </div>
          )}

          {imagenes.length > 0 && (
            <div
              style={{
                marginTop: 16,
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))',
                gap: 12
              }}
            >
              {imagenes.map((img) => (
                <div
                  key={img.id}
                  style={{
                    position: 'relative',
                    aspectRatio: '1 / 1',
                    borderRadius: 6,
                    overflow: 'hidden',
                    background: 'var(--accent-bg)'
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={img.preview}
                    alt={img.file.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <button
                    type="button"
                    onClick={() => quitarImagen(img.id)}
                    aria-label={`Quitar ${img.file.name}`}
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'rgba(0,0,0,0.65)',
                      color: '#fff',
                      fontSize: 14,
                      lineHeight: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </FieldGroup>

        <FieldGroup titulo="¿Por dónde prefieres que te respondamos?">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {CANALES.map((c) => {
              const checked = data.canal === c.id;
              return (
                <label
                  key={c.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 16px',
                    border: `1px solid ${checked ? 'var(--text)' : 'var(--border-soft)'}`,
                    borderRadius: 6,
                    cursor: 'pointer',
                    transition: 'border-color 150ms ease'
                  }}
                >
                  <input
                    type="radio"
                    name="canal"
                    value={c.id}
                    checked={checked}
                    onChange={() => update('canal', c.id)}
                    style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}
                  />
                  <RadioCircle checked={checked} />
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontWeight: 500 }}>{c.label}</span>
                    <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>{c.hint}</span>
                  </span>
                </label>
              );
            })}
          </div>
        </FieldGroup>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {submitError && (
            <div
              role="alert"
              style={{
                padding: '12px 14px',
                background: '#FFE9E5',
                border: '1px solid #F5B5AD',
                color: '#8A1A0E',
                borderRadius: 6,
                fontSize: 14
              }}
            >
              {submitError}
            </div>
          )}
          <PrimaryButton type="submit" loading={submitting}>
            Enviar mi consulta →
          </PrimaryButton>
          {submitting && submitProgress && (
            <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>{submitProgress}</p>
          )}
          <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
            ¿Prefieres que te hagamos preguntas?{' '}
            <a href="/guiado" style={{ textDecoration: 'underline' }}>
              Pásate al presupuesto guiado
            </a>
            .
          </p>
        </div>
      </form>
    </Container>
  );
}

function FieldGroup({ titulo, children }: { titulo: string; children: React.ReactNode }) {
  return (
    <fieldset style={{ border: 0, padding: 0, marginBottom: 48 }}>
      <legend className="eyebrow" style={{ marginBottom: 16, padding: 0 }}>
        {titulo}
      </legend>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>{children}</div>
    </fieldset>
  );
}

function Textarea({
  value,
  onChange,
  placeholder,
  error
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={6}
        style={{
          width: '100%',
          padding: 16,
          border: `1px solid ${error ? 'var(--error)' : 'var(--border-soft)'}`,
          borderRadius: 6,
          fontFamily: 'inherit',
          fontSize: 16,
          lineHeight: 1.5,
          resize: 'vertical',
          background: 'var(--surface)',
          color: 'var(--text)'
        }}
      />
      {error && (
        <div style={{ fontSize: 13, color: 'var(--error)', marginTop: 8 }}>{error}</div>
      )}
    </div>
  );
}
