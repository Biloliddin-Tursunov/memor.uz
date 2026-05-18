import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTeams } from './TeamContext';
import { Member } from '../types';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  isAdmin: boolean;
  isSuperAdmin: boolean;
  currentUser: Member | null;
  login: (username: string, pass: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateCurrentUser: (updates: Partial<Member>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const normalize = (value: string) => value.trim().toLowerCase();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const { getAllMembers, saveGlobalMember, getMemberTeams } = useTeams();

  const isSuperAdmin = currentUser ? ['biloliddin', 'otabek'].includes(normalize(currentUser.name)) : false;
  const isAdmin = !!currentUser;

  const findMemberForAuthUser = (authUser: any): Member | null => {
    const userEmail = authUser?.email ? normalize(authUser.email) : '';
    const userMetadata = authUser?.user_metadata || {};
    return getAllMembers().find(m => {
      const memberEmail = m.email ? normalize(m.email) : '';
      const memberUsername = m.username ? normalize(m.username) : '';
      return m.id === userMetadata.member_id || (userEmail && memberEmail === userEmail) || (userEmail && memberUsername === userEmail);
    }) || null;
  };

  useEffect(() => {
    let isMounted = true;

    supabase.auth.getUser().then(({ data }: any) => {
      if (!isMounted || !data?.user) return;
      setCurrentUser(findMemberForAuthUser(data.user));
    });

    const { data } = supabase.auth.onAuthStateChange((_event: string, session: any) => {
      setCurrentUser(session?.user ? findMemberForAuthUser(session.user) : null);
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [getAllMembers]);

  const login = async (username: string, pass: string): Promise<boolean> => {
    const email = username.trim();
    if (!email || !pass) return false;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
    if (error || !data?.user) return false;

    const memberUser = findMemberForAuthUser(data.user);
    if (!memberUser) {
      await supabase.auth.signOut();
      return false;
    }

    setCurrentUser(memberUser);
    return true;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  const updateCurrentUser = (updates: Partial<Member>) => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    saveGlobalMember(updatedUser, getMemberTeams(currentUser.id));
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isSuperAdmin, currentUser, login, logout, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
