"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import imageProfile from "@/src/assets/images/_profile.jpeg";

/* ─── Animation Hook ──────────────────────────────────────────────── */
function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, isVisible };
}

/* ─── Scroll Section Component ──────────────────────────────────────────────── */
function ScrollSection({ children }: { children: (props: { isVisible: boolean }) => React.ReactNode }) {
  const { ref, isVisible } = useScrollAnimation();
  return <div ref={ref}>{children({ isVisible })}</div>;
}

/* ─── Types ──────────────────────────────────────────────────────── */
interface Skill {
  name: string;
  level: number;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
  tags: string[];
}

interface Service {
  icon: string;
  title: string;
  description: string;
}

/* ─── Data ───────────────────────────────────────────────────────── */
const skills: Skill[] = [
  { name: "UI Design", level: 95 },
  { name: "UX Research", level: 88 },
  { name: "Figma", level: 97 },
  { name: "Prototyping", level: 90 },
  { name: "Design Systems", level: 85 },
  { name: "Framer", level: 78 },
];

const experiences: Experience[] = [
  {
    role: "Senior UI/UX Designer",
    company: "Acme Studio",
    period: "2023 — Present",
    description:
      "Led end-to-end design for a SaaS dashboard used by 200k+ users. Built and maintained the company's design system from scratch.",
    tags: ["Figma", "Design System", "SaaS"],
  },
  {
    role: "Product Designer",
    company: "Pixel Labs",
    period: "2021 — 2023",
    description:
      "Designed mobile-first e-commerce experiences and ran user research sessions that reduced checkout drop-off by 34%.",
    tags: ["Mobile", "E-commerce", "User Research"],
  },
  {
    role: "UI Designer",
    company: "Freelance",
    period: "2020 — 2021",
    description:
      "Delivered branding and interface design for 15+ startups across fintech, health, and edtech verticals.",
    tags: ["Branding", "Fintech", "Edtech"],
  },
];

const services: Service[] = [
  {
    icon: "✦",
    title: "UI Design",
    description:
      "Pixel-perfect interfaces that balance aesthetics and usability across web and mobile platforms.",
  },
  {
    icon: "◈",
    title: "UX Research",
    description:
      "User interviews, usability testing, and journey mapping to ground every decision in real data.",
  },
  {
    icon: "⬡",
    title: "Design Systems",
    description:
      "Scalable component libraries and token-based systems that keep teams aligned and shipping faster.",
  },
  {
    icon: "◎",
    title: "Prototyping",
    description:
      "High-fidelity interactive prototypes in Figma and Framer to validate ideas before a single line of code.",
  },
];

/* ─── Skill Bar ──────────────────────────────────────────────────── */
function SkillBar({ name, level }: Skill) {
  const [width, setWidth] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setWidth(level), 100);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div ref={ref} className="flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-300">{name}</span>
        <span className="text-xs font-bold text-[#00e676]">{level}%</span>
      </div>
      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <div
          className="h-full bg-[#00e676] rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

