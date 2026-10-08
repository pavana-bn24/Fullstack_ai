import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OverviewSection() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef(null);

  const features = [
    {
      title: 'Real Projects',
      color: 'text-[#2563EB]',
      borderHover: 'hover:border-[#2563EB]/50',
      desc: "You'll learn by building. Not memorising text."
    },
    {
      title: 'Real Tools',
      color: 'text-[#059669]',
      borderHover: 'hover:border-[#059669]/50',
      desc: 'Not watching endless videos. Build with modern AI stacks.'
    },
    {
      title: 'Real Experience',
      color: 'text-[#2563EB]',
      borderHover: 'hover:border-[#2563EB]/50',
      desc: 'Every project becomes proof of your skills.'
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );

      gsap.fromTo(
        cardsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            toggleActions: 'restart none restart reset'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="overview" className="py-24 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        <div ref={headerRef} className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">Program Overview</span>
          <h2 className="font-jakarta text-3xl sm:text-5xl font-extrabold mt-2 mb-4">
            Introducing InstaSkills
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed">
            AI Full-stack Developer Program — A practical 100-day, project-driven program designed to help you become an AI-powered Full-stack Developer.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
          {features.map((item, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl bg-white/5 border border-white/10 ${item.borderHover} transition-all duration-300 hover:-translate-y-1.5 shadow-lg`}
            >
              <div className={`text-3xl font-jakarta font-bold ${item.color} mb-2`}>
                {item.title}
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
