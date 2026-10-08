import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function FeaturedVideoSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const videoWrapperRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(videoWrapperRef.current, {
        scale: 0.96,
        y: 20,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="shell" id="video-showcase" ref={containerRef} style={{ paddingTop: '16px', paddingBottom: '16px' }}>
      <div className="bg-[#172e24] text-white rounded-[20px] md:rounded-[28px] p-4 sm:p-6 md:p-8 relative overflow-hidden shadow-xl border border-[rgba(229,200,111,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#234d3b]/50 via-[#172e24] to-[#0f1f18] pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center mb-4 md:mb-6">
          <div className="eyebrow inline-block mb-1" style={{ color: '#f0cf87', letterSpacing: '0.08em' }}>
            {t('videoEyebrow')}
          </div>
          <TextReveal
            as="h2"
            className="h2 text-white text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-2"
            text={t('videoTitle')}
          />
          <TextReveal
            as="p"
            className="lead text-[#d3ded0] text-xs sm:text-sm md:text-base max-w-xl mx-auto"
            delay={0.1}
            text={t('videoSubhead')}
          />
        </div>

        <div
          ref={videoWrapperRef}
          className="relative z-10 max-w-3xl mx-auto rounded-xl md:rounded-2xl overflow-hidden bg-black/40 border border-[#e5c86f]/30 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.6)]"
        >
          <div className="relative w-full pb-[56.25%] h-0">
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-xl md:rounded-2xl"
              src="https://www.youtube.com/embed/j7M7keEEXmA?rel=0&modestbranding=1"
              title="InstaSkills AI Full-Stack Developer Program Showcase"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </section>
  );
}
