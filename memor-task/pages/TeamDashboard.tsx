
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
import { motion, Reorder } from 'framer-motion';

const TeamDashboard: React.FC = () => {
  const { teamId, taskId } = useParams<{ teamId: string; taskId?: string }>();
  const navigate = useNavigate();
  
  const { teams, members, updateTeam, updateTeamMembers } = useTeams();
  const team = teams.find(t => t.id === teamId);
  
  const { getTasksByTeam, addTask, updateTask } = useTasks();
  const { isAdmin, isSuperAdmin } = useAuth();
  const { t, language } = useLanguage();

  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Edit Mode States
  const [isEditingInfo, setIsEditingInfo] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDesc, setEditDesc] = useState('');

  // Member Modal State (Now Public Profile)
  const [selectedPublicMember, setSelectedPublicMember] = useState<Member | null>(null);
  const [isGlobalManagerOpen, setIsGlobalManagerOpen] = useState(false);
  const [managerTargetId, setManagerTargetId] = useState<string | null>(null);

  // Scroll to top on mount or team change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [teamId]);

  useEffect(() => {
      if(team) {
          setEditName(team.name);
          setEditDesc(team.description);
      }
  }, [team]);

  // Derived state
  const teamTasks = getTasksByTeam(teamId as string);
  
  const teamMembers = members[teamId as string] || [];
  
  // Find task for modal if taskId exists in URL
  const selectedTask = useMemo(() => {
    return taskId ? teamTasks.find(t => t.id === taskId) : undefined;
  }, [taskId, teamTasks]);

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

  const handleCreateTask = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    navigate(`/team/${teamId}/task/${task.id}`);
  };

  const handleCloseModal = () => {
    setIsCreateModalOpen(false);
    navigate(`/team/${teamId}`);
  };

  const handleSaveTask = (task: Task, extraTeams?: string[]) => {
    if (selectedTask) {
        updateTask(task);
    } else if (isCreateModalOpen) {
        addTask(task);
        if (extraTeams && extraTeams.length > 0) {
            extraTeams.forEach(tid => {
                const copy: Task = {
                    ...task,
                    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
                    teamId: tid
                };
                addTask(copy);
            });
        }
    }
    handleCloseModal();
  };
  
  // Admin: Save Team Details
  const handleSaveTeamDetails = () => {
      if(!team) return;
      updateTeam(team.id, { name: editName, description: editDesc });
      setIsEditingInfo(false);
  };

  // Logic for Team Title Display
  const renderTeamTitle = () => {
      const translatedName = t(team.name);
      if (language === 'ENG' && !isEditingInfo) {
          return `Department of ${translatedName}`;
      }
      return translatedName;
  };

  // Logic for Team Subtitle
  const renderTeamSubtitle = () => {
      if (language === 'ENG') return ''; 
      return `${t("Team")} // ${team.id.toUpperCase()}`;
  };

  // Handle Drag Reorder
  const handleReorder = (newOrder: Member[]) => {
      if (isAdmin && team) {
          updateTeamMembers(team.id, newOrder);
      }
  };

   const handleEditFromProfile = (member: Member) => {
      setSelectedPublicMember(null);
      setManagerTargetId(member.id);
      setIsGlobalManagerOpen(true);
  };
  
  const closeManager = () => {
      setIsGlobalManagerOpen(false);
      setManagerTargetId(null);
  };

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
        {/* Header Section */}
        <div className="relative w-full mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
            <div className="w-full md:w-auto">
                <span className="font-typewriter text-xs text-white/50 uppercase tracking-widest block mb-2">
                    {renderTeamSubtitle()}
                </span>
                
                {isEditingInfo && isAdmin ? (
                     <div className="flex flex-col gap-2 w-full md:w-[500px]">
                         <input 
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="bg-white/10 border-b border-white/30 text-white text-4xl font-serif p-2 outline-none"
                            placeholder="Team Name"
                         />
                         <textarea 
                             value={editDesc}
                             onChange={(e) => setEditDesc(e.target.value)}
                             className="bg-white/5 border border-white/10 text-white/70 text-sm font-typewriter p-2 outline-none h-24"
                             placeholder="Description Key or Text"
                         />
                         <button onClick={handleSaveTeamDetails} className="self-start bg-green-700/50 hover:bg-green-600 px-4 py-1 rounded-sm text-xs uppercase tracking-widest mt-2 flex items-center gap-2">
                             <Check size={14} /> Save Details
                         </button>
                     </div>
                ) : (
                    <div className="flex items-center gap-4 group">
                        <motion.h2 
                            layoutId={`card-title-${team.id}`}
                            className="font-serif text-5xl md:text-7xl text-white leading-none drop-shadow-lg"
                        >
                            {renderTeamTitle()}
                        </motion.h2>
                        {isAdmin && (
                            <button onClick={() => setIsEditingInfo(true)} className="opacity-0 group-hover:opacity-100 transition-opacity text-white/30 hover:text-white">
                                <Pencil size={20} />
                            </button>
                        )}
                    </div>
                )}
            </div>

            <div className="flex gap-4 items-center mt-6 md:mt-0">
                {/* Controls */}
                <div className="flex gap-4 items-center bg-white/5 p-2 rounded-sm border border-white/10 backdrop-blur-sm">
                        <div className="relative">
                        <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
                        <input 
                            type="text" 
                            placeholder={t("Search...")} 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-transparent border-b border-white/20 pl-9 pr-4 py-1 text-sm text-white focus:outline-none focus:border-white font-typewriter w-32 focus:w-48 transition-all placeholder:text-white/30"
                        />
                    </div>
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as TaskStatus | 'All')}
                        className="bg-transparent text-white/80 text-sm font-typewriter focus:outline-none cursor-pointer hover:text-white border-b border-transparent hover:border-white/20"
                    >
                        <option value="All" className="bg-space-bg">{t("All Notes")}</option>
                        <option value="To Do" className="bg-space-bg">{t("To Do")}</option>
                        <option value="Doing" className="bg-space-bg">{t("Doing")}</option>
                        <option value="Done" className="bg-space-bg">{t("Done")}</option>
                    </select>
                </div>

                {isAdmin && (
                    <button 
                        onClick={handleCreateTask}
                        className="group flex items-center justify-center gap-2 border border-white/20 text-white font-typewriter px-4 py-3 hover:bg-white/10 transition-all shadow-sm rounded-sm bg-white/5"
                    >
                        <Plus size={16} className="group-hover:rotate-90 transition-transform" />
                        <span className="text-xs uppercase tracking-widest">{t("Pin Note")}</span>
                    </button>
                )}
            </div>
        </div>

        {/* The Content */}
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="relative z-10 flex-grow"
        >
            <BoardView tasks={filteredTasks} onEditTask={handleEditTask} />
        </motion.div>

        {/* Team Members Section (Footer) */}
        <div className="mt-20 pt-12 border-t border-white/10">
            <h3 className="font-serif text-3xl text-white/40 mb-8 text-center">{t("Creators")}</h3>
            
            {isAdmin ? (
                <Reorder.Group 
                    axis="x" 
                    values={teamMembers} 
                    onReorder={handleReorder} 
                    className="flex flex-wrap justify-center gap-8"
                >
                    {teamMembers.map(member => (
                        <Reorder.Item 
                            key={member.id} 
                            value={member}
                            whileDrag={{ scale: 1.1, zIndex: 100 }}
                            className="cursor-grab active:cursor-grabbing relative"
                            onClick={() => setSelectedPublicMember(member)}
                        >
                            <div className="flex flex-col items-center group relative">
                                <div className={`
                                    w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 overflow-hidden
                                    ${member.isVolunteer 
                                        ? 'border border-white/10 bg-white/5 text-white/30' 
                                        : 'border-2 border-indigo-200/20 bg-gradient-to-br from-indigo-900/50 to-slate-800/50 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] group-hover:border-indigo-300/40'}
                                `}>
                                    {member.avatar ? (
                                        <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        member.isVolunteer ? <Sparkles size={20} className="text-white/20" /> : <User size={24} className="text-white/80" />
                                    )}
                                </div>
                                <span className={`font-serif text-lg ${member.isVolunteer ? 'text-white/40' : 'text-white/90 group-hover:text-indigo-200'} transition-colors`}>{member.name}</span>
                                {member.role && (
                                    <span className="font-typewriter text-[10px] uppercase tracking-widest text-white/40 mt-1">
                                        {member.role}
                                    </span>
                                )}
                                {member.isVolunteer && (
                                    <span className="font-typewriter text-[9px] uppercase tracking-widest text-white/20 mt-1">
                                        Volunteer
                                    </span>
                                )}
                            </div>
                        </Reorder.Item>
                    ))}
                </Reorder.Group>
            ) : (
                <div className="flex flex-wrap justify-center gap-8">
                    {teamMembers.map(member => (
                        <motion.div
                            key={member.id}
                            whileHover={{ y: -5 }}
                            className="flex flex-col items-center group cursor-pointer"
                            onClick={() => setSelectedPublicMember(member)}
                        >
                            <div className={`
                                w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 overflow-hidden
                                ${member.isVolunteer 
                                    ? 'border border-white/10 bg-white/5 text-white/30' 
                                    : 'border-2 border-indigo-200/20 bg-gradient-to-br from-indigo-900/50 to-slate-800/50 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.3)] group-hover:border-indigo-300/40'}
                            `}>
                                {member.avatar ? (
                                    <img src={member.avatar} alt={member.name} className="w-full h-full object-cover" />
                                ) : (
                                    member.isVolunteer ? <Sparkles size={20} className="text-white/20" /> : <User size={24} className="text-white/80" />
                                )}
                            </div>
                            <span className={`font-serif text-lg ${member.isVolunteer ? 'text-white/40' : 'text-white/90 group-hover:text-indigo-200'} transition-colors`}>{member.name}</span>
                            {member.role && (
                                <span className="font-typewriter text-[10px] uppercase tracking-widest text-white/40 mt-1">
                                    {member.role}
                                </span>
                            )}
                            {member.isVolunteer && (
                                <span className="font-typewriter text-[9px] uppercase tracking-widest text-white/20 mt-1">
                                    Volunteer
                                </span>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}
        </div>

      {/* Task Modal driven by URL or Create state */}
      <TaskModal 
        isOpen={!!selectedTask || isCreateModalOpen} 
        onClose={handleCloseModal} 
        onSubmit={handleSaveTask}
        teamId={teamId as string}
        initialData={selectedTask}
      />

      {/* Public Profile Modal (Replaces MemberModal for general viewing) */}
      <PublicProfileModal 
          isOpen={!!selectedPublicMember}
          onClose={() => setSelectedPublicMember(null)}
          member={selectedPublicMember}
          onManage={isSuperAdmin ? () => handleEditFromProfile(selectedPublicMember!) : undefined}
      />

      {/* Global Manager for Super Admins (triggered via profile manage) */}
      <GlobalMemberManager 
          isOpen={isGlobalManagerOpen}
          onClose={closeManager}
          initialMemberId={managerTargetId}
      />

    </div>
  );
};

export default TeamDashboard;
