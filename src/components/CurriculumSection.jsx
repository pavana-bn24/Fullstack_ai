import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CurriculumSection() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);

  const skills = [
    'AI-Assisted Development', 'Full-stack Development', 'AI Agents', 'Websites',
    'Mobile Apps', 'APIs & Integrations', 'Databases', 'Automation Workflows',
    'Prompt Engineering', 'AI Product Development', 'Portfolio Building', 'Career Readiness'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current?.children || [],
        { opacity: 0, y: 20, scale: 0.92 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.04,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="curriculum" className="py-20 bg-[#F1F5F9] px-4 md:px-8 border-t border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">Curriculum Scope</span>
          <h2 className="font-jakarta text-3xl sm:text-5xl font-extrabold text-[#0F172A] mt-1">
            What You'll Learn
          </h2>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {skills.map((skill, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#E2E8F0] flex items-center gap-3 shadow-sm hover:border-[#2563EB] hover:scale-105 active:scale-95 transition-all duration-200 cursor-default"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-[#2563EB] shrink-0" />
              <span className="text-sm font-bold text-[#0F172A]">{skill}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
