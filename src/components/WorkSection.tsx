"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function WorkSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoCardRef = useRef<HTMLDivElement>(null);
  const bgTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Reveal Text
      gsap.from(textRef.current?.children || [], {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Video Card Float & Entrance
      gsap.from(videoCardRef.current, {
        x: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
        }
      });

      // Subtle Hover Tilt for Video Card
      const card = videoCardRef.current;
      if (card) {
        card.addEventListener("mousemove", (e) => {
          const { clientX, clientY } = e;
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (clientX - left) / width - 0.5;
          const y = (clientY - top) / height - 0.5;
          
          gsap.to(card, {
            rotateY: x * 10,
            rotateX: -y * 10,
            duration: 0.5,
            ease: "power2.out"
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)"
          });
        });
      }

      // Parallax Background Text
      gsap.to(bgTextRef.current, {
        xPercent: -20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-32 md:py-56 relative z-30 bg-os-bg overflow-hidden border-t border-white/10">
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/5 z-0" />
      <div className="absolute top-[40%] left-0 w-full h-[1px] bg-white/5 z-0" />
      
      {/* Large Background Text */}
      <div 
        ref={bgTextRef}
        className="absolute top-1/2 left-0 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none z-0"
      >
        <span className="text-[25vw] font-bold text-white/[0.03] leading-none uppercase">
          Narrative Performance Narrative Performance
        </span>
      </div>

      <div className="container-os relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left: Content */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col items-start">
            <span className="text-white/40 text-[10px] font-bold uppercase tracking-[0.6em] mb-8 block px-4 py-1.5 border border-white/10 rounded-full">
              Production Showcase / 002
            </span>
            
            <h2 className="font-heading text-6xl md:text-8xl lg:text-[6rem] text-white tracking-tighter uppercase font-bold leading-[0.9] mb-10">
              Next-Gen<br/>
              <span className="text-white/30">Creatives.</span>
            </h2>
            
            <p className="text-white/70 text-lg md:text-xl font-medium max-w-xl leading-relaxed mb-12">
              High-performing video ads created faster and at a fraction of traditional costs.
              <br className="hidden md:block" />
              We deliver realistic, engaging creatives that help brands stand out and scale—enhanced with AI to move quicker, stay flexible, and produce without limitations.
            </p>
            <div className="flex flex-wrap gap-6 items-center mb-12">
              <a href="#contact" className="group flex items-center gap-4 bg-white text-os-bg px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-os-hover hover:text-white transition-all duration-500 shadow-2xl">
                GET YOUR FREE DEMO
                <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform duration-300" />
              </a>

              <a href="#footer" className="group flex items-center gap-4 bg-transparent text-white border border-white/20 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-white/10 transition-all duration-500">
                Contact Us
              </a>
            </div>
          </div>

          {/* Right: Premium Video Card */}
          <div className="lg:col-span-6 perspective-2000">
            <div 
              ref={videoCardRef}
              className="group relative rounded-[40px] overflow-hidden bg-white/5 border border-white/15 aspect-[9/16] md:aspect-[3/4] lg:aspect-[4/5] shadow-[0_60px_120px_rgba(0,0,0,0.3)] preserve-3d"
            >
              <video 
                src="/videos/david-bar.mp4" 
                autoPlay 
                muted 
                loop 
                playsInline 
                className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-os-bg/90 via-transparent to-transparent opacity-80" />
              
              {/* Content on Card */}
              <div className="absolute bottom-10 left-10 right-10 p-10 rounded-[32px] bg-white/10 backdrop-blur-2xl border border-white/20 transform translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-expo">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-3 block">Real-Time Synthesis</span>
                    <h3 className="text-white text-3xl font-bold uppercase tracking-tight leading-none">Product Review</h3>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-os-bg transition-colors duration-500">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-10 right-10 flex items-center gap-3 px-5 py-2.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10">
                <div className="w-2 h-2 rounded-full bg-os-hover animate-pulse" />
                <span className="text-white text-[10px] font-bold uppercase tracking-widest">Active Showcase</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
