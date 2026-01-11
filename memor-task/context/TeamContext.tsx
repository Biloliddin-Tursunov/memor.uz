
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Team, Member } from '../types';
import { TEAMS, TEAM_MEMBERS } from '../constants';

interface TeamContextType {
  teams: Team[];
  members: Record<string, Member[]>;
  footerOrder: string[]; // List of Member IDs in order
  // Basic ops
  updateTeam: (teamId: string, updates: Partial<Team>) => void;
  updateTeamMembers: (teamId: string, newMembers: Member[]) => void;
  reorderMember: (teamId: string, memberId: string, direction: 'left' | 'right') => void;
  // Global ops
  getAllMembers: () => Member[]; // Returns unique members
  getMemberTeams: (memberId: string) => string[];
  saveGlobalMember: (memberData: Member, targetTeamIds: string[]) => void;
  deleteGlobalMember: (memberId: string) => void;
  reorderGlobalMembers: (newOrderIds: string[]) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

// Specific order defined by the user
const PREDEFINED_ORDER = [
    'u_otabek',       // Otabek
    'u_biloliddin',   // Biloliddin
    'u_bunyod',       // Bunyod
    'u_jasur',        // Jasur
    'ar5',            // Javohir
    'u_muslim',       // Muslimbek
    's1',             // Jaloliddin
    'u_alisher',      // Alisher
    't4',             // Asilbek
    'a1',             // Aminaxon
    'u_zuhra',        // Zuhra
    'u_fotima',       // Fotima
    'a4',             // Jasmina
    't2',             // Xushnudaxon
    't5',             // Zilola
    'u_volunteers'    // Volontyorlar
];

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize from constants
  const [teams, setTeams] = useState<Team[]>(TEAMS);
  const [members, setMembers] = useState<Record<string, Member[]>>(TEAM_MEMBERS);
  const [footerOrder, setFooterOrder] = useState<string[]>([]);

  // Initialize footer order on load based on PREDEFINED list + any others found
  useEffect(() => {
    const uniqueIds = new Set<string>();
    Object.values(TEAM_MEMBERS).flat().forEach(m => uniqueIds.add(m.id));
    
    // Sort found IDs based on the predefined order
    const allFoundIds = Array.from(uniqueIds);
    const sortedIds = allFoundIds.sort((a, b) => {
        const indexA = PREDEFINED_ORDER.indexOf(a);
        const indexB = PREDEFINED_ORDER.indexOf(b);
        
        // If both are in the list, sort by index
        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        
        // If only A is in list, A comes first
        if (indexA !== -1) return -1;
        
        // If only B is in list, B comes first
        if (indexB !== -1) return 1;
        
        // If neither, keep original order (or alphabetical)
        return 0;
    });

    setFooterOrder(sortedIds);
  }, []);

  const updateTeam = (teamId: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...updates } : t));
  };

  const updateTeamMembers = (teamId: string, newMembers: Member[]) => {
      setMembers(prev => ({
          ...prev,
          [teamId]: newMembers
      }));
  };

  const reorderMember = (teamId: string, memberId: string, direction: 'left' | 'right') => {
    setMembers(prev => {
      const teamList = [...(prev[teamId] || [])];
      const index = teamList.findIndex(m => m.id === memberId);
      
      if (index === -1) return prev;
      
      const newIndex = direction === 'left' ? index - 1 : index + 1;
      
      // Check bounds
      if (newIndex < 0 || newIndex >= teamList.length) return prev;
      
      // Swap
      [teamList[index], teamList[newIndex]] = [teamList[newIndex], teamList[index]];
      
      return {
        ...prev,
        [teamId]: teamList
      };
    });
  };

  // --- Global Management Logic ---

  // Get a list of ALL unique members
  const getAllMembers = (): Member[] => {
      const unique = new Map<string, Member>();
      
      // 1. Gather all members from teams
      (Object.values(members) as Member[][]).forEach(teamList => {
          teamList.forEach(m => {
              // Always use the latest version found (in case of sync drift, though saveGlobal fixes this)
              unique.set(m.id, m);
          });
      });

      return Array.from(unique.values());
  };

  // Get which teams a member belongs to
  const getMemberTeams = (memberId: string): string[] => {
      const teamIds: string[] = [];
      Object.entries(members).forEach(([tid, list]) => {
          if ((list as Member[]).some(m => m.id === memberId)) {
              teamIds.push(tid);
          }
      });
      return teamIds;
  };

  // The "God Mode" save function
  const saveGlobalMember = (memberData: Member, targetTeamIds: string[]) => {
      setMembers(prev => {
          const next = { ...prev };
          
          // Update across ALL teams first (to keep data in sync)
          Object.keys(next).forEach(tid => {
              const list = next[tid];
              
              if (targetTeamIds.includes(tid)) {
                  // User should be in this team
                  const existingIdx = list.findIndex(m => m.id === memberData.id);
                  if (existingIdx !== -1) {
                      // Update existing
                      const newList = [...list];
                      newList[existingIdx] = memberData;
                      next[tid] = newList;
                  } else {
                      // Add new (append)
                      next[tid] = [...list, memberData];
                  }
              } else {
                  // User should NOT be in this team
                  next[tid] = list.filter(m => m.id !== memberData.id);
              }
          });

          return next;
      });

      // Update footer order list if new member
      setFooterOrder(prev => {
          if (!prev.includes(memberData.id)) {
              return [...prev, memberData.id];
          }
          return prev;
      });
  };

  const deleteGlobalMember = (memberId: string) => {
      setMembers(prev => {
          const next = { ...prev };
          Object.keys(next).forEach(tid => {
              next[tid] = next[tid].filter(m => m.id !== memberId);
          });
          return next;
      });
      setFooterOrder(prev => prev.filter(id => id !== memberId));
  };

  const reorderGlobalMembers = (newOrderIds: string[]) => {
      setFooterOrder(newOrderIds);
  };

  return (
    <TeamContext.Provider value={{ 
        teams, 
        members, 
        footerOrder,
        updateTeam, 
        updateTeamMembers, 
        reorderMember,
        getAllMembers,
        getMemberTeams,
        saveGlobalMember,
        deleteGlobalMember,
        reorderGlobalMembers
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeams must be used within a TeamProvider');
  }
  return context;
};
