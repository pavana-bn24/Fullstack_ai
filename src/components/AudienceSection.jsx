import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function AudienceSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const artRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const pillsRef = useRef([]);

  const audienceKeys = [
    'audStudents',
    'audFreshGrads',
    'audJobSeekers',
    'audCareerSwitchers',
    'audFreelancers',
    'audEntrepreneurs',
    'audProfessionals',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(artRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      gsap.from([eyebrowRef.current, titleRef.current], {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(pillsRef.current, {
        y: 20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.06,
        ease: 'back.out(1.5)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });

      gsap.from(leadRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leadRef.current,
          start: 'top 85%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={containerRef}>
      <div className="people">
        <div className="people-art" ref={artRef} />
        <div>
          <div className="eyebrow" ref={eyebrowRef}>{t('audienceEyebrow')}</div>
          <h2 className="h2" ref={titleRef} style={{ fontSize: 'clamp(41px, 4.7vw, 68px)' }}>
            {t('audienceTitle')}
          </h2>
          <div className="audience">
            {audienceKeys.map((key, i) => (
              <span
                key={i}
                ref={(el) => (pillsRef.current[i] = el)}
              >
                {t(key)}
              </span>
            ))}
          </div>
          <p className="lead" ref={leadRef} style={{ fontSize: '16px', marginTop: '28px' }}>
            {t('audienceSubhead')}
          </p>
        </div>
      </div>
    </section>
  );
}