/* ─── Section Label ──────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-5">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]" />
      {text}
    </div>
  );
}

/* ─── About Page ─────────────────────────────────────────────────── */
export default function AboutPage() {
  const introRef = useRef<HTMLDivElement>(null);
  const [introVisible, setIntroVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (introRef.current) observer.observe(introRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="bg-[#0a0a0a] min-h-screen text-white">

      {/* Shared grid bg */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* ── INTRO ───────────────────────────────────────────────────── */}
      <section id='about' ref={introRef} className="relative pt-24 pb-20 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/3 w-[500px] h-[500px] bg-[#00e676]/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className="flex flex-col gap-7">
              <div className={`transition-all duration-700 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <SectionLabel text="About Me" />
              </div>

              <div className={`transition-all duration-700 delay-100 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight mb-3">
                  Designing with{" "}
                  <span className="text-[#00e676]">Purpose</span>
                </h1>
                <h1 className="text-5xl md:text-6xl font-black leading-none tracking-tight text-gray-600">
                  & Precision.
                </h1>
              </div>

              <p className={`text-gray-400 text-base md:text-lg leading-relaxed max-w-lg transition-all duration-700 delay-200 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                I’m littlefish, a software engineer with experience building responsive and scalable web applications for enterprise systems and internal business tools. I focus on writing clean, maintainable code and turning complex requirements into simple, usable interfaces.
              </p>

              <p className={`text-gray-500 text-base leading-relaxed max-w-lg transition-all duration-700 delay-300 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                My process starts with understanding real user and business needs, continues through iterative development and API integration, and ends with reliable, production-ready web applications. I’ve worked across domains like banking systems, management platforms, and internal reporting tools using modern frontend technologies.
              </p>

              <div className={`flex flex-wrap gap-4 pt-2 transition-all duration-700 delay-300 ${introVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                <Link
                  href="/#case-studies"
                  className="inline-flex items-center gap-2 bg-[#00e676] hover:bg-[#00ff85] text-black font-bold px-7 py-3.5 rounded-lg text-sm transition-all duration-200 hover:shadow-xl hover:shadow-[#00e676]/25 hover:-translate-y-0.5"
                >
                  View Case Studies →
                </Link>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 border border-white/10 hover:border-white/30 text-white font-medium px-7 py-3.5 rounded-lg text-sm transition-all duration-200 hover:bg-white/5"
                >
                  Download CV ↓
                </a>
              </div>
            </div>

            {/* Right — Photo */}
            <div className={`relative hidden lg:flex justify-center transition-all duration-700 ${introVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-5"}`}>
              <div className="relative w-[320px] h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/50">
                <Image
                  src={imageProfile}
                  alt="Sruthi — UI/UX Designer"
                  fill
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/50 via-transparent to-transparent" />
              </div>

              {/* Floating — location */}
              <div className="absolute -left-6 top-10 bg-[#111]/90 backdrop-blur-md border border-white/10 rounded-xl px-4 py-3 shadow-xl transition-all duration-300">
                <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-1">Based in</p>
                <p className="text-sm font-semibold text-white">India 🇮🇳</p>
              </div>

              {/* Floating — open to work */}
              <div className="absolute -right-6 bottom-16 bg-[#111]/90 backdrop-blur-md border border-[#00e676]/20 rounded-xl px-4 py-3 shadow-xl transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                  <p className="text-sm font-semibold text-[#00e676]">Open to Work</p>
                </div>
                <p className="text-[10px] text-gray-500 mt-1">Remote & On-site</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILLS ──────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollSection>
            {({ isVisible }) => (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                <div className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                  <SectionLabel text="Skills" />
                  <h2 className="text-4xl font-black tracking-tight mb-4">
                    Tools I <span className="text-[#00e676]">Master</span>
                  </h2>
                  <p className="text-gray-500 text-base leading-relaxed max-w-md">
                    A focused set of skills sharpened through real-world projects,
                    constant learning, and an obsession with craft.
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {skills.map((skill, index) => (
                    <div key={skill.name} className={`transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`} style={{transitionDelay: `${index * 50}ms`}}>
                      <SkillBar {...skill} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollSection>
        </div>
      </section>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <ScrollSection>
            {({ isVisible }) => (
              <>
                <div className={`mb-12 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}>
                  <SectionLabel text="What I Do" />
                  <h2 className="text-4xl font-black tracking-tight">
                    Services I <span className="text-[#00e676]">Offer</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {services.map((s, index) => (
                    <div
                      key={s.title}
                      className={`group bg-white/[0.03] hover:bg-[#00e676]/5 border border-white/8 hover:border-[#00e676]/20 rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#00e676]/10 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
                      style={{transitionDelay: `${index * 50}ms`}}
                    >
                      <span className="text-2xl text-[#00e676] group-hover:scale-125 transition-transform duration-300">{s.icon}</span>
                      <h3 className="text-base font-bold text-white">{s.title}</h3>
                      <p className="text-sm text-gray-500 leading-relaxed">{s.description}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </ScrollSection>
        </div>
      </section>

      {/* ── EXPERIENCE ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 animate-fadeInUp">
            <SectionLabel text="Experience" />
            <h2 className="text-4xl font-black tracking-tight">
              Where I've <span className="text-[#00e676]">Worked</span>
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {experiences.map((exp, i) => (
              <div
                key={i}
                style={{animationDelay: `${i * 0.1}s`}}
                className="group grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 bg-white/[0.03] hover:bg-[#00e676]/5 border border-white/8 hover:border-[#00e676]/20 rounded-2xl p-6 md:p-8 transition-all duration-300 hover:scale-102 hover:shadow-lg hover:shadow-[#00e676]/10 animate-fadeInUp"
              >
                {/* Left */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-gray-600 uppercase tracking-widest">{exp.period}</span>
                  <span className="text-sm font-semibold text-[#00e676]">{exp.company}</span>
                </div>

                {/* Right */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{exp.description}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] bg-[#00e676]/10 text-[#00e676] px-3 py-1 rounded-full border border-[#00e676]/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ──────────────────────────────────────────────── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative rounded-3xl border border-[#00e676]/15 bg-[#00e676]/5 overflow-hidden px-8 py-16 md:px-16 text-center animate-scaleIn">
            {/* Glow */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,230,118,0.08)_0%,transparent_70%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full animate-fadeInUp">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00e676] animate-pulse" />
                Available for new projects
              </div>

              <h2 className="text-4xl md:text-5xl font-black tracking-tight max-w-xl animate-fadeInUp-delay-100">
                Let's build something{" "}
                <span className="text-[#00e676]">great together.</span>
              </h2>

              <p className="text-gray-500 text-base max-w-md leading-relaxed animate-fadeInUp-delay-200">
                Have a project in mind? I'd love to hear about it and see how I can help.
              </p>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-[#00e676] hover:bg-[#00ff85] text-black font-bold px-8 py-4 rounded-xl text-sm transition-all duration-200 hover:shadow-2xl hover:shadow-[#00e676]/25 hover:-translate-y-0.5 animate-fadeInUp-delay-300"
              >
                Start a Conversation →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}