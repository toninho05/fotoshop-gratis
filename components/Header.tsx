
import React from 'react';

interface HeaderProps {
  onUndo: () => void;
  canUndo: boolean;
  onDownload: () => void;
  onUpload: () => void;
  hasImage: boolean;
}

const Header: React.FC<HeaderProps> = ({ onUndo, canUndo, onDownload, onUpload, hasImage }) => {
  return (
    <header className="h-16 bg-[#121418] border-b border-white/5 flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
          <i className="fa-solid fa-wand-magic-sparkles text-white text-sm"></i>
        </div>
        <h1 className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
          Studio Express
        </h1>
      </div>

      <div className="flex items-center gap-2">
        {hasImage && (
          <div className="flex items-center mr-4 pr-4 border-r border-white/10 gap-2">
            <button 
              onClick={onUndo}
              disabled={!canUndo}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${canUndo ? 'text-gray-200 hover:bg-white/10' : 'text-gray-600 cursor-not-allowed'}`}
              title="Undo"
            >
              <i className="fa-solid fa-rotate-left"></i>
            </button>
            <button 
              className="w-10 h-10 rounded-full flex items-center justify-center text-gray-600 cursor-not-allowed"
              title="Redo"
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
          </div>
        )}

        <button 
          onClick={onUpload}
          className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 text-gray-300 transition-colors"
        >
          <i className="fa-solid fa-folder-open text-blue-400"></i>
          <span className="hidden sm:inline font-medium text-sm">Open</span>
        </button>

        {hasImage && (
          <button 
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all shadow-lg shadow-blue-500/20"
          >
            <i className="fa-solid fa-download text-xs"></i>
            <span className="font-medium text-sm">Export</span>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
