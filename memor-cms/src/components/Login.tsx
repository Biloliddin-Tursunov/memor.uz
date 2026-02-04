import React, { useState } from 'react';
import { Lock, Key, Wand2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TeamMember } from '../types';

interface LoginProps {
  onLogin: (user: TeamMember) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSearching(true);

    try {
      const { data, error: fetchError } = await supabase
        .from('team_members')
        .select('*')
        .eq('email', formData.email)
        .eq('password', formData.password)
        .single();

      if (fetchError || !data) {
        throw new Error("Email yoki maxfiy so'z noto'g'ri!");
      }

      onLogin(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#1a110e] flex items-center justify-center p-4">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sepia rounded-full blur-[150px] animate-pulse"></div>
      </div>

      <div className="relative w-full max-w-md perspective-1000">
        <div className="parchment-texture p-8 sm:p-12 rounded-lg border-4 border-double border-sepia shadow-[0_0_50px_rgba(0,0,0,0.8)] relative transform hover:rotate-1 transition-transform duration-500">

          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-graphite rounded-full border-2 border-sepia flex items-center justify-center mx-auto mb-4 shadow-inner">
              <Lock className="text-sepia" size={32} />
            </div>
            <h2 className="font-cinzel text-3xl text-ink font-bold tracking-wider">
              Maxfiy Eshik
            </h2>
            <p className="font-serif italic text-ink/70 mt-2">
              Kirish uchun ma'lumotlarni kiriting
            </p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-[#740001]/10 border border-[#740001] text-[#740001] text-center font-serif rounded text-sm animate-bounce">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#5c4033] mb-1 font-bold">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-transparent border-b-2 border-[#5c4033]/30 focus:border-[#d4af37] px-2 py-2 font-serif text-xl text-[#2c1810] outline-none transition-colors placeholder-[#2c1810]/30"
                placeholder="sehrgar@memor.uz"
                required
              />
            </div>

            <div className="group">
              <label className="block text-xs uppercase tracking-widest text-[#5c4033] mb-1 font-bold">Maxfiy So'z</label>
              <div className="relative">
                <input
                  type="password"
                  value={formData.password}
                  onChange={e => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-transparent border-b-2 border-[#5c4033]/30 focus:border-[#d4af37] px-2 py-2 font-serif text-xl text-[#2c1810] outline-none transition-colors placeholder-[#2c1810]/30"
                  placeholder="••••••"
                  required
                />
                <Key className="absolute right-2 top-2 text-[#5c4033]/50" size={16} />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSearching}
              className="w-full mt-6 bg-[#2c1810] text-[#d4af37] py-3 rounded border border-[#d4af37] font-cinzel font-bold tracking-widest hover:bg-[#1a110e] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_#d4af37] disabled:opacity-50"
            >
              <Wand2 size={20} className={isSearching ? "animate-spin" : ""} />
              {isSearching ? "Ochilmoqda..." : "Alohomora"}
            </button>
          </form>

          {/* Decorative Corners */}
          <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-sepia"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-sepia"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-sepia"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-sepia"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;