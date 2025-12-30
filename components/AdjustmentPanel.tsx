
import React from 'react';
import { ImageAdjustments } from '../types';

interface AdjustmentPanelProps {
  adjustments: ImageAdjustments;
  onChange: (newAdjustments: ImageAdjustments) => void;
  onReset: () => void;
}

const AdjustmentPanel: React.FC<AdjustmentPanelProps> = ({ adjustments, onChange, onReset }) => {
  const controls = [
    { key: 'exposure', label: 'Light', icon: 'fa-sun', min: -100, max: 100 },
    { key: 'contrast', label: 'Contrast', icon: 'fa-circle-half-stroke', min: 0, max: 200 },
    { key: 'saturation', label: 'Color', icon: 'fa-droplet', min: 0, max: 200 },
    { key: 'brightness', label: 'Brightness', icon: 'fa-lightbulb', min: 0, max: 200 },
    { key: 'blur', label: 'Focus', icon: 'fa-eye-slash', min: 0, max: 10 },
  ];

  const handleSliderChange = (key: keyof ImageAdjustments, value: number) => {
    onChange({ ...adjustments, [key]: value });
  };

  return (
    <div className="flex flex-col gap-4 min-w-[300px] sm:min-w-[450px]">
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Basic Adjustments</h3>
        <button 
          onClick={onReset}
          className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors"
        >
          Reset All
        </button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
        {controls.map((ctrl) => (
          <div key={ctrl.key} className="flex flex-col gap-1">
            <div className="flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase">
              <span className="flex items-center gap-2">
                <i className={`fa-solid ${ctrl.icon} w-3`}></i>
                {ctrl.label}
              </span>
              <span>{adjustments[ctrl.key as keyof ImageAdjustments]}</span>
            </div>
            <input
              type="range"
              min={ctrl.min}
              max={ctrl.max}
              value={adjustments[ctrl.key as keyof ImageAdjustments]}
              onChange={(e) => handleSliderChange(ctrl.key as keyof ImageAdjustments, parseFloat(e.target.value))}
              className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdjustmentPanel;
