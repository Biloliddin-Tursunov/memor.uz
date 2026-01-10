export type TeamId = string;

export type TaskStatus = 'To Do' | 'Doing' | 'Done';

export interface Team {
  id: string;
  name: string;
  description: string; // Pre-formatted text with newlines
}

export interface Task {
  id: string;
  teamId: string;
  title: string;
  description: string;
  type: string; // Manual classification (input text)
  status: TaskStatus;
  startDate: string; // ISO Date String
  deadline: string; // ISO Date String
  resourceLink: string;
}

export type ViewMode = 'board' | 'calendar' | 'table';