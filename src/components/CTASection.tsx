"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles, Send } from "lucide-react";

export default function CTASection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax bg text
      gsap.to(".cta-bg-text", {
        xPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        }
      });

      // Split text animation effect for heading
      gsap.from(".cta-heading span", {
        yPercent: 100,
        opacity: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact" 
      ref={containerRef} 
      className="relative py-48 md:py-64 bg-os-bg overflow-hidden z-30"
    >
      {/* Decorative Parallax Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none opacity-[0.03]">
        <span className="cta-bg-text text-[30vw] font-black uppercase text-white leading-none">
          SCALE NOW SCALE NOW SCALE NOW
        </span>
      </div>

      <div className="container-os relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col items-center text-center">
            
            {/* Tag */}
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10 mb-12 animate-pulse">
              <Sparkles className="w-4 h-4 text-white" />
              <span className="text-white text-[10px] font-bold uppercase tracking-[0.4em]">Limited Availability</span>
            </div>

            {/* Heading */}
            <h2 className="cta-heading overflow-hidden text-7xl md:text-9xl lg:text-[10rem] font-black uppercase tracking-tighter text-white leading-[0.8] mb-16">
              <span className="block">READY TO</span>
              <span className="block text-white/30">DISRUPT?</span>
            </h2>

            {/* Description */}
            <p className="text-white/60 text-xl md:text-2xl font-medium max-w-2xl leading-relaxed mb-20">
              Join the future of high-performance advertising. Get your first AI-powered UGC creative delivered in 48 hours.
            </p>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row items-center gap-8 w-full md:w-auto">
              <a 
                href="mailto:contact@osdigital.ai"
                className="group w-full md:w-auto px-16 py-8 bg-white text-os-bg rounded-[32px] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-os-hover hover:text-white hover:scale-105 transition-all duration-500 shadow-[0_40px_80px_-15px_rgba(255,255,255,0.3)]"
              >
                Book Your Call
                <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>

              <a 
                href="#portfolio"
                className="group w-full md:w-auto px-16 py-8 bg-white/5 border border-white/20 text-white rounded-[32px] font-black uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-4 hover:bg-white/10 hover:border-white/40 transition-all duration-500"
              >
                View Works
                <Send className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Secondary Link */}
            <div className="mt-20 flex flex-col items-center gap-4">
              <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.3em]">Direct Inquiry</p>
              <a href="mailto:contact@osdigital.ai" className="text-white font-bold text-lg hover:text-white/60 transition-colors border-b border-white/20 pb-1">
                hello@osdigital.ai
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Modern Grid Background */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>
    </section>
  );
}
