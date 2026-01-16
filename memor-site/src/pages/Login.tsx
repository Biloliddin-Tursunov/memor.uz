import React, { useState } from 'react';
import { Ornament } from '../components/Ornament';

const Login: React.FC = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="max-w-xl mx-auto px-4 py-20">
      
      <div className="bg-parchment relative p-8 md:p-12">
        {/* Notebook lines background effect via CSS gradients would go here, doing simple borders for now */}
        
        <div className="text-center mb-10">
          <Ornament type="flourish" className="w-8 h-8 mb-4 opacity-50" />
          <h2 className="font-display text-3xl text-graphite">
            {isRegister ? 'Yangi Sahifa Ochish' : 'Qaydnomaga Kirish'}
          </h2>
          <p className="font-serif italic text-sm text-graphite/60 mt-2">
            {isRegister ? 'Ism va maqsadingizni bitik qiling.' : 'O\'z muhr-imzongizni tasdiqlang.'}
          </p>
        </div>

        <form className="space-y-8 font-serif">
          {isRegister && (
            <div className="relative">
              <input 
                type="text" 
                id="name"
                className="peer w-full bg-transparent border-b border-graphite/30 py-2 text-graphite focus:outline-none focus:border-teal placeholder-transparent"
                placeholder="Ismingiz"
              />
              <label 
                htmlFor="name" 
                className="absolute left-0 -top-3.5 text-xs text-graphite/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-graphite/40 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal"
              >
                To'liq Ismingiz (Usta/Shogird)
              </label>
            </div>
          )}

          <div className="relative">
            <input 
              type="email" 
              id="email"
              className="peer w-full bg-transparent border-b border-graphite/30 py-2 text-graphite focus:outline-none focus:border-teal placeholder-transparent"
              placeholder="Email"
            />
             <label 
                htmlFor="email" 
                className="absolute left-0 -top-3.5 text-xs text-graphite/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-graphite/40 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal"
              >
                Elektron Manzil
              </label>
          </div>

          <div className="relative">
            <input 
              type="password" 
              id="password"
              className="peer w-full bg-transparent border-b border-graphite/30 py-2 text-graphite focus:outline-none focus:border-teal placeholder-transparent"
              placeholder="Parol"
            />
            <label 
                htmlFor="password" 
                className="absolute left-0 -top-3.5 text-xs text-graphite/60 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-graphite/40 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-teal"
              >
                Maxfiy Kalit
              </label>
          </div>

          <div className="pt-8 text-center">
            <button 
              type="button"
              className="px-8 py-3 bg-graphite text-parchment font-display tracking-widest uppercase text-sm hover:bg-teal transition-colors"
            >
              {isRegister ? 'Tasdiqlash' : 'Kirish'}
            </button>
          </div>
        </form>

        <div className="mt-12 text-center text-sm font-serif">
          <p className="text-graphite/60">
            {isRegister ? "Avval ro'yxatdan o'tganmisiz?" : "Hali a'zo emasmisiz?"}
            <button 
              onClick={() => setIsRegister(!isRegister)}
              className="ml-2 text-teal underline hover:text-sepia-dark decoration-1 underline-offset-2"
            >
               {isRegister ? "Kirish" : "Ro'yxatdan o'tish"}
            </button>
          </p>
        </div>

      </div>
    </div>
  );
};

export default Login;
