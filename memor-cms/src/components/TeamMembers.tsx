import React, { useState, useEffect } from 'react';
import { UserPlus, Mail, Shield, Trash2, Key } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';

const TeamMembers: React.FC = () => {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);
    const [newMember, setNewMember] = useState({ name: '', email: '', password: '', role: 'editor' as const });

    useEffect(() => {
        fetchMembers();
    }, []);

    const fetchMembers = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('team_members').select('*');
        if (!error && data) setMembers(data);
        setLoading(false);
    };

    const handleAddMember = async (e: React.FormEvent) => {
        e.preventDefault();
        const { error } = await supabase.from('team_members').insert([newMember]);
        if (!error) {
            setIsAdding(false);
            setNewMember({ name: '', email: '', password: '', role: 'editor' });
            fetchMembers();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Haqiqatan ham o'chirmoqchimisiz?")) return;
        const { error } = await supabase.from('team_members').delete().eq('id', id);
        if (!error) fetchMembers();
    };

    if (loading) return <div className="text-center py-20 font-serif text-[#a68a64]">A'zolar ro'yxati yuklanmoqda...</div>;

    return (
        <div className="space-y-6">
            <div className="flex justify-end mb-4">
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 bg-graphite text-sepia px-4 py-2 rounded font-cinzel text-sm border border-sepia hover:bg-ink"
                >
                    <UserPlus size={18} />
                    Yangi A'zo Qo'shish
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleAddMember} className="bg-graphite/30 p-6 rounded-lg border border-sepia/50 space-y-4 animate-slideDown">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs uppercase text-sepia/70 mb-1">Ism</label>
                            <input
                                type="text"
                                value={newMember.name}
                                onChange={e => setNewMember({ ...newMember, name: e.target.value })}
                                className="w-full bg-parchment-dark border border-sepia rounded px-3 py-2 text-parchment focus:border-sepia outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-sepia/70 mb-1">Email</label>
                            <input
                                type="email"
                                value={newMember.email}
                                onChange={e => setNewMember({ ...newMember, email: e.target.value })}
                                className="w-full bg-parchment-dark border border-sepia rounded px-3 py-2 text-parchment focus:border-sepia outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-sepia/70 mb-1">Parol</label>
                            <input
                                type="text"
                                value={newMember.password}
                                onChange={e => setNewMember({ ...newMember, password: e.target.value })}
                                className="w-full bg-parchment-dark border border-sepia rounded px-3 py-2 text-parchment focus:border-sepia outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase text-sepia/70 mb-1">Role</label>
                            <select
                                value={newMember.role}
                                onChange={e => setNewMember({ ...newMember, role: e.target.value as any })}
                                className="w-full bg-parchment-dark border border-sepia rounded px-3 py-2 text-parchment focus:border-sepia outline-none"
                            >
                                <option value="editor">Editor</option>
                                <option value="author">Author</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sepia/70 hover:text-parchment">Bekor qilish</button>
                        <button type="submit" className="bg-sepia text-graphite px-6 py-2 rounded font-cinzel font-bold">Saqlash</button>
                    </div>
                </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map(member => (
                    <div key={member.id} className="bg-graphite/30 border border-sepia/50 rounded-lg p-6 relative group hover:border-sepia transition-all">
                        <button
                            onClick={() => handleDelete(member.id)}
                            className="absolute top-4 right-4 text-teal opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 size={18} />
                        </button>
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-graphite rounded-full flex items-center justify-center text-sepia border border-sepia">
                                <Shield size={24} />
                            </div>
                            <div>
                                <h3 className="font-cinzel text-lg text-parchment">{member.name}</h3>
                                <span className={`text-[10px] uppercase tracking-widest px-2 py-0.5 rounded border ${member.role === 'admin' ? 'border-sepia text-sepia' : 'border-sepia/50 text-sepia/50'}`}>
                                    {member.role}
                                </span>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm font-serif italic text-sepia/70">
                            <div className="flex items-center gap-2">
                                <Mail size={14} />
                                {member.email}
                            </div>
                            <div className="flex items-center gap-2">
                                <Key size={14} />
                                Parol: {member.password}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamMembers;
