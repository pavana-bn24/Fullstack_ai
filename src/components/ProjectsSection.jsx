import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function ProjectsSection() {
  const { t } = useLanguage();
  const sectionRef = useRef(null);
  const bigProjectRef = useRef(null);
  const smallProjectsRef = useRef([]);
  const shapesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(bigProjectRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bigProjectRef.current,
          start: 'top 80%',
        },
      });

      gsap.from(smallProjectsRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bigProjectRef.current,
          start: 'top 75%',
        },
      });

      shapesRef.current.forEach((shapeEl, index) => {
        if (!shapeEl) return;
        gsap.fromTo(
          shapeEl,
          {
            clipPath: 'circle(0% at 100% 100%)',
            scale: 0.4,
            opacity: 0,
            transformOrigin: '100% 100%',
          },
          {
            clipPath: 'circle(150% at 100% 100%)',
            scale: 1,
            opacity: 0.7,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: smallProjectsRef.current[index],
              start: 'top 90%',
              end: 'center 45%',
              scrub: 1.5,
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section" id="build" ref={sectionRef}>
      <div className="eyebrow">{t('buildEyebrow')}</div>
      <TextReveal
        as="h2"
        className="h2"
        style={{ maxWidth: '820px' }}
        text={t('buildTitle')}
      />
      <TextReveal
        as="p"
        className="lead"
        text={t('buildSubhead')}
      />

      <div className="build">
        <article className="big-project" ref={bigProjectRef}>
          <TextReveal
            as="h3"
            text={t('bigProjectTitle')}
          />
          <TextReveal
            as="p"
            delay={0.2}
            text={t('bigProjectDesc')}
          />
        </article>

        <div className="project-grid">
          <article
            className="small-project"
            ref={(el) => (smallProjectsRef.current[0] = el)}
          >
            <div
              className="small-project-shape"
              ref={(el) => (shapesRef.current[0] = el)}
            />
            <TextReveal
              as="h3"
              text={t('smallProject1Title')}
            />
            <TextReveal
              as="p"
              delay={0.15}
              text={t('smallProject1Desc')}
            />
          </article>

          <article
            className="small-project"
            ref={(el) => (smallProjectsRef.current[1] = el)}
          >
            <div
              className="small-project-shape"
              ref={(el) => (shapesRef.current[1] = el)}
            />
            <TextReveal
              as="h3"
              text={t('smallProject2Title')}
            />
            <TextReveal
              as="p"
              delay={0.15}
              text={t('smallProject2Desc')}
            />
          </article>
        </div>
      </div>
    </section>
  );
}
