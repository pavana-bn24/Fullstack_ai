import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import differenceArt from '../assets/images/difference-art.jpg';
import { useLanguage } from '../context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export default function DifferenceSection() {
  const { t } = useLanguage();
  const containerRef = useRef(null);
  const eyebrowRef = useRef(null);
  const titleRef = useRef(null);
  const leadRef = useRef(null);
  const oldWayRef = useRef(null);
  const oldTitleRef = useRef(null);
  const oldListRef = useRef(null);
  const newWayRef = useRef(null);
  const newTitleRef = useRef(null);
  const newListRef = useRef(null);
  const proofTagRef = useRef(null);
  const orbitRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([eyebrowRef.current, titleRef.current, leadRef.current], {
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

      gsap.from(oldWayRef.current, {
        y: 60,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: oldWayRef.current,
          start: 'top 80%',
        },
      });

      gsap.from([oldTitleRef.current, ...Array.from(oldListRef.current?.children || [])], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: oldWayRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(newWayRef.current, {
        y: 60,
        scale: 0.96,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: newWayRef.current,
          start: 'top 80%',
        },
      });

      gsap.from([newTitleRef.current, ...Array.from(newListRef.current?.children || [])], {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.06,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: newWayRef.current,
          start: 'top 75%',
        },
      });

      gsap.from(proofTagRef.current, {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        delay: 0.5,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: newWayRef.current,
          start: 'top 75%',
        },
      });

      gsap.to(orbitRef.current, {
        rotation: 360,
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1.5,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section difference motion-stage" id="difference" ref={containerRef}>
      <img
        ref={orbitRef}
        className="motion-object orbit"
        src={differenceArt}
        alt="AI circuit board"
      />

      <div className="difference-intro">
        <div>
          <div className="eyebrow" ref={eyebrowRef}>{t('diffEyebrow')}</div>
          <h2 className="h2" ref={titleRef}>
            {t('diffTitle')}
          </h2>
        </div>
        <p className="lead" ref={leadRef}>
          {t('diffSubhead')}
        </p>
      </div>

      <div className="compare">
        <div className="old-way" ref={oldWayRef}>
          <span className="compare-label">{t('oldWayLabel')}</span>
          <h3 ref={oldTitleRef}>{t('oldWayTitle')}</h3>
          <ul ref={oldListRef}>
            <li>{t('oldWayItem1')}</li>
            <li>{t('oldWayItem2')}</li>
            <li>{t('oldWayItem3')}</li>
            <li>{t('oldWayItem4')}</li>
          </ul>
        </div>

        <div className="new-way" ref={newWayRef}>
          <span className="compare-label">{t('newWayLabel')}</span>
          <h3 ref={newTitleRef}>{t('newWayTitle')}</h3>
          <ul ref={newListRef}>
            <li>{t('newWayItem1')}</li>
            <li>{t('newWayItem2')}</li>
            <li>{t('newWayItem3')}</li>
            <li>{t('newWayItem4')}</li>
          </ul>
          <div className="proof-tag" ref={proofTagRef}>
            {t('proofTag')}
          </div>
        </div>
      </div>
    </section>
  );
}
