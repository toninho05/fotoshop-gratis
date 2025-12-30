
import React from 'react';
import { FILTERS } from '../constants';

interface FilterPanelProps {
  activeFilter: string;
  onSelect: (filterId: string) => void;
  image: string;
}

const FilterPanel: React.FC<FilterPanelProps> = ({ activeFilter, onSelect, image }) => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
      {FILTERS.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onSelect(filter.id)}
          className="flex flex-col items-center gap-2 flex-shrink-0 group"
        >
          <div className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
            activeFilter === filter.id ? 'border-blue-500 scale-105' : 'border-transparent group-hover:border-white/20'
          }`}>
            <img 
              src={image} 
              alt={filter.name} 
              className="w-full h-full object-cover"
              style={{ filter: filter.css }}
            />
            {activeFilter === filter.id && (
                <div className="absolute inset-0 bg-blue-500/20 flex items-center justify-center">
                    <i className="fa-solid fa-check text-white"></i>
                </div>
            )}
          </div>
          <span className={`text-[10px] font-bold uppercase ${
            activeFilter === filter.id ? 'text-blue-400' : 'text-gray-400'
          }`}>{filter.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterPanel;
