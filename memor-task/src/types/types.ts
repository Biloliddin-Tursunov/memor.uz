export type TaskStatus = 'To Do' | 'Doing' | 'Done';

export interface Team {
    id: string;
    name: string;
    description: string;
    // Pin color Frontendda hisoblanadi, bazadan shart emas, lekin
    // agar bazadan kelsa, uni ham qo'shish mumkin.
}

// Frontend uchun Task (Eski kodingiz bilan bir xil qoladi)
export interface Task {
    id: string;
    teamId: string; // Frontendda teamId
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
    team_id: string; // Bazada team_id
    title: string;
    description: string;
    type: string;
    status: string;
    start_date: string;
    deadline: string;
    resource_link: string;
    created_by: string;
    deleted_at: string | null;
}