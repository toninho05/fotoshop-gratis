
import React, { useState } from 'react';

interface AIToolPanelProps {
  onAction: (type: 'enhance' | 'removeBg' | 'custom', prompt?: string) => void;
  isProcessing: boolean;
}

const AIToolPanel: React.FC<AIToolPanelProps> = ({ onAction, isProcessing }) => {
  const [prompt, setPrompt] = useState('');

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onAction('custom', prompt);
    }
  };

  return (
    <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[500px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic-sparkles text-blue-400"></i>
          Gemini Generative AI
        </h3>
      </div>

      <div className="flex gap-3">
        <button
          disabled={isProcessing}
          onClick={() => onAction('enhance')}
          className="flex-1 flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
        >
          <i className="fa-solid fa-sparkles text-blue-400 text-lg"></i>
          <span className="text-[10px] font-bold uppercase">Smart Enhance</span>
        </button>
        
        <button
          disabled={isProcessing}
          onClick={() => onAction('removeBg')}
          className="flex-1 flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
        >
          <i className="fa-solid fa-user-minus text-indigo-400 text-lg"></i>
          <span className="text-[10px] font-bold uppercase">Remove BG</span>
        </button>
      </div>

      <form onSubmit={handleCustomSubmit} className="relative mt-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe changes (e.g., 'Make it sunset', 'Add a hat')"
          className="w-full bg-black/40 border border-white/10 rounded-full py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-blue-500/50 transition-colors"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing || !prompt.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-colors disabled:opacity-30"
        >
          <i className="fa-solid fa-arrow-up text-xs"></i>
        </button>
      </form>
    </div>
  );
};

export default AIToolPanel;
