import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Ornament } from '../components/Ornament';
import { supabase } from '../lib/supabase';
import { TRANSLATIONS } from '../constants';
import { Language } from '../types';
import SEO from '../components/SEO';

const Contact: React.FC = () => {
  const { lang } = useParams<{ lang: Language }>();
  const currentLang = (lang && ['uz', 'en', 'ru', 'tr'].includes(lang)) ? lang : 'uz';
  const t = TRANSLATIONS[currentLang];

  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    subject: 'Hamkorlik masalasida',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
            full_name: formData.fullName,
            phone_number: formData.phoneNumber,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setStatus('success');
      setFormData({
        fullName: '',
        phoneNumber: '',
        subject: 'Hamkorlik masalasida',
        message: ''
      });

      // Reset success status after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (err: any) {
      console.error('Submission error:', err);
      setStatus('error');
      setErrorMessage(err.message || 'Xatolik yuz berdi. Iltimos qaytadan urinib ko\'ring.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <SEO
        title={t.seoContactTitle}
        description={t.seoContactDesc}
        lang={currentLang}
      />
      <div className="flex flex-col md:flex-row gap-12">

        {/* Contact Info */}
        <div className="w-full md:w-1/3 space-y-8 border-r border-graphite/10 pr-8">
          <div>
            <h2 className="font-display text-3xl mb-4 text-graphite">{t.contact}</h2>
            <div className="w-12 h-px bg-teal mb-6"></div>
            <p className="font-serif italic text-graphite/70 mb-6">
              {currentLang === 'uz' ? 'Takliflar, hamkorlik yoki shunchaki bir piyola choy ustida suhbat uchun.' :
                currentLang === 'en' ? 'For suggestions, collaboration, or just a chat over a cup of tea.' :
                  currentLang === 'ru' ? 'Для предложений, сотрудничества или просто беседы за чашкой чая.' :
                    'Öneriler, işbirliği veya sadece bir fincan çay eşliğinde sohbet için.'}
            </p>
          </div>

          <div className="space-y-4 font-serif">
            <div>
              <span className="block text-xs uppercase tracking-widest text-teal mb-1">
                {currentLang === 'uz' ? 'Manzil' : currentLang === 'en' ? 'Address' : currentLang === 'ru' ? 'Адрес' : 'Adres'}
              </span>
              <p>Samarqand shahri, Lolazor ko'chasi, 70-uy</p>
              <p className="text-sm text-graphite/60">Samarqand Davlat Arxitektura-Qurilish Universiteti, Yangi Bino 5-qavat 525-xona</p>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-teal mb-1">
                {currentLang === 'uz' ? 'Xat yo\'llash' : currentLang === 'en' ? 'Email' : currentLang === 'ru' ? 'Электронная почта' : 'E-posta'}
              </span>
              <p>info@memor.uz</p>
            </div>

            <div>
              <span className="block text-xs uppercase tracking-widest text-teal mb-1">
                {currentLang === 'uz' ? 'Bog\'lanish' : currentLang === 'en' ? 'Phone' : currentLang === 'ru' ? 'Телефон' : 'Telefon'}
              </span>
              <p>+998 (88) 209-99-79</p>
            </div>
          </div>

          <div className="pt-8">
            <Ornament type="corner" className="w-6 h-6" />
          </div>
        </div>

        {/* Form */}
        <div className="w-full md:w-2/3">
          <div className="bg-white p-8 border border-graphite/10 shadow-sm relative">
            <Ornament type="corner" className="absolute top-2 right-2 w-4 h-4 rotate-90 opacity-40" />

            <h3 className="font-display text-2xl mb-6">
              {currentLang === 'uz' ? 'Maktub Yozish' : currentLang === 'en' ? 'Write a Message' : currentLang === 'ru' ? 'Написать Сообщение' : 'Bir Mesaj Yazın'}
            </h3>

            {status === 'success' && (
              <div className="mb-6 p-4 bg-teal/10 border border-teal text-teal font-serif animate-fade-in">
                {currentLang === 'uz' ? 'Maktubingiz muvaffaqiyatli yuborildi! Tez orada javob beramiz.' :
                  currentLang === 'en' ? 'Your message has been sent successfully! We will get back to you soon.' :
                    currentLang === 'ru' ? 'Ваше сообщение успешно отправлено! Мы скоро ответим.' :
                      'Mesajınız başarıyla gönderildi! Yakında size döneceğiz.'}
              </div>
            )}

            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 font-serif">
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-graphite/60">
                    {currentLang === 'uz' ? 'Ism Sharif' : currentLang === 'en' ? 'Full Name' : currentLang === 'ru' ? 'ФИО' : 'Ad Soyad'}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-parchment border-b border-graphite/20 p-2 focus:border-teal focus:outline-none transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-graphite/60">
                    {currentLang === 'uz' ? 'Aloqa Raqami' : currentLang === 'en' ? 'Phone Number' : currentLang === 'ru' ? 'Номер телефона' : 'Telefon Numarası'}
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full bg-parchment border-b border-graphite/20 p-2 focus:border-teal focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-graphite/60">
                  {currentLang === 'uz' ? 'Mavzu' : currentLang === 'en' ? 'Subject' : currentLang === 'ru' ? 'Тема' : 'Konu'}
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full bg-parchment border-b border-graphite/20 p-2 focus:border-teal focus:outline-none transition-colors font-serif"
                >
                  <option value="Hamkorlik masalasida">{currentLang === 'uz' ? 'Hamkorlik masalasida' : currentLang === 'en' ? 'Regarding Collaboration' : currentLang === 'ru' ? 'По вопросам сотрудничества' : 'İşbirliği hakkında'}</option>
                  <option value="Texnik yordam">{currentLang === 'uz' ? 'Texnik yordam' : currentLang === 'en' ? 'Technical Support' : currentLang === 'ru' ? 'Техническая поддержка' : 'Teknik Destek'}</option>
                  <option value="Maqola yuborish">{currentLang === 'uz' ? 'Maqola yuborish' : currentLang === 'en' ? 'Submit an Article' : currentLang === 'ru' ? 'Отправить статью' : 'Makale Gönder'}</option>
                  <option value="Boshqa">{currentLang === 'uz' ? 'Boshqa' : currentLang === 'en' ? 'Other' : currentLang === 'ru' ? 'Другое' : 'Diğer'}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-graphite/60">
                  {currentLang === 'uz' ? 'Maktub Mazmuni' : currentLang === 'en' ? 'Message Content' : currentLang === 'ru' ? 'Содержание сообщения' : 'Mesaj İçeriği'}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full bg-parchment border border-graphite/20 p-3 focus:border-teal focus:outline-none transition-colors font-serif resize-none"
                ></textarea>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className={`px-8 py-3 bg-graphite text-white font-display uppercase tracking-widest hover:bg-teal transition-colors ${status === 'loading' ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {status === 'loading' ? (currentLang === 'uz' ? 'Yuborilmoqda...' : 'Sending...') : (currentLang === 'uz' ? 'Yuborish' : currentLang === 'en' ? 'Send' : currentLang === 'ru' ? 'Отправить' : 'Gönder')}
                </button>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
