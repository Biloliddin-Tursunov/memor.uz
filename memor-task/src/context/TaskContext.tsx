import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Task, DBTask } from '../types/types';

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  addTask: (task: Task) => Promise<void>;
  updateTask: (task: Task) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  getTasksByTeam: (teamId: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  // 1. O'qish (Read) va Mapping
  const fetchTasks = async () => {
    setLoading(true);
    // Soft delete qilinganlar (deleted_at IS NOT NULL) kelmaydi
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .is('deleted_at', null);

    if (error) {
      console.error('Error fetching tasks:', error);
    } else if (data) {
      // DB formatidan UI formatiga o'tkazamiz
      const mappedTasks: Task[] = (data as DBTask[]).map(t => ({
        id: t.id,
        teamId: t.team_id, // snake -> camel
        title: t.title,
        description: t.description || '',
        type: t.type,
        status: t.status as any,
        startDate: t.start_date, // snake -> camel
        deadline: t.deadline,   // snake -> camel
        resourceLink: t.resource_link || '' // snake -> camel
      }));
      setTasks(mappedTasks);
    }
    setLoading(false);
  };

  // 2. Qo'shish (Create)
  const addTask = async (task: Task) => {
    const { data: { user } } = await supabase.auth.getUser();

    // UI -> DB mapping
    const newTaskPayload = {
      team_id: task.teamId,
      title: task.title,
      description: task.description,
      type: task.type,
      status: task.status,
      start_date: task.startDate,
      deadline: task.deadline,
      resource_link: task.resourceLink,
      created_by: user?.id
    };

    const { data, error } = await supabase
      .from('tasks')
      .insert([newTaskPayload])
      .select()
      .single();

    if (!error && data) {
      // Yangi taskni statega qo'shamiz (optimistik UI yoki qayta fetch)
      const dbTask = data as DBTask;
      const newTask: Task = {
        id: dbTask.id,
        teamId: dbTask.team_id,
        title: dbTask.title,
        description: dbTask.description,
        type: dbTask.type,
        status: dbTask.status as any,
        startDate: dbTask.start_date,
        deadline: dbTask.deadline,
        resourceLink: dbTask.resource_link
      };
      setTasks(prev => [...prev, newTask]);
    } else {
      console.error(error);
      alert('Xatolik: Task qo\'shilmadi');
    }
  };

  // 3. Yangilash (Update)
  const updateTask = async (updatedTask: Task) => {
    const { error } = await supabase
      .from('tasks')
      .update({
        title: updatedTask.title,
        description: updatedTask.description,
        type: updatedTask.type,
        status: updatedTask.status,
        start_date: updatedTask.startDate,
        deadline: updatedTask.deadline,
        resource_link: updatedTask.resourceLink
      })
      .eq('id', updatedTask.id);

    if (!error) {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    } else {
      console.error(error);
    }
  };

  // 4. O'chirish (Soft Delete)
  const deleteTask = async (id: string) => {
    const { data: { user } } = await supabase.auth.getUser();

    // Bazadan o'chirmaymiz, deleted_at ga vaqt qo'yamiz
    const { error } = await supabase
      .from('tasks')
      .update({
        deleted_at: new Date().toISOString(),
        deleted_by: user?.id
      })
      .eq('id', id);

    if (!error) {
      setTasks(prev => prev.filter(t => t.id !== id));
    } else {
      console.error(error);
    }
  };

  const getTasksByTeam = (teamId: string) => {
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
  if (!context) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};