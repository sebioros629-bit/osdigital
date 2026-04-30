"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Thompson",
      role: "CEO, GlowUp Beauty",
      quote: "OsDigital changed our creative game. We went from 2 weeks per video to 48 hours. Our ROAS tripled in the first month.",
      image: "/images/avatar.png",
      stats: "320% ROAS Improvement"
    },
    {
      name: "Sarah Jenkins",
      role: "Founder, FitTech",
      quote: "The realism is insane. Our customers thought we hired professional actors. The speed at which they iterate is unmatched.",
      image: "/images/v2-avatar.png",
      stats: "48h Delivery"
    },
    {
      name: "Mark Rivera",
      role: "Marketing Director, Aura",
      quote: "Scaling our ad spend was impossible without a steady stream of creatives. OsDigital provided exactly what we needed to grow.",
      image: "/images/avatar.png",
      stats: "50+ Videos Delivered"
    }
  ];

  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Pure fade-in: no Y movement — avoids cards appearing to "not be there"
      gsap.fromTo(".testimonial-card",
        { opacity: 0 },
        {
          opacity: 1,
          stagger: 0.18,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );

      setTimeout(() => { ScrollTrigger.refresh(); }, 100);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-24 md:py-40 relative z-30 bg-white flex flex-col items-center overflow-hidden font-sans">
      <div ref={containerRef} className="container-os relative z-10 w-full max-w-7xl px-6">
        <div className="mb-16 md:mb-24 flex flex-col items-center text-center">
          <div className="inline-block px-5 py-2 rounded-full bg-[#7DD3FC]/10 text-[#236486] text-[10px] font-bold tracking-[0.2em] uppercase mb-8">
            Social Proof
          </div>
          <h2
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl text-black font-bold uppercase tracking-tight leading-[0.9] mb-8"
          >
            Trusted by the<br />
            <span className="text-[#7DD3FC]">Next Generation</span>
          </h2>
          <p className="text-black/40 text-sm md:text-base max-w-xl font-medium leading-relaxed">
            Real feedback from visionary founders and teams who trust <span className="text-[#7DD3FC] font-bold">OsDigital</span> to elevate their brand.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {testimonials.map((item, i) => (
            <div
              key={i}
              className="testimonial-card relative flex flex-col bg-[#7DD3FC] rounded-[12px] p-8 lg:p-10 shadow-sm cursor-default min-h-[400px] group"
              style={{
                transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.4s ease",
                willChange: "transform",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.045) translateY(-6px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 32px 64px -12px rgba(125, 211, 252, 0.5), 0 0 0 1px rgba(125,211,252,0.2)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1) translateY(0px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="mb-8">
                <Quote className="text-white w-10 h-10 opacity-40 rotate-180" />
              </div>

              <div className="font-medium text-xl lg:text-2xl leading-[1.3] mb-12 flex-1 text-slate-900 tracking-tight">
                {item.quote}
              </div>

              <div className="pt-8 border-t border-white/20">
                <p className="font-bold text-sm uppercase tracking-wider text-slate-900 mb-1">
                  {item.name}
                </p>
                <p className="text-slate-900/60 text-[11px] font-bold uppercase tracking-widest">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
