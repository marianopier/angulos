
export interface CameraAngle {
  id: string;
  label: string;
  prompt: string;
}

export interface GeneratedImage {
  id: string;
  label:string;
  src: string | null;
  error?: boolean;
}
