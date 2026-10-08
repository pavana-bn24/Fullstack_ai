import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProblemOpportunitySection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const opportunityRef = useRef(null);
  const shapeRef = useRef(null);
  const skillsRef = useRef([]);

  const skillKeys = [
    'skillAiAgents',
    'skillBusinessAutomations',
    'skillWebsites',
    'skillMobileApps',
    'skillSaasProducts',
    'skillAiWrappers',
    'skillInternalTools',
    'skillChatbots',
    'skillVoiceAi',
    'skillCustomerSupport',
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        shapeRef.current,
        {
          clipPath: 'circle(0% at 65% 100%)',
          scale: 0.4,
          opacity: 0,
          transformOrigin: '65% 100%',
        },
        {
          clipPath: 'circle(150% at 65% 100%)',
          scale: 1,
          opacity: 0.85,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: opportunityRef.current,
            start: 'top 95%',
            end: 'center 45%',
            scrub: 1.5,
          },
        }
      );

      gsap.from(skillsRef.current, {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: opportunityRef.current,
          start: 'top 75%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" ref={containerRef}>
      <div className="problem">
        <div>
          <div className="eyebrow">{t('shiftEyebrow')}</div>
          <TextReveal
            as="h2"
            className="h2"
            text={t('shiftTitle')}
          />
        </div>
        <div>
          <TextReveal
            as="p"
            className="lead"
            text={t('shiftPara1')}
          />
          <TextReveal
            as="p"
            className="lead"
            style={{ fontSize: '15px', marginTop: '18px' }}
            delay={0.15}
            text={t('shiftPara2')}
          />
        </div>
      </div>

      <div className="opportunity" id="opportunity" ref={opportunityRef}>
        <div className="opportunity-shape" ref={shapeRef} />

        <div>
          <div className="eyebrow">{t('oppEyebrow')}</div>
          <TextReveal
            as="h2"
            className="h2"
            style={{ fontSize: 'clamp(38px,4.2vw,62px)' }}
            text={t('oppTitle')}
          />
        </div>
        <div className="skill-list">
          {skillKeys.map((key, index) => (
            <div
              key={index}
              className="skill"
              ref={(el) => (skillsRef.current[index] = el)}
            >
              {t(key)}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
