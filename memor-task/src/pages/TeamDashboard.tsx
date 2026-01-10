import React, { useState, useMemo, useEffect } from 'react';
import { useParams, Navigate, useNavigate } from 'react-router-dom';
import { TEAMS } from '../../constants';
import { useTasks } from '../context/TaskContext';
import { useAuth } from '../context/AuthContext';
import { Task, TaskStatus } from '../../types';
import BoardView from '../views/BoardView';
import TaskModal from '../components/TaskModal';
import { Plus, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const TeamDashboard: React.FC = () => {
  const { teamId, taskId } = useParams<{ teamId: string; taskId?: string }>();
  const navigate = useNavigate();
  const team = TEAMS.find(t => t.id === teamId);
  const { getTasksByTeam, addTask, updateTask } = useTasks();
  const { isAdmin } = useAuth();

  const [filterStatus, setFilterStatus] = useState<TaskStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Scroll to top on mount or team change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [teamId]);

  // Derived state
  const teamTasks = getTasksByTeam(teamId as string);

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

  const handleSaveTask = (task: Task) => {
    if (selectedTask || isCreateModalOpen) {
      if (selectedTask) updateTask(task);
      else addTask(task);
    }
    handleCloseModal();
  };

  return (
    <div className="min-h-[80vh] flex flex-col w-full">
      {/* Clean Dark Header Section - No Paper Style */}
      <div className="relative w-full mb-12 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-6">
        <div>
          <span className="font-typewriter text-xs text-white/50 uppercase tracking-widest block mb-2">
            Department File // {team.id.toUpperCase()}
          </span>
          <motion.h2
            layoutId={`card-title-${team.id}`}
            className="font-serif text-6xl md:text-7xl text-white leading-none drop-shadow-lg"
          >
            {team.name}
          </motion.h2>
        </div>

        <div className="flex gap-4 items-center mt-6 md:mt-0">
          {/* Controls */}
          <div className="flex gap-4 items-center bg-white/5 p-2 rounded-sm border border-white/10 backdrop-blur-sm">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Search..."
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
              <option value="All" className="bg-space-bg">All Notes</option>
              <option value="To Do" className="bg-space-bg">To Do</option>
              <option value="Doing" className="bg-space-bg">Doing</option>
              <option value="Done" className="bg-space-bg">Done</option>
            </select>
          </div>

          {isAdmin && (
            <button
              onClick={handleCreateTask}
              className="group flex items-center justify-center gap-2 border border-white/20 text-white font-typewriter px-4 py-3 hover:bg-white/10 transition-all shadow-sm rounded-sm bg-white/5"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform" />
              <span className="text-xs uppercase tracking-widest">Pin Note</span>
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

      {/* Task Modal driven by URL or Create state */}
      <TaskModal
        isOpen={!!selectedTask || isCreateModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSaveTask}
        teamId={teamId as string}
        initialData={selectedTask}
      />
    </div>
  );
};

export default TeamDashboard;