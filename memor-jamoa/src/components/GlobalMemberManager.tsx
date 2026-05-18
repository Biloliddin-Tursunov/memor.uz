
import React, { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import { X, Check, Search, Plus, Trash2, Shield, ShieldAlert, Sparkles, Users, ArrowLeft, Upload, GripVertical, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTeams } from '../context/TeamContext';
import { Member } from '../types';

interface GlobalMemberManagerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMemberId?: string | null;
}

const GlobalMemberManager: React.FC<GlobalMemberManagerProps> = ({ isOpen, onClose, initialMemberId }) => {
  const { t } = useLanguage();
  const { teams, getAllMembers, getMemberTeams, saveGlobalMember, deleteGlobalMember, footerOrder, reorderGlobalMembers } = useTeams();
  
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null); // 'NEW' or ID
  
  // Form State
  const [formData, setFormData] = useState<Member>({ id: '', name: '' });
  const [formTeams, setFormTeams] = useState<string[]>([]);
  const [showAuth, setShowAuth] = useState(false);

  // Auto-select member if ID passed
  useEffect(() => {
      if (isOpen && initialMemberId) {
          const all = getAllMembers();
          const target = all.find(m => m.id === initialMemberId);
          if (target) {
              handleEdit(target);
          }
      } else if (!isOpen) {
          // Reset when closed
          setEditingId(null);
          setSearch('');
      }
  }, [isOpen, initialMemberId]);

  // Get members sorted by footerOrder
  const orderedMembers = useMemo(() => {
      const all = getAllMembers();
      const map = new Map<string, Member>(all.map(m => [m.id, m]));
      const sorted: Member[] = [];
      footerOrder.forEach(id => {
          if(map.has(id)) {
              sorted.push(map.get(id)!);
              map.delete(id);
          }
      });
      // Add any remaining (new) members
      map.forEach(m => sorted.push(m));
      return sorted;
  }, [getAllMembers, footerOrder]);

  const filteredMembers = useMemo(() => {
      if (!search) return orderedMembers;
      return orderedMembers.filter(m => 
        m.name.toLowerCase().includes(search.toLowerCase()) || 
        (m.role && m.role.toLowerCase().includes(search.toLowerCase()))
      );
  }, [orderedMembers, search]);

  const handleReorder = (newOrder: Member[]) => {
      if (!search) {
        reorderGlobalMembers(newOrder.map(m => m.id));
      }
  };

  const handleEdit = (member: Member) => {
      setEditingId(member.id);
      setFormData({ ...member });
      setFormTeams(getMemberTeams(member.id));
      setShowAuth(!!member.email);
  };

  const handleCreate = () => {
      setEditingId('NEW');
      setFormData({ 
          id: Date.now().toString(), 
          name: '', 
          role: '', 
          isVolunteer: false, 
          email: ''});
      setFormTeams([]);
      setShowAuth(false);
  };

  const handleDelete = (id: string) => {
      if (window.confirm("Are you sure you want to completely remove this creator from ALL teams?")) {
          deleteGlobalMember(id);
          if (editingId === id) setEditingId(null);
      }
  };

  const handleSave = (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name) return;

      const cleanData = { ...formData };
      if (!showAuth) {
          delete cleanData.email;
      }

      saveGlobalMember(cleanData, formTeams);
      setEditingId(null);
      if (initialMemberId) {
          onClose(); // Close manager if we came from a specific profile edit
      }
  };

  const toggleTeam = (tid: string) => {
      setFormTeams(prev => prev.includes(tid) ? prev.filter(id => id !== tid) : [...prev, tid]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setFormData({ ...formData, avatar: reader.result as string });
          };
          reader.readAsDataURL(file);
      }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-space-bg/95 backdrop-blur-xl"
            />
            
            <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full max-w-6xl h-[90vh] shadow-2xl relative z-10 rounded-lg flex flex-col md:flex-row overflow-hidden bg-[#f8f8f6] border border-white/10"
            >
                {/* Back Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 z-50 bg-ink/5 hover:bg-ink text-ink hover:text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all font-typewriter text-xs uppercase tracking-widest"
                >
                    <ArrowLeft size={14} /> {t("Back")}
                </button>

                {/* Left Panel: List (Hidden on mobile if editing) */}
                <div className={`
                    w-full md:w-1/3 border-r border-ink/10 flex flex-col bg-white
                    ${editingId ? 'hidden md:flex' : 'flex'}
                `}>
                    <div className="p-6 border-b border-ink/10 bg-white">
                        <h2 className="font-serif text-3xl text-ink mb-6">{t("Creators")}</h2>
                        <div className="relative mb-4">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink/30" />
                            <input 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={t("Search...")}
                                className="w-full pl-10 pr-4 py-3 bg-ink/5 border-none rounded-sm text-sm font-typewriter focus:bg-ink/10 outline-none transition-colors"
                            />
                        </div>
                        <button 
                            onClick={handleCreate}
                            className="w-full flex items-center justify-center gap-2 bg-ink text-white py-3 rounded-sm text-xs uppercase tracking-widest hover:bg-ink-light transition-colors shadow-lg"
                        >
                            <Plus size={14} /> {t("Add New Member")}
                        </button>
                    </div>
                    
                    <div className="flex-grow overflow-y-auto custom-scrollbar bg-ink/5">
                        <Reorder.Group axis="y" values={filteredMembers} onReorder={handleReorder}>
                            {filteredMembers.map(m => (
                                <Reorder.Item 
                                    key={m.id}
                                    value={m}
                                    className="relative"
                                >
                                    <div 
                                        onClick={() => handleEdit(m)}
                                        className={`
                                            p-4 border-b border-ink/5 cursor-pointer hover:bg-white transition-all group flex items-center gap-3 bg-white
                                            ${editingId === m.id ? 'bg-white border-l-4 border-l-ink pl-3' : 'border-l-4 border-l-transparent'}
                                        `}
                                    >
                                        {/* Drag Handle (Visual) */}
                                        {!search && <GripVertical size={14} className="text-ink/20 cursor-grab active:cursor-grabbing" />}
                                        
                                        <div className="w-10 h-10 rounded-full bg-ink/5 flex items-center justify-center overflow-hidden border border-ink/10">
                                            {m.avatar ? <img src={m.avatar} alt={m.name} className="w-full h-full object-cover"/> : <User size={16} className="text-ink/30" />}
                                        </div>
                                        
                                        <div className="flex-grow">
                                            <div className="font-serif text-lg text-ink flex items-center gap-2">
                                                {m.name}
                                                {m.isVolunteer && <Sparkles size={12} className="text-amber-500" />}
                                            </div>
                                            <div className="font-typewriter text-[10px] text-ink/50 uppercase">{m.role || 'Creator'}</div>
                                        </div>
                                    </div>
                                </Reorder.Item>
                            ))}
                        </Reorder.Group>
                    </div>
                </div>

                {/* Right Panel: Form */}
                <div className={`
                    w-full md:w-2/3 bg-[#f8f8f6] flex flex-col
                    ${!editingId ? 'hidden md:flex items-center justify-center' : 'flex'}
                `}>
                    {!editingId ? (
                        <div className="text-center text-ink/30 p-12">
                            <Users size={64} className="mx-auto mb-6 opacity-20" />
                            <h3 className="font-serif text-4xl mb-4 opacity-40">Manage The Empire</h3>
                            <p className="font-typewriter uppercase tracking-widest text-xs opacity-60 max-w-xs mx-auto">
                                Select a creator from the list to assign missions or grant access.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSave} className="flex flex-col h-full">
                            <div className="p-8 border-b border-ink/10 flex justify-between items-center bg-white/50">
                                <div>
                                    <span className="font-typewriter text-[10px] text-ink/40 uppercase tracking-widest block mb-1">
                                        {editingId === 'NEW' ? 'Onboarding' : 'Profile Management'}
                                    </span>
                                    <h3 className="font-serif text-4xl text-ink">
                                        {editingId === 'NEW' ? 'New Creator' : formData.name}
                                    </h3>
                                </div>
                                {editingId !== 'NEW' && (
                                    <button 
                                        type="button"
                                        onClick={() => handleDelete(editingId)}
                                        className="text-red-800 hover:bg-red-50 p-3 rounded-full transition-colors group"
                                        title="Delete User"
                                    >
                                        <Trash2 size={20} className="group-hover:scale-110 transition-transform" />
                                    </button>
                                )}
                            </div>

                            <div className="flex-grow overflow-y-auto custom-scrollbar p-10 space-y-10">
                                {/* Basic Info */}
                                <div className="flex flex-col md:flex-row gap-8">
                                    {/* Avatar Upload */}
                                    <div className="flex-shrink-0 flex flex-col items-center gap-3">
                                         <div className="w-24 h-24 rounded-full border-2 border-ink/10 bg-white flex items-center justify-center overflow-hidden">
                                             {formData.avatar ? (
                                                 <img src={formData.avatar} alt="Preview" className="w-full h-full object-cover" />
                                             ) : (
                                                 <User className="text-ink/20" size={32} />
                                             )}
                                         </div>
                                         <label className="cursor-pointer bg-ink/5 hover:bg-ink hover:text-white transition-colors px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-ink/60 flex items-center gap-2">
                                             <Upload size={10} /> Photo
                                             <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                         </label>
                                    </div>

                                    <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40">{t("Username")}</label>
                                            <input 
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                                                className="w-full bg-white border border-ink/10 focus:border-ink outline-none px-4 py-3 text-ink font-serif text-xl rounded-sm shadow-sm"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40">{t("Role")}</label>
                                            <input 
                                                value={formData.role || ''}
                                                onChange={(e) => setFormData({...formData, role: e.target.value})}
                                                className="w-full bg-white border border-ink/10 focus:border-ink outline-none px-4 py-3 text-ink font-typewriter text-sm rounded-sm shadow-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Toggle Volunteer */}
                                <div 
                                    className="flex items-center gap-4 cursor-pointer select-none group p-4 border border-ink/5 rounded-sm bg-white"
                                    onClick={() => setFormData({...formData, isVolunteer: !formData.isVolunteer})}
                                >
                                     <div className={`w-6 h-6 border border-ink/20 rounded-full flex items-center justify-center transition-colors ${formData.isVolunteer ? 'bg-ink' : 'bg-transparent'}`}>
                                         {formData.isVolunteer && <Check size={14} className="text-white" />}
                                     </div>
                                     <div>
                                         <span className="font-typewriter text-sm text-ink uppercase tracking-widest block">Volunteer Status</span>
                                         <span className="text-xs text-ink/40">Mark as a volunteer contributor</span>
                                     </div>
                                </div>

                                {/* Team Assignment */}
                                <div>
                                    <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/40 mb-4 flex items-center gap-2">
                                        Department Assignment
                                    </label>
                                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                        {teams.map(t => (
                                            <div 
                                                key={t.id}
                                                onClick={() => toggleTeam(t.id)}
                                                className={`
                                                    cursor-pointer p-4 border rounded-sm flex items-center gap-3 transition-all relative overflow-hidden
                                                    ${formTeams.includes(t.id) 
                                                        ? 'bg-ink text-white border-ink shadow-lg scale-105' 
                                                        : 'bg-white border-ink/10 text-ink/60 hover:border-ink/30 hover:scale-[1.02]'}
                                                `}
                                            >
                                                <div className={`w-4 h-4 border border-current flex items-center justify-center rounded-sm ${formTeams.includes(t.id) ? 'bg-white text-ink' : ''}`}>
                                                    {formTeams.includes(t.id) && <Check size={10} />}
                                                </div>
                                                <span className="font-typewriter text-xs uppercase tracking-widest truncate">{t.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Admin Credentials */}
                                <div className="border border-ink/10 rounded-sm p-8 bg-white/60">
                                    <div 
                                        className="flex items-center justify-between cursor-pointer mb-6"
                                        onClick={() => setShowAuth(!showAuth)}
                                    >
                                        <div className="flex items-center gap-3 text-ink font-serif text-xl">
                                            {showAuth ? <ShieldAlert size={24} className="text-red-800" /> : <Shield size={24} />}
                                            Security Access
                                        </div>
                                        <div className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${showAuth ? 'bg-ink' : 'bg-ink/10'}`}>
                                            <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${showAuth ? 'translate-x-6' : ''}`} />
                                        </div>
                                    </div>
                                    
                                    {showAuth && (
                                        <motion.div 
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            className="grid grid-cols-1 gap-6"
                                        >
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <div className="p-8 border-t border-ink/10 flex justify-end gap-4 bg-white/80 backdrop-blur-sm">
                                <button 
                                    type="button" 
                                    onClick={() => setEditingId(null)} 
                                    className="px-6 py-3 hover:bg-ink/5 transition-colors font-typewriter text-xs uppercase tracking-widest text-ink/60 rounded-sm"
                                >
                                    Cancel
                                </button>
                                <button 
                                    type="submit" 
                                    className="px-10 py-3 bg-ink text-white hover:bg-ink-light transition-colors font-typewriter text-xs uppercase tracking-widest shadow-xl flex items-center gap-2 rounded-sm"
                                >
                                    <Check size={18} />
                                    {editingId === 'NEW' ? 'Onboard Creator' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default GlobalMemberManager;
