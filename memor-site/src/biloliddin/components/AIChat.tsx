import React, { useState, useRef, useEffect } from 'react';
import { streamChatResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const historyForApi = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const stream = streamChatResponse(historyForApi, userMessage.text);
      
      let aiResponseText = '';
      
      // Add a placeholder for AI response
      setMessages((prev) => [...prev, { role: 'model', text: '' }]);

      for await (const chunk of stream) {
        aiResponseText += chunk;
        setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage.role === 'model') {
             lastMessage.text = aiResponseText;
          }
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error', error);
      setMessages((prev) => [...prev, { role: 'model', text: "Uzr, xatolik yuz berdi." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-parchment rounded-lg shadow-2xl border border-sepia/20 overflow-hidden flex flex-col h-96 animate-fade-in-up">
          <div className="bg-deep-teal text-white px-4 py-3 flex justify-between items-center">
            <div>
               <h3 className="font-serif font-bold tracking-wide">AI Yordamchi</h3>
               <p className="text-xs text-white/70 font-sans">Biloliddin haqida so'rang</p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white/50">
            {messages.length === 0 && (
                <div className="text-center text-graphite/50 text-sm font-sans mt-10">
                    <p>Assalomu alaykum! <br/> Men Biloliddinning virtual yordamchisiman. <br/> Menga savol bering.</p>
                </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`max-w-[80%] rounded-lg px-3 py-2 text-sm font-sans ${
                    msg.role === 'user' 
                      ? 'bg-deep-teal text-white rounded-br-none' 
                      : 'bg-white border border-sepia/20 text-graphite rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && messages[messages.length-1]?.role !== 'model' && (
                 <div className="flex justify-start">
                    <div className="bg-white border border-sepia/20 px-3 py-2 rounded-lg rounded-bl-none shadow-sm">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-sepia/40 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-sepia/40 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-sepia/40 rounded-full animate-bounce delay-150"></div>
                        </div>
                    </div>
                 </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 bg-parchment border-t border-sepia/10 flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Xabar yozing..."
              className="flex-1 px-3 py-2 text-sm border border-sepia/30 rounded-md focus:outline-none focus:border-deep-teal bg-white"
            />
            <button 
                type="submit" 
                disabled={isLoading || !inputText.trim()}
                className="bg-deep-teal text-white p-2 rounded-md hover:bg-opacity-90 disabled:opacity-50 transition-colors"
            >
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
               </svg>
            </button>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 ${
            isOpen ? 'bg-sepia text-white rotate-90' : 'bg-deep-teal text-white'
        }`}
      >
        {isOpen ? (
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
        ) : (
            <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        )}
      </button>
    </div>
  );
};

export default AIChat;