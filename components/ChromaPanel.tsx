
import React, { useState } from 'react';

interface ChromaPanelProps {
  onAction: (prompt: string) => void;
  isProcessing: boolean;
}

const ChromaPanel: React.FC<ChromaPanelProps> = ({ onAction, isProcessing }) => {
  const [selectedColor, setSelectedColor] = useState('#00ff00');
  const [bgPrompt, setBgPrompt] = useState('A luxury penthouse in Tokyo at sunset');
  const [tolerance, setTolerance] = useState(30);

  const handleApply = () => {
    const finalPrompt = `Act as a professional photo editor. Remove all pixels that are similar to the color ${selectedColor} (hex) with a tolerance of ${tolerance}%. Replace that area with: ${bgPrompt}. Blend the edges perfectly for a professional composite.`;
    onAction(finalPrompt);
  };

  const presets = [
    { name: 'Green', color: '#00ff00' },
    { name: 'Blue', color: '#0000ff' },
    { name: 'White', color: '#ffffff' },
    { name: 'Black', color: '#000000' },
  ];

  return (
    <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[500px]">
      <div className="flex justify-between items-center">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <i className="fa-solid fa-mask text-green-400"></i>
          Chroma Key & Compositing
        </h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase">Key Color</label>
          <div className="flex gap-2">
            <input 
              type="color" 
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-none"
            />
            <div className="flex flex-wrap gap-1">
              {presets.map(p => (
                <button 
                  key={p.name}
                  onClick={() => setSelectedColor(p.color)}
                  className="w-6 h-6 rounded-md border border-white/10"
                  style={{ backgroundColor: p.color }}
                  title={p.name}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-[10px] font-bold text-gray-500 uppercase flex justify-between">
            <span>Tolerance</span>
            <span>{tolerance}%</span>
          </label>
          <input 
            type="range" 
            min="0" max="100" 
            value={tolerance}
            onChange={(e) => setTolerance(parseInt(e.target.value))}
            className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500 mt-2"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-[10px] font-bold text-gray-500 uppercase">New Background Environment</label>
        <div className="relative">
          <input
            type="text"
            value={bgPrompt}
            onChange={(e) => setBgPrompt(e.target.value)}
            placeholder="Describe the new background..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-3 px-4 text-sm focus:outline-none focus:border-green-500/50 transition-colors"
            disabled={isProcessing}
          />
        </div>
      </div>

      <button
        onClick={handleApply}
        disabled={isProcessing || !bgPrompt.trim()}
        className="w-full bg-green-600 hover:bg-green-500 disabled:bg-gray-700 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-500/10"
      >
        <i className="fa-solid fa-wand-magic-sparkles"></i>
        Apply Chroma Swap
      </button>
    </div>
  );
};

export default ChromaPanel;
