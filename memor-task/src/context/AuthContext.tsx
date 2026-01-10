import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ADMIN_USER } from '../constants';

interface AuthContextType {
  isAdmin: boolean;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check storage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('memor_admin_auth');
    if (storedAuth === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const login = (email: string, pass: string): boolean => {
    if (email === ADMIN_USER.email && pass === ADMIN_USER.password) {
      setIsAdmin(true);
      localStorage.setItem('memor_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('memor_admin_auth');
  };

  return (
    <AuthContext.Provider value={{ isAdmin, login, logout }}>
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