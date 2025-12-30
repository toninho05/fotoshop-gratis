
import React, { useMemo } from 'react';
import { ImageAdjustments } from '../types';
import { FILTERS } from '../constants';

interface EditorCanvasProps {
  image: string;
  adjustments: ImageAdjustments;
  activeFilter: string;
  isProcessing: boolean;
  processingMsg?: string;
}

const EditorCanvas: React.FC<EditorCanvasProps> = ({ 
  image, 
  adjustments, 
  activeFilter, 
  isProcessing,
  processingMsg = 'Gemini AI Thinking...'
}) => {
  const filterStyle = useMemo(() => {
    const preset = FILTERS.find(f => f.id === activeFilter);
    const presetCss = preset?.css || '';
    
    return {
      filter: `
        brightness(${adjustments.brightness}%) 
        contrast(${adjustments.contrast}%) 
        saturate(${adjustments.saturation}%) 
        grayscale(${adjustments.grayscale}%) 
        sepia(${adjustments.sepia}%) 
        hue-rotate(${adjustments.hueRotate}deg) 
        blur(${adjustments.blur}px)
        brightness(${100 + adjustments.exposure}%)
        ${presetCss}
      `.replace(/\s+/g, ' ').trim(),
      transform: `rotate(0deg)`,
      transition: 'filter 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  }, [adjustments, activeFilter]);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative max-w-full max-h-full">
        <img 
          src={image} 
          alt="Edit Workspace" 
          className="max-w-full max-h-[calc(100vh-200px)] object-contain shadow-2xl rounded-lg ring-1 ring-white/5"
          style={filterStyle}
        />
        
        {isProcessing && (
          <div className="absolute inset-0 bg-[#0f1115]/60 backdrop-blur-md flex flex-col items-center justify-center rounded-lg z-50 transition-all">
            <div className="relative w-20 h-20 mb-6">
                <div className="absolute top-0 left-0 w-full h-full border-[3px] border-blue-500/10 rounded-full"></div>
                <div className="absolute top-0 left-0 w-full h-full border-[3px] border-blue-500 rounded-full border-t-transparent animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                   <i className="fa-solid fa-wand-sparkles text-blue-500 text-xl animate-pulse"></i>
                </div>
            </div>
            <div className="flex flex-col items-center gap-2">
               <p className="font-black text-white tracking-[0.2em] text-xs uppercase">
                  {processingMsg}
               </p>
               <div className="h-1 w-32 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 animate-[loading_1.5s_infinite]"></div>
               </div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default EditorCanvas;
