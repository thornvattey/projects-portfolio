"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

/* ─── Types ──────────────────────────────────────────────────────── */
type Category = "all" | "mobile" | "web" | "saas" | "branding";

interface Outcome {
  value: string;
  label: string;
}

interface CaseStudy {
  id: number;
  title: string;
  description: string;
  category: Exclude<Category, "all">;
  categoryLabel: string;
  tags: string[];
  year: string;
  href: string;
  featured?: boolean;
  outcomes?: Outcome[];
  accentColor: string;
  image?: string; // path to image; falls back to placeholder
}

/* ─── Data ───────────────────────────────────────────────────────── */
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    title: "Analytics Dashboard Redesign for FinCore",
    description:
      "Redesigned a complex financial analytics platform from the ground up — simplifying 80+ screens into an intuitive, data-dense dashboard that reduced user onboarding time by 60%.",
    category: "saas",
    categoryLabel: "SaaS · Featured",
    tags: ["Figma", "Design System", "Data Viz", "User Research"],
    year: "2024",
    href: "/case-studies/fincore",
    featured: true,
    outcomes: [
      { value: "60%", label: "Faster onboarding" },
      { value: "34%", label: "Drop-off reduced" },
      { value: "200k", label: "Active users" },
    ],
    accentColor: "from-[#00e676] to-[#00c853]",
  },
  {
    id: 2,
    title: "Wellness App — Calm & Track",
    description:
      "End-to-end iOS app design for a mental wellness startup. From user research to handoff in 6 weeks.",
    category: "mobile",
    categoryLabel: "Mobile App",
    tags: ["iOS", "Prototyping", "Wellness"],
    year: "2023",
    href: "/case-studies/calm-track",
    accentColor: "from-[#b464ff] to-[#7c3aed]",
  },
  {
    id: 3,
    title: "Luxury E-commerce Revamp — Aurèle",
    description:
      "Redesigned checkout flow and product pages for a luxury fashion brand, lifting conversion by 28%.",
    category: "web",
    categoryLabel: "Web · E-commerce",
    tags: ["E-commerce", "Conversion", "Luxury"],
    year: "2023",
    href: "/case-studies/aurele",
    accentColor: "from-[#f59e0b] to-[#d97706]",
  },
  {
    id: 4,
    title: "Brand Identity System — Novae Labs",
    description:
      "Full brand identity including logo, typography, color system, and a 60-page brand guideline document.",
    category: "branding",
    categoryLabel: "Branding · Identity",
    tags: ["Branding", "Logo", "Guidelines"],
    year: "2022",
    href: "/case-studies/novae-labs",
    accentColor: "from-[#06b6d4] to-[#0891b2]",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Mobile App", value: "mobile" },
  { label: "Web", value: "web" },
  { label: "SaaS", value: "saas" },
  { label: "Branding", value: "branding" },
];

