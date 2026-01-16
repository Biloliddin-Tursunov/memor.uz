
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Team, Member } from '../types';
import { TEAMS, TEAM_MEMBERS } from '../constants';
import { supabase } from '../lib/supabase';

interface TeamContextType {
  teams: Team[];
  members: Record<string, Member[]>;
  footerOrder: string[];
  loading: boolean;
  updateTeam: (teamId: string, updates: Partial<Team>) => void;
  getAllMembers: () => Member[];
  getMemberTeams: (memberId: string) => string[];
  saveGlobalMember: (memberData: Member, targetTeamIds: string[]) => Promise<void>;
  deleteGlobalMember: (memberId: string) => Promise<void>;
  reorderGlobalMembers: (newOrder: string[]) => Promise<void>;
  updateTeamMembers: (teamId: string, newMembers: Member[]) => void;
}

const TeamContext = createContext<TeamContextType | undefined>(undefined);

export const TeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(TEAMS);
  const [members, setMembers] = useState<Record<string, Member[]>>(TEAM_MEMBERS); // Initialize with local data
  const [footerOrder, setFooterOrder] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchGlobalData = async () => {
    try {
      setLoading(true);
      
      // 1. Fetch Profiles
      const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .order('rank_weight', { ascending: true });

      if (pError) {
        console.warn('Profiles fetch failed, using local data. Error details:', pError);
      }

      // 2. Fetch Team Participants
      const { data: participants, error: partError } = await supabase
        .from('team_participants')
        .select('*');

      if (partError) {
        console.warn('Participants fetch failed. Error details:', partError);
      }

      // Use DB data only if both were successfully fetched and contain data
      if (profiles && profiles.length > 0 && participants && participants.length > 0) {
          const membersByTeam: Record<string, Member[]> = {};
          
          participants.forEach((p: any) => {
              const profile = profiles.find((pr: any) => pr.id === p.user_id);
              if (profile) {
                  if (!membersByTeam[p.team_id]) membersByTeam[p.team_id] = [];
                  membersByTeam[p.team_id].push({
                      id: profile.id,
                      name: profile.full_name,
                      avatar: profile.avatar_url,
                      bio: profile.bio,
                      role: profile.role,
                      isVolunteer: profile.is_volunteer
                  });
              }
          });

          setMembers(membersByTeam);
          setFooterOrder(profiles.map((p: any) => p.id));
      } else {
        // Fallback to local constants if DB returns nothing
        setMembers(TEAM_MEMBERS);
        const uniqueIds = Array.from(new Set(Object.values(TEAM_MEMBERS).flat().map(m => m.id)));
        setFooterOrder(uniqueIds);
      }
    } catch (err) {
      console.error('Critical failure in fetchGlobalData, staying with local data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGlobalData();
  }, []);

  const updateTeam = (teamId: string, updates: Partial<Team>) => {
    setTeams(prev => prev.map(t => t.id === teamId ? { ...t, ...updates } : t));
  };

  const getAllMembers = (): Member[] => {
      const unique = new Map<string, Member>();
      Object.values(members).flat().forEach((m: Member) => unique.set(m.id, m));
      return Array.from(unique.values());
  };

  const getMemberTeams = (memberId: string): string[] => {
      const teamIds: string[] = [];
      // Cast Object.entries to correct type to avoid 'unknown' member array property errors
      (Object.entries(members) as [string, Member[]][]).forEach(([tid, list]) => {
          if (list.some((m: Member) => m.id === memberId)) teamIds.push(tid);
      });
      return teamIds;
  };

  const saveGlobalMember = async (memberData: Member, targetTeamIds: string[]) => {
      const { error: pError } = await supabase
        .from('profiles')
        .upsert({
            id: memberData.id,
            full_name: memberData.name,
            bio: memberData.bio,
            avatar_url: memberData.avatar,
            role: memberData.role,
            is_volunteer: memberData.isVolunteer,
            rank_weight: memberData.id === 'u_otabek' ? 1 : (memberData.id === 'u_biloliddin' ? 2 : 100)
        });

      if (!pError) {
          await supabase.from('team_participants').delete().eq('user_id', memberData.id);
          const newParts = targetTeamIds.map(tid => ({ user_id: memberData.id, team_id: tid }));
          await supabase.from('team_participants').insert(newParts);
          fetchGlobalData();
      } else {
        console.error('Error saving profile to Supabase:', pError);
        // Optimistic local update if DB fails
        const newMembers = { ...members };
        Object.keys(newMembers).forEach(tid => {
            newMembers[tid] = newMembers[tid].filter(m => m.id !== memberData.id);
            if (targetTeamIds.includes(tid)) {
                newMembers[tid].push(memberData);
            }
        });
        setMembers(newMembers);
      }
  };

  const deleteGlobalMember = async (memberId: string) => {
      const { error } = await supabase.from('profiles').delete().eq('id', memberId);
      if (!error) {
          fetchGlobalData();
      } else {
          // Local fallback
          const newMembers = { ...members };
          Object.keys(newMembers).forEach(tid => {
              newMembers[tid] = newMembers[tid].filter(m => m.id !== memberId);
          });
          setMembers(newMembers);
      }
  };

  const reorderGlobalMembers = async (newOrder: string[]) => {
      setFooterOrder(newOrder);
  };

  const updateTeamMembers = (teamId: string, newMembers: Member[]) => {
      setMembers(prev => ({
          ...prev,
          [teamId]: newMembers
      }));
  };

  return (
    <TeamContext.Provider value={{ 
        teams, members, footerOrder, loading, updateTeam, 
        getAllMembers, getMemberTeams, saveGlobalMember,
        deleteGlobalMember, reorderGlobalMembers, updateTeamMembers
    }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeams = () => {
  const context = useContext(TeamContext);
  if (!context) throw new Error('useTeams must be used within a TeamProvider');
  return context;
};
