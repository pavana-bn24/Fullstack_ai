import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageToggle({ className = '' }) {
  const { lang, setLang } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 70) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className={`language-switcher fixed z-50 inline-flex items-center gap-1 p-1.5 rounded-full bg-[#172e24]/90 backdrop-blur-xl border border-white/25 shadow-[0_12px_35px_rgba(0,0,0,0.4)] transition-all duration-300 hover:scale-105 ${
        isScrolled ? 'top-4 sm:top-5 shadow-2xl scale-95' : 'top-20 sm:top-24 scale-100'
      } ${className}`}
      style={{
        right: 'max(24px, calc(50vw - 700px))',
      }}
      role="group"
      aria-label="Language Switcher"
    >
      <div className="pl-2 pr-1 text-[#f0cf87] flex items-center justify-center">
        <Globe className="w-3.5 h-3.5" />
      </div>

      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer ${
          lang === 'en'
            ? 'bg-[#234d3b] text-white shadow-md'
            : 'text-white/80 hover:text-white hover:bg-white/15'
        }`}
        aria-pressed={lang === 'en'}
      >
        EN
      </button>

      <button
        type="button"
        onClick={() => setLang('kn')}
        className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-300 cursor-pointer ${
          lang === 'kn'
            ? 'bg-[#234d3b] text-white shadow-md'
            : 'text-white/80 hover:text-white hover:bg-white/15'
        }`}
        aria-pressed={lang === 'kn'}
      >
        ಕನ್ನಡ
      </button>
    </div>
  );
}
