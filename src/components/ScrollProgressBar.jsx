import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgressBar() {
  const progressRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.body,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.1
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3px] z-50 pointer-events-none bg-black/5">
      <div
        ref={progressRef}
        className="h-full w-full bg-gradient-to-r from-[#2563EB] via-[#059669] to-[#2563EB] origin-left scale-x-0 shadow-[0_0_10px_rgba(37,99,235,0.8)]"
      />
    </div>
  );
}
