
import { ImageAdjustments, FilterPreset, ProEffect } from './types';

export const DEFAULT_ADJUSTMENTS: ImageAdjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  hueRotate: 0,
  blur: 0,
  exposure: 0,
  temperature: 0,
};

export const FILTERS: FilterPreset[] = [
  { id: 'none', name: 'Normal', css: '' },
  { id: 'vivid', name: 'Vivid', css: 'saturate(1.5) contrast(1.1)' },
  { id: 'warm', name: 'Warm', css: 'sepia(0.3) saturate(1.2)' },
  { id: 'cool', name: 'Cool', css: 'hue-rotate(180deg) saturate(0.8)' },
  { id: 'mono', name: 'Mono', css: 'grayscale(1) contrast(1.2)' },
  { id: 'dramatic', name: 'Dramatic', css: 'contrast(1.5) brightness(0.9)' },
  { id: 'fade', name: 'Fade', css: 'brightness(1.1) contrast(0.8) opacity(0.9)' },
  { id: 'noir', name: 'Noir', css: 'grayscale(1) contrast(2) brightness(0.8)' },
];

export const PRO_EFFECTS: ProEffect[] = [
  { 
    id: 'cinematic', 
    name: 'Cinematic', 
    description: 'Professional movie-grade lighting and grading.', 
    icon: 'fa-film',
    prompt: 'Apply high-end cinematic movie lighting and professional teal-and-orange color grading. Make it look like a blockbuster film frame.'
  },
  { 
    id: 'cyberpunk', 
    name: 'Cyberpunk', 
    description: 'Neon aesthetics with futuristic vibes.', 
    icon: 'fa-bolt-lightning',
    prompt: 'Transform this image with a cyberpunk aesthetic. Add neon pink and cyan glows, digital artifacts, and a futuristic night atmosphere.'
  },
  { 
    id: 'bokeh', 
    name: 'Portrait Bokeh', 
    description: 'Realistic background blur for subjects.', 
    icon: 'fa-camera',
    prompt: 'Apply a professional shallow depth of field. Keep the main subject sharp and create a creamy, beautiful bokeh blur in the background.'
  },
  { 
    id: 'hdr', 
    name: 'HDR Max', 
    description: 'Recover extreme details and dynamic range.', 
    icon: 'fa-circle-dot',
    prompt: 'Apply extreme high dynamic range (HDR) processing. Pull rich details from the shadows and highlights while maintaining realistic textures.'
  },
  { 
    id: 'double-exp', 
    name: 'Double Exposure', 
    description: 'Blend with nature for artistic results.', 
    icon: 'fa-clone',
    prompt: 'Create a professional double exposure effect. Blend the main subject silhouette with a lush pine forest and mountain landscape background.'
  }
];
