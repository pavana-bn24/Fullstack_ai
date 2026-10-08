import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TextReveal from './TextReveal';
import { useLanguage } from '../context/LanguageContext';
import WhatsAppIcon from './WhatsAppIcon';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection({ onOpenWhatsApp, onOpenEarlyAccess, onOpenPreBooking, onOpenFreeResources }) {
  const { t } = useLanguage();
  const heroRef = useRef(null);
  const noteRef = useRef(null);
  const f1Ref = useRef(null);
  const f2Ref = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.from(heroRef.current, { scale: 0.98, opacity: 0, duration: 1 })
        .from(navRef.current, { y: -20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(f1Ref.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.4')
        .from(f2Ref.current, { y: 20, opacity: 0, duration: 0.8 }, '-=0.6')
        .from(noteRef.current, { y: 20, opacity: 0, duration: 0.7 }, '-=0.4');

      gsap.to(f1Ref.current, {
        y: -6,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      gsap.to(f2Ref.current, {
        y: -4,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="shell">
      <header className="hero" ref={heroRef}>
        <nav className="nav" ref={navRef}>
          <div className="logo font-manrope">InstaSkills</div>
          <div className="links font-manrope">
            <a href="#opportunity">{t('navOpportunity')}</a>
            <a href="#program">{t('navProgram')}</a>
            <a href="#build">{t('navProjects')}</a>
            <a href="#apply">{t('navApply')}</a>
          </div>
          <div className="flex items-center gap-2.5">
            <button
              onClick={onOpenPreBooking}
              className="btn btn-maroon font-extrabold px-4 py-2.5 text-xs sm:text-sm shadow-md cursor-pointer"
            >
              {t('signUp')}
            </button>
            <a
              href="https://wa.me/919187951538?text=Hi%2C%20I%20am%20interested%20in%20the%20InstaSkills%20AI%20Full-stack%20Developer%20Program."
              target="_blank"
              rel="noopener noreferrer"
              className="btn inline-flex items-center gap-2"
              aria-label={t('whatsappUs')}
            >
              <WhatsAppIcon className="w-4 h-4 text-[#25D366] fill-current" />
              <span className="hidden sm:inline">{t('whatsappUs')}</span>
            </a>
          </div>
        </nav>

        <div className="hero-copy">
          <TextReveal
            as="h1"
            className="font-manrope"
            text={t('heroTitle')}
          />
          <div className="hero-note font-manrope" ref={noteRef}>
            {t('heroSubhead')}
            <div className="hero-note-actions">
              <button
                onClick={onOpenFreeResources}
                className="btn btn-green-dark cursor-pointer"
              >
                <span>{t('btn_free_resources')}</span>
              </button>
              <a
                href="https://chatgpt.com/g/g-69cb541e985c8191bf54e6ec8b34f9a6-quantum-weave-ai-employability-os?prompt=Help%20me%20know%20my%20skill%20gap"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green-light"
              >
                <span>{t('btn_find_skill_gap')}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-sculpture" aria-hidden="true" />
          <div className="hero-badges">
        <div className="float f1" ref={f1Ref}>
          <b>{t('heroBadge1Title')}</b>
          <span>{t('heroBadge1Desc')}</span>
        </div>
        <div className="float f2" ref={f2Ref}>
          <b>{t('heroBadge2Title')}</b>
          <span>{t('heroBadge2Desc')}</span>
        </div>

          </div>
        </div>
      </header>
    </div>
  );
}
