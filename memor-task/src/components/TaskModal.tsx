import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Task, TaskStatus } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Link as LinkIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface TaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (task: Task) => void;
    teamId: string;
    initialData?: Task;
}

const TaskModal: React.FC<TaskModalProps> = ({ isOpen, onClose, onSubmit, teamId, initialData }) => {
    const { isAdmin } = useAuth();
    const [formData, setFormData] = useState<Partial<Task>>({
        title: '',
        description: '',
        type: '',
        status: 'To Do',
        startDate: new Date().toISOString().split('T')[0],
        deadline: new Date().toISOString().split('T')[0],
        resourceLink: ''
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                title: '',
                description: '',
                type: '',
                status: 'To Do',
                startDate: new Date().toISOString().split('T')[0],
                deadline: new Date().toISOString().split('T')[0],
                resourceLink: ''
            });
        }
    }, [initialData, isOpen]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isAdmin) return;

        const newTask: Task = {
            id: initialData?.id || Date.now().toString(),
            teamId,
            title: formData.title || 'Untitled',
            description: formData.description || '',
            type: formData.type || 'General',
            status: formData.status as TaskStatus,
            startDate: formData.startDate || '',
            deadline: formData.deadline || '',
            resourceLink: formData.resourceLink || ''
        };
        onSubmit(newTask);
        onClose();
    };

    const StatusButton = ({ label, value, current, onChange }: { label: string, value: string, current: string, onChange: (val: string) => void }) => (
        <button
            type="button"
            onClick={() => isAdmin && onChange(value)}
            className={`
            px-4 py-2 text-xs font-bold uppercase tracking-wider border rounded-sm transition-all
            ${current === value
                    ? 'bg-ink text-white border-ink'
                    : 'bg-transparent text-ink/40 border-ink/20 hover:border-ink/50'}
            ${!isAdmin ? 'cursor-default opacity-80' : 'cursor-pointer'}
        `}
        >
            {label}
        </button>
    );

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-8">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-space-bg/90 backdrop-blur-md"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="bg-paper-white w-full max-w-3xl shadow-2xl relative z-10 overflow-hidden flex flex-col"
                        style={{
                            aspectRatio: '210/297', // A4 Ratio
                            maxHeight: '90vh',
                            boxShadow: '0 0 50px rgba(0,0,0,0.8)'
                        }}
                    >
                        {/* Header / Top Bar */}
                        <div className="h-16 flex-none flex justify-between items-center px-8 border-b border-ink/5 bg-paper-white">
                            <div className="font-typewriter text-xs text-ink/40">
                                ARCHIVE_ID: {initialData?.id || 'NEW_ENTRY'} // {teamId.toUpperCase()}
                            </div>
                            <button onClick={onClose} className="text-ink/30 hover:text-ink-red transition-colors">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Scrollable Content Area */}
                        <div className="flex-grow overflow-y-auto custom-scrollbar pt-8 pb-8 px-8 sm:px-16 bg-paper-white">
                            <form onSubmit={handleSubmit} className="space-y-8">

                                {/* Title Section */}
                                <div className="space-y-2">
                                    <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/40">Task Title</label>
                                    {isAdmin ? (
                                        <input
                                            required
                                            type="text"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            className="w-full bg-transparent border-b-2 border-ink/10 focus:border-ink outline-none py-2 font-serif text-3xl text-ink placeholder-ink/20 transition-colors"
                                            placeholder="Enter title..."
                                        />
                                    ) : (
                                        <h2 className="font-serif text-3xl text-ink border-b-2 border-transparent py-2">{formData.title}</h2>
                                    )}
                                </div>

                                {/* Classification & Status */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/40 mb-3">Classification (Type)</label>
                                        {isAdmin ? (
                                            <input
                                                required
                                                type="text"
                                                value={formData.type}
                                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                                className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-2 font-typewriter text-sm text-ink"
                                                placeholder="e.g. Video, Urgent, Bug..."
                                            />
                                        ) : (
                                            <div className="font-typewriter text-sm text-ink border-b border-transparent py-2">
                                                {formData.type || 'N/A'}
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/40 mb-3">Status</label>
                                        <div className="flex flex-wrap gap-2">
                                            <StatusButton label="To Do" value="To Do" current={formData.status as string} onChange={(val) => setFormData({ ...formData, status: val as TaskStatus })} />
                                            <StatusButton label="Doing" value="Doing" current={formData.status as string} onChange={(val) => setFormData({ ...formData, status: val as TaskStatus })} />
                                            <StatusButton label="Done" value="Done" current={formData.status as string} onChange={(val) => setFormData({ ...formData, status: val as TaskStatus })} />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/40">Description</label>
                                    {isAdmin ? (
                                        <textarea
                                            rows={8}
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                            className="w-full bg-paper-white border border-ink/10 p-4 focus:border-ink outline-none font-serif text-lg leading-relaxed text-ink/80 rounded-sm"
                                            placeholder="Enter task details..."
                                        />
                                    ) : (
                                        <div className="w-full p-4 font-serif text-lg leading-relaxed text-ink/80 bg-ink/5 rounded-sm min-h-[150px] whitespace-pre-wrap">
                                            {formData.description}
                                        </div>
                                    )}
                                </div>

                                {/* Footer Info */}
                                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-ink/10">
                                    <div>
                                        <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/40 mb-1">Target Date</label>
                                        {isAdmin ? (
                                            <input
                                                type="date"
                                                value={formData.deadline}
                                                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                                                className="bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1 font-typewriter text-sm"
                                            />
                                        ) : (
                                            <span className="font-typewriter text-sm">{formData.deadline}</span>
                                        )}
                                    </div>
                                    <div>
                                        <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/40 mb-1">Resource</label>
                                        {isAdmin ? (
                                            <div className="flex items-center gap-2">
                                                <LinkIcon size={14} className="text-ink/40" />
                                                <input
                                                    type="url"
                                                    value={formData.resourceLink}
                                                    onChange={(e) => setFormData({ ...formData, resourceLink: e.target.value })}
                                                    className="w-full bg-transparent border-b border-ink/20 focus:border-ink outline-none py-1 font-typewriter text-sm"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        ) : formData.resourceLink ? (
                                            <a href={formData.resourceLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-ink-blue hover:underline font-typewriter text-sm">
                                                <LinkIcon size={14} /> Open Link
                                            </a>
                                        ) : (
                                            <span className="text-ink/30 text-sm font-typewriter">N/A</span>
                                        )}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                {isAdmin && (
                                    <div className="pt-8 flex justify-end gap-4">
                                        <button type="button" onClick={onClose} className="px-6 py-3 hover:bg-ink/5 transition-colors font-typewriter text-xs uppercase tracking-widest">
                                            Discard
                                        </button>
                                        <button type="submit" className="px-8 py-3 bg-ink text-white hover:bg-ink-light transition-colors font-typewriter text-xs uppercase tracking-widest shadow-lg flex items-center gap-2">
                                            <Check size={16} />
                                            {initialData ? 'Update' : 'Save Task'}
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