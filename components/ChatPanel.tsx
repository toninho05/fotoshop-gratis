
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';

interface ChatPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isProcessing: boolean;
  onVoiceToggle: () => void;
  isVoiceActive: boolean;
}

const ChatPanel: React.FC<ChatPanelProps> = ({ messages, onSendMessage, isProcessing, onVoiceToggle, isVoiceActive }) => {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isProcessing) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-[400px] w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4 px-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
          <i className="fa-solid fa-sparkles"></i>
          Assistant Chat
        </h3>
        <button 
          onClick={onVoiceToggle}
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase transition-all flex items-center gap-2 ${
            isVoiceActive ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
          }`}
        >
          <i className={`fa-solid ${isVoiceActive ? 'fa-microphone-slash' : 'fa-microphone'}`}></i>
          {isVoiceActive ? 'End Voice' : 'Voice Mode'}
        </button>
      </div>

      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto mb-4 space-y-4 px-2 scrollbar-hide pr-2"
      >
        {messages.length === 0 && (
          <div className="h-full flex flex-col items-center justify-center text-center opacity-40 py-8">
            <i className="fa-solid fa-comments text-3xl mb-3"></i>
            <p className="text-xs font-medium max-w-[200px]">Ask me to edit the photo or explain its content.</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
              ? 'bg-emerald-600 text-white rounded-tr-none' 
              : 'bg-white/10 text-gray-200 rounded-tl-none'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex justify-start">
            <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none flex gap-1 items-center">
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Assistant..."
          className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 pl-5 pr-12 text-sm focus:outline-none focus:border-emerald-500/50 transition-all"
          disabled={isProcessing}
        />
        <button
          type="submit"
          disabled={isProcessing || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all disabled:opacity-30"
        >
          <i className="fa-solid fa-arrow-up text-xs"></i>
        </button>
      </form>
    </div>
  );
};

export default ChatPanel;
