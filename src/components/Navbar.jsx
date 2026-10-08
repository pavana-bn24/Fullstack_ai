import React, { useState } from 'react';
import { Menu, X, PhoneCall } from 'lucide-react';

export default function Navbar({ onOpenWhatsApp }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '#problem', label: 'The Paradigm' },
    { href: '#build', label: "What You'll Build" },
    { href: '#difference', label: 'Method' },
    { href: '#curriculum', label: 'Curriculum' }
  ];

  return (
    <header className="relative z-30 w-full max-w-5xl mx-auto">
      <nav 
        aria-label="Main Navigation"
        className="haven-nav rounded-full px-6 py-3 flex items-center justify-between shadow-xl transition-all duration-300"
      >
        <a href="#" className="flex items-center gap-2.5 group focus:outline-none focus:ring-2 focus:ring-[#2563EB] rounded-full p-0.5">
          <div className="w-8 h-8 rounded-full bg-[#0F172A] text-white flex items-center justify-center font-jakarta font-bold text-sm shadow-md group-hover:bg-[#2563EB] transition-colors">
            I
          </div>
          <span className="font-jakarta text-xl font-extrabold tracking-tight text-[#0F172A]">
            Insta<span className="text-[#2563EB]">Skills</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-7 text-xs font-bold text-[#0F172A]/80">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#2563EB] transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenWhatsApp}
            className="px-4 py-2 rounded-full text-xs font-bold bg-[#0F172A] text-white hover:bg-[#2563EB] hover:scale-105 active:scale-95 transition-all duration-200 shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>WhatsApp Us</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full text-[#0F172A] hover:bg-[#F1F5F9] transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {mobileMenuOpen && (
        <div className="md:hidden mt-3 haven-nav rounded-2xl p-5 shadow-2xl flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-bold text-[#0F172A] hover:text-[#2563EB] py-1 border-b border-[#E2E8F0]/50"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
