"use client";

import { useRef, useEffect } from "react";
import { ArrowDown } from "lucide-react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollCanvas, { ScrollCanvasHandle } from "./ScrollCanvas";

export default function HeroModelScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<ScrollCanvasHandle>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Moved to useEffect for SSR safety
    gsap.registerPlugin(ScrollTrigger);

    if (typeof window !== 'undefined') {
      // Normalize scroll for mobile stability (modern GSAP approach)
      ScrollTrigger.normalizeScroll(true);

      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
      });
    }

    const ctx = gsap.context(() => {
      // MASTER TIMELINE
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          pin: true,
          anticipatePin: 1, // Smooths out the transition into pinning
          scrub: 1.2, // Slightly higher scrub for smoother mobile feel
          onUpdate: (self) => {
            const videoProgress = Math.min(1, self.progress / 0.8);
            const frameIndex = Math.floor(videoProgress * 120);
            canvasRef.current?.drawFrame(frameIndex);
          }
        }
      });

      // 1. Hero Text fades out early
      tl.to(heroTextRef.current, {
        opacity: 0,
        y: -50,
        duration: 0.2
      }, 0);

      // 2. Gap for video to play/zoom (0.2 to 0.8 is dominated by video scrub in onUpdate)

      // 3. About Us fades in earlier (at 0.6 instead of 0.8)
      tl.fromTo(aboutTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.2 },
        0.6
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={sectionRef} className="relative w-full h-[100dvh] overflow-hidden">
      {/* Background Video Sequence */}
      <ScrollCanvas
        ref={canvasRef}
        frameCount={121}
        baseUrl="/hero-sequence"
      />


      {/* Hero Content Layer - Adjusted to be lower so it doesn't cover faces */}
      <div
        ref={heroTextRef}
        className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none pb-40 md:pb-56"
      >
        <div className="text-center px-6">
          <span className="text-white font-bold tracking-[0.4em] uppercase mb-6 block" style={{ fontSize: "clamp(9px, 1vw, 12px)" }}>
            HIGH CONVERTING VIDEO ADS
          </span>
          {/*
            clamp(min, preferred, max):
            - min  = 2.8rem  (~45px) for very small phones
            - pref = 8vw     scales naturally with viewport width
            - max  = 8rem    (~128px) caps it on large desktops/ultrawides
            This keeps the heading proportional to the video at every size.
          */}
          <h1
            className="font-heading text-white font-bold leading-[0.9] tracking-tighter uppercase"
            style={{ fontSize: "clamp(2.8rem, 8vw, 8rem)" }}
          >
            SCALE FASTER
          </h1>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 animate-bounce">
          <span className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">Explore</span>
          <ArrowDown className="w-5 h-5 text-white" />
        </div>
      </div>

      <div
        id="about"
        ref={aboutTextRef}
        className="absolute inset-0 flex items-center z-20 pointer-events-none"
      >
        <div className="container-os w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-center">

            <div className="flex flex-col items-start text-left">
              <span className="text-white/80 font-bold tracking-[0.4em] uppercase mb-4 block" style={{ fontSize: "clamp(9px, 0.9vw, 11px)" }}>
                001 / About Us
              </span>
              {/*
                About heading: smaller than hero — clamp(1.8rem, 3.5vw, 4rem)
                Ensures it never fights for dominance with the hero text size.
              */}
              <h2
                className="font-heading text-white font-bold leading-none tracking-tighter uppercase mb-6"
                style={{ fontSize: "clamp(1.8rem, 3.5vw, 4rem)" }}
              >
                A Faster Way<br />
                To<br />
                <span className="text-white/80">Create.</span>
              </h2>
            </div>

            <div className="hidden md:block w-full" /> {/* Logo Spacing */}

            <div className="flex flex-col items-start md:items-end text-left md:text-right">
              <p className="text-white text-base md:text-lg font-medium leading-relaxed max-w-sm uppercase tracking-tight">
                OsDigital bridges the gap between high-quality production and speed, helping brands generate consistent ad content without the overhead.
              </p>
              <a href="#process" className="mt-8 px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-pill font-bold text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-os-bg transition-all pointer-events-auto block w-fit">
                Learn Our Process
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
