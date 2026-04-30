"use client";

import { CheckCircle2, ArrowRight, Clock, Zap, Settings2, HelpCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function PricingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const customCardRef = useRef<HTMLDivElement>(null);

  const [isExtendedLength, setIsExtendedLength] = useState(false);
  const [numVideos, setNumVideos] = useState(1);

  const estimatedPrice = (isExtendedLength ? 60 : 30) * numVideos;

  useEffect(() => {
    // Moved to useEffect for SSR safety
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrance animations removed as requested for immediate visibility
      
      // Keep layout refresh to handle potential pinning shifts from sections above
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 200);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={containerRef} className="py-32 px-6 md:px-12 relative z-30 bg-[#7DD3FC] overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-16">
          <div ref={headerRef} className="lg:w-4/12 lg:sticky lg:top-32">
            <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-6 block">
              006 / Transparent Value
            </span>
            <h2 className="text-5xl md:text-7xl text-white mb-8 tracking-tighter font-bold leading-[0.9] max-w-sm">
              Invest in high performance
            </h2>
            <p className="text-white/90 text-sm md:text-base mb-10 max-w-xs font-medium leading-relaxed">
              Premium AI-powered video ads built for conversions. Choose the growth level that fits your goals.
            </p>
            <div className="flex items-center gap-3 px-5 py-3 bg-white/20 backdrop-blur-md border border-white/30 rounded-full w-fit group hover:bg-white/30 transition-all cursor-default">
              <Clock className="w-4 h-4 text-white" />
              <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                Limited-time rates
              </span>
            </div>
          </div>

          <div ref={cardsRef} className="lg:w-8/12 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Base Package */}
            <div className="flex flex-col relative bg-white/10 backdrop-blur-[10px] border border-white/25 p-10 rounded-[32px] shadow-2xl overflow-hidden group hover:-translate-y-4 hover:border-white/50 hover:bg-white/[0.18] transition-all duration-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl text-white mb-1 uppercase font-bold tracking-tight">Base</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Concepts & Creative Testing</p>
                </div>
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20">
                  <Zap className="w-5 h-5 text-white fill-white/20" />
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-10 border-b border-white/10 pb-8">
                <span className="text-6xl md:text-7xl text-white font-bold tracking-tighter">€90</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">/ Project</span>
              </div>

              <ul className="space-y-5 flex-1 mb-10">
                {["3 Premium Video Ads", "15-30 Seconds Per Clip", "High-Converting Hooks", "AI Copywriting Suite", "Express 48h Delivery"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium text-xs uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-white/80" />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="h-14 bg-white text-[#7DD3FC] font-bold uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all rounded-full flex items-center justify-center gap-3 shadow-lg">
                Get Started <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Growth Package */}
            <div className="flex flex-col relative bg-white/10 backdrop-blur-[10px] border border-white/25 p-10 rounded-[32px] shadow-2xl overflow-hidden group hover:-translate-y-4 hover:border-white/50 hover:bg-white/[0.18] transition-all duration-700">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl md:text-3xl text-white mb-1 uppercase font-bold tracking-tight">Growth</h3>
                  <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Scale Your Campaigns</p>
                </div>
                <div className="bg-white text-[#7DD3FC] text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.1em] flex items-center gap-1.5 shadow-sm">
                  <Zap className="w-3 h-3 fill-current" />
                  High Velocity
                </div>
              </div>

              <div className="flex items-baseline gap-2 mb-10 border-b border-white/10 pb-8">
                <span className="text-6xl md:text-7xl text-white font-bold tracking-tighter">€180</span>
                <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">/ Project</span>
              </div>

              <ul className="space-y-5 flex-1 mb-10">
                {["6 Premium Video Ads", "15-30 Seconds Per Clip", "Advanced Hook Variations", "Full Funnel Copywriting", "Priority Support"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-white font-medium text-xs uppercase tracking-widest">
                    <CheckCircle2 className="w-4 h-4 text-white/80" />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className="h-14 bg-white text-[#7DD3FC] font-bold uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all rounded-full flex items-center justify-center gap-3 shadow-lg">
                Select Growth <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Custom Ad Configuration Card */}
        <div ref={customCardRef} className="w-full bg-white/10 backdrop-blur-[10px] border border-white/25 p-10 md:p-12 rounded-[32px] shadow-2xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16 hover:border-white/40 hover:bg-white/[0.12] transition-all duration-700">
          <div className="lg:w-4/12 w-full">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Settings2 className="w-4 h-4 text-white" />
              </div>
              <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Custom Ad Configuration</span>
            </div>
            <h3 className="text-3xl text-white mb-4 font-bold tracking-tight leading-tight">Build your perfect ad package</h3>
            <p className="text-white/70 text-sm font-medium leading-relaxed">
              Tailor the ad length and number of videos to match your goals and budget.
            </p>
          </div>

          <div className="lg:w-5/12 w-full space-y-12">
            {/* Slider 1: Clip Length */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-white/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  Clip length <HelpCircle className="w-3 h-3 opacity-50" />
                </label>
                <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-lg text-white text-[11px] font-bold">
                  {isExtendedLength ? '30-60' : '15-30'} SEC
                </div>
              </div>
              <div className="relative group">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="1"
                  value={isExtendedLength ? 1 : 0}
                  onChange={(e) => setIsExtendedLength(e.target.value === '1')}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-white"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${isExtendedLength ? 100 : 0}%, rgba(255, 255, 255, 0.2) ${isExtendedLength ? 100 : 0}%, rgba(255, 255, 255, 0.2) 100%)`
                  }}
                />
                <div className="flex justify-between mt-3 text-white/40 text-[9px] font-bold uppercase tracking-tighter">
                  <span>15-30 SEC</span>
                  <span>30-60 SEC</span>
                </div>
              </div>
            </div>

            {/* Slider 2: Number of Videos */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <label className="text-white/80 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                  Number of videos <HelpCircle className="w-3 h-3 opacity-50" />
                </label>
                <div className="bg-white/20 backdrop-blur-md border border-white/20 px-4 py-1.5 rounded-lg text-white text-[11px] font-bold">
                  {numVideos} {numVideos === 1 ? 'VIDEO' : 'VIDEOS'}
                </div>
              </div>
              <div className="relative group">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={numVideos}
                  onChange={(e) => setNumVideos(Number(e.target.value))}
                  className="w-full h-1.5 rounded-full appearance-none cursor-pointer accent-white"
                  style={{
                    background: `linear-gradient(to right, white 0%, white ${(numVideos - 1) / 9 * 100}%, rgba(255, 255, 255, 0.2) ${(numVideos - 1) / 9 * 100}%, rgba(255, 255, 255, 0.2) 100%)`
                  }}
                />
                <div className="flex justify-between mt-3 text-white/40 text-[9px] font-bold uppercase tracking-tighter">
                  <span>1</span>
                  <span>10</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/12 w-full lg:border-l lg:border-white/10 lg:pl-12 flex flex-col items-center lg:items-start text-center lg:text-left">
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-2 block">Estimated price</span>
            <div className="text-6xl md:text-7xl text-white font-bold tracking-tighter mb-1">
              €{estimatedPrice}
            </div>
            <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Total estimate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
