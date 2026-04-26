'use client';

import { useRef, useState } from 'react';
import type { ImagenLocal } from '@/lib/guiado/types';

const MAX_IMAGENES = 10;
const MAX_TAMANO_MB = 8;

export function InspiracionStep({
  imagenes,
  notas,
  onAddImagenes,
  onRemoveImagen,
  onChangeNotas
}: {
  imagenes: ImagenLocal[];
  notas: string;
  onAddImagenes: (files: FileList) => void;
  onRemoveImagen: (id: string) => void;
  onChangeNotas: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [drag, setDrag] = useState(false);

  return (
    <div>
      <h2
        className="display"
        style={{ fontSize: 'clamp(28px, 4vw, 40px)', letterSpacing: '-0.02em', marginBottom: 12 }}
      >
        Inspiración y notas.
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 40 }}>
        Lo que más nos ayuda son las fotos. Sube todas las que tengas.
      </p>

      <div className="eyebrow" style={{ marginBottom: 12 }}>
        Imágenes (opcional, hasta {MAX_IMAGENES})
      </div>
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          onAddImagenes(e.dataTransfer.files);
        }}
        onClick={() => fileRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            fileRef.current?.click();
          }
        }}
        style={{
          border: `1px dashed ${drag ? 'var(--text)' : 'var(--border)'}`,
          background: drag ? 'var(--accent-bg)' : 'transparent',
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
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (e.target.files) onAddImagenes(e.target.files);
            e.target.value = '';
          }}
          style={{ display: 'none' }}
        />
      </div>

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
                onClick={() => onRemoveImagen(img.id)}
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

      <div style={{ marginTop: 40 }}>
        <div className="eyebrow" style={{ marginBottom: 12 }}>
          Notas adicionales (opcional)
        </div>
        <textarea
          value={notas}
          onChange={(e) => onChangeNotas(e.target.value)}
          rows={5}
          placeholder="Cualquier cosa que se te olvide o quieras contarnos."
          style={{
            width: '100%',
            padding: 16,
            border: '1px solid var(--border-soft)',
            borderRadius: 6,
            fontFamily: 'inherit',
            fontSize: 16,
            lineHeight: 1.5,
            resize: 'vertical',
            background: 'var(--surface)',
            color: 'var(--text)'
          }}
        />
      </div>
    </div>
  );
}
