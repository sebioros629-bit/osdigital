"use client";

import { Check, ArrowRight, Zap, Shield, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Trial Ad",
    price: "$299",
    tag: "Per Video",
    desc: "Test our AI quality with a single high-performing ad creative.",
    features: [
      "1 High-Impact AI Video",
      "Full Script & Hook",
      "48h Fast Delivery",
      "1 Revision Included",
      "TikTok/IG Formatting"
    ],
    cta: "Order Trial",
    highlight: false,
    icon: Sparkles
  },
  {
    name: "Scale Bundle",
    price: "$999",
    tag: "Most Popular",
    desc: "4 professional video ads designed to scale your paid acquisition.",
    features: [
      "4 High-Impact AI Videos",
      "Full Scripts & Hooks",
      "Dedicated Project Manager",
      "Unlimited Revisions",
      "Variations for A/B Testing",
      "Strategic Consultation"
    ],
    cta: "Scale Now",
    highlight: true,
    icon: Zap
  },
  {
    name: "Growth Partner",
    price: "$2,499",
    tag: "Monthly",
    desc: "Complete creative coverage for high-volume advertisers.",
    features: [
      "12+ Videos Per Month",
      "Full Creative Strategy",
      "Priority Support",
      "Weekly Performance Review",
      "Competitor Ad Analysis",
      "Bespoke Visual Identity"
    ],
    cta: "Partner With Us",
    highlight: false,
    icon: Shield
  }
];

export default function PricingSection() {
  return (
    <section id="pricing" className="py-32 md:py-56 bg-slate-50 relative z-30 overflow-hidden">
      {/* Background Text Parallax (Static for now) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.02] whitespace-nowrap">
        <span className="text-[30vw] font-black uppercase text-black">PRICING PRICING</span>
      </div>

      <div className="container-os relative z-10">
        <div className="text-center mb-24">
          <span className="text-sky-400 text-[10px] font-bold uppercase tracking-[0.4em] mb-6 block">
            INVESTMENT / 008
          </span>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-black leading-none">
            FAIR <span className="text-sky-300">PRICING.</span>
          </h2>
          <p className="mt-8 text-black/50 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Choose the plan that fits your current growth stage. Transparent pricing with agency-level quality and AI-powered speed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {plans.map((plan, i) => (
            <div 
              key={i}
              className={`relative flex flex-col p-12 rounded-[48px] transition-all duration-700 group hover:-translate-y-4 ${
                plan.highlight 
                  ? "bg-os-bg text-white shadow-[0_40px_100px_-15px_rgba(125,211,252,0.4)]" 
                  : "bg-white border border-black/5 text-black hover:border-sky-200"
              }`}
            >
              {plan.highlight && (
                <div className="absolute top-10 right-12 px-5 py-2 bg-white text-os-bg rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  Best Value
                </div>
              )}

              <div className="flex items-center gap-4 mb-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${plan.highlight ? "bg-white/10" : "bg-sky-50"}`}>
                  <plan.icon className={`w-7 h-7 ${plan.highlight ? "text-white" : "text-sky-400"}`} strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-black uppercase text-xl tracking-tight leading-none mb-2">{plan.name}</h3>
                  <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${plan.highlight ? "text-white/60" : "text-sky-500"}`}>
                    {plan.tag}
                  </span>
                </div>
              </div>

              <div className="mb-10">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-7xl font-black tracking-tighter">{plan.price}</span>
                  <span className={`text-sm font-bold uppercase tracking-widest ${plan.highlight ? "text-white/40" : "text-black/30"}`}>
                    / Project
                  </span>
                </div>
                <p className={`mt-6 text-sm font-medium leading-relaxed ${plan.highlight ? "text-white/70" : "text-black/40"}`}>
                  {plan.desc}
                </p>
              </div>

              <div className="space-y-6 mb-12 flex-1">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 group/item">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform group-hover/item:scale-110 ${plan.highlight ? "bg-white/20" : "bg-sky-400/10"}`}>
                      <Check className={`w-3.5 h-3.5 ${plan.highlight ? "text-white" : "text-sky-500"}`} />
                    </div>
                    <span className="text-sm md:text-base font-bold tracking-tight opacity-80">{feature}</span>
                  </div>
                ))}
              </div>

              <a 
                href="#contact"
                className={`w-full py-6 rounded-[24px] font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-4 transition-all duration-500 ${
                  plan.highlight 
                    ? "bg-white text-os-bg hover:bg-sky-100 shadow-2xl" 
                    : "bg-black text-white hover:bg-os-hover shadow-lg"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
