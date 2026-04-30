"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Fingerprint,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  ArrowRight,
} from "lucide-react";

const demos = [
  { id: "01", title: "PRODUCT SHOWCASE",           industry: "UGC STYLE",      video: "/videos/demo-1.mp4", duration: "00:15" },
  { id: "02", title: "SHOWROOM REVIEW",            industry: "SHOWCASE",       video: "/videos/demo-2.mp4", duration: "00:20" },
  { id: "03", title: "FASHION BRAND REVIEW",       industry: "PRODUCT REVIEW", video: "/videos/demo-3.mp4", duration: "00:18" },
  { id: "04", title: "GYM PRODUCT REVIEW",         industry: "PRODUCT REVIEW", video: "/videos/demo-4.mp4", duration: "00:16" },
  { id: "05", title: "SKINCARE UNBOXING AND REVIEW", industry: "UNBOXING",     video: "/videos/demo-5.mp4", duration: "00:17" },
];

function FullscreenModal({
  demo,
  onClose,
}: {
  demo: typeof demos[0];
  onClose: () => void;
}) {
  const [isModalMuted, setIsModalMuted] = useState(true);
  const modalVideoRef = useRef<HTMLVideoElement>(null);

  const toggleModalMute = () => {
    const next = !isModalMuted;
    setIsModalMuted(next);
    if (modalVideoRef.current) modalVideoRef.current.muted = next;
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative"
        style={{
          height: "min(100dvh, calc(100vw * 16 / 9))",
          width:  "min(100dvh, calc(100dvh * 9 / 16))",
          maxHeight: "100dvh",
          maxWidth:  "100dvw",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <video
          ref={modalVideoRef}
          src={demo.video}
          autoPlay
          loop
          playsInline
          muted={isModalMuted}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />

        <div className="absolute top-5 left-5 right-5 flex justify-between items-center">
          <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-sky-500 text-[9px] font-bold tracking-widest uppercase shadow-lg">
            {demo.industry}
          </span>

          <div className="flex gap-2">
            <button
              onClick={toggleModalMute}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-sky-500 transition-all shadow-xl"
            >
              {isModalMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            <button
              onClick={onClose}
              className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-sky-500 transition-all shadow-xl"
            >
              <Minimize className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white pointer-events-none">
          <h3 className="text-2xl font-black uppercase mb-2 tracking-tight text-sky-200">
            {demo.title}
          </h3>
          <span className="text-xs font-medium opacity-60">{demo.duration}</span>
        </div>
      </div>
    </div>,
    document.body
  );
}

function VideoCard({ demo }: { demo: typeof demos[0] }) {
  const [isCardMuted, setIsCardMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleCardMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const next = !isCardMuted;
    setIsCardMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  const openFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFullscreen(true);
  };

  return (
    <>
      <div
        className="portfolio-card shrink-0 h-[70vh] group transition-all duration-700 hover:scale-[1.02]"
        style={{ width: "calc(70vh * 9 / 16)" }}
      >
        <div className="relative w-full h-full bg-[#0F172A] rounded-[24px] md:rounded-[40px] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.15)] group-hover:shadow-[0_60px_100px_-20px_rgba(125,211,252,0.3)] transition-all duration-700 border border-black/5">

          <video
            ref={videoRef}
            src={demo.video}
            loop
            muted
            playsInline
            autoPlay
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] cursor-pointer"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent opacity-60 pointer-events-none" />

          <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 flex justify-between items-center z-30">
            <span className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-sky-500 text-[9px] md:text-[10px] font-bold tracking-widest uppercase shadow-lg">
              {demo.industry}
            </span>

            <div className="flex gap-2">
              <button
                onClick={toggleCardMute}
                className="
                  w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30
                  flex items-center justify-center text-white
                  hover:bg-white hover:text-sky-500 transition-all shadow-xl
                  opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                "
              >
                {isCardMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <button
                onClick={openFullscreen}
                className="
                  w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30
                  flex items-center justify-center text-white
                  hover:bg-white hover:text-sky-500 transition-all shadow-xl
                  opacity-100 lg:opacity-0 lg:group-hover:opacity-100
                "
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 text-white z-20 pointer-events-none">
            <h3 className="text-xl md:text-2xl font-black uppercase mb-3 tracking-tight group-hover:text-sky-300 transition-colors">
              {demo.title}
            </h3>
            <div className="flex items-center gap-4">
              <span className="text-[10px] md:text-xs font-medium opacity-60">{demo.duration}</span>
              <div className="flex-1 h-px bg-white/20 relative">
                <div className="absolute inset-0 bg-sky-400 w-0 group-hover:w-full transition-all duration-[3s] ease-linear" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {isFullscreen && (
        <FullscreenModal
          demo={demo}
          onClose={() => setIsFullscreen(false)}
        />
      )}
    </>
  );
}

export default function PortfolioSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let ctx = gsap.context(() => {
      const pinItems = gsap.utils.toArray(".portfolio-card");
      if (pinItems.length === 0) return;

      const vhCardWidth = (window.innerHeight * 0.7) * (9 / 16);
      const videosWidth = (pinItems.length * vhCardWidth) + (pinItems.length * 32);
      const introWidth = 450 + 128;
      const ctaWidth   = 500 + 128;

      const totalContentWidth = introWidth + videosWidth + ctaWidth;
      const scrollAmount = totalContentWidth - window.innerWidth + 200;

      gsap.to(sectionRef.current, {
        x: -scrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 0.8,
          start: "top top",
          end: () => `+=${scrollAmount * 1.1}`,
          invalidateOnRefresh: true,
        }
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div ref={triggerRef} className="bg-white overflow-hidden">
      <section id="portfolio" className="h-screen flex items-center relative z-30">
        <div ref={sectionRef} className="flex items-center px-10 md:px-20 lg:px-32 gap-32">
          <div className="shrink-0 w-[320px] md:w-[450px]">
            <span className="text-sky-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-8 block">
              PRODUCTION QUALITY
            </span>
            <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-[#0F172A] mb-10">
              Realistic ads <br />
              built <br />
              <span className="text-sky-400">different.</span>
            </h2>
            <p className="text-[#0F172A]/50 text-base md:text-lg mb-16 max-w-sm">
              Explore highly realistic video ads designed to look and feel like real content across different industries.
            </p>

            <div className="flex flex-col gap-10">
              <div className="flex items-center gap-4 text-[10px] font-bold text-[#0F172A]/30 uppercase tracking-[0.2em]">
                <Fingerprint className="w-6 h-6 text-sky-400" />
                <span>Scroll to explore</span>
              </div>
              <div className="flex items-center gap-12">
                <span className="text-sky-400 font-bold text-xs">01</span>
                <div className="flex gap-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === 0 ? \"w-10 bg-sky-400\" : \"w-6 bg-[#0F172A]/10\"}`} />
                  ))}
                </div>
                <span className="text-[#0F172A]/20 font-bold text-xs tracking-widest">05</span>
              </div>
            </div>
          </div>

          <div className=\"flex gap-8 items-center py-20\">
            {demos.map((demo) => (
              <VideoCard key={demo.id} demo={demo} />
            ))}
          </div>

          <div className=\"portfolio-cta shrink-0 w-[350px] md:w-[500px]\">
            <span className=\"text-sky-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-8 block\">
              THE NEXT STEP
            </span>
            <h2 className=\"text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter text-[#0F172A] mb-12\">
              Ready <br />
              to <br />
              <span className=\"text-sky-400\">scale?</span>
            </h2>
            <a href=\"#contact\" className=\"group h-20 px-12 bg-[#0F172A] text-white rounded-full font-black text-sm uppercase tracking-[0.2em] hover:bg-sky-400 hover:scale-105 transition-all duration-500 flex items-center gap-6 shadow-2xl shadow-sky-400/20 w-fit\">
              <span>Work With Us</span>
              <ArrowRight className=\"w-6 h-6 group-hover:translate-x-3 transition-transform duration-500\" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
