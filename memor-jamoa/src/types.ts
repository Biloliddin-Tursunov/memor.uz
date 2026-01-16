
export type TeamId = string;

export type TaskStatus = 'To Do' | 'Doing' | 'Done';

export type Language = 'UZ' | 'TR' | 'ENG' | 'RUS';

export interface Team {
  id: string;
  name: string; // This will now serve as a Translation Key
  description: string; // This will also serve as a Translation Key
}

export interface Member {
  id: string;
  name: string; // Acts as Display Name
  username?: string; // Acts as login username if provided
  role?: string; // Optional position
  isVolunteer?: boolean;
  // Profile
  avatar?: string; // URL or Base64
  bio?: string;
  // Auth credentials
  email?: string; // Optional legacy or recovery
  password?: string;
}

export interface Task {
  id: string;
  teamId: string;
  title: string;
  description: string;
  type: string; 
  priority?: string; 
  status: TaskStatus;
  startDate: string; 
  deadline: string; 
  resourceLink: string;
}

export type ViewMode = 'board' | 'calendar' | 'table';
