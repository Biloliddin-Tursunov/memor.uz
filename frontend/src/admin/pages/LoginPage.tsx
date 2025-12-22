
import React, { useState } from 'react';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const { t } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      onLogin();
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full bg-bgMain flex items-center justify-center relative overflow-hidden font-serif p-4 transition-colors duration-300">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-[80px] md:blur-[120px]"></div>
      <div className="absolute bottom-[-20%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-500/10 rounded-full blur-[80px] md:blur-[120px]"></div>

      <div className="w-full max-w-md p-6 md:p-10 relative z-10 animate-fadeIn border border-borderDark bg-cardBg/90 backdrop-blur-md shadow-2xl rounded-2xl">
        <div className="flex flex-col items-center mb-8 md:mb-12">
          <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center text-white font-black text-2xl shadow-lg border-4 border-bgMain mb-4 font-caslon animate-pulse">
            M
          </div>
          <h1 className="text-3xl md:text-4xl font-caslon text-textMain tracking-tight">Me'mor Admin</h1>
          <p className="text-textMuted mt-2 font-serif italic text-sm text-center">{t('login_title')}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-textMuted uppercase tracking-wider ml-1 font-sans">{t('email_label')}</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-accent transition-colors">
                <Mail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-bgMain border border-borderDark p-3.5 pl-10 pr-4 text-textMain text-sm placeholder:text-textMuted/30 focus:outline-none focus:border-accent transition-all font-sans rounded-xl"
                placeholder="admin@memor.uz"
                
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-textMuted uppercase tracking-wider ml-1 font-sans">{t('password_label')}</label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-textMuted group-focus-within:text-accent transition-colors">
                <Lock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-bgMain border border-borderDark p-3.5 pl-10 pr-4 text-textMain text-sm placeholder:text-textMuted/30 focus:outline-none focus:border-accent transition-all font-sans rounded-xl"
                placeholder="••••••••"
                
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] md:text-xs font-sans">
            <label className="flex items-center gap-2 cursor-pointer text-textMuted hover:text-textMain">
              <input type="checkbox" className="rounded border-borderDark bg-bgMain text-accent focus:ring-offset-0 focus:ring-accent" />
              {t('remember_me')}
            </label>
            <a href="#" className="text-accent hover:underline font-bold uppercase tracking-widest">{t('forgot_password')}</a>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-accent hover:bg-accentHover text-white font-black py-4 shadow-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] font-sans uppercase tracking-[0.2em] text-[10px] rounded-xl"
          >
            {loading ? t('loading') : t('login_button')}
            {!loading && <ArrowRight size={18} />}
          </button>
        </form>
        
        <p className="text-center text-[10px] text-textMuted mt-10 font-serif italic border-t border-borderDark pt-6 uppercase tracking-widest opacity-60">
           {t('login_footer')}
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
