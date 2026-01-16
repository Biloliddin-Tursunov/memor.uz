
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Task, TaskStatus } from '../types';
import { TEAMS } from '../constants';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Link as LinkIcon, Users, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (task: Task, additionalTeams?: string[]) => void;
  teamId: string;
  initialData?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, teamId, initialData }) => {
  const { isAdmin } = useAuth();
  const { t } = useLanguage();
  
  const [formData, setFormData] = useState<Partial<Task>>({
    title: '',
    description: '',
    type: '',
    priority: '',
    status: 'To Do',
    startDate: '',
    deadline: '',
    resourceLink: ''
  });

  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setSelectedTeams([teamId]); 
    } else {
        setFormData({
            title: '',
            description: '',
            type: '',
            priority: '',
            status: 'To Do',
            startDate: new Date().toISOString().split('T')[0],
            deadline: '',
            resourceLink: ''
        });
        setSelectedTeams([teamId]);
    }
  }, [initialData, isOpen, teamId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAdmin) return; 

    const newTask: Task = {
      id: initialData?.id || Date.now().toString(),
      teamId,
      title: formData.title || 'Untitled',
      description: formData.description || '',
      type: formData.type || 'General',
      priority: formData.priority || '',
      status: formData.status as TaskStatus,
      startDate: formData.startDate || '',
      deadline: formData.deadline || '',
      resourceLink: formData.resourceLink || ''
    };
    
    const extraTeams = selectedTeams.filter(id => id !== teamId);
    onSubmit(newTask, extraTeams);
    onClose();
  };

  const toggleTeam = (id: string) => {
    if (selectedTeams.includes(id)) {
        if (id === teamId && !initialData) return; 
        setSelectedTeams(prev => prev.filter(t => t !== id));
    } else {
        setSelectedTeams(prev => [...prev, id]);
    }
  };

  const StatusButton = ({ label, value, current, onChange }: { label: string, value: string, current: string, onChange: (val: string) => void }) => (
    <button
        type="button"
        onClick={() => isAdmin && onChange(value)}
        className={`
            px-3 py-1 text-[10px] font-bold uppercase tracking-widest border rounded-sm transition-all
            ${current === value 
                ? 'bg-ink text-white border-ink shadow-sm' 
                : 'bg-transparent text-ink/40 border-ink/10 hover:border-ink/30'}
            ${!isAdmin ? 'cursor-default opacity-80' : 'cursor-pointer'}
        `}
    >
        {t(label)}
    </button>
  );

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-space-bg/80 backdrop-blur-sm"
                onClick={onClose}
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                className="bg-paper-white w-full max-w-2xl shadow-2xl relative z-10 overflow-hidden flex flex-col rounded-sm border border-ink/5"
                style={{
                    maxHeight: '90vh',
                    backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDIiLz4KPC9zdmc+')",
                }}
            >
                {/* Header */}
                <div className="flex-none flex justify-between items-center p-6 border-b border-ink/5">
                     <span className="font-typewriter text-[10px] text-ink/30 uppercase tracking-widest">
                         // {t("Team").toUpperCase()} ID: {teamId.toUpperCase()}
                     </span>
                    <button onClick={onClose} className="text-ink/30 hover:text-red-700 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-grow overflow-y-auto custom-scrollbar p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        
                        {/* Title */}
                        <div className="space-y-1">
                            <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30">{t("Task Title")}</label>
                            {isAdmin ? (
                                <input 
                                    required
                                    type="text" 
                                    value={formData.title}
                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                    className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-serif text-4xl text-ink placeholder-ink/10 transition-colors"
                                    placeholder="..."
                                />
                            ) : (
                                <h2 className="font-serif text-4xl text-ink leading-none">{t(formData.title || '')}</h2>
                            )}
                        </div>

                        {/* Metadata Grid */}
                        <div className="flex flex-wrap gap-6 border-b border-ink/5 pb-6">
                             <div className="flex-1 min-w-[120px]">
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-2">{t("Type")}</label>
                                {isAdmin ? (
                                    <input
                                        type="text" 
                                        value={formData.type}
                                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                                        className="w-full bg-ink/5 px-2 py-1 rounded-sm border-none focus:ring-1 focus:ring-ink/20 outline-none font-typewriter text-xs text-ink"
                                    />
                                ) : (
                                    <span className="font-typewriter text-xs text-ink/70 px-2 py-1 bg-ink/5 rounded-sm">{t(formData.type || '')}</span>
                                )}
                             </div>

                             <div className="flex-1 min-w-[120px]">
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-2">{t("Priority")}</label>
                                {isAdmin ? (
                                    <input
                                        type="text" 
                                        value={formData.priority}
                                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                                        className="w-full bg-ink/5 px-2 py-1 rounded-sm border-none focus:ring-1 focus:ring-ink/20 outline-none font-typewriter text-xs text-ink"
                                    />
                                ) : (
                                    <span className="font-typewriter text-xs text-red-800 px-2 py-1 bg-red-50 rounded-sm">{t(formData.priority || '')}</span>
                                )}
                             </div>

                             <div className="flex-auto">
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-2">{t("Status")}</label>
                                <div className="flex gap-2">
                                    <StatusButton label="To Do" value="To Do" current={formData.status as string} onChange={(val) => setFormData({...formData, status: val as TaskStatus})} />
                                    <StatusButton label="Doing" value="Doing" current={formData.status as string} onChange={(val) => setFormData({...formData, status: val as TaskStatus})} />
                                    <StatusButton label="Done" value="Done" current={formData.status as string} onChange={(val) => setFormData({...formData, status: val as TaskStatus})} />
                                </div>
                             </div>
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-2">{t("Description")}</label>
                            {isAdmin ? (
                                <textarea 
                                    rows={5}
                                    value={formData.description}
                                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    className="w-full bg-white/50 border border-ink/10 p-4 focus:border-ink outline-none font-hand text-xl text-ink/90 rounded-sm resize-none"
                                />
                            ) : (
                                <div className="w-full font-hand text-2xl text-ink/80 leading-relaxed pl-2 border-l-2 border-ink/10">
                                    {t(formData.description || '')}
                                </div>
                            )}
                        </div>

                        {/* Footer / Resource */}
                        <div className="flex flex-col sm:flex-row gap-6 pt-4">
                            <div className="flex-1">
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-1">{t("Target Date")}</label>
                                {isAdmin ? (
                                    <input 
                                        type="date" 
                                        value={formData.deadline}
                                        onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                                        className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1 font-typewriter text-xs"
                                    />
                                ) : (
                                    <span className="font-typewriter text-sm">{formData.deadline || '-'}</span>
                                )}
                            </div>

                            <div className="flex-1 flex flex-col items-start">
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-2">{t("Resource")}</label>
                                {isAdmin ? (
                                    <div className="flex items-center gap-2 w-full">
                                        <LinkIcon size={14} className="text-ink/30" />
                                        <input 
                                            type="url" 
                                            value={formData.resourceLink}
                                            onChange={(e) => setFormData({...formData, resourceLink: e.target.value})}
                                            className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1 font-typewriter text-xs placeholder:italic"
                                            placeholder="https://..."
                                        />
                                    </div>
                                ) : formData.resourceLink ? (
                                    <a 
                                        href={formData.resourceLink} 
                                        target="_blank" 
                                        rel="noreferrer" 
                                        className="flex items-center gap-2 bg-ink text-white px-4 py-2 rounded-sm shadow-md hover:bg-ink-blue transition-colors font-typewriter text-xs uppercase tracking-widest group"
                                    >
                                        <ExternalLink size={14} className="group-hover:rotate-45 transition-transform" /> 
                                        {t("Open Resource")}
                                    </a>
                                ) : (
                                    <span className="text-ink/20 text-xs italic">No digital link attached.</span>
                                )}
                            </div>
                        </div>

                         {/* Admin Team Assignment */}
                         {isAdmin && !initialData && (
                            <div className="pt-6 border-t border-ink/10">
                                <label className="block font-typewriter text-[10px] uppercase tracking-widest text-ink/30 mb-3 flex items-center gap-2">
                                    <Users size={12} /> {t("Assign to Teams")}
                                </label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                    {TEAMS.map(t => (
                                        <label key={t.id} className="flex items-center gap-2 cursor-pointer hover:bg-ink/5 p-1 rounded-sm transition-colors">
                                            <input 
                                                type="checkbox" 
                                                checked={selectedTeams.includes(t.id)}
                                                onChange={() => toggleTeam(t.id)}
                                                className="accent-ink w-3 h-3"
                                            />
                                            <span className={`font-typewriter text-[10px] ${selectedTeams.includes(t.id) ? 'text-ink font-bold' : 'text-ink/50'}`}>
                                                {t.name}
                                            </span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isAdmin && (
                            <div className="pt-6 flex justify-end gap-3">
                                <button type="button" onClick={onClose} className="px-4 py-2 hover:bg-ink/5 transition-colors font-typewriter text-[10px] uppercase tracking-widest text-ink/60">
                                    {t("Discard")}
                                </button>
                                <button type="submit" className="px-6 py-2 bg-ink text-white hover:bg-ink-light transition-colors font-typewriter text-[10px] uppercase tracking-widest shadow-lg flex items-center gap-2">
                                    <Check size={14} />
                                    {initialData ? t('Update') : t('Save Task')}
                                </button>
                            </div>
                        )}
                    </form>
                </div>
            </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default TaskModal;
