
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Task, TeamId } from '../types';
import { INITIAL_TASKS } from '../constants';
import { supabase } from '../lib/supabase';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: any) => Promise<void>;
  updateTask: (task: any) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTasksByTeam: (teamId: TeamId) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS); // Initialize with local data
  const [loading, setLoading] = useState(true);

  // Initial Fetch
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) {
          console.warn('Supabase: Tasks fetch failed, using local tasks. Error:', error);
          return;
        }
        
        if (data && data.length > 0) {
          setTasks(data.map((t: any) => ({
              id: t.id,
              teamId: t.team_id,
              title: t.title,
              description: t.description || '',
              type: t.task_type || 'General',
              priority: t.priority || 'Normal',
              status: t.status || 'To Do',
              deadline: t.deadline || '',
              resourceLink: t.resource_link || '',
              startDate: t.created_at || ''
          })));
        } else {
            // Data is empty, stay with INITIAL_TASKS
            setTasks(INITIAL_TASKS);
        }
      } catch (err) {
        console.error('Task fetch failed:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();

    // Realtime subscription
    const channel = supabase
      .channel('tasks_realtime')
      .on('postgres_changes', { event: '*', table: 'tasks' }, (payload: any) => {
        if (payload.eventType === 'INSERT') {
            const t = payload.new;
            const newTask: Task = {
                id: t.id,
                teamId: t.team_id,
                title: t.title,
                description: t.description || '',
                type: t.task_type || 'General',
                priority: t.priority || 'Normal',
                status: t.status || 'To Do',
                deadline: t.deadline || '',
                resourceLink: t.resource_link || '',
                startDate: t.created_at || ''
            };
            setTasks(prev => [newTask, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
            const t = payload.new;
            setTasks(prev => prev.map(old => old.id === t.id ? {
                ...old,
                title: t.title,
                description: t.description,
                type: t.task_type,
                priority: t.priority,
                status: t.status,
                deadline: t.deadline,
                resourceLink: t.resource_link
            } : old));
        } else if (payload.eventType === 'DELETE') {
            setTasks(prev => prev.filter(t => t.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addTask = async (task: any) => {
    const { data: userData } = await supabase.auth.getUser();
    const { error } = await supabase.from('tasks').insert([{
        team_id: task.teamId,
        creator_id: userData.user?.id || null,
        title: task.title,
        description: task.description,
        task_type: task.type,
        priority: task.priority,
        status: task.status,
        deadline: task.deadline || null,
        resource_link: task.resourceLink
    }]);
    
    if (error) {
        console.error('Error adding task:', error);
        // Local only fallback for disconnected mode
        const newTask: Task = {
            ...task,
            id: Date.now().toString(),
            startDate: new Date().toISOString()
        };
        setTasks(prev => [newTask, ...prev]);
    }
  };

  const updateTask = async (task: any) => {
    const { error } = await supabase
        .from('tasks')
        .update({
            title: task.title,
            description: task.description,
            task_type: task.type,
            priority: task.priority,
            status: task.status,
            deadline: task.deadline || null,
            resource_link: task.resourceLink
        })
        .eq('id', task.id);
        
    if (error) {
        console.error('Error updating task:', error);
        // Local fallback
        setTasks(prev => prev.map(t => t.id === task.id ? { ...t, ...task } : t));
    }
  };

  const deleteTask = async (id: string) => {
    const { error } = await supabase.from('tasks').delete().eq('id', id);
    if (error) {
        console.error('Error deleting task:', error);
        // Local fallback
        setTasks(prev => prev.filter(t => t.id !== id));
    }
  };

  const getTasksByTeam = (teamId: TeamId) => {
    return tasks.filter(t => t.teamId === teamId);
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask, getTasksByTeam }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within a TaskProvider');
  return context;
};
