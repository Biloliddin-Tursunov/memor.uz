import React from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Language } from '../types';

interface LanguageSwitcherProps {
    currentLang: Language;
    className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ currentLang, className = '' }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const params = useParams();

    const handleLanguageChange = (newLang: Language) => {
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
};
