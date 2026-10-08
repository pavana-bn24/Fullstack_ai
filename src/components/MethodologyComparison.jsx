import React, { useEffect, useRef } from 'react';
import { Zap, XCircle, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MethodologyComparison() {
  const sectionRef = useRef(null);
  const rowsRef = useRef(null);

  const comparisonRows = [
    { trad: 'Theory First', insta: 'Build First' },
    { trad: 'Learn Syntax', insta: 'Build Products' },
    { trad: 'Individual Tools', insta: 'Complete AI Solutions' },
    { trad: 'Generic Projects', insta: 'Real Business Projects' },
    { trad: 'Certificates', insta: 'Live Verifiable Portfolio' },
    { trad: 'Watching Videos', insta: 'Building Daily' },
    { trad: 'Coding Alone', insta: 'AI-Assisted Development' }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rowsRef.current?.children || [],
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: rowsRef.current,
            start: 'top 85%',
            toggleActions: 'restart none restart reset'
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="difference" className="py-28 md:py-36 px-4 md:px-8 max-w-7xl mx-auto border-t border-[#E2E8F0]">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[#2563EB] text-xs font-bold uppercase tracking-wider">Methodology Comparison</span>
        <h2 className="font-jakarta text-3xl sm:text-5xl font-extrabold text-[#0F172A] mt-1 mb-3">
          Learn Like a Builder. <span className="text-[#2563EB]">Not Like a Student.</span>
        </h2>
        <p className="text-base text-[#334155]">
          What makes InstaSkills different from traditional programming courses.
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-[#E2E8F0] shadow-xl overflow-hidden">
        <div className="grid grid-cols-12 bg-[#F8FAFC] p-6 border-b border-[#E2E8F0] font-jakarta text-base font-bold">
          <div className="col-span-5 text-[#475569]">Traditional Courses</div>
          <div className="col-span-7 text-[#2563EB] flex items-center gap-2">
            <Zap className="w-4 h-4 text-[#2563EB]" /> InstaSkills Program
          </div>
        </div>

        <div ref={rowsRef} className="divide-y divide-[#E2E8F0]">
          {comparisonRows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-5 text-base items-center hover:bg-[#FAF9F5] transition-colors duration-200">
              <div className="col-span-5 text-[#475569] flex items-center gap-2.5">
                <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                <span>{row.trad}</span>
              </div>
              <div className="col-span-7 font-bold text-[#0F172A] flex items-center gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />
                <span className="text-[#2563EB]">{row.insta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
