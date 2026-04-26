import { Wizard } from '@/components/guiado/Wizard';

export const metadata = {
  title: 'Shibbi — Presupuesto guiado',
  description: 'Te hacemos las preguntas necesarias para entender tu mueble, paso a paso.'
};

export default function GuiadoPage() {
  return <Wizard />;
}
