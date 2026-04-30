"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Upload, Compass, Wand2, Rocket, ArrowRight } from "lucide-react";

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  const steps = [
    {
      num: "01",
      title: "SEND YOUR PRODUCT",
      desc: "Provide details about your product or service and target audience.",
      Icon: Upload
    },
    {
      num: "02",
      title: "CHOOSE DIRECTION",
      desc: "Select avatars, styles, and tones, or let our AI determine the best approach.",
      Icon: Compass
    },
    {
      num: "03",
      title: "WE CREATE",
      desc: "Hooks, scripts, and high-quality AI visuals are generated and edited.",
      Icon: Wand2
    },
    {
      num: "04",
      title: "LAUNCH IN 48H",
      desc: "Receive ready-to-use video ads designed for social media feeds.",
      Icon: Rocket
    }
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Entrance animation for steps
      gsap.fromTo(
        ".process-step",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: stepsRef.current,
            start: "top 85%",
          },
        }
      );

      // Subtle float animation for icons
      gsap.to(".step-icon-container", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.3
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="process"
      ref={containerRef}
      className="py-32 md:py-48 relative z-30 bg-gradient-to-b from-[#7DD3FC] via-[#F0FAFF]/10 to-[#7DD3FC] overflow-hidden text-white"
    >
      <div className="container-os">
        
        {/* HEADER: Centered */}
        <div className="text-center mb-24 md:mb-32">
          <span className="text-[#075985]/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
            005 / STREAMLINED WORKFLOW
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-none tracking-tighter text-[#075985]">
            HOW IT <span className="text-white drop-shadow-sm">WORKS.</span>
          </h2>
        </div>

        {/* PROCESS STEPS: Horizontal Flow */}
        <div ref={stepsRef} className="relative grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Connecting Lines (Desktop Only) */}
          <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-white/30 z-0">
            <div className="absolute top-1/2 left-1/3 -translate-y-1/2 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
               <ArrowRight className="w-3 h-3 text-white/40" />
            </div>
            <div className="absolute top-1/2 left-2/3 -translate-y-1/2 flex items-center gap-2">
               <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
               <ArrowRight className="w-3 h-3 text-white/40" />
            </div>
          </div>

          {steps.map((step, i) => (
            <div key={i} className="process-step relative z-10 flex flex-col items-center text-center group opacity-0">
              
              {/* Icon Container with Hover Animation */}
              <div className="step-icon-container w-24 h-24 md:w-28 md:h-28 rounded-full bg-white/20 border border-white/30 flex items-center justify-center mb-8 backdrop-blur-md group-hover:bg-white group-hover:scale-110 group-hover:border-white transition-all duration-500 relative">
                <step.Icon className="w-8 h-8 md:w-10 md:h-10 text-white group-hover:text-[#7DD3FC] transition-colors duration-500" strokeWidth={1.5} />
                
                {/* Visual Connector Dot Below Icon */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-px h-6 bg-white/20 border-dotted border-l" />
              </div>

              {/* Step Number */}
              <div className="w-8 h-8 rounded-full bg-[#075985] flex items-center justify-center text-[10px] font-black mb-6 shadow-xl shadow-[#075985]/20 group-hover:scale-110 transition-transform duration-500">
                {step.num}
              </div>

              {/* Title */}
              <h3 className="text-lg md:text-xl font-black mb-4 tracking-tight text-[#075985] group-hover:text-white transition-colors duration-500">
                {step.title}
              </h3>

              {/* Divider Line */}
              <div className="w-8 h-1 bg-[#075985]/20 mb-6 rounded-full group-hover:w-12 group-hover:bg-white transition-all duration-500" />

              {/* Description */}
              <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-[220px]">
                {step.desc}
              </p>

              {/* Interactive Hover Link */}
              <div className="mt-8 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#075985] opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 transition-all duration-500">
                <span>Details</span>
                <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
