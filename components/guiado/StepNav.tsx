'use client';

import { PrimaryButton } from '@/components/primitives/PrimaryButton';

export function StepNav({
  onBack,
  onNext,
  nextLabel = 'Siguiente →',
  nextDisabled,
  loading,
  isLast
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  loading?: boolean;
  isLast?: boolean;
}) {
  return (
    <div
      style={{
        marginTop: 48,
        display: 'flex',
        gap: 16,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
      }}
    >
      <button
        type="button"
        onClick={onBack}
        disabled={!onBack}
        style={{
          padding: '12px 20px',
          border: '1px solid var(--border)',
          borderRadius: 4,
          color: 'var(--text-muted)',
          fontWeight: 500,
          opacity: onBack ? 1 : 0.4,
          cursor: onBack ? 'pointer' : 'not-allowed',
          background: 'transparent'
        }}
      >
        ← Atrás
      </button>
      <PrimaryButton onClick={onNext} disabled={nextDisabled} loading={loading}>
        {isLast ? 'Enviar mi consulta' : nextLabel}
      </PrimaryButton>
    </div>
  );
}
