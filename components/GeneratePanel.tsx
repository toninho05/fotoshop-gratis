
import React, { useState } from 'react';

interface GeneratePanelProps {
  onGenerate: (prompt: string) => void;
  isProcessing: boolean;
}

const GeneratePanel: React.FC<GeneratePanelProps> = ({ onGenerate, isProcessing }) => {
  const [prompt, setPrompt] = useState('');

  const suggestions = [
    "A cyberpunk city with neon lights",
    "A cozy cabin in a snowy forest",
    "A futuristic sports car at sunset",
    "An oil painting of a brave knight",
    "Abstract 3D shapes floating in space"
  ];

  return (
    <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[500px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-orange-400 flex items-center gap-2">
          <i className="fa-solid fa-wand-magic text-orange-400"></i>
          AI Image Creator
        </h3>
      </div>

      <div className="flex flex-col gap-2">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="What do you want to create?"
          className="w-full h-24 bg-black/40 border border-white/10 rounded-xl p-4 text-sm focus:outline-none focus:border-orange-500/50 transition-all resize-none"
          disabled={isProcessing}
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => setPrompt(s)}
            className="text-[10px] bg-white/5 hover:bg-white/10 text-gray-400 px-3 py-1.5 rounded-full border border-white/5 transition-colors"
          >
            {s}
          </button>
        ))}
      </div>

      <button
        onClick={() => onGenerate(prompt)}
        disabled={isProcessing || !prompt.trim()}
        className="w-full bg-orange-600 hover:bg-orange-500 disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
      >
        <i className="fa-solid fa-rocket"></i>
        Generate Image
      </button>
    </div>
  );
};

export default GeneratePanel;
