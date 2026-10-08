import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTASection({ onOpenWhatsApp, onOpenEarlyAccess, onOpenPreBooking, onOpenFreeResources }) {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const buttonsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(containerRef.current, {
        scale: 0.95,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(buttonsRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        delay: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="final" id="apply" ref={containerRef}>
      <div className="final-inner">
        <div className="eyebrow" style={{ color: '#f0cf87' }}>
          {t('finalEyebrow')}
        </div>
        <TextReveal
          as="h2"
          text={t('finalTitle')}
        />
        <TextReveal
          as="p"
          delay={0.15}
          text={t('finalSubhead')}
        />
        <div ref={buttonsRef} className="flex flex-wrap gap-3 items-center">
          <button
            onClick={onOpenFreeResources}
            className="btn btn-green-dark cursor-pointer !w-auto"
          >
            <span>{t('btn_free_resources')}</span>
          </button>
          
          <a 
            href="https://wa.me/919187951538?text=Hi%2C%20I%20am%20interested%20in%20the%20InstaSkills%20AI%20Full-stack%20Developer%20Program."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green-dark inline-flex items-center gap-2 !w-auto" 
            aria-label={t('whatsappDiscoveryCall')}
          >
            <WhatsAppIcon className="w-4 h-4 text-[#25D366] fill-current" />
            <span>{t('whatsappDiscoveryCall')}</span>
          </a>

          <a 
            href="https://chatgpt.com/g/g-69cb541e985c8191bf54e6ec8b34f9a6-quantum-weave-ai-employability-os?prompt=Help%20me%20know%20my%20skill%20gap"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-green-light !w-auto" 
          >
            <span>{t('btn_find_skill_gap')}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
