import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function ParadigmSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const badgesRef = useRef(null);
  const imageCardRef = useRef(null);

  const pillars = [
    'AI Agents', 'Business Automations', 'Websites', 'Mobile Apps',
    'SaaS Products', 'AI Wrappers', 'Internal Business Tools', 'Chatbots',
    'Voice AI', 'Customer Support Systems'
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const splitHeading = new SplitText(headingRef.current, { type: 'words, lines' });

      gsap.fromTo(
        splitHeading.words,
        { opacity: 0, y: 30, rotateX: -15 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.65,
          stagger: 0.03,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );

      gsap.fromTo(
        textRef.current?.children || [],
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: textRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );

      gsap.fromTo(
        badgesRef.current?.children || [],
        { opacity: 0, scale: 0.85, y: 15 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: badgesRef.current,
            start: 'top 90%',
            toggleActions: 'restart none restart reset'
          }
        }
      );

      gsap.fromTo(
        imageCardRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: imageCardRef.current,
            start: 'top 80%',
            toggleActions: 'restart none restart reset'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="py-24 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#E2E8F0]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-4">
            <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider block">The Paradigm Shift</span>
            <h2 ref={headingRef} className="font-jakarta text-3xl sm:text-5xl font-extrabold text-[#0F172A] leading-tight">
              The World Doesn't Need More Coders.{' '}
              <span className="text-[#2563EB]">It Needs AI Solution Builders.</span>
            </h2>
            <div ref={textRef} className="space-y-4">
              <p className="text-base md:text-lg text-[#334155] leading-relaxed">
                Businesses are rapidly adopting AI. Developers who only write code are being replaced by developers who know how to build intelligent solutions.
              </p>
              <p className="text-sm md:text-base text-[#334155] leading-relaxed">
                Traditional programming courses spend months teaching syntax. By the time many students graduate, technology has already changed. You need practical skills that prepare you for today's AI-first world.
              </p>
            </div>
          </div>

          <div ref={badgesRef} className="pt-2 flex flex-wrap gap-2">
            {pillars.map((item, idx) => (
              <span
                key={idx}
                className="px-3.5 py-1.5 rounded-full bg-white border border-[#E2E8F0] text-xs font-bold text-[#0F172A] shadow-sm hover:border-[#2563EB] hover:scale-105 active:scale-95 transition-all duration-200 cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <div
            ref={imageCardRef}
            className="rounded-3xl overflow-hidden border border-[#E2E8F0] shadow-2xl bg-white p-3 group hover:border-[#2563EB]/40 transition-colors"
          >
            <img
              src="/art_stipple.png"
              alt="Fine Stippled Halftone Line Art - Human and AI Agent"
              className="w-full h-auto object-cover rounded-2xl max-h-[500px] transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
