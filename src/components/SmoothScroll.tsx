"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      // @ts-ignore
      smoothTouch: false, // Let native touch scroll happen for better performance on some mobiles
      touchMultiplier: 1.5,
      lerp: 0.1,
    });

    // Synchronize Lenis with ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    (window as any).lenis = lenis;

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    // Handle initial hash scroll (for navigation from other pages)
    const handleInitialScroll = () => {
      const hash = window.location.hash;
      if (hash === "#about" || hash === "/#about") {
        const targetScroll = window.innerHeight * 2.7;
        lenis.scrollTo(targetScroll, { immediate: true });
      } else if (hash && hash !== "#hero" && hash !== "/#hero") {
        lenis.scrollTo(hash, { immediate: true, offset: -80 });
      }
    };

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      handleInitialScroll();
    }, 500);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
      clearTimeout(timer);
    };
  }, []);

  return <>{children}</>;
}
