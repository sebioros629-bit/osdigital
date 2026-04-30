"use client";

import Link from "next/image";
import { Twitter, Instagram, Linkedin, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    const lenis = (window as any).lenis;
    lenis?.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
  };

  return (
    <footer id="footer" className="bg-os-bg py-24 md:py-32 relative z-30 border-t border-white/5">
      <div className="container-os">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Brand & Info */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-10 h-10 relative">
                 <img src="/images/logo.png" alt="OsDigital" className="w-full h-full object-contain" />
              </div>
              <span className="text-white font-black text-2xl tracking-tighter uppercase">OsDigital</span>
            </div>
            
            <p className="text-white/40 text-lg font-medium leading-relaxed max-w-sm mb-12">
              Transforming how brands create video content. AI-powered speed, human-grade realism.
            </p>

            <div className="flex items-center gap-6">
              {[Twitter, Instagram, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-os-bg transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            <div>
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-10 opacity-30">Platform</h4>
              <ul className="space-y-6">
                {["Solutions", "Portfolio", "Pricing", "Process"].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase()}`} className="text-white/60 hover:text-white font-bold transition-colors uppercase text-xs tracking-widest">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-black uppercase text-[10px] tracking-[0.3em] mb-10 opacity-30">Company</h4>
              <ul className="space-y-6">
                {["About Us", "Contact", "Privacy", "Terms"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-white/60 hover:text-white font-bold transition-colors uppercase text-xs tracking-widest">{link}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
               <button 
                 onClick={scrollToTop}
                 className="group flex items-center gap-4 text-white font-black uppercase text-[10px] tracking-[0.4em] mb-10 hover:text-sky-300 transition-colors"
               >
                 Back to Top
                 <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:translate-y-[-5px] transition-transform">
                   <ArrowUp className="w-4 h-4" />
                 </div>
               </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-32 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
             © 2026 OsDigital AI. All Rights Reserved.
           </p>
           <div className="flex items-center gap-8 text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
             <span className="hover:text-white transition-colors cursor-pointer">Built with Passion</span>
             <span className="hover:text-white transition-colors cursor-pointer">London / Global</span>
           </div>
        </div>
      </div>
    </footer>
  );
}
