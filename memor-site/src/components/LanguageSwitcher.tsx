import React, { useState } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Language } from '../types';

interface LanguageSwitcherProps {
    currentLang: Language;
    className?: string;
    variant?: 'dropdown' | 'list';
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, className = '', variant = 'dropdown' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const handleLanguageChange = (newLang: Language) => {
        setIsOpen(false);
        if (newLang === currentLang) return;

        // Replace the language segment in the URL
        const pathSegments = location.pathname.split('/').filter(Boolean);
        if (pathSegments.length > 0 && ['uz', 'en', 'ru', 'tr'].includes(pathSegments[0])) {
            pathSegments[0] = newLang;
        } else {
            // Fallback if URL structure doesn't match expected pattern
            pathSegments.unshift(newLang);
        }

        const newPath = `/${pathSegments.join('/')}`;
        navigate(newPath);
    };

    if (variant === 'list') {
        return (
            <div className={`flex items-center gap-2 ${className}`}>
                {(['uz', 'en', 'ru', 'tr'] as Language[]).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => handleLanguageChange(lang)}
                        className={`
                            text-[10px] uppercase font-bold tracking-widest px-2 py-1 transition-all
                            ${currentLang === lang
                                ? 'bg-sepia text-white rounded-sm'
                                : 'text-graphite/40 dark:text-white/40 hover:text-sepia dark:hover:text-sepia'}
                        `}
                    >
                        {lang}
                    </button>
                ))}
            </div>
        );
    }

    return (
        <div className={`relative ${className}`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.2em] px-3 py-1.5 rounded-full transition-all duration-300
                    ${isOpen
                        ? 'bg-sepia text-white shadow-md'
                        : 'text-graphite/60 dark:text-white/60 hover:text-sepia dark:hover:text-sepia hover:bg-sepia/5 dark:hover:bg-white/5'}
                `}
            >
                <span>{currentLang}</span>
                <svg
                    className={`w-3 h-3 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="absolute top-full right-0 mt-3 py-2 min-w-[120px] bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-graphite/5 dark:border-white/5 flex flex-col z-20 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-graphite/30 dark:text-white/30 border-b border-graphite/5 dark:border-white/5 mb-1">Select Language</div>
                        {(['uz', 'en', 'ru', 'tr'] as Language[]).map((lang) => (
                            <button
                                key={lang}
                                onClick={() => handleLanguageChange(lang)}
                                className={`
                                    text-[10px] uppercase font-bold tracking-widest px-4 py-2.5 text-left transition-all relative
                                    ${currentLang === lang
                                        ? 'text-sepia bg-sepia/5 pl-8'
                                        : 'text-graphite/60 dark:text-white/60 hover:text-sepia dark:hover:text-sepia hover:bg-graphite/5 dark:hover:bg-white/5'}
                                `}
                            >
                                {currentLang === lang && (
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-sepia"></span>
                                )}
                                {lang}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
