import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import programArt from '../assets/images/program-art.jpg';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function TransformationSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const phoneRef = useRef(null);
  const beforeRef = useRef(null);
  const beforeTitleRef = useRef(null);
  const beforeListRef = useRef(null);
  const afterRef = useRef(null);
  const afterTitleRef = useRef(null);
  const afterListRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([beforeRef.current, afterRef.current], {
        y: 55,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });

      gsap.from([beforeTitleRef.current, ...Array.from(beforeListRef.current?.children || [])], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: beforeRef.current,
          start: 'top 75%',
        },
      });

      gsap.from([afterTitleRef.current, ...Array.from(afterListRef.current?.children || [])], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: afterRef.current,
          start: 'top 75%',
        },
      });

      gsap.to(phoneRef.current, {
        rotation: 18,
        y: -40,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.2,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="transform motion-stage" id="transformation" ref={containerRef}>
      <img
        ref={phoneRef}
        className="motion-object phone"
        src={programArt}
        alt="Mobile application screen"
      />

      <div className="eyebrow">{t('transEyebrow')}</div>

      <div className="transform-top">
        <TextReveal
          as="h2"
          className="h2"
          text={t('transTitle')}
        />
        <TextReveal
          as="p"
          className="lead"
          delay={0.15}
          text={t('transSubhead')}
        />
      </div>

      <div className="trans-grid">
        <article className="trans before" ref={beforeRef}>
          <span className="compare-label">{t('day1Label')}</span>
          <h3 ref={beforeTitleRef}>{t('day1Title')}</h3>
          <ul ref={beforeListRef}>
            <li>{t('day1Item1')}</li>
            <li>{t('day1Item2')}</li>
            <li>{t('day1Item3')}</li>
          </ul>
        </article>

        <article className="trans after" ref={afterRef}>
          <span className="compare-label">{t('day100Label')}</span>
          <h3 ref={afterTitleRef}>{t('day100Title')}</h3>
          <ul ref={afterListRef}>
            <li>{t('day100Item1')}</li>
            <li>{t('day100Item2')}</li>
            <li>{t('day100Item3')}</li>
            <li>{t('day100Item4')}</li>
          </ul>
        </article>
      </div>
    </section>
  );
}
