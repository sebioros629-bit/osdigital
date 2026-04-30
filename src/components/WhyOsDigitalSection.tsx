"use client";

import { Check, X, ArrowRight } from "lucide-react";

export default function WhyOsDigitalSection() {
  const comparison = [
    {
      traditional: "Takes 2–4 weeks to deliver",
      osdigital: "Delivered in 48 hours"
    },
    {
      traditional: "Requires filming, actors, and teams",
      osdigital: "AI-assisted production. No filming required."
    },
    {
      traditional: "Expensive to test creatives",
      osdigital: "Affordable creative testing"
    },
    {
      traditional: "Limited ad variations",
      osdigital: "Scalable content, built to grow"
    }
  ];

  return (
    <section className="py-32 md:py-48 relative z-30 bg-gradient-to-br from-[#F0FAFF] to-[#BAE6FD] overflow-hidden text-[#0F172A]">
      <div className="container-os">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* LEFT SIDE: Headline + Subtext */}
          <div className="lg:col-span-5">
            <span className="text-sky-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-8 block">
              004 / ADVANTAGE
            </span>
            
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] tracking-tighter mb-10">
              Agency-level results.<br />
              Without the <span className="text-[#7DD3FC]">friction.</span>
            </h2>

            <div className="space-y-2">
              <p className="text-xl md:text-2xl font-medium text-[#0F172A]/70 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Faster delivery.
              </p>
              <p className="text-xl md:text-2xl font-medium text-[#0F172A]/70 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Smarter creative.
              </p>
              <p className="text-xl md:text-2xl font-medium text-[#0F172A]/70 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                Better performance.
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: Comparison Table */}
          <div className="lg:col-span-7 w-full">
            <div className="grid grid-cols-2 gap-8 mb-8 pb-4 border-b border-black/5">
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/40">
                Traditional Agency
              </div>
              <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-sky-500">
                OsDigital
              </div>
            </div>

            <div className="space-y-12 md:space-y-16">
              {comparison.map((item, i) => (
                <div key={i} className="grid grid-cols-2 gap-8 group">
                  {/* Traditional */}
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border border-black/5 flex items-center justify-center shrink-0">
                      <X className="w-4 h-4 text-black/20" />
                    </div>
                    <span className="text-sm md:text-lg font-medium text-[#0F172A]/40 leading-tight">
                      {item.traditional}
                    </span>
                  </div>

                  {/* OsDigital */}
                  <div className="flex items-center gap-4 relative">
                    {/* Visual Connector Arrow (Desktop Only) */}
                    <div className="hidden md:block absolute -left-12 opacity-10 group-hover:opacity-30 group-hover:-translate-x-1 transition-all duration-500">
                      <ArrowRight className="w-5 h-5" />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-sky-400 flex items-center justify-center shrink-0 shadow-lg shadow-sky-400/20">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-base md:text-xl font-bold text-[#0F172A] leading-tight">
                      {item.osdigital}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
