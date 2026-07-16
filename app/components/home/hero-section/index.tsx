"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import profileImg from "../../../../src/assets/images/_profile.jpeg";

/* ─── Animated Counter ───────────────────────────────────────────── */
function AnimatedStat({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1400;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(eased * value));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center md:items-start gap-1">
      <span className="text-3xl md:text-4xl font-black text-[#00e676] tracking-tight">
        {count}{suffix}
      </span>
      <span className="text-xs text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
  );
}

/* ─── Hero ───────────────────────────────────────────────────────── */
export default function Hero() {
  return (
    <section className="relative overflow-hidden min-h-[calc(100vh-4rem)] flex items-center bg-[#0a0a0a]">

      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Green glow blobs */}
      <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-[#00e676]/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#00e676]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* Left — Text */}
          <div className="flex flex-col gap-6 md:gap-8">

            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
              Available for Work
            </div>

            {/* Headline */}
            <div>
              <div className="flex items-center gap-4 mb-1">
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-black text-white leading-none tracking-tight">
                  I'm VATTEY
                </h1>
                <span className="text-4xl md:text-5xl">👋</span>
              </div>
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-none tracking-tight">
                <span className="text-[#00e676]">Software </span>{" "}
                <span className="text-white">Engineer</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-gray-400 font-normal text-base md:text-lg max-w-lg leading-relaxed">
             I build responsive and user-friendly web applications that combine clean design with practical functionality — turning ideas into efficient digital solutions through modern web technologies and problem-solving.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/#case-studies"
                className="inline-flex items-center gap-2 bg-[#00e676] hover:bg-[#00ff85] text-black font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200 hover:shadow-xl hover:shadow-[#00e676]/25 hover:-translate-y-0.5"
              >
                View Case Studies →
              </Link>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 border border-white/10 hover:border-white/30 text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-all duration-200 hover:bg-white/5"
              >
                Get in Touch
              </Link>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-white/5">
              <AnimatedStat value={50} suffix="+" label="Projects Completed" />
              <AnimatedStat value={3} suffix="+" label="Years Experience" />
              <AnimatedStat value={100} suffix="%" label="Client Satisfaction" />
            </div>
          </div>

          {/* Right — Image + Floating Cards */}
          <div className="relative hidden lg:flex justify-end items-center">

            {/* Main image */}
            <div className="relative w-[340px] h-[420px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
              <Image
                src={profileImg} 
                alt="VATTEY — Software Engineer"
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
            </div>

            {/* Floating card — Design Stack */}
            <div className="absolute -left-8 top-12 bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl w-44">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">Design Stack</p>
              <div className="flex flex-wrap gap-1.5">
                {["Figma", "Framer", "Principle", "Maze"].map((tool) => (
                  <span
                    key={tool}
                    className="text-[10px] bg-[#00e676]/10 text-[#00e676] px-2 py-0.5 rounded-full border border-[#00e676]/20"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating card — Rating */}
            <div className="absolute -left-4 bottom-16 bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[#00e676] text-lg font-black">4.9</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-[#00e676] text-xs">★</span>
                  ))}
                </div>
              </div>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest">Client Rating</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}