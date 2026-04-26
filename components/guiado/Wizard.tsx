'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Canal, GuiadoBrief, ImagenLocal, TipoMueble } from '@/lib/guiado/types';
import { BRIEF_INICIAL } from '@/lib/guiado/types';
import { PREGUNTAS_POR_TIPO } from '@/lib/guiado/preguntas';
import { Container } from '@/components/primitives/Container';
import { Progress } from './Progress';
import { StepNav } from './StepNav';
import { TipoStep } from './steps/TipoStep';
import { EspecificoStep } from './steps/EspecificoStep';
import { EstiloStep } from './steps/EstiloStep';
import { InspiracionStep } from './steps/InspiracionStep';
import { DatosStep } from './steps/DatosStep';
import { ResumenStep } from './steps/ResumenStep';

const STORAGE_KEY = 'shibbi-guiado-brief';
const MAX_IMAGENES = 10;
const MAX_TAMANO_MB = 8;

const PASOS = [
  { n: 1, titulo: 'Tipo' },
  { n: 2, titulo: 'Detalles' },
  { n: 3, titulo: 'Contexto' },
  { n: 4, titulo: 'Inspiración' },
  { n: 5, titulo: 'Datos' },
  { n: 6, titulo: 'Resumen' }
];

export function Wizard() {
  const router = useRouter();
  const [paso, setPaso] = useState(1);
  const [brief, setBrief] = useState<GuiadoBrief>(BRIEF_INICIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [restoreAvailable, setRestoreAvailable] = useState(false);
  const initialLoadRef = useRef(false);

  // Restaurar brief de localStorage (sin imágenes — son File y no serializables)
  useEffect(() => {
    if (initialLoadRef.current) return;
    initialLoadRef.current = true;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          setRestoreAvailable(true);
          // No restauramos automáticamente — preguntamos
        }
      }
    } catch {
      // Ignorar
    }
  }, []);

  // Persistir brief (sin imágenes)
  useEffect(() => {
    if (!initialLoadRef.current) return;
    const { imagenes, ...sinImagenes } = brief;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...sinImagenes, paso }));
    } catch {
      // Storage lleno o deshabilitado
    }
  }, [brief, paso]);

  function restaurar() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      const { paso: pasoGuardado, ...resto } = parsed;
      setBrief({ ...BRIEF_INICIAL, ...resto, imagenes: [] });
      if (typeof pasoGuardado === 'number') setPaso(pasoGuardado);
      setRestoreAvailable(false);
    } catch {
      setRestoreAvailable(false);
    }
  }

  function descartarBorrador() {
    localStorage.removeItem(STORAGE_KEY);
    setRestoreAvailable(false);
  }

  // Limpieza de object URLs al desmontar
  useEffect(() => {
    return () => {
      brief.imagenes.forEach((i) => URL.revokeObjectURL(i.preview));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBrief = <K extends keyof GuiadoBrief>(k: K, v: GuiadoBrief[K]) =>
    setBrief((b) => ({ ...b, [k]: v }));

  const updateEspecifico = (id: string, valor: string | number) =>
    setBrief((b) => ({ ...b, especifico: { ...b.especifico, [id]: valor } }));

  const updateDatos = (
    k: 'nombre' | 'email' | 'telefono' | 'ciudad' | 'cp' | 'entrega' | 'canal',
    v: string
  ) => {
    if (k === 'canal') {
      setBrief((b) => ({ ...b, canal: v as Canal }));
    } else {
      setBrief((b) => ({ ...b, [k]: v }));
    }
  };

  const updateContexto = (
    k: 'estilo' | 'estancia' | 'plazo' | 'presupuesto',
    v: string
  ) => setBrief((b) => ({ ...b, [k]: v }));

  function aceptarImagenes(files: FileList) {
    const errores: string[] = [];
    const huecoLibre = MAX_IMAGENES - brief.imagenes.length;
    const nuevas: ImagenLocal[] = [];

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

    if (files.length > huecoLibre) errores.push(`Máximo ${MAX_IMAGENES} imágenes.`);

    setBrief((b) => ({ ...b, imagenes: [...b.imagenes, ...nuevas] }));
    setErrors((e) => ({ ...e, imagenes: errores.join(' ') }));
  }

  function quitarImagen(id: string) {
    setBrief((b) => {
      const found = b.imagenes.find((i) => i.id === id);
      if (found) URL.revokeObjectURL(found.preview);
      return { ...b, imagenes: b.imagenes.filter((i) => i.id !== id) };
    });
  }

  function validarPaso(p: number): boolean {
    const e: Record<string, string> = {};

    if (p === 1) {
      if (!brief.tipo) e.tipo = 'Elige un tipo de mueble.';
    }

    if (p === 2 && brief.tipo) {
      const preguntas = PREGUNTAS_POR_TIPO[brief.tipo];
      preguntas.forEach((q) => {
        if (q.tipo === 'numero' && q.opcional) return;
        if (q.tipo === 'texto' && q.opcional) return;
        const v = brief.especifico[q.id];
        if (v === undefined || v === '' || v === null) {
          e[q.id] = 'Necesitamos una respuesta.';
        } else if (q.tipo === 'numero') {
          const n = Number(v);
          if (Number.isNaN(n)) e[q.id] = 'Indica un número.';
          else if (q.min !== undefined && n < q.min) e[q.id] = `Mínimo ${q.min}.`;
          else if (q.max !== undefined && n > q.max) e[q.id] = `Máximo ${q.max}.`;
        } else if (q.tipo === 'texto') {
          if (String(v).trim().length < 10) {
            e[q.id] = 'Cuéntanoslo con un poco más de detalle.';
          }
        }
      });
    }

    if (p === 3) {
      if (!brief.estilo)      e.estilo = 'Elige un estilo.';
      if (!brief.estancia)    e.estancia = 'Indícanos la estancia.';
      if (!brief.plazo)       e.plazo = 'Elige un plazo.';
      if (!brief.presupuesto) e.presupuesto = 'Elige un rango orientativo.';
    }

    if (p === 5) {
      if (!brief.nombre.trim()) e.nombre = 'Indícanos cómo te llamas.';
      if (!brief.email.trim()) e.email = 'Necesitamos un email para responderte.';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(brief.email)) {
        e.email = 'Revisa el formato del email.';
      }
      if ((brief.canal === 'whatsapp' || brief.canal === 'llamada') && !brief.telefono.trim()) {
        e.telefono = `Necesitamos tu teléfono si prefieres ${brief.canal === 'whatsapp' ? 'WhatsApp' : 'que te llamemos'}.`;
      }
      if (!brief.entrega) e.entrega = 'Indícanos cómo prefieres la entrega.';
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function siguiente() {
    if (!validarPaso(paso)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setErrors({});
    if (paso < PASOS.length) {
      setPaso(paso + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      enviar();
    }
  }

  function atras() {
    setErrors({});
    if (paso > 1) {
      setPaso(paso - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function saltarA(p: number) {
    setErrors({});
    setPaso(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function enviar() {
    setSubmitting(true);

    // TODO: cuando esté /api/briefs sustituir por POST con FormData.
    console.log('[stub] Brief Guiado listo para enviar:', {
      tipo_brief: 'guiado',
      ...brief,
      imagenes: brief.imagenes.map((i) => ({ name: i.file.name, size: i.file.size }))
    });

    await new Promise((r) => setTimeout(r, 800));
    localStorage.removeItem(STORAGE_KEY);
    router.push('/enviado?tipo=guiado');
  }

  const meta = useMemo(() => PASOS.find((p) => p.n === paso)!, [paso]);
  const isLast = paso === PASOS.length;

  return (
    <Container>
      <div style={{ paddingTop: 48, paddingBottom: 96, maxWidth: 760 }}>
        {restoreAvailable && (
          <RestoreBanner
            onRestore={restaurar}
            onDiscard={descartarBorrador}
          />
        )}

        <Progress paso={paso} total={PASOS.length} titulo={meta.titulo} />

        {paso === 1 && (
          <TipoStep
            value={brief.tipo}
            onChange={(t: TipoMueble) => updateBrief('tipo', t)}
          />
        )}

        {paso === 2 && brief.tipo && (
          <EspecificoStep
            tipo={brief.tipo}
            especifico={brief.especifico}
            onChange={updateEspecifico}
            errors={errors}
          />
        )}

        {paso === 3 && (
          <EstiloStep
            estilo={brief.estilo}
            estancia={brief.estancia}
            plazo={brief.plazo}
            presupuesto={brief.presupuesto}
            onChange={updateContexto}
            errors={errors}
          />
        )}

        {paso === 4 && (
          <InspiracionStep
            imagenes={brief.imagenes}
            notas={brief.notas}
            onAddImagenes={aceptarImagenes}
            onRemoveImagen={quitarImagen}
            onChangeNotas={(v) => updateBrief('notas', v)}
          />
        )}

        {paso === 5 && (
          <DatosStep
            nombre={brief.nombre}
            email={brief.email}
            telefono={brief.telefono}
            ciudad={brief.ciudad}
            cp={brief.cp}
            entrega={brief.entrega}
            canal={brief.canal}
            onChange={updateDatos}
            errors={errors}
          />
        )}

        {paso === 6 && <ResumenStep brief={brief} onJumpTo={saltarA} />}

        {errors.tipo && paso === 1 && (
          <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 16 }}>{errors.tipo}</p>
        )}
        {errors.imagenes && paso === 4 && (
          <p style={{ color: 'var(--error)', fontSize: 13, marginTop: 16 }}>{errors.imagenes}</p>
        )}

        <StepNav
          onBack={paso > 1 ? atras : undefined}
          onNext={siguiente}
          loading={submitting}
          isLast={isLast}
        />
      </div>
    </Container>
  );
}

function RestoreBanner({
  onRestore,
  onDiscard
}: {
  onRestore: () => void;
  onDiscard: () => void;
}) {
  return (
    <div
      style={{
        marginBottom: 24,
        padding: '14px 18px',
        background: 'var(--accent-bg)',
        border: '1px solid var(--border-soft)',
        borderRadius: 6,
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        fontSize: 14
      }}
    >
      <span>
        Tienes un presupuesto sin terminar. ¿Continúas donde lo dejaste?
        <span style={{ color: 'var(--text-muted)', marginLeft: 8 }}>
          (Las imágenes deberás subirlas otra vez.)
        </span>
      </span>
      <div style={{ display: 'flex', gap: 8 }}>
        <button
          type="button"
          onClick={onDiscard}
          style={{
            fontSize: 13,
            color: 'var(--text-muted)',
            textDecoration: 'underline',
            background: 'none'
          }}
        >
          Empezar de cero
        </button>
        <button
          type="button"
          onClick={onRestore}
          style={{
            fontSize: 13,
            fontWeight: 500,
            padding: '6px 12px',
            border: '1px solid var(--text)',
            borderRadius: 4
          }}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
