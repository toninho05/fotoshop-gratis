
export interface ImageAdjustments {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  hueRotate: number;
  blur: number;
  exposure: number;
  temperature: number;
}

export type ToolType = 'adjust' | 'filter' | 'ai' | 'crop' | 'text' | 'healing' | 'chroma' | 'effects' | 'chat' | 'generate';

export interface FilterPreset {
  id: string;
  name: string;
  css: string;
}

export interface ProEffect {
  id: string;
  name: string;
  description: string;
  icon: string;
  prompt: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: string;
}

export interface HistoryState {
  image: string;
  adjustments: ImageAdjustments;
}
