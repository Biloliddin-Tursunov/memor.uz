
import React from 'react';

export type Status = 'Done' | 'In Progress' | 'Not Started' | 'Review' | 'Joylandi!' | 'Boshlanmadi' | 'Published' | 'Draft' | 'Scheduled';

export interface Assignee {
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  projectId?: string; 
  name: string;
  status: Status;
  startDate?: string;
  deadline: string;
  assignees: Assignee[];
  createdBy?: string;
  createdByAvatar?: string;
  icon?: string; 
  iconColor?: string;
  taskType?: string;
  taskTypeColor?: string;
  format?: string;
  formatColor?: string;
  description?: string;
  workerReport?: string;
  submissionFiles?: string[];
}

export type CMSDomain = 'KNOWLEDGE' | 'MOVEMENT' | 'CREATION';
export type LanguageCode = 'uz' | 'en' | 'ru' | 'tr' | 'jp';

export type MediaType = 'image' | 'video' | 'audio' | 'doc' | 'vector' | 'other';

export interface MediaFile {
   id: string;
   name: string;
   type: MediaType;
   size: string;
   date: string;
   url?: string;
   uploader?: string;
   tags?: string[];
}

export type DeviceType = 'Desktop' | 'Mobile' | 'Tablet';
export type ActivityAction = 'View' | 'Create' | 'Edit' | 'Delete' | 'Task Action' | 'Login' | 'Upload';

export interface EnhancedActivity {
  id: string;
  path: string;
  action: ActivityAction;
  targetName: string;
  entryTime: string;
  exitTime?: string;
  duration: string; 
  date: string;
  // Added device property to EnhancedActivity to fix TypeScript errors in TeamDirectoryView.tsx
  device: DeviceType;
  metadata?: string; // e.g., "(+240 words)" or "(v2.1 Revision)"
}

export interface PostTranslation {
  title: string;
  content: string;
  description?: string;
}

export interface VideoMetadata {
  videoUrl?: string;
  fileName?: string;
  duration?: string;
  resolution?: string;
  visibility: 'Public' | 'Private' | 'Unlisted';
  audience: 'Kids' | 'Not for Kids';
  subtitlesEnabled: boolean;
  tags: string[];
}

export interface BookMetadata {
  bookType: 'Physical' | 'PDF';
  price?: string;
  shortDescription?: string;
  pdfUrl?: string;
  pdfFileName?: string;
  pages?: string;
}

export interface ArtistProject {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ArtistMetadata {
  professions: string[];
  bio: string;
  birthYear: string;
  deathYear?: string;
  birthPlace: string;
  projects: ArtistProject[];
  linkedContentIds: string[]; 
}

export interface EventMetadata {
  shortDescription: string;
  startDateTime: string;
  endDateTime: string;
  location: {
    city: string;
    address: string;
    mapLink?: string;
    isOnline: boolean;
  };
  registrationLink: string;
  organizer: {
    type: 'artist' | 'org';
    id?: string; 
    name: string; 
  };
}

export interface ArtworkMetadata {
  year?: string;
  location?: string;
  gallery: string[];
  author?: {
    id?: string;
    name: string;
  };
}

export type ContentPost = Task & {
  title?: string;
  publishDate?: string;
  scheduledDate?: string;
  files?: string[];
  link?: string;
  content?: string;
  domain?: CMSDomain;
  category?: string;
  coverImage?: string;
  tags?: string[];
  translations?: Partial<Record<LanguageCode, PostTranslation>>;
  videoMetadata?: VideoMetadata; 
  bookMetadata?: BookMetadata;
  artistMetadata?: ArtistMetadata;
  eventMetadata?: EventMetadata;
  artworkMetadata?: ArtworkMetadata;
};

export interface ExhibitionItem {
  id: string;
  studentName: string;
  projectTitle: string;
  image: string; 
  gallery?: string[]; 
  year: string;
  category: string;
  description: string;
  location?: string;
  tools?: string[]; 
  presentationLink?: string;
  dateCompleted?: string;
}

export type MemberStatus = 'Active' | 'Suspended' | 'Banned';
export type MemberRole = 'Admin' | 'Editor' | 'Creator' | 'User';

export interface MemberActivity {
  id: string;
  type: 'create' | 'edit' | 'request' | 'login';
  date: string;
  title: string;
  contentType: 'article' | 'video' | 'book' | 'artwork' | 'account' | string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  username: string;
  avatar: string;
  status: MemberStatus;
  role: MemberRole;
  joinedAt: string;
  lastActive: string;
  activities: MemberActivity[];
  notes?: string;
}

/* FINANCE TYPES */
export type TransactionType = 'Kirim' | 'Chiqim';
export type FinanceCategory = 'Investitsiya' | 'Donation' | 'Office' | 'Server' | 'Xodimlar' | 'Marketing' | 'Boshqa';
export type Currency = 'UZS' | 'USD' | 'EUR';

export interface FinanceTransaction {
  id: string;
  date: string;
  amount: number;
  currency: Currency;
  type: TransactionType;
  category: FinanceCategory;
  description: string;
  createdBy: string;
  updatedBy?: string;
  updatedAt?: string;
}

export type PageType = 'dashboard' | 'inbox' | 'cms-studio' | 'cms-content' | 'cms-media' | 'project' | 'profile' | 'team-directory' | 'exhibition' | 'exhibition-detail' | 'exhibition-editor' | 'exhibition-portfolio' | 'cms-members' | 'cms-member-detail' | 'finance';

export interface NavigationState {
  type: PageType;
  id?: string;
  title: string;
  payload?: any; 
}

export type Role = 'Lead Admin' | 'Admin' | 'Editor' | 'Investor' | 'Viewer' | 'Super Admin';
export type Department = 'IT' | 'Marketing' | 'Architecture' | 'General' | 'Management' | string;

export interface Session {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  username?: string;
  phone?: string;
  telegram?: string;
  role: Role;
  department: Department;
  avatar: string; 
  projects?: string[];
  sessions?: Session[];
  activities?: EnhancedActivity[];
}

export interface Message {
  id: string;
  sender: string;
  avatar: string;
  subject: string;
  preview: string;
  date: string;
  read: boolean;
  tag?: 'Urgent' | 'Team' | 'System';
  isDraft?: boolean;
  link?: NavigationState;
}

export const canEdit = (role: Role) => ['Lead Admin', 'Super Admin', 'Admin', 'Editor'].includes(role);
export const canDelete = (role: Role) => ['Lead Admin', 'Super Admin', 'Admin'].includes(role);
export const canManageUsers = (role: Role) => ['Lead Admin', 'Super Admin'].includes(role);
