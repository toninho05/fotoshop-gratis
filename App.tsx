
import React, { useState, useRef, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import EditorCanvas from './components/EditorCanvas';
import AdjustmentPanel from './components/AdjustmentPanel';
import AIToolPanel from './components/AIToolPanel';
import FilterPanel from './components/FilterPanel';
import ChromaPanel from './components/ChromaPanel';
import EffectsPanel from './components/EffectsPanel';
import ChatPanel from './components/ChatPanel';
import GeneratePanel from './components/GeneratePanel';
import { ImageAdjustments, ToolType, ChatMessage } from './types';
import { DEFAULT_ADJUSTMENTS } from './constants';
import { editImageWithGemini, enhanceImage, removeBackground } from './services/geminiService';
import { GoogleGenAI, Modality } from "@google/genai";

const App: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<ToolType>('chat');
  const [adjustments, setAdjustments] = useState<ImageAdjustments>(DEFAULT_ADJUSTMENTS);
  const [activeFilter, setActiveFilter] = useState<string>('none');
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [processingMsg, setProcessingMsg] = useState('Gemini AI Thinking...');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setImage(result);
        setOriginalImage(result);
        setHistory([result]);
      };
      reader.readAsDataURL(file);
    }
  };

  const addToHistory = (newImage: string) => {
    setHistory(prev => [...prev, newImage]);
  };

  const undo = () => {
    if (history.length > 1) {
      const newHistory = [...history];
      newHistory.pop();
      const previousState = newHistory[newHistory.length - 1];
      setImage(previousState);
      setHistory(newHistory);
    }
  };

  const handleAIAction = async (type: 'enhance' | 'removeBg' | 'custom' | 'effect' | 'chroma' | 'chat' | 'generate', prompt?: string) => {
    if (!prompt && type !== 'enhance' && type !== 'removeBg') return;
    setIsProcessing(true);
    
    // Custom messages
    const msgs: Record<string, string> = {
      enhance: 'Relighting Scene...',
      removeBg: 'Extracting Subject...',
      chroma: 'Compositing...',
      effect: 'Applying Pro Effect...',
      chat: 'Analyzing & Thinking...',
      generate: 'Creating new image...',
      default: 'Gemini AI Thinking...'
    };
    setProcessingMsg(msgs[type] || msgs.default);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      let result: string | null = null;

      if (type === 'enhance') {
        result = await enhanceImage(image!);
      } else if (type === 'removeBg') {
        result = await removeBackground(image!);
      } else if (type === 'generate' && prompt) {
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts: [{ text: prompt }] }
        });
        const part = response.candidates?.[0]?.content?.parts.find(p => p.inlineData);
        if (part?.inlineData) result = `data:image/png;base64,${part.inlineData.data}`;
      } else if (type === 'chat' && prompt) {
        // Chat multimodal - send current image + prompt
        const parts: any[] = [{ text: `CONTEXT: You are a professional photo studio assistant. The user is currently editing an image. If the user asks for an edit, perform it and return the image. If they just want to talk, reply with text only. Current Request: ${prompt}` }];
        if (image) {
          parts.push({
            inlineData: {
              data: image.split(',')[1],
              mimeType: 'image/png'
            }
          });
        }
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: { parts }
        });

        let foundImage = false;
        for (const part of response.candidates?.[0]?.content?.parts || []) {
          if (part.inlineData) {
            result = `data:image/png;base64,${part.inlineData.data}`;
            foundImage = true;
          } else if (part.text) {
            setMessages(prev => [...prev, { role: 'model', text: part.text! }]);
          }
        }
      } else if (prompt) {
        result = await editImageWithGemini(image!, prompt);
      }

      if (result) {
        setImage(result);
        addToHistory(result);
        if (type === 'generate') setOriginalImage(result);
      }
    } catch (err) {
      console.error(err);
      alert("AI processing failed. Please check your API key.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSendMessage = (text: string) => {
    setMessages(prev => [...prev, { role: 'user', text }]);
    handleAIAction('chat', text);
  };

  const downloadImage = () => {
    if (!image) return;
    const link = document.createElement('a');
    link.href = image;
    link.download = 'studio-edit.png';
    link.click();
  };

  return (
    <div className="flex flex-col h-screen bg-[#0f1115] text-gray-200 overflow-hidden">
      <Header 
        onUndo={undo} 
        canUndo={history.length > 1} 
        onDownload={downloadImage} 
        onUpload={() => fileInputRef.current?.click()}
        hasImage={!!image}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeTool={activeTool} onToolSelect={setActiveTool} />
        
        <main className="flex-1 flex flex-col items-center justify-center bg-[#181a1f] p-4 sm:p-8 relative">
          {!image && activeTool !== 'generate' ? (
            <div className="text-center">
              <div className="mb-6">
                <i className="fa-solid fa-wand-magic-sparkles text-6xl text-blue-500 mb-4 animate-pulse"></i>
                <h2 className="text-2xl font-bold mb-2">Pro Gemini Studio</h2>
                <p className="text-gray-400 mb-6 max-w-md">The world's most advanced AI photo editor and creative companion.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 px-10 rounded-full transition-all duration-200 shadow-lg shadow-blue-500/20"
                >
                  Edit Existing Photo
                </button>
                <button 
                  onClick={() => setActiveTool('generate')}
                  className="bg-white/5 hover:bg-white/10 text-white font-semibold py-3 px-10 rounded-full border border-white/10 transition-all"
                >
                  Create New Image
                </button>
              </div>
            </div>
          ) : (
            <EditorCanvas 
              image={image || ''} 
              adjustments={adjustments} 
              activeFilter={activeFilter}
              isProcessing={isProcessing}
              processingMsg={processingMsg}
            />
          )}

          {/* Bottom Panel */}
          <div className="absolute bottom-6 left-0 right-0 flex justify-center px-4 pointer-events-none">
            <div className="pointer-events-auto bg-[#25282f]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-5 shadow-2xl w-full max-w-2xl overflow-hidden ring-1 ring-white/10">
              {activeTool === 'chat' && (
                <ChatPanel 
                  messages={messages} 
                  onSendMessage={handleSendMessage} 
                  isProcessing={isProcessing} 
                  isVoiceActive={isVoiceActive}
                  onVoiceToggle={() => setIsVoiceActive(!isVoiceActive)}
                />
              )}
              {activeTool === 'generate' && (
                <GeneratePanel 
                  onGenerate={(prompt) => handleAIAction('generate', prompt)} 
                  isProcessing={isProcessing} 
                />
              )}
              {image && activeTool === 'adjust' && (
                <AdjustmentPanel 
                  adjustments={adjustments} 
                  onChange={setAdjustments} 
                  onReset={() => setAdjustments(DEFAULT_ADJUSTMENTS)}
                />
              )}
              {image && activeTool === 'filter' && (
                <FilterPanel 
                  activeFilter={activeFilter} 
                  onSelect={setActiveFilter} 
                  image={originalImage || ''}
                />
              )}
              {image && activeTool === 'ai' && (
                <AIToolPanel 
                  onAction={handleAIAction} 
                  isProcessing={isProcessing} 
                />
              )}
              {image && activeTool === 'chroma' && (
                <ChromaPanel 
                  onAction={(prompt) => handleAIAction('chroma', prompt)} 
                  isProcessing={isProcessing} 
                />
              )}
              {image && activeTool === 'effects' && (
                <EffectsPanel 
                  onAction={(prompt) => handleAIAction('effect', prompt)} 
                  isProcessing={isProcessing} 
                />
              )}
            </div>
          </div>
        </main>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        className="hidden" 
        accept="image/*" 
        onChange={handleImageUpload} 
      />

      {isVoiceActive && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] bg-emerald-500/90 backdrop-blur-2xl rounded-full p-8 shadow-2xl animate-pulse flex flex-col items-center gap-4">
           <i className="fa-solid fa-microphone text-4xl text-white"></i>
           <div className="flex gap-1 h-8 items-center">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-1.5 bg-white rounded-full animate-grow" style={{ height: `${Math.random()*100}%`, animationDelay: `${i*100}ms` }}></div>
              ))}
           </div>
           <p className="text-white font-bold text-sm tracking-widest uppercase">Listening...</p>
           <button onClick={() => setIsVoiceActive(false)} className="mt-4 text-white/60 hover:text-white font-medium text-xs">End Conversation</button>
        </div>
      )}

      <style>{`
        @keyframes grow {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        .animate-grow {
          animation: grow 0.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default App;
