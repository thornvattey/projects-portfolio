"use client";

import { useState, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/src/lib/utils";

const linkVariants = cva(
  "text-sm font-medium transition-all duration-200 relative py-1.5 px-3 rounded-md",
  {
    variants: {
      status: {
        active: "text-[#00e676] bg-[#00e676]/10 font-semibold",
        inactive: "text-gray-400 hover:text-white hover:bg-white/5",
      },
    },
    defaultVariants: { status: "inactive" },
  }
);

const navigationLinks = [
  { label: "Home", href: "home" },
  { label: "About", href: "about" },
  { label: "Case Studies", href: "case-studies" },
  { label: "Contact", href: "contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["contact", "case-studies", "about", "home"]; // ← reversed order
      const scrollY = window.scrollY + window.innerHeight * 0.3; // 30% from top

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.offsetTop <= scrollY) {
          setActiveSection(id);
          return;
        }
      }

      setActiveSection("home");
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/30"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => scrollTo("home")}
          className="font-bold text-lg tracking-tight font-mono hover:opacity-80 transition-opacity text-white"
        >
          _∧_attei <span className="text-[#00e676]">THORN</span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navigationLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className={cn(linkVariants({ status: activeSection === link.href ? "active" : "inactive" }))}
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <button
          onClick={() => scrollTo("contact")}
          className="hidden md:inline-flex items-center gap-2 bg-[#00e676] hover:bg-[#00ff85] text-black text-sm font-semibold px-5 py-2 rounded-md transition-all duration-200 hover:shadow-lg hover:shadow-[#00e676]/25"
        >
          Hire Me →
        </button>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 md:hidden p-2 text-gray-400 hover:text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          <span className={cn("h-0.5 w-5 bg-current transition-transform duration-200", isOpen && "rotate-45 translate-y-2")} />
          <span className={cn("h-0.5 w-5 bg-current transition-opacity duration-200", isOpen && "opacity-0")} />
          <span className={cn("h-0.5 w-5 bg-current transition-transform duration-200", isOpen && "-rotate-45 -translate-y-2")} />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b border-white/5 bg-[#0a0a0a]/98 px-6 py-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-2">
            {navigationLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className={cn(
                  "text-base font-medium py-2.5 px-3 rounded-lg block transition-colors text-left",
                  activeSection === link.href
                    ? "bg-[#00e676]/10 text-[#00e676] font-semibold"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("contact")}
              className="mt-2 bg-[#00e676] text-black text-sm font-semibold px-4 py-2.5 rounded-lg text-center"
            >
              Hire Me →
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}