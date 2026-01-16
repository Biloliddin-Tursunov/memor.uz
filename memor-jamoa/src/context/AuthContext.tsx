
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useTeams } from './TeamContext';
import { Member } from '../types';

interface AuthContextType {
  isAdmin: boolean; // Means "Is Logged In" basically
  isSuperAdmin: boolean; // Specifically Otabek or Biloliddin
  currentUser: Member | null;
  login: (username: string, pass: string) => boolean;
  logout: () => void;
  updateCurrentUser: (updates: Partial<Member>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<Member | null>(null);
  const { getAllMembers, saveGlobalMember, getMemberTeams } = useTeams();

  const isSuperAdmin = currentUser ? ['biloliddin', 'otabek'].includes(currentUser.name.toLowerCase()) : false;
  const isAdmin = !!currentUser; // Any logged in creator is an "admin" of tasks

  // Check storage on mount
  useEffect(() => {
    const storedId = localStorage.getItem('memor_user_id');
    if (storedId) {
      const allMembers = getAllMembers();
      const user = allMembers.find(m => m.id === storedId);
      if (user) {
          setCurrentUser(user);
      }
    }
  }, [getAllMembers]); // Dependency on getAllMembers to keep user data fresh

  const login = (username: string, pass: string): boolean => {
    const allMembers = getAllMembers();
    
    // Check against username field first, then name field
    const memberUser = allMembers.find(m => 
        (m.username && m.username.toLowerCase() === username.toLowerCase()) ||
        m.name.toLowerCase() === username.toLowerCase()
    );
    
    if (memberUser) {
        // Validation check
        const validPassword = memberUser.password 
            ? memberUser.password === pass 
            : memberUser.name === pass;

        if (validPassword) {
            setCurrentUser(memberUser);
            localStorage.setItem('memor_user_id', memberUser.id);
            return true;
        }
    }

    // Fallback
    if (username.toLowerCase() === 'biloliddin' && pass === '12345') {
         const tempUser: Member = { id: 'superuser', name: 'Biloliddin', isVolunteer: false };
         setCurrentUser(tempUser);
         return true;
    }

    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('memor_user_id');
  };

  // Self-update profile
  const updateCurrentUser = (updates: Partial<Member>) => {
      if (!currentUser) return;
      const updatedUser = { ...currentUser, ...updates };
      setCurrentUser(updatedUser);
      
      // Persist to global state
      const myTeams = getMemberTeams(currentUser.id);
      saveGlobalMember(updatedUser, myTeams);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, isSuperAdmin, currentUser, login, logout, updateCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
