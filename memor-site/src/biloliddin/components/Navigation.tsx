import React, { useState } from 'react';
import { PageView } from '../types';

interface NavigationProps {
  activePage: PageView;
  onNavigate: (page: PageView) => void;
}

import { Link } from 'react-router-dom';
import { personalInfo } from '../data/localDb';

const Navigation: React.FC<NavigationProps> = ({ activePage, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks: { name: string; value: PageView | string; path: string; external?: boolean }[] = [
    { name: 'Me\'mor', value: 'memor', path: 'https://memor.uz', external: true },
    { name: 'Blog', value: 'blog', path: '/biloliddin/blog' },
    { name: 'Loyihalar', value: 'projects', path: '/biloliddin/projects' },
    { name: 'Haqimda', value: 'about', path: '/biloliddin/about' },
    { name: 'Aloqa', value: 'contact', path: '/biloliddin/contact' },
  ];

  const handleNavClick = (value: PageView | string) => {
    // onNavigate(value as PageView); // No longer needed for navigation updates, but keeping if parent needs state sync? 
    // Actually, parent 'App' passes 'handleNavigate' which does 'navigate()'. 
    // But since we use Link, we might not need to call onNavigate, 
    // EXCEPT that the parent component passes `activePage` based on location.

    // Changing strategy: Use Link directly.
    setIsOpen(false);
    window.scrollTo(0, 0);
  };

  const isLinkActive = (value: string) => {
    if (typeof activePage === 'string') return activePage === value;
    return false;
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/biloliddin" className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => setIsOpen(false)}>
            <span className="font-serif text-2xl font-bold tracking-tight text-deep-teal">
              Biloliddin<span className="text-sepia">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={link.value === 'memor'
                    ? "font-serif text-sm tracking-widest uppercase border border-sepia px-4 py-1 text-deep-teal hover:bg-sepia/10 flex items-center gap-2 group transition-all"
                    : "text-sm font-sans tracking-wide uppercase border-b pb-1 transition-colors text-graphite border-transparent hover:text-deep-teal hover:border-sepia/50"
                  }
                >
                  {link.value === 'memor' && <span className="text-sepia group-hover:rotate-180 transition-transform duration-500">❖</span>}
                  {link.name}
                  {link.value === 'memor' && <span className="text-sepia group-hover:-rotate-180 transition-transform duration-500">❖</span>}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-sans tracking-wide uppercase border-b pb-1 transition-colors ${isLinkActive(link.value as string)
                    ? 'text-deep-teal border-sepia font-medium'
                    : 'text-graphite border-transparent hover:text-deep-teal hover:border-sepia/50'
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-deep-teal hover:text-sepia focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-parchment border-b border-sepia/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-left px-3 py-4 rounded-md text-base font-serif text-graphite hover:bg-sepia/10"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block w-full text-left px-3 py-4 rounded-md text-base font-serif hover:bg-sepia/10 ${isLinkActive(link.value as string) ? 'text-deep-teal font-bold bg-sepia/5' : 'text-graphite'
                    }`}
                >
                  {link.name}
                </Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;