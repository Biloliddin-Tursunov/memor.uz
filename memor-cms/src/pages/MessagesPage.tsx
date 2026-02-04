import React from 'react';
import { useMessages } from '../hooks/useMessages';
import { Mail, CheckCircle, Trash2, Clock, User, Sparkles } from 'lucide-react';

const MessagesPage: React.FC = () => {
    const { messages, loading, markAsRead, deleteMessage } = useMessages();

    if (loading) return <div className="text-center pt-40 text-[#a68a64] font-cinzel animate-pulse">Xabarlar yuklanmoqda...</div>;

    return (
        <div className="max-w-5xl mx-auto pt-28 px-6 pb-20 animate-slideUp">
            <div className="mb-10 border-b-2 border-sepia/20 pb-4">
                <h2 className="font-cinzel text-4xl text-parchment mb-2 flex items-center gap-3">
                    <Sparkles className="text-sepia" size={24} />
                    Xabarlar
                </h2>
                <p className="text-sepia/80 font-serif italic">Foydalanuvchilardan kelgan murojaatlar.</p>
            </div>

            {messages.length === 0 ? (
                <div className="text-center py-20 text-sepia/50 font-serif italic border border-sepia/20 rounded bg-parchment-dark/30">
                    <Mail size={48} className="mx-auto mb-4 opacity-50" />
                    Hozircha xabarlar yo'q.
                </div>
            ) : (
                <div className="space-y-4">
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`relative group bg-[#e3d5b8] rounded border ${msg.is_read ? 'border-[#a68a64]/50 opacity-80' : 'border-[#d4af37] shadow-[0_0_15px_rgba(212,175,55,0.15)]'} p-6 transition-all hover:bg-[#e3d5b8]/90`}
                        >
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-[#f0e6d2] ${msg.is_read ? 'bg-[#5c4033]' : 'bg-[#d4af37]'}`}>
                                        <User size={20} />
                                    </div>
                                    <div>
                                        <h4 className="font-cinzel font-bold text-[#2c1810] text-lg">{msg.name}</h4>
                                        <p className="text-sm text-[#5c4033] font-serif">{msg.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-[#5c4033]/70 font-cinzel">
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {new Date(msg.created_at).toLocaleString('uz-UZ', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                    {!msg.is_read && <span className="px-2 py-0.5 bg-red-800 text-[#f0e6d2] rounded-full animate-pulse">Yangi</span>}
                                </div>
                            </div>

                            <p className="font-serif text-[#2c1810] mb-6 leading-relaxed whitespace-pre-wrap pl-13 border-l-2 border-[#a68a64]/30 pl-4 ml-2">
                                {msg.message}
                            </p>

                            <div className="flex justify-end gap-3 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                                {!msg.is_read && (
                                    <button
                                        onClick={() => markAsRead(msg.id)}
                                        className="flex items-center gap-2 px-4 py-2 bg-[#14532d] text-[#f0e6d2] rounded hover:bg-[#14532d]/80 transition-colors font-cinzel text-xs uppercase"
                                    >
                                        <CheckCircle size={14} />
                                        O'qildi
                                    </button>
                                )}
                                <button
                                    onClick={() => deleteMessage(msg.id)}
                                    className="flex items-center gap-2 px-4 py-2 bg-red-900/10 text-red-900 rounded hover:bg-red-900/20 transition-colors font-cinzel text-xs uppercase"
                                >
                                    <Trash2 size={14} />
                                    O'chirish
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MessagesPage;
