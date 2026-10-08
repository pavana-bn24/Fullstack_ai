import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function TextReveal({
  text,
  children,
  as: Component = 'div',
  className = '',
  style = {},
  delay = 0,
  stagger = 0.025,
  duration = 0.85,
  start = 'top 88%',
  ...props
}) {
  const containerRef = useRef(null);
  const contentToAnimate = text || (typeof children === 'string' ? children : null);

  useEffect(() => {
    if (!containerRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const words = containerRef.current.querySelectorAll('.tr-word');
    if (!words || words.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        {
          y: '40%',
          rotate: 0,
          opacity: 0,
        },
        {
          y: '0%',
          rotate: 0,
          opacity: 1,
          duration: duration,
          delay: delay,
          stagger: stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: start,
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [contentToAnimate, delay, stagger, duration, start]);

  if (contentToAnimate) {
    const lines = contentToAnimate.split('\n');
    return (
      <Component ref={containerRef} className={className} style={style} {...props}>
        {lines.map((line, lineIdx) => {
          const words = line.split(' ');
          return (
            <span key={lineIdx} className="tr-line">
              {words.map((word, i) => (
                <span key={i} className="inline-block tr-word-wrapper overflow-hidden align-bottom py-0.5">
                  <span className="inline-block tr-word will-change-transform">
                    {word}{i < words.length - 1 ? '\u00A0' : ''}
                  </span>
                </span>
              ))}
            </span>
          );
        })}
      </Component>
    );
  }

  return (
    <Component ref={containerRef} className={className} style={style} {...props}>
      {children}
    </Component>
  );
}
