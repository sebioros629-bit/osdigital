"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Quote, Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Alex Thompson",
    role: "CEO, GlowUp Beauty",
    quote: "OsDigital changed our creative game. We went from 2 weeks per video to 48 hours. Our ROAS tripled in the first month.",
    image: "/images/testimonial-1.jpg",
    stats: "320% ROAS Improvement"
  },
  {
    name: "Sarah Jenkins",
    role: "Founder, FitTech",
    quote: "The realism is insane. Our customers thought we hired professional actors. The speed at which they iterate is unmatched.",
    image: "/images/testimonial-2.jpg",
    stats: "48h Delivery"
  },
  {
    name: "Mark Rivera",
    role: "Marketing Director, Aura",
    quote: "Scaling our ad spend was impossible without a steady stream of creatives. OsDigital provided exactly what we needed to grow.",
    image: "/images/testimonial-3.jpg",
    stats: "50+ Videos Delivered"
  }
];

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Fade-in animation for cards on scroll
      gsap.from(".testimonial-card", {
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-32 md:py-48 bg-white relative z-30 overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-100 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 opacity-50" />
      
      <div className="container-os">
        <div className="text-center mb-24">
          <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
            TRUST / 007
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none">
            SOCIAL <span className="text-sky-300">PROOF.</span>
          </h2>
        </div>

        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div 
              key={i}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="testimonial-card group relative bg-slate-50 border border-black/[0.05] p-10 rounded-[40px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
              style={{
                transform: hoveredIndex === i ? 'scale(1.03) translateY(-10px)' : 'scale(1) translateY(0)',
                boxShadow: hoveredIndex === i ? '0 40px 80px -15px rgba(125,211,252,0.25)' : 'none',
                zIndex: hoveredIndex === i ? 10 : 1
              }}
            >
              <div className="flex items-center gap-1 mb-8">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sky-400 text-sky-400" />
                ))}
              </div>

              <div className="relative mb-10">
                <Quote className="absolute -top-6 -left-6 w-12 h-12 text-sky-200/50 -z-0" />
                <p className="relative z-10 text-black text-xl md:text-2xl font-bold leading-tight tracking-tight">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-5 mt-auto pt-8 border-t border-black/5">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-black font-black uppercase text-sm tracking-tight">{t.name}</h4>
                  <p className="text-sky-500 text-[10px] font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              {/* Result Badge */}
              <div className="absolute top-10 right-10 px-4 py-2 bg-sky-400 rounded-full text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-sky-400/20 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                {t.stats}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
