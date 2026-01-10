export type TaskStatus = 'To Do' | 'Doing' | 'Done';

export interface Team {
    id: string;
    name: string;
    description: string;
    pin_color?: string; // Bazadagi rang (agar bo'lsa)
}

// Frontend uchun Task (Eski kodingiz bilan bir xil qoladi)
export interface Task {
    id: string;
    teamId: string;
    title: string;
    description: string;
    type: string;
    status: TaskStatus;
    startDate: string;
    deadline: string;
    resourceLink: string;
}

// Supabase DB dan keladigan Task formati
export interface DBTask {
    id: string;
    team_id: string;
    title: string;
    description: string | null;
    type: string;
    status: string;
    start_date: string | null;
    deadline: string | null;
    resource_link: string | null;
    created_by: string;
    deleted_at: string | null;
}