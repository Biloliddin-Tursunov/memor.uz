import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Sparkles } from 'lucide-react';
import { generateChatResponse } from '../services/geminiService';

interface ChatInterfaceProps {
  onComplete?: () => void;
  initialMessage?: string;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onComplete, initialMessage }) => {
  const [messages, setMessages] = useState<{role: 'user'|'model', text: string}[]>([
    { role: 'model', text: initialMessage || "Assalomu alaykum! Men 'al-Me'mor'man. Uyingiz qanday bo'lishini xohlaysiz? Menga orzularingiz haqida gapirib bering." }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    const response = await generateChatResponse(messages, userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="flex flex-col h-full max-w-4xl mx-auto rounded-xl overflow-hidden">
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-6">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-slate-200 ${msg.role === 'user' ? 'bg-slate-100 text-slate-600' : 'bg-slate-900 text-white'}`}>
                {msg.role === 'user' ? <User size={14} /> : <Sparkles size={14} />}
              </div>
              <div className={`p-4 rounded-2xl text-sm md:text-base leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-slate-100 text-slate-800 rounded-tr-none' 
                  : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none shadow-sm'
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
             <div className="ml-11 bg-slate-100 px-4 py-2 rounded-full flex items-center gap-1">
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-75"></div>
                <div className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-150"></div>
             </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="p-2 md:p-4 bg-white border-t border-slate-100">
        <div className="flex gap-2 items-center bg-slate-50 border border-slate-200 rounded-xl px-2 py-2">
            <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Shu yerga yozing..."
            className="flex-1 bg-transparent border-0 px-3 py-2 text-sm focus:outline-none focus:ring-0 text-slate-800 placeholder-slate-400"
            />
            <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-slate-900 text-white p-2.5 rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
            <Send size={18} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;