import React, { useState } from 'react';
import { personalInfo } from '../data/localDb';
import { supabase } from '../lib/supabase';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase
        .from('contact_messages')
        .insert([
          {
            full_name: formData.name,
            // phone_number left empty as it's not in this form
            subject: `[From Biloliddin] Hamkorlik yoki Aloqa`,
            message: `Email: ${formData.email}\n\n${formData.message}`,
            // Store email in the message content or a specific field if available, 
            // checking schema from main Contact.tsx: inputs are full_name, phone_number, subject, message.
            // Email is NOT in the insert query in main Contact.tsx! 
            // Main Contact.tsx inserts: full_name, phone_number, subject, message.
            // But wait, where is email stored? 
            // Looking at main Contact.tsx: email field is NOT in the insert call!
            // I should append email to the message body to be safe.
          }
        ]);

      // Correction: I should verify if there is an email column. 
      // Usage in main Contact.tsx check (Step 288): 
      // insert([{ full_name, phone_number, subject, message }])
      // It seems the main contact form DOES NOT SAVE EMAIL separately in the verified file content?
      // Wait, looking at Step 288, existing code:
      // `full_name: formData.fullName`
      // `phone_number: formData.phoneNumber`
      // `subject: formData.subject`
      // `message: formData.message`
      // Use `message` to store email as well for now: `E-mail: ${formData.email}\n\n${formData.message}`

      if (error) throw error;

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Xatolik yuz berdi. Qaytadan urinib ko\'ring.');
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#1F4E5F 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

          <div>
            <span className="text-sepia font-sans text-sm tracking-widest uppercase block mb-2">Aloqa</span>
            <h2 className="text-3xl font-serif text-deep-teal mb-6">Hamkorlik uchun ochiqman</h2>
            <p className="text-lg text-graphite/80 font-sans mb-10 leading-relaxed">
              Agar sizda biror g'oya bo'lsa yoki shunchaki arxitektura va shaharsozlik haqida suhbatlashmoqchi bo'lsangiz, men bilan bog'laning.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4 group">
                <span className="text-2xl mt-1 grayscale group-hover:grayscale-0 transition-all">📧</span>
                <div>
                  <p className="text-xs text-sepia font-sans uppercase tracking-widest mb-1">Elektron Pochta</p>
                  <a href={`mailto:${personalInfo.email}`} className="text-lg font-serif text-deep-teal hover:text-sepia transition-colors border-b border-transparent hover:border-sepia">
                    {personalInfo.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-4 group">
                <span className="text-2xl mt-1 grayscale group-hover:grayscale-0 transition-all">📍</span>
                <div>
                  <p className="text-xs text-sepia font-sans uppercase tracking-widest mb-1">Manzil</p>
                  <p className="text-lg font-serif text-deep-teal">
                    {personalInfo.location}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-parchment p-8 md:p-10 border border-sepia/20 shadow-xl relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-deep-teal"></div>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-teal/10 border border-teal text-teal font-sans text-sm animate-fade-in">
                Xabaringiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 font-sans text-sm animate-fade-in">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-xs font-sans font-bold text-deep-teal uppercase tracking-wider mb-2">Ismingiz</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal transition-all placeholder-gray-400 font-serif"
                  placeholder="Ism Sharifingiz"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs font-sans font-bold text-deep-teal uppercase tracking-wider mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal transition-all placeholder-gray-400 font-serif"
                  placeholder="name@company.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs font-sans font-bold text-deep-teal uppercase tracking-wider mb-2">Xabar</label>
                <textarea
                  id="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full bg-white border border-gray-300 px-4 py-3 focus:outline-none focus:border-deep-teal focus:ring-1 focus:ring-deep-teal transition-all placeholder-gray-400 font-serif resize-none"
                  placeholder="Loyihangiz haqida qisqacha..."
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full py-4 px-6 bg-deep-teal text-white font-sans text-sm uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-md ${status === 'loading' ? 'opacity-70 cursor-wait' : ''}`}
              >
                {status === 'loading' ? 'Yuborilmoqda...' : 'Xabarni Yuborish'}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;