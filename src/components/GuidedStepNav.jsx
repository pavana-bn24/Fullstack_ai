import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GuidedStepNav({ lenisRef }) {
  const [activeSection, setActiveSection] = useState('');

  const steps = [
    { id: 'problem', label: 'Paradigm' },
    { id: 'overview', label: 'Overview' },
    { id: 'build', label: 'Build Matrix' },
    { id: 'difference', label: 'Methodology' },
    { id: 'audience', label: 'Audience' },
    { id: 'transformation', label: 'Transformation' },
    { id: 'curriculum', label: 'Curriculum' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      steps.forEach(step => {
        ScrollTrigger.create({
          trigger: `#${step.id}`,
          start: 'top 50%',
          end: 'bottom 50%',
          onEnter: () => setActiveSection(step.id),
          onEnterBack: () => setActiveSection(step.id)
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      if (lenisRef?.current) {
        lenisRef.current.scrollTo(target, { duration: 1.2 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <aside className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col gap-3 p-3 rounded-2xl haven-nav shadow-2xl backdrop-blur-xl border border-white/60">
      <div className="text-[10px] font-extrabold tracking-widest text-[#2563EB] uppercase px-1 pb-1 border-b border-[#E2E8F0]/60">
        GUIDE
      </div>
      {steps.map((step, idx) => {
        const isActive = activeSection === step.id;
        return (
          <button
            key={step.id}
            onClick={() => scrollToSection(step.id)}
            className="flex items-center gap-2.5 group text-left focus:outline-none cursor-pointer"
            aria-label={`Scroll to ${step.label}`}
          >
            <span
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                isActive
                  ? 'bg-[#2563EB] scale-125 shadow-[0_0_8px_rgba(37,99,235,0.8)]'
                  : 'bg-[#CBD5E1] group-hover:bg-[#475569]'
              }`}
            />
            <span
              className={`text-xs font-bold transition-all duration-200 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 ${
                isActive ? 'text-[#2563EB] opacity-100 translate-x-0' : 'text-[#475569]'
              }`}
            >
              0{idx + 1} {step.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
