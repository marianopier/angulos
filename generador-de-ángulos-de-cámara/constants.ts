
import { CameraAngle } from './types';

export const CAMERA_ANGLES: CameraAngle[] = [
  { id: 'wide', label: 'Plano General', prompt: 'Genera un plano general de esta escena, mostrando más del entorno circundante. Mantén el estilo fotográfico original.' },
  { id: 'medium', label: 'Plano Medio', prompt: 'Genera un plano medio del sujeto principal en esta escena, desde la cintura hacia arriba. Mantén el estilo fotográfico original.' },
  { id: 'closeup', label: 'Primer Plano', prompt: 'Genera un primer plano del rostro o el detalle principal del sujeto en esta escena. Mantén el estilo fotográfico original.' },
  { id: 'side', label: 'Plano Lateral', prompt: 'Genera una vista de perfil o un plano lateral de la escena en esta imagen. Mantén el estilo fotográfico original.' },
  { id: 'topdown', label: 'Plano Cenital', prompt: 'Genera un plano cenital de esta escena, como si la cámara estuviera directamente encima del sujeto. Mantén el estilo fotográfico original.' },
];
