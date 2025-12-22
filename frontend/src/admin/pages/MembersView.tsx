
import React, { useState, useMemo } from 'react';
/* Added Users to imports from lucide-react */
import { Search, Filter, Shield, MoreHorizontal, User, Mail, Calendar, Clock, ArrowRight, UserX, UserCheck, ShieldAlert, Users } from 'lucide-react';
import { Member, MemberStatus, MemberRole, NavigationState } from '../types';
import { useTheme } from '../contexts/ThemeContext';

interface MembersViewProps {
  members: Member[];
  onNavigate: (state: NavigationState) => void;
}

const MembersView: React.FC<MembersViewProps> = ({ members, onNavigate }) => {
  const { t } = useTheme();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<MemberStatus | 'All'>('All');
  const [roleFilter, setRoleFilter] = useState<MemberRole | 'All'>('All');

  const filteredMembers = useMemo(() => {
    return members.filter(m => {
      const matchSearch = m.name.toLowerCase().includes(search.toLowerCase()) || 
                          m.email.toLowerCase().includes(search.toLowerCase()) ||
                          (m.username || '').toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'All' || m.status === statusFilter;
      const matchRole = roleFilter === 'All' || m.role === roleFilter;
      return matchSearch && matchStatus && matchRole;
    });
  }, [members, search, statusFilter, roleFilter]);

  const getStatusStyle = (status: MemberStatus) => {
    switch (status) {
      case 'Active': return 'bg-emerald-50 text-emerald-700 border-emerald-100';
      case 'Suspended': return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'Banned': return 'bg-red-50 text-red-700 border-red-100';
      default: return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  const getRoleStyle = (role: MemberRole) => {
    switch (role) {
      case 'Admin': return 'bg-purple-100 text-purple-700';
      case 'Editor': return 'bg-blue-100 text-blue-700';
      case 'Creator': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  return (
    <div className="flex flex-col h-full bg-bgMain animate-fadeIn font-sans">
      {/* Header */}
      <div className="h-16 border-b border-borderDark flex items-center justify-between px-8 bg-white shrink-0 shadow-sm z-10">
         <div className="flex items-center gap-3">
            <Users size={20} className="text-accent"/>
            <h1 className="text-lg font-black uppercase tracking-widest text-textMain">Members Control</h1>
         </div>
         <div className="flex items-center gap-4">
            <div className="text-[10px] font-black uppercase text-textMuted tracking-widest">Jami: {members.length}</div>
            <button className="bg-accent text-white px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-widest hover:bg-accentHover transition-all shadow-md">
               Export CSV
            </button>
         </div>
      </div>

      {/* Filters Bar */}
      <div className="px-8 py-4 border-b border-borderDark bg-bgSidebar/30 flex flex-wrap items-center gap-4">
         <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted" />
            <input 
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder="Ism, email yoki username bo'yicha qidiruv..."
               className="w-full bg-white border border-borderDark py-2 pl-10 pr-4 text-sm rounded-md outline-none focus:border-accent transition-all"
            />
         </div>

         <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-textMuted uppercase">Status:</span>
            <select 
               value={statusFilter}
               onChange={e => setStatusFilter(e.target.value as any)}
               className="bg-white border border-borderDark text-xs p-2 rounded outline-none focus:border-accent"
            >
               <option value="All">Barchasi</option>
               <option value="Active">Active</option>
               <option value="Suspended">Suspended</option>
               <option value="Banned">Banned</option>
            </select>
         </div>

         <div className="flex items-center gap-2">
            <span className="text-[10px] font-black text-textMuted uppercase">Rol:</span>
            <select 
               value={roleFilter}
               onChange={e => setRoleFilter(e.target.value as any)}
               className="bg-white border border-borderDark text-xs p-2 rounded outline-none focus:border-accent"
            >
               <option value="All">Barchasi</option>
               <option value="Admin">Admin</option>
               <option value="Editor">Editor</option>
               <option value="Creator">Creator</option>
               <option value="User">User</option>
            </select>
         </div>
      </div>

      {/* Members List - Table View */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
         <div className="bg-white border border-borderDark rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left">
               <thead className="bg-bgSidebar/50 border-b border-borderDark">
                  <tr>
                     <th className="px-6 py-4 text-[10px] font-black uppercase text-textMuted">Foydalanuvchi</th>
                     <th className="px-6 py-4 text-[10px] font-black uppercase text-textMuted">Rol</th>
                     <th className="px-6 py-4 text-[10px] font-black uppercase text-textMuted">Status</th>
                     <th className="px-6 py-4 text-[10px] font-black uppercase text-textMuted">Ro'yxatdan o'tgan</th>
                     <th className="px-6 py-4 text-[10px] font-black uppercase text-textMuted">Oxirgi faollik</th>
                     <th className="px-6 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-borderDark/30">
                  {filteredMembers.map(m => (
                     <tr 
                        key={m.id} 
                        onClick={() => onNavigate({ type: 'cms-member-detail', title: m.name, payload: m })}
                        className="hover:bg-accent/5 transition-colors cursor-pointer group"
                     >
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-bgSidebar border border-borderDark overflow-hidden shrink-0 flex items-center justify-center">
                                 <img src={`https://api.dicebear.com/7.x/lorelei-neutral/svg?seed=${m.avatar}`} alt={m.name} className="w-full h-full object-cover"/>
                              </div>
                              <div>
                                 <p className="text-sm font-bold text-textMain group-hover:text-accent transition-colors">{m.name}</p>
                                 <p className="text-[10px] text-textMuted font-mono">@{m.username || 'noma\'lum'} • {m.email}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded ${getRoleStyle(m.role)}`}>
                              {m.role}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${getStatusStyle(m.status)}`}>
                              {m.status}
                           </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-1.5 text-xs text-textMuted">
                              <Calendar size={12}/>
                              {m.joinedAt}
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-1.5 text-xs text-textMain font-mono">
                              <Clock size={12} className="text-accent"/>
                              {m.lastActive}
                           </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="p-2 text-textMuted hover:text-accent transition-colors">
                              <ArrowRight size={18}/>
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
            {filteredMembers.length === 0 && (
               <div className="py-20 text-center flex flex-col items-center">
                  <UserX size={48} className="text-textMuted opacity-20 mb-4"/>
                  <p className="text-sm text-textMuted font-medium">Bunday parametrli foydalanuvchilar topilmadi.</p>
               </div>
            )}
         </div>
      </div>
    </div>
  );
};

export default MembersView;
