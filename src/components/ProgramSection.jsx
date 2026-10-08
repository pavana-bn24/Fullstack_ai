import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProgramSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const artRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(artRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: artRef.current,
          start: 'top 80%',
        },
      });

      gsap.to(artRef.current, {
        backgroundPosition: 'center 40%',
        ease: 'none',
        scrollTrigger: {
          trigger: artRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="program" id="program" ref={sectionRef}>
      <div className="section">
        <div className="program-grid">
          <div>
            <div className="eyebrow">{t('programEyebrow')}</div>
            <TextReveal
              as="h2"
              className="h2"
              text={t('programTitle')}
            />
            <TextReveal
              as="p"
              className="lead"
              style={{ color: 'rgba(255, 255, 255, 0.79)', marginTop: '25px' }}
              delay={0.1}
              text={t('programSubhead')}
            />
            <TextReveal
              as="p"
              style={{ fontSize: '16px', lineHeight: '1.55', color: 'rgba(255, 255, 255, 0.72)', maxWidth: '480px' }}
              delay={0.2}
              text={t('pillar1Desc')}
            />
          </div>
          <div className="program-art" ref={artRef}>
            <div>
              <b>{t('pillar2Title')}</b>
              {t('pillar2Desc')}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
