"use client";

import React, { useEffect, useRef } from "react";
import { Zap, Play, TrendingUp, BarChart3, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CTASection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const floatingIconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(".cta-content > *", {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // Floating icons animation
      const icons = floatingIconsRef.current?.querySelectorAll(".floating-icon");
      if (icons) {
        icons.forEach((icon, i) => {
          gsap.to(icon, {
            y: "random(-20, 20)",
            x: "random(-10, 10)",
            rotation: "random(-10, 10)",
            duration: "random(3, 5)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: i * 0.5
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="relative w-full py-32 md:py-48 overflow-hidden bg-gradient-to-b from-[#7DD3FC] via-[#BAE6FD] to-white flex flex-col items-center justify-center font-sans"
    >
      {/* Background Abstract Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Wave Pattern */}
        <svg 
          className="absolute bottom-0 left-0 w-full h-auto opacity-20" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            fill="#FFFFFF" 
            fillOpacity="1" 
            d="M0,160L48,176C96,192,192,224,288,224C384,224,480,192,576,165.3C672,139,768,117,864,128C960,139,1056,181,1152,197.3C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>

        {/* Floating Glass Icons */}
        <div ref={floatingIconsRef} className="absolute inset-0 w-full h-full">
          {/* Play Button */}
          <div className="floating-icon absolute top-[15%] left-[10%] md:left-[15%] w-16 h-16 md:w-24 md:h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center opacity-40 shadow-xl">
            <Play className="text-white w-6 h-6 md:w-10 md:h-10 fill-white" />
          </div>
          
          {/* Growth Chart */}
          <div className="floating-icon absolute top-[20%] right-[10%] md:right-[15%] w-20 h-20 md:w-28 md:h-28 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center opacity-30 shadow-xl">
            <TrendingUp className="text-white w-8 h-8 md:w-12 md:h-12" />
          </div>

          {/* Analytics */}
          <div className="floating-icon absolute bottom-[25%] right-[20%] md:right-[25%] w-14 h-14 md:w-20 md:h-20 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex items-center justify-center opacity-25 shadow-xl">
            <BarChart3 className="text-white w-6 h-6 md:w-10 md:h-10" />
          </div>

          {/* Sparkles / Glows */}
          <div className="absolute top-[40%] left-[25%] w-32 h-32 bg-white/20 blur-[60px] rounded-full pointer-events-none" />
          <div className="absolute bottom-[30%] right-[30%] w-48 h-48 bg-white/30 blur-[80px] rounded-full pointer-events-none" />
        </div>
      </div>

      <div ref={containerRef} className="cta-content container-os relative z-10 text-center max-w-4xl px-6">
        {/* Label */}
        <div className="inline-block px-5 py-2 rounded-full bg-white/40 backdrop-blur-sm border border-white/50 text-[#236486] text-[10px] font-bold tracking-[0.2em] uppercase mb-10 shadow-sm">
          ✨ Let's create something that converts
        </div>

        {/* Headline */}
        <h2 className="text-5xl md:text-7xl lg:text-[6rem] text-slate-950 font-bold uppercase tracking-tight leading-[0.9] mb-8">
          Your brand deserves<br />
          <span className="text-[#0ea5e9]">premium results</span>
        </h2>

        {/* Subtext */}
        <p className="text-slate-900/40 text-base md:text-xl max-w-2xl mx-auto font-medium leading-relaxed mb-14">
          See what OsDigital can create for your brand before you commit.
        </p>

        {/* CTA Button */}
        <div className="mb-14">
          <a href="#contact" className="group h-16 md:h-20 px-10 md:px-14 bg-white hover:bg-slate-50 text-[#0ea5e9] rounded-full font-bold text-sm md:text-base uppercase tracking-widest transition-all shadow-[0_20px_50px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.1)] hover:-translate-y-1 flex items-center gap-4 mx-auto border border-slate-100 w-fit">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#0ea5e9] flex items-center justify-center text-white transition-transform group-hover:scale-110">
              <Zap className="w-4 h-4 md:w-5 md:h-5 fill-white" />
            </div>
            Get your free demo ad
            <span className="text-xl md:text-2xl transition-transform group-hover:translate-x-2">→</span>
          </a>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          {[
            "No commitment",
            "48h delivery",
            "Built to convert"
          ].map((text, i) => (
            <div key={i} className="flex items-center gap-2 text-slate-900/50 text-xs md:text-sm font-bold uppercase tracking-widest">
              <CheckCircle2 className="w-4 h-4 text-[#0ea5e9]" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CTASection;
