
import React from 'react';
import { ToolType } from '../types';

interface SidebarProps {
  activeTool: ToolType;
  onToolSelect: (tool: ToolType) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTool, onToolSelect }) => {
  const tools: { id: ToolType; icon: string; label: string; color?: string }[] = [
    { id: 'chat', icon: 'fa-message', label: 'AI Chat', color: 'text-emerald-400' },
    { id: 'generate', icon: 'fa-plus', label: 'Create', color: 'text-orange-400' },
    { id: 'adjust', icon: 'fa-sliders', label: 'Adjust' },
    { id: 'effects', icon: 'fa-wand-sparkles', label: 'Pro Effects' },
    { id: 'chroma', icon: 'fa-mask', label: 'Chroma' },
    { id: 'ai', icon: 'fa-brain', label: 'AI Tools' },
    { id: 'filter', icon: 'fa-layer-group', label: 'Filters' },
  ];

  return (
    <aside className="w-20 sm:w-24 bg-[#121418] border-r border-white/5 flex flex-col items-center py-6 gap-5 z-40 overflow-y-auto scrollbar-hide">
      {tools.map((tool) => (
        <button
          key={tool.id}
          onClick={() => onToolSelect(tool.id)}
          className={`group flex flex-col items-center gap-1 w-full px-2 transition-all duration-200 relative ${
            activeTool === tool.id ? (tool.color || 'text-blue-400') : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-200 ${
            activeTool === tool.id ? 'bg-white/5' : 'group-hover:bg-white/5'
          }`}>
            <i className={`fa-solid ${tool.icon} text-lg`}></i>
          </div>
          <span className="text-[9px] font-bold uppercase tracking-wider text-center leading-tight px-1">{tool.label}</span>
          {activeTool === tool.id && (
            <div className={`absolute left-0 w-1 h-6 rounded-r-full ${tool.color ? tool.color.replace('text-', 'bg-') : 'bg-blue-500'}`}></div>
          )}
        </button>
      ))}
    </aside>
  );
};

export default Sidebar;
