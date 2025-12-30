
import React from 'react';
import { PRO_EFFECTS } from '../constants';
import { ProEffect } from '../types';

interface EffectsPanelProps {
  onAction: (prompt: string) => void;
  isProcessing: boolean;
}

const EffectsPanel: React.FC<EffectsPanelProps> = ({ onAction, isProcessing }) => {
  return (
    <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[500px]">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-2">
          <i className="fa-solid fa-wand-sparkles text-purple-400"></i>
          Professional Studio Effects
        </h3>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {PRO_EFFECTS.map((effect) => (
          <button
            key={effect.id}
            disabled={isProcessing}
            onClick={() => onAction(effect.prompt)}
            className="flex flex-col items-center gap-2 flex-shrink-0 group disabled:opacity-50"
          >
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 flex flex-col items-center justify-center p-3 text-center gap-2 hover:border-purple-500/50 transition-all group-hover:scale-105">
              <i className={`fa-solid ${effect.icon} text-2xl text-purple-400`}></i>
              <span className="text-[10px] font-bold uppercase leading-tight">{effect.name}</span>
            </div>
            <p className="text-[8px] text-gray-500 w-24 text-center line-clamp-2">{effect.description}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EffectsPanel;
