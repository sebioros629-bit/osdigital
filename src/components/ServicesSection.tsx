"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// ─── verified file → actual visual content ───────────────────────────────────
// ugc-phone.jpg     = dark blue phone with play button   → Card 01
// social-heart.png  = blue shopping bag with star        → Card 02
// avatar.png        = blue puzzle pieces                 → Card 03
// puzzle.png        = blue avatar / person bust          → Card 04
// ─────────────────────────────────────────────────────────────────────────────

const services = [
  {
    id: "01",
    tag: "Engagement",
    title: "UGC-STYLE ADS",
    desc: "Authentic, creator-style videos designed to feel natural in the feed and capture attention instantly.",
    icon: "/images/ugc-phone.jpg",
  },
  {
    id: "02",
    tag: "Conversion",
    title: "PRODUCT SHOWCASE",
    desc: "Clean, high-impact visuals that highlight your product and make it stand out.",
    icon: "/images/social-heart.png",
  },
  {
    id: "03",
    tag: "Strategy",
    title: "PROBLEM-SOLUTION",
    desc: "Story-driven ads that clearly show the problem and position your product as the answer.",
    icon: "/images/avatar.png",
  },
  {
    id: "04",
    tag: "Scaling",
    title: "AI AVATAR ADS",
    desc: "Flexible, scalable content using digital presenters to deliver your message quickly and efficiently.",
    icon: "/images/puzzle.png",
  },
];

export default function ServicesSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".svc-bg-text", {
        xPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 2,
        },
      });

      gsap.utils.toArray<HTMLElement>(".svc-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 60 },
          {
            y: 0,
            duration: 1.2,
            ease: "expo.out",
            delay: (i % 2) * 0.15,
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="services"
      ref={containerRef}
      className="relative bg-white overflow-hidden py-40 md:py-56"
      style={{ zIndex: 30 }}
    >
      {/* Parallax bg text */}
      <div
        className="pointer-events-none select-none absolute inset-0 flex items-center overflow-hidden"
        style={{ zIndex: 0 }}
      >
        <span
          className="svc-bg-text whitespace-nowrap font-black uppercase text-black leading-none"
          style={{ fontSize: "28vw", opacity: 0.018, letterSpacing: "-0.04em" }}
        >
          CAPABILITIES&nbsp;CAPABILITIES
        </span>
      </div>

      {/* Grid lines */}
      <div className="pointer-events-none absolute inset-0" style={{ zIndex: 0, opacity: 0.035 }}>
        <div className="absolute inset-y-0 left-1/4 w-px bg-black" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-black" />
        <div className="absolute inset-y-0 left-3/4 w-px bg-black" />
      </div>

      {/* ── Main layout ── */}
      <div className="relative mx-auto px-8 md:px-16" style={{ maxWidth: 1520, zIndex: 10 }}>
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 items-start">

          {/* ── LEFT STICKY COLUMN ── */}
          <div
            className="shrink-0 w-full lg:sticky lg:top-40"
            style={{ width: "clamp(260px, 22vw, 340px)" }}
          >
            <div className="inline-flex items-center gap-2 border border-sky-300 rounded-full px-5 py-2 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse inline-block" />
              <span className="text-sky-500 text-[9px] font-bold uppercase tracking-[0.5em]">
                Service Matrix / 003
              </span>
            </div>

            <h2
              className="font-black uppercase text-black leading-[0.82] tracking-tighter mb-10 break-words"
              style={{ fontSize: "clamp(3rem, 4.5vw, 5.5rem)" }}
            >
              WHAT WE
              <br />
              <span className="text-sky-400">CREATE.</span>
            </h2>

            <p className="text-black/50 text-base md:text-lg leading-relaxed mb-14">
              We create high-performing video ads designed to grab attention and drive results.
              From concept to final delivery, everything is built to help brands stand out, move faster, and grow without the limits of traditional production.
            </p>

            <div className="flex flex-wrap gap-3">
              {["TikTok", "Instagram", "Facebook"].map((p) => (
                <span
                  key={p}
                  className="px-5 py-2.5 rounded-full border border-black/8 bg-slate-50 text-sky-500 text-[9px] font-bold uppercase tracking-widest cursor-default hover:bg-sky-400 hover:text-white transition-all duration-400"
                >
                  {p}
                </span>
              ))}
            </div>
          </div>

          {/* ── RIGHT CARDS GRID — 4 cards, concept-accurate layout ── */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
            {services.map((svc) => (
              <div
                key={svc.id}
                className="svc-card group flex flex-col bg-white border border-black/[0.06] rounded-[32px] p-8 lg:p-10 hover:border-sky-200 hover:shadow-[0_40px_80px_-10px_rgba(125,211,252,0.15)] transition-all duration-700 cursor-default overflow-hidden"
                style={{ minHeight: 360 }}
              >
                {/* Number + tag row */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-sky-400 font-bold text-xl tracking-tight">
                    {svc.id}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-sky-500 text-[9px] font-bold uppercase tracking-widest">
                    {svc.tag}
                  </span>
                </div>

                {/* Title + Icon — concept layout: title left, large icon right */}
                <div className="flex items-start gap-4 mb-5 flex-1">
                  <h3
                    className="flex-1 font-black uppercase text-black leading-[0.85] tracking-tighter group-hover:text-sky-400 transition-colors duration-500"
                    style={{ fontSize: "clamp(1.5rem, 2vw, 2.2rem)" }}
                  >
                    {svc.title}
                  </h3>

                  {/* Icon — large, matching concept proportions */}
                  <div
                    className="shrink-0 relative self-center"
                    style={{ width: 160, height: 160 }}
                  >
                    <Image
                      src={svc.icon}
                      alt={svc.title}
                      fill
                      className="object-contain group-hover:-translate-y-3 group-hover:scale-105 transition-all duration-700"
                      sizes="200px"
                      priority
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="text-black/40 text-sm md:text-[15px] leading-relaxed mb-8">
                  {svc.desc}
                </p>

                {/* Footer */}
                <a 
                  href="#contact"
                  className="pt-5 border-t border-black/[0.04] flex items-center gap-3 text-sky-400 font-bold uppercase tracking-[0.28em] text-[9px] group-hover:gap-5 transition-all duration-500 cursor-pointer"
                >
                  <span>Explore Capabilities</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
