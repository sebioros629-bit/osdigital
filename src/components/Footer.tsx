"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Camera, Music2, Mail, ArrowUp } from "lucide-react";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navLinks = [
    { name: "About Us", href: "#about" },
    { name: "Solutions", href: "#services" },
    { name: "Process", href: "#process" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Pricing", href: "#pricing" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  const socialLinks = [
    { name: "Instagram", icon: <Camera className="w-5 h-5" />, href: "https://www.instagram.com/osdigital.co/" },
    { name: "TikTok", icon: <Music2 className="w-5 h-5" />, href: "#" },
  ];

  return (
    <footer id="footer" className="bg-white pt-24 pb-12 px-6 border-t border-slate-100 font-sans relative z-30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          {/* Brand Column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-12 h-12">
                <Image 
                  src="/images/footer-logo.png" 
                  alt="OsDigital Logo" 
                  fill
                  className="object-contain"
                />
              </div>
              <h2 className="text-2xl font-bold text-slate-950 tracking-tighter">
                OsDigital
              </h2>
            </div>
            <p className="text-slate-900/40 text-sm font-medium leading-relaxed max-w-[200px]">
              Elevating brands through premium AI-powered creative solutions.
            </p>
          </div>

          {/* Navigation Column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-8">
              Navigation
            </h3>
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="text-slate-950/60 hover:text-[#0ea5e9] text-sm font-bold uppercase tracking-widest transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-8">
              Connect
            </h3>
            <ul className="space-y-4">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    className="flex items-center gap-3 text-slate-950/60 hover:text-[#0ea5e9] text-sm font-bold uppercase tracking-widest transition-colors group"
                  >
                    <span className="group-hover:scale-110 transition-transform">{link.icon}</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#0ea5e9] mb-8">
              Inquiries
            </h3>
            <div className="space-y-6">
              <a 
                href="mailto:contact@osdigital.net" 
                className="flex items-center gap-3 text-slate-950 font-bold text-sm tracking-tight hover:text-[#0ea5e9] transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-[#0ea5e9]/10 transition-colors">
                  <Mail className="w-4 h-4 text-[#0ea5e9]" />
                </div>
                contact@osdigital.net
              </a>
              
              <button 
                onClick={scrollToTop}
                className="flex items-center gap-3 text-[#0ea5e9] font-bold text-[10px] uppercase tracking-[0.2em] group"
              >
                <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center group-hover:bg-slate-50 transition-colors">
                  <ArrowUp className="w-4 h-4" />
                </div>
                Back to top
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-slate-900/30 text-[10px] font-bold uppercase tracking-widest">
            © {new Date().getFullYear()} OsDigital. All rights reserved.
          </p>
          
          <div className="flex items-center gap-8">
            <Link href="/privacy" className="text-slate-900/30 hover:text-slate-950 text-[10px] font-bold uppercase tracking-widest transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-900/30 hover:text-slate-950 text-[10px] font-bold uppercase tracking-widest transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
