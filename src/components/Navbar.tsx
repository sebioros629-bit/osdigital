"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Use refs instead of state for GSAP-driven visibility.
  // State → re-render → useEffect → GSAP creates a 1-frame delay that causes flicker.
  const isHiddenRef = useRef(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.set(navbarRef.current, { yPercent: 0 });

    const showNavbar = () => {
      if (isHiddenRef.current) {
        isHiddenRef.current = false;
        gsap.to(navbarRef.current, {
          yPercent: 0,
          duration: 0.45,
          ease: "power3.out",
          overwrite: true,
        });
      }
    };

    const hideNavbar = () => {
      if (!isHiddenRef.current) {
        isHiddenRef.current = true;
        gsap.to(navbarRef.current, {
          yPercent: -110,
          duration: 0.4,
          ease: "power3.inOut",
          overwrite: true,
        });
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Hero is pinned for end: "+=300%" → 3 full vh of scroll distance.
      // Add small buffer so the transition out of hero zone is clean.
      const heroZoneEnd = window.innerHeight * 3.1;

      // Background glassmorphism (React state is fine here — no animation involved)
      setIsScrolled(currentScrollY > heroZoneEnd);

      if (currentScrollY <= heroZoneEnd) {
        // Hero + About Us zone: always show, transparent background
        showNavbar();
      } else {
        // Past hero zone: smart hide/show based on scroll direction.
        // Use separate positive/negative thresholds to avoid the Lenis easing
        // producing tiny deltas that flip direction every frame.
        const delta = currentScrollY - lastScrollY.current;

        if (delta > 12) {
          // Scrolling down with enough intent → hide
          hideNavbar();
        } else if (delta < -6) {
          // Scrolling up even a little → show
          showNavbar();
        }
      }

      lastScrollY.current = currentScrollY;
    };

    // Prefer Lenis scroll events if available (more accurate with smooth-scroll)
    // Falls back to native scroll if Lenis hasn't initialized yet
    let lenisUnsubscribe: (() => void) | null = null;

    const attachLenis = () => {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.on("scroll", handleScroll);
        lenisUnsubscribe = () => lenis.off("scroll", handleScroll);
      } else {
        // Lenis not ready yet — use native scroll, retry attaching Lenis shortly
        window.addEventListener("scroll", handleScroll, { passive: true });
        const retryTimer = setTimeout(() => {
          const l = (window as any).lenis;
          if (l) {
            window.removeEventListener("scroll", handleScroll);
            l.on("scroll", handleScroll);
            lenisUnsubscribe = () => l.off("scroll", handleScroll);
          }
        }, 800);
        lenisUnsubscribe = () => {
          window.removeEventListener("scroll", handleScroll);
          clearTimeout(retryTimer);
        };
      }
    };

    // Small delay to ensure Lenis has initialized in SmoothScroll.tsx
    const initTimer = setTimeout(attachLenis, 200);

    return () => {
      clearTimeout(initTimer);
      lenisUnsubscribe?.();
    };
  }, []);

  // When menu opens/closes, GSAP-animate the navbar directly
  useEffect(() => {
    const lenis = (window as any).lenis;
    if (isMenuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
      // Always show navbar when menu is open
      isHiddenRef.current = false;
      gsap.to(navbarRef.current, { yPercent: 0, duration: 0.3, ease: "power3.out", overwrite: true });
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHome = pathname === "/";
    if (isHome && href.includes("#")) {
      e.preventDefault();
      setIsMenuOpen(false);
      const targetId = href.substring(href.indexOf("#"));
      setTimeout(() => {
        const lenis = (window as any).lenis;
        if (!lenis) return;
        if (targetId === "#hero") {
          lenis.scrollTo(0, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
        } else if (targetId === "#about") {
          lenis.scrollTo(window.innerHeight * 2.7, { duration: 1.5, easing: (t: number) => 1 - Math.pow(1 - t, 3) });
        } else {
          lenis.scrollTo(targetId, { duration: 1.2, offset: -80 });
        }
      }, 100);
    } else {
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { name: "About Us", href: "/#about" },
    { name: "Solutions", href: "/#services" },
    { name: "Process", href: "/#process" },
    { name: "Portfolio", href: "/#portfolio" },
  ];

  return (
    <>
      {/*
        DO NOT add transition-transform here — GSAP owns the Y axis exclusively.
        Only non-transform properties use CSS transitions.
      */}
      <nav
        ref={navbarRef}
        className={`fixed top-0 left-0 w-full z-[100] ${
          isScrolled || isMenuOpen
            ? "bg-os-bg/85 backdrop-blur-xl border-b border-white/5 py-3 md:py-4"
            : "bg-transparent py-5 md:py-6"
        }`}
        style={{
          transition:
            "background-color 0.5s ease, padding 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease",
        }}
      >
        <div className="container-os flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <Link
            href="/#hero"
            onClick={(e) => handleNavClick(e, "/#hero")}
            className="flex items-center gap-1 group relative z-[110]"
          >
            <div className="relative w-8 h-8 md:w-11 md:h-11 group-hover:scale-110 transition-transform duration-500">
              <Image
                src="/images/logo.png"
                alt="OsDigital Logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="text-white font-bold text-lg md:text-2xl tracking-tighter font-heading leading-none">
              OsDigital
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10 text-white font-bold text-[10px] uppercase tracking-[0.2em]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-white/60 transition-colors duration-300 cursor-pointer"
              >
                {link.name}
              </a>
            ))}
            <a
              href="/#contact"
              onClick={(e) => handleNavClick(e, "/#contact")}
              className="px-6 py-3 rounded-pill font-bold transition-all bg-white text-os-bg hover:bg-white/90 active:scale-95 cursor-pointer"
            >
              Start Project
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden relative z-[110] w-10 h-10 flex items-center justify-center text-white active:scale-90 transition-transform"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-os-bg transition-all duration-700 lg:hidden ${
          isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-10">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-white font-heading text-4xl font-bold uppercase tracking-tighter transition-all duration-500 ${
                isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="/#contact"
            onClick={(e) => handleNavClick(e, "/#contact")}
            className={`mt-6 px-10 py-5 bg-white text-os-bg rounded-full font-bold uppercase tracking-widest text-sm transition-all duration-700 ${
              isMenuOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            Start Project
          </a>
        </div>
      </div>
    </>
  );
}
