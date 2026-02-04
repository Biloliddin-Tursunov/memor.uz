import React, { useState } from 'react';
import { Plus, X, Edit2, Trash2, Save, Calendar, User, FileText, Maximize2 } from 'lucide-react';
import { ContentPlan } from '../types';
import { supabase } from '../lib/supabase';

const StatusBadge = ({ status }: { status: string }) => {
    const styles: Record<string, string> = {
        'Idea': 'bg-gray-200 text-gray-700 border-gray-400',
        'In Progress': 'bg-blue-100 text-blue-800 border-blue-300',
        'Review': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'Ready': 'bg-green-100 text-green-800 border-green-300',
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-bold border ${styles[status] || styles['Idea']}`}>
            {status}
        </span>
    );
};

const ContentPlanner: React.FC = () => {
    const [plans, setPlans] = useState<ContentPlan[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewingPlan, setViewingPlan] = useState<ContentPlan | null>(null);
    const [editingPlan, setEditingPlan] = useState<ContentPlan | null>(null);

    // Fetch plans from projects table
    const fetchPlans = async () => {
        const { data, error } = await supabase.from('projects').select('*').order('created_at', { ascending: false });
        if (!error && data) {
            const mappedPlans = data.map((p: any) => ({
                id: p.id,
                title: p.title_uz,
                description: p.description_uz || '',
                status: (p.status === 'Jarayonda' ? 'In Progress' : (p.status === 'Yakunlangan' ? 'Ready' : 'Idea')) as ContentPlan['status'],
                type: (p.location_en || 'Article') as ContentPlan['type'], // Using location_en for Type
                deadline: p.title_en || '', // Using title_en for Deadline
                assignee: p.location_uz || '' // Using location_uz for Assignee
            }));
            setPlans(mappedPlans);
        }
    };

    React.useEffect(() => {
        fetchPlans();
    }, []);

    // Form State
    const [formData, setFormData] = useState<Partial<ContentPlan>>({
        title: '', description: '', type: 'Article', status: 'Idea', deadline: '', assignee: ''
    });

    const openEditModal = (plan?: ContentPlan) => {
        setViewingPlan(null); // Close view modal if open
        if (plan) {
            setEditingPlan(plan);
            setFormData(plan);
        } else {
            setEditingPlan(null);
            setFormData({ title: '', description: '', type: 'Article', status: 'Idea', deadline: '', assignee: '' });
        }
        setIsModalOpen(true);
    };

    const openViewModal = (plan: ContentPlan) => {
        setViewingPlan(plan);
    };

    const handleSave = async () => {
        if (!formData.title) return;

        const dbStatus = formData.status === 'In Progress' ? 'Jarayonda' : (formData.status === 'Ready' ? 'Yakunlangan' : 'Rejada');
        const payload = {
            title_uz: formData.title,
            description_uz: formData.description,
            status: dbStatus,
            location_en: formData.type, // Storing Type in location_en
            title_en: formData.deadline, // Storing Deadline in title_en
            location_uz: formData.assignee // Storing Assignee in location_uz
        };

        if (editingPlan) {
            const { error } = await supabase.from('projects').update(payload).eq('id', editingPlan.id);
            if (!error) fetchPlans();
        } else {
            const { error } = await supabase.from('projects').insert(payload);
            if (!error) fetchPlans();
        }
        setIsModalOpen(false);
    };

    const handleDelete = async (id: number | string) => {
        if (confirm("Ushbu rejani o'chirmoqchimisiz?")) {
            const { error } = await supabase.from('projects').delete().eq('id', id);
            if (!error) {
                setPlans(plans.filter(p => p.id !== id));
                if (viewingPlan?.id === id) setViewingPlan(null);
            }
        }
    };

    return (
        <div className="animate-fadeIn w-full relative">

            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-gold font-cinzel text-xl border-b border-sepia-dark pb-2">Jarayondagi Ishlar</h3>
                <button
                    onClick={() => openEditModal()}
                    className="flex items-center gap-2 bg-teal text-parchment px-4 py-2 rounded border border-gold hover:bg-teal-dark transition-colors font-cinzel text-sm"
                >
                    <Plus size={16} /> Reja Qo'shish
                </button>
            </div>

            <div className="parchment-texture rounded-lg border border-sepia-dark shadow-lg overflow-hidden">
                <div className="bg-parchment-dark p-4 border-b border-gold flex justify-between items-center">
                    <div className="flex gap-2">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="text-sepia font-serif italic text-xs">Jami: {plans.length} ta reja</span>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                            <tr className="bg-parchment text-sepia-dark font-cinzel text-sm border-b border-sepia">
                                <th className="p-4">Vazifa Nomi</th>
                                <th className="p-4">Turi</th>
                                <th className="p-4">Holati</th>
                                <th className="p-4">Muddat</th>
                                <th className="p-4">Mas'ul</th>
                                <th className="p-4 text-right">Amallar</th>
                            </tr>
                        </thead>
                        <tbody className="font-serif text-ink">
                            {plans.map((plan, idx) => (
                                <tr
                                    key={plan.id}
                                    onClick={() => openViewModal(plan)}
                                    className={`hover:bg-gold/20 transition-colors border-b border-sepia/20 cursor-pointer ${idx % 2 === 0 ? 'bg-parchment/50' : ''}`}
                                >
                                    <td className="p-4">
                                        <span className="font-bold block">{plan.title}</span>
                                        <span className="text-xs text-sepia-dark truncate max-w-[200px] block opacity-70">{plan.description}</span>
                                    </td>
                                    <td className="p-4 opacity-80">{plan.type}</td>
                                    <td className="p-4"><StatusBadge status={plan.status} /></td>
                                    <td className="p-4 italic text-crimson text-sm">{plan.deadline}</td>
                                    <td className="p-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-sepia-dark text-parchment text-xs flex items-center justify-center font-bold">
                                                {plan.assignee?.[0] || '?'}
                                            </div>
                                            <span className="text-sm">{plan.assignee}</span>
                                        </div>
                                    </td>
                                    <td className="p-4 text-right">
                                        <div className="flex justify-end gap-2" onClick={e => e.stopPropagation()}>
                                            <button onClick={() => openEditModal(plan)} className="text-teal hover:text-gold p-1"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(plan.id)} className="text-crimson hover:text-red-600 p-1"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Read Mode Modal (Details View) */}
            {viewingPlan && (
                <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm animate-fadeIn">
                    <div className="relative w-full max-w-2xl bg-parchment rounded-lg shadow-2xl border-4 border-sepia-dark overflow-hidden">
                        <div className="p-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
                            <button onClick={() => setViewingPlan(null)} className="absolute top-4 right-4 text-sepia-dark hover:text-crimson"><X size={24} /></button>

                            <div className="mb-6 border-b-2 border-gold pb-4">
                                <span className="text-sepia font-cinzel text-xs uppercase tracking-widest block mb-2">{viewingPlan.type} • {viewingPlan.deadline}</span>
                                <h2 className="font-cinzel text-3xl text-ink font-bold">{viewingPlan.title}</h2>
                            </div>

                            <div className="prose prose-amber font-serif text-lg text-ink leading-relaxed mb-8">
                                {viewingPlan.description || "Tavsif yo'q."}
                            </div>

                            <div className="bg-sepia/10 p-4 rounded border border-sepia flex justify-between items-center">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-sepia-dark text-parchment flex items-center justify-center font-bold border border-gold">
                                        {viewingPlan.assignee?.[0] || '?'}
                                    </div>
                                    <div>
                                        <span className="text-xs uppercase text-sepia-dark block">Mas'ul</span>
                                        <span className="font-bold text-ink">{viewingPlan.assignee}</span>
                                    </div>
                                </div>
                                <div>
                                    <span className="text-xs uppercase text-sepia-dark block mb-1">Holati</span>
                                    <StatusBadge status={viewingPlan.status} />
                                </div>
                            </div>

                            <button
                                onClick={() => openEditModal(viewingPlan)}
                                className="mt-6 w-full flex items-center justify-center gap-2 text-crimson border border-crimson py-2 rounded hover:bg-crimson hover:text-parchment transition-colors font-cinzel"
                            >
                                <Edit2 size={16} /> Tahrirlash
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit/Create Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm">
                    <div className="w-full max-w-3xl parchment-texture p-8 rounded border-4 border-sepia-dark relative animate-slideUp max-h-[90vh] overflow-y-auto">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-sepia-dark hover:text-crimson"><X size={24} /></button>

                        <h3 className="font-cinzel text-2xl text-ink mb-6 border-b border-gold pb-2 text-center">
                            {editingPlan ? "Rejani Tahrirlash" : "Yangi Reja Qo'shish"}
                        </h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase font-bold text-sepia-dark mb-1">Sarlavha</label>
                                <input
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-transparent border-b border-sepia-dark py-2 font-serif text-2xl text-ink focus:border-gold outline-none font-bold"
                                    placeholder="Reja nomi..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-sepia-dark mb-2 flex items-center gap-2">Tavsif (Post Matni) <Maximize2 size={14} /></label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-parchment/50 border border-sepia rounded p-4 font-serif text-lg text-ink focus:border-gold outline-none resize-none h-64 leading-relaxed shadow-inner"
                                    placeholder="Reja tafsilotlari yoki post matni..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-sepia-dark mb-1">Turi</label>
                                    <select
                                        value={formData.type}
                                        onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                                        className="w-full bg-sepia/20 border-b border-sepia-dark py-2 px-2 font-serif text-ink outline-none rounded-t"
                                    >
                                        <option value="Article">Maqola</option>
                                        <option value="Video">Video</option>
                                        <option value="Post">Post</option>
                                        <option value="Book">Kitob</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-sepia-dark mb-1">Holati</label>
                                    <select
                                        value={formData.status}
                                        onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full bg-sepia/20 border-b border-sepia-dark py-2 px-2 font-serif text-ink outline-none rounded-t"
                                    >
                                        <option value="Idea">Idea</option>
                                        <option value="In Progress">Jarayonda</option>
                                        <option value="Review">Tekshiruvda</option>
                                        <option value="Ready">Tayyor</option>
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-sepia-dark mb-1 flex items-center gap-1"><Calendar size={12} /> Muddat</label>
                                    <input
                                        value={formData.deadline}
                                        onChange={e => setFormData({ ...formData, deadline: e.target.value })}
                                        className="w-full bg-transparent border-b border-sepia-dark py-2 font-serif text-ink outline-none"
                                        placeholder="25 Mart"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-sepia-dark mb-1 flex items-center gap-1"><User size={12} /> Mas'ul</label>
                                    <select
                                        value={formData.assignee}
                                        onChange={e => setFormData({ ...formData, assignee: e.target.value })}
                                        className="w-full bg-sepia/20 border-b border-sepia-dark py-2 px-2 font-serif text-ink outline-none rounded-t"
                                    >
                                        <option value="">Tanlang...</option>
                                        <option value="Otabek">Otabek</option>
                                        <option value="Aminaxon">Aminaxon</option>
                                    </select>
                                </div>
                            </div>

                            <button
                                onClick={handleSave}
                                className="w-full mt-4 bg-crimson text-parchment py-4 rounded font-cinzel font-bold shadow-lg hover:bg-teal-dark transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 text-lg"
                            >
                                <Save size={20} /> Saqlash
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentPlanner;