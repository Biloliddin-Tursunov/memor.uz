
import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useTeams } from '../context/TeamContext';
import { Task, TaskStatus, Member } from '../types';
import BoardView from '../views/BoardView';
import TaskModal from '../components/TaskModal';
import PublicProfileModal from '../components/PublicProfileModal';
import GlobalMemberManager from '../components/GlobalMemberManager';
import { Plus, Search, Sparkles, Pencil, Check, User } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamDashboard: React.FC = () => {
    const { teamId, taskId } = useParams<{ teamId: string; taskId?: string }>();
    const navigate = useNavigate();
    const { teams, members, updateTeam } = useTeams();
    const team = teams.find(t => t.id === teamId);
    const { getTasksByTeam, addTask, updateTask } = useTasks();
    const { isAdmin, isSuperAdmin } = useAuth();
    const { t } = useLanguage();

    const [filterStatus, setFilterStatus] = useState<TaskStatus | 'All'>('All');
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [editName, setEditName] = useState('');
    const [editDesc, setEditDesc] = useState('');

    const [selectedPublicMember, setSelectedPublicMember] = useState<Member | null>(null);
    const [isGlobalManagerOpen, setIsGlobalManagerOpen] = useState(false);
    const [managerTargetId, setManagerTargetId] = useState<string | null>(null);

    useEffect(() => { window.scrollTo(0, 0); }, [teamId]);
    useEffect(() => { if (team) { setEditName(team.name); setEditDesc(team.description); } }, [team]);

    const teamTasks = getTasksByTeam(teamId as string);
    const teamMembersRaw = members[teamId as string] || [];

    const teamMembers = useMemo(() => {
        return [...teamMembersRaw].sort((a, b) => {
            const getRank = (m: Member) => {
                if (m.id === 'u_cigdem') return -2; // Always First
                if (m.id === 'u_dilnoza') return -1; // Always Second

                if (m.id === 'u_otabek') return 0;
                if (m.id === 'u_biloliddin') return 1;

                // Core Creators (not volunteer, not supervisor)
                if (!m.isVolunteer && m.role !== 'Supervisor') return 2;

                // Supervisors (Ustozlar)
                if (m.role === 'Supervisor') return 3;

                // Volunteers
                return 4;
            };
            const rankA = getRank(a);
            const rankB = getRank(b);

            if (rankA !== rankB) return rankA - rankB;
            // Alphabetical within same rank
            return a.name.localeCompare(b.name);
        });
    }, [teamMembersRaw]);

    const selectedTask = useMemo(() => taskId ? teamTasks.find(t => t.id === taskId) : undefined, [taskId, teamTasks]);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    const filteredTasks = useMemo(() => {
        return teamTasks.filter(task => {
            const matchesStatus = filterStatus === 'All' || task.status === filterStatus;
            const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                task.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesStatus && matchesSearch;
        });
    }, [teamTasks, filterStatus, searchQuery]);

    if (!team) return <Navigate to="/" />;

    const handleCreateTask = () => setIsCreateModalOpen(true);
    const handleEditTask = (task: Task) => navigate(`/team/${teamId}/task/${task.id}`);
    const handleCloseModal = () => { setIsCreateModalOpen(false); navigate(`/team/${teamId}`); };

    const handleSaveTask = (task: Task, extraTeams?: string[]) => {
        if (selectedTask) updateTask(task);
        else if (isCreateModalOpen) {
            addTask(task);
            if (extraTeams) extraTeams.forEach(tid => addTask({ ...task, id: Date.now().toString() + Math.random().toString(36).substr(2, 5), teamId: tid }));
        }
        handleCloseModal();
    };

    const handleSaveTeamDetails = () => {
        if (!team) return;
        updateTeam(team.id, { name: editName, description: editDesc });
        setIsEditingInfo(false);
    };

    const handleEditFromProfile = (member: Member) => {
        setSelectedPublicMember(null);
        setManagerTargetId(member.id);
        setIsGlobalManagerOpen(true);
    };

    const { left, right } = useMemo(() => {
        const text = t(team.description);
        const parts = text.split(/(?=Kimlar ishlaydi|Kimler çalışıyor|Who works here|Кто работает)/i);
        return { left: parts[0] || '', right: parts[1] || '' };
    }, [team.description, t]);

    return (
        <div className="min-h-[80vh] flex flex-col w-full">
            <div className="relative w-full mb-10 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-8">
                <div className="w-full md:w-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="font-typewriter text-[10px] text-white/40 uppercase tracking-widest">{t("Team")} // {team.id.toUpperCase()}</span>
                    </div>

                    {isEditingInfo && isAdmin ? (
                        <div className="flex flex-col gap-3 w-full md:w-[500px] mt-4">
                            <input value={editName} onChange={(e) => setEditName(e.target.value)} className="bg-white/10 border-b border-white/30 text-white text-3xl font-serif p-2 outline-none" />
                            <textarea value={editDesc} onChange={(e) => setEditDesc(e.target.value)} className="bg-white/5 border border-white/10 text-white/70 text-sm font-typewriter p-2 outline-none h-24" />
                            <button onClick={handleSaveTeamDetails} className="self-start bg-green-700/50 hover:bg-green-600 px-4 py-1.5 rounded-sm text-[10px] uppercase tracking-widest mt-2 flex items-center gap-2 transition-colors"><Check size={14} /> Save Details</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4 group">
                            <motion.h2 layoutId={`card-title-${team.id}`} className="font-serif text-5xl md:text-8xl text-white leading-none drop-shadow-lg tracking-tight">{t(team.name)}</motion.h2>
                            {isAdmin && <button onClick={() => setIsEditingInfo(true)} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white p-2"><Pencil size={20} /></button>}
                        </div>
                    )}
                </div>

                <div className="flex gap-3 items-center mt-8 md:mt-0 w-full md:w-auto">
                    <div className="flex gap-2 items-center bg-white/5 p-1.5 rounded-sm border border-white/10 backdrop-blur-sm">
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/30" />
                            <input type="text" placeholder="..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent border-b border-white/10 pl-8 pr-2 py-1 text-[10px] text-white focus:outline-none focus:border-white font-typewriter w-24 focus:w-40 transition-all" />
                        </div>
                        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'All')} className="bg-transparent text-white/40 text-[9px] uppercase font-typewriter outline-none cursor-pointer hover:text-white transition-colors">
                            <option value="All">{t("All")}</option>
                            <option value="To Do">{t("To Do")}</option>
                            <option value="Doing">{t("Doing")}</option>
                            <option value="Done">{t("Done")}</option>
                        </select>
                    </div>
                    {isAdmin && (
                        <button onClick={handleCreateTask} className="group flex items-center justify-center gap-2 border border-white/20 text-white font-typewriter px-4 py-2.5 hover:bg-white/10 transition-all rounded-sm bg-white/5 whitespace-nowrap shadow-xl">
                            <Plus size={14} className="group-hover:rotate-90 transition-transform text-amber-300" />
                            <span className="text-[10px] uppercase tracking-widest">{t("Pin Note")}</span>
                        </button>
                    )}
                </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }} className="relative z-10 flex-grow">
                <BoardView tasks={filteredTasks} onEditTask={handleEditTask} />
            </motion.div>

            {/* BOTTOM SECTION */}
            <div className="mt-28 pt-16 relative">
                <div className="flex items-center justify-center gap-4 mb-12 opacity-20">
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                    <div className="rotate-45 w-2 h-2 border border-white"></div>
                    <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                </div>

                <div className="max-w-6xl mx-auto mb-20 px-4">
                    <div className="grid md:grid-cols-2 gap-12 md:gap-20 text-center md:text-justify font-typewriter text-[11px] md:text-xs text-white/30 italic leading-relaxed tracking-wide">
                        <div className="flex flex-col items-center md:items-start whitespace-pre-line border-r-0 md:border-r border-white/5 md:pr-10">{left}</div>
                        <div className="flex flex-col items-center md:items-start whitespace-pre-line">{right}</div>
                    </div>
                </div>

                <div className="relative">
                    <h3 className="font-serif italic text-3xl md:text-4xl text-white/10 mb-10 text-center tracking-widest uppercase">{t("Creators")}</h3>
                    <div className="grid grid-cols-2 md:flex md:flex-wrap md:justify-center items-start gap-x-8 gap-y-12 max-w-5xl mx-auto px-4">
                        {teamMembers.map(member => {
                            const isSupervisor = member.role === 'Supervisor';
                            const isCigdem = member.id === 'u_cigdem' || member.name.includes('Çiğdem');
                            const isDilnoza = member.id === 'u_dilnoza' || member.name.includes('Dilnoza');
                            const isDoctor = isCigdem || isDilnoza;

                            return (
                                <motion.div key={member.id} whileHover={{ y: -1 }} className="flex flex-col items-center group cursor-pointer w-full md:w-40" onClick={() => setSelectedPublicMember(member)}>
                                    <div className={`w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-4 transition-all duration-500 overflow-hidden relative 
                                    ${isSupervisor
                                            ? 'border-2 border-amber-500/20 bg-amber-900/10 text-amber-200/40 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.15)] group-hover:border-amber-500/40'
                                            : member.isVolunteer
                                                ? 'border border-white/5 bg-white/5 text-white/20'
                                                : 'border border-amber-500/30 bg-gradient-to-br from-amber-900/20 to-stone-900 text-white group-hover:border-amber-400/40 group-hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]'}
                                `}>
                                        {member.avatar
                                            ? <img src={member.avatar} alt={member.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            : member.isVolunteer && !isSupervisor ? <Sparkles size={18} /> : <User size={24} className="text-amber-200/20" />
                                        }
                                    </div>
                                    <span className={`font-serif italic text-lg md:text-2xl text-center leading-tight transition-colors duration-300 
                                    ${(isDoctor || !member.isVolunteer) ? 'text-white/60 group-hover:text-white/80' : 'text-white/30 group-hover:text-white/80'}
                                    ${isDoctor ? 'border-b border-white/10 pb-0.5' : ''}
                                `}>
                                        {member.name}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <TaskModal isOpen={!!selectedTask || isCreateModalOpen} onClose={handleCloseModal} onSubmit={handleSaveTask} teamId={teamId as string} initialData={selectedTask} />
            <PublicProfileModal isOpen={!!selectedPublicMember} onClose={() => setSelectedPublicMember(null)} member={selectedPublicMember} onManage={isSuperAdmin ? () => handleEditFromProfile(selectedPublicMember!) : undefined} />
            <GlobalMemberManager isOpen={isGlobalManagerOpen} onClose={() => setIsGlobalManagerOpen(false)} initialMemberId={managerTargetId} />
        </div>
    );
};

export default TeamDashboard;