/* ─── Sub-components ─────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]" />
      {text}
    </div>
  );
}

/* ─── Featured Card ──────────────────────────────────────────────── */
function FeaturedCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={cs.href}
      className="group grid grid-cols-1 lg:grid-cols-2 rounded-2xl border border-white/7 overflow-hidden hover:border-[#00e676]/25 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#111] min-h-[280px] lg:min-h-[340px]">
        {cs.image ? (
          <Image
            src={cs.image}
            alt={cs.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0d1f14] to-[#061209]">
            <span className="text-[#00e676]/20 text-8xl font-black tracking-tighter select-none">
              {String(cs.id).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/70 via-transparent to-transparent" />
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cs.accentColor}`} />
      </div>

      {/* Body */}
      <div className="flex flex-col justify-center gap-5 p-8 lg:p-10 bg-white/[0.015] group-hover:bg-[#00e676]/[0.04] transition-colors duration-300">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-[#333] tracking-widest">
            {String(cs.id).padStart(2, "0")}
          </span>
          <span className="w-5 h-px bg-[#333]" />
          <span className="text-[10px] font-bold text-[#555] uppercase tracking-widest">
            {cs.categoryLabel}
          </span>
        </div>

        <h3 className="text-2xl lg:text-3xl font-black text-white leading-tight tracking-tight">
          {cs.title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed max-w-md">{cs.description}</p>

        {/* Outcomes */}
        {cs.outcomes && (
          <div className="flex flex-wrap gap-3">
            {cs.outcomes.map((o) => (
              <div
                key={o.label}
                className="bg-[#00e676]/8 border border-[#00e676]/20 rounded-xl px-4 py-2.5 flex flex-col gap-0.5"
              >
                <span className="text-xl font-black text-[#00e676] leading-none tracking-tight">
                  {o.value}
                </span>
                <span className="text-[10px] text-gray-600">{o.label}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-white/4 text-gray-500 px-3 py-1 rounded-full border border-white/8"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-[#00e676] flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
            View Case Study →
          </span>
          <span className="text-xs text-[#333]">{cs.year}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Regular Card ───────────────────────────────────────────────── */
function RegularCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={cs.href}
      className="group flex flex-col rounded-2xl border border-white/7 overflow-hidden hover:border-[#00e676]/25 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#111] h-52">
        {cs.image ? (
          <Image
            src={cs.image}
            alt={cs.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#111] to-[#0a0a0a]">
            <span className="text-white/5 text-8xl font-black tracking-tighter select-none">
              {String(cs.id).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 via-transparent to-transparent" />
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cs.accentColor}`} />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 p-6 bg-white/[0.02] group-hover:bg-[#00e676]/[0.03] transition-colors duration-300 flex-1">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-[#333] tracking-widest">
            {String(cs.id).padStart(2, "0")}
          </span>
          <span className="w-5 h-px bg-[#333]" />
          <span className="text-[10px] font-bold text-[#555] uppercase tracking-widest">
            {cs.categoryLabel}
          </span>
        </div>

        <h3 className="text-lg font-black text-white leading-snug tracking-tight">{cs.title}</h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{cs.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {cs.tags.map((tag) => (
            <span
              key={tag}
              className="text-[10px] bg-white/4 text-gray-500 px-3 py-1 rounded-full border border-white/8"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-sm font-bold text-[#00e676] flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
            View Case Study →
          </span>
          <span className="text-xs text-[#333]">{cs.year}</span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Horizontal Card (branding / wide) ─────────────────────────── */
function HorizontalCard({ cs }: { cs: CaseStudy }) {
  return (
    <Link
      href={cs.href}
      className="group grid grid-cols-[220px_1fr] rounded-2xl border border-white/7 overflow-hidden hover:border-[#00e676]/25 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative overflow-hidden bg-[#111] min-h-[160px]">
        {cs.image ? (
          <Image
            src={cs.image}
            alt={cs.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#001a1a] to-[#000f0f]">
            <span className="text-white/5 text-7xl font-black tracking-tighter select-none">
              {String(cs.id).padStart(2, "0")}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/40" />
        <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${cs.accentColor}`} />
      </div>

      <div className="flex items-center justify-between gap-6 flex-wrap p-6 bg-white/[0.02] group-hover:bg-[#00e676]/[0.03] transition-colors duration-300">
        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-[#333] tracking-widest">
              {String(cs.id).padStart(2, "0")}
            </span>
            <span className="w-5 h-px bg-[#333]" />
            <span className="text-[10px] font-bold text-[#555] uppercase tracking-widest">
              {cs.categoryLabel}
            </span>
          </div>
          <h3 className="text-lg font-black text-white leading-snug tracking-tight">{cs.title}</h3>
          <p className="text-sm text-gray-500 leading-relaxed">{cs.description}</p>
          <div className="flex flex-wrap gap-1.5">
            {cs.tags.map((tag) => (
              <span
                key={tag}
                className="text-[10px] bg-white/4 text-gray-500 px-3 py-1 rounded-full border border-white/8"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 flex-shrink-0">
          <span className="text-xs text-[#333]">{cs.year}</span>
          <span className="text-sm font-bold text-[#00e676] flex items-center gap-2 group-hover:gap-3 transition-all duration-200">
            View Case Study →
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ─── Case Studies Section ───────────────────────────────────────── */
export default function CaseStudiesPage() {
  const [active, setActive] = useState<Category>("all");

  const visible = caseStudies.filter(
    (cs) => active === "all" || cs.category === active
  );

  const featured = visible.find((cs) => cs.featured);
  const rest = visible.filter((cs) => !cs.featured);

  // Split rest into pairs (grid) vs wide (last if odd)
  const gridCards = rest.slice(0, 2);
  const wideCards = rest.slice(2);

  return (
    <section
      id="case-studies"
      className="relative py-20 bg-[#0a0a0a] border-t border-white/5"
    >
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <SectionLabel text="Case Studies" />
            <h2 className="text-5xl font-black tracking-tight leading-none">
              Selected <span className="text-[#00e676]">Work</span>
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#00e676] border border-[#00e676]/25 bg-[#00e676]/6 px-5 py-2.5 rounded-lg hover:bg-[#00e676]/14 transition-colors duration-200"
          >
            View All Projects →
          </Link>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                active === f.value
                  ? "bg-[#00e676]/12 border-[#00e676]/30 text-[#00e676]"
                  : "border-white/10 text-gray-600 hover:text-white hover:border-white/25"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-4">
          {featured && <FeaturedCard cs={featured} />}

          {gridCards.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gridCards.map((cs) => (
                <RegularCard key={cs.id} cs={cs} />
              ))}
            </div>
          )}

          {wideCards.map((cs) => (
            <HorizontalCard key={cs.id} cs={cs} />
          ))}
        </div>
      </div>
    </section>
  );
}