
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';
import { Lock, Fingerprint, ArrowLeft } from 'lucide-react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/');
    } else {
      setError('Identity verification failed.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 relative">
      <Link 
        to="/" 
        className="absolute top-4 left-4 md:top-8 md:left-8 flex items-center gap-2 text-white/40 hover:text-white transition-colors font-typewriter text-xs uppercase tracking-widest"
      >
          <ArrowLeft size={16} /> {t("Back to Home")}
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        className="relative w-full max-w-md bg-kraft p-8 md:p-12 shadow-deep"
        style={{
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIi8+CjxyZWN0IHdpZHRoPSI0IiBoZWlnaHQ9IjQiIGZpbGw9IiMwMDAiIG9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')",
            borderRadius: '4px'
        }}
      >
        {/* Envelope Flap Effect (Visual) */}
        <div className="absolute top-0 left-0 w-full h-4 bg-kraft-shadow opacity-20" />
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-16 h-16 bg-red-800 rounded-full opacity-20 blur-xl" />
        
        <div className="text-center mb-8 border-b-2 border-ink/10 pb-6">
          <div className="mx-auto bg-ink text-kraft w-12 h-12 flex items-center justify-center rounded-full mb-4">
            <Fingerprint size={24} />
          </div>
          <h2 className="font-serif text-3xl text-ink font-bold">{t("Identity")}</h2>
          <p className="font-typewriter text-sm text-ink/60 mt-2">Creator Access Only</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/50 mb-1">{t("Username")}</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-kraft-light border-b-2 border-ink/20 focus:border-ink outline-none px-3 py-2 font-typewriter text-ink placeholder-ink/30 transition-colors"
              placeholder="Ex: Biloliddin"
            />
          </div>
          
          <div>
            <label className="block font-typewriter text-xs uppercase tracking-widest text-ink/50 mb-1">{t("Access Code")}</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-kraft-light border-b-2 border-ink/20 focus:border-ink outline-none px-3 py-2 font-typewriter text-ink placeholder-ink/30 transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="text-red-800 font-typewriter text-xs bg-red-100 p-2 border border-red-800/20 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-ink text-white font-serif text-lg py-3 hover:bg-ink-light transition-colors shadow-lg mt-4"
          >
            {t("Login")}
          </button>
        </form>
        
        {/* Stamp Effect */}
        <div className="absolute -bottom-6 -right-6 w-24 h-24 border-4 border-ink/20 rounded-full flex items-center justify-center rotate-[-15deg] pointer-events-none">
            <span className="font-typewriter text-ink/20 text-xs font-bold uppercase">Me'mor<br/>Official</span>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
