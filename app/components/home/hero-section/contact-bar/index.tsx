"use client";

import { useState } from "react";

/* ─── Types ──────────────────────────────────────────────────────── */
type FormState = {
  name: string;
  subject: string;
  message: string;
  budget: string;
};

type Status = "idle" | "sending" | "sent" | "error";

/* ─── Data ───────────────────────────────────────────────────────── */
const contactLinks = [
  {
    icon: "✉",
    label: "Email",
    value: "vattey@email.com",
    href: "mailto:vattey@email.com",
  },
  {
    icon: "in",
    label: "LinkedIn",
    value: "linkedin.com/in/vattey",
    href: "https://linkedin.com/in/vattey",
  },
  {
    icon: "⌥",
    label: "GitHub",
    value: "github.com/vattey",
    href: "https://github.com/vattey",
  },
  {
    icon: "☏",
    label: "Phone",
    value: "+1 (555) 000-0000",
    href: "tel:+15550000000",
  },
];

const budgets = [
  "< $1,000",
  "$1,000 – $5,000",
  "$5,000 – $15,000",
  "$15,000+",
  "Let's talk",
];

/* ─── Section Label ──────────────────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 bg-[#00e676]/10 border border-[#00e676]/20 text-[#00e676] text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-4">
      <span className="w-1.5 h-1.5 rounded-full bg-[#00e676]" />
      {text}
    </div>
  );
}

/* ─── Contact Page ───────────────────────────────────────────────── */
export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: "",
    subject: "",
    message: "",
    budget: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBudget = (val: string) => {
    setForm((prev) => ({ ...prev, budget: val }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Replace with your form submission logic (e.g. Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
  };

  return (
    <section className="relative py-20 bg-[#0a0a0a] border-t border-white/5 min-h-screen">

      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#00e676]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="mb-14">
          <SectionLabel text="Contact" />
          <h2 className="text-5xl font-black tracking-tight leading-none">
            Let's Work <span className="text-[#00e676]">Together.</span>
          </h2>
          <p className="text-gray-500 mt-4 text-base max-w-md leading-relaxed">
            Have a project in mind or just want to say hi? Fill out the form or
            reach out directly — I usually respond within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">

          {/* ── Form ── */}
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-8 md:p-10">
            {status === "sent" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <span className="text-5xl">✦</span>
                <h3 className="text-2xl font-black text-white">Message Sent!</h3>
                <p className="text-gray-500 text-sm max-w-xs">
                  Thanks for reaching out. I'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setStatus("idle"); setForm({ name: "", subject: "", message: "", budget: "" }); }}
                  className="mt-4 text-sm font-semibold text-[#00e676] border border-[#00e676]/25 bg-[#00e676]/6 px-5 py-2.5 rounded-lg hover:bg-[#00e676]/14 transition-colors duration-200"
                >
                  Send Another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">

                {/* Name + Subject */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Name <span className="text-[#00e676]">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#00e676]/40 focus:bg-[#00e676]/[0.03] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                      Subject <span className="text-[#00e676]">*</span>
                    </label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      placeholder="Project type or topic"
                      className="bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#00e676]/40 focus:bg-[#00e676]/[0.03] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Budget */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Budget Range
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => handleBudget(b)}
                        className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                          form.budget === b
                            ? "bg-[#00e676]/12 border-[#00e676]/30 text-[#00e676]"
                            : "border-white/10 text-gray-600 hover:text-white hover:border-white/25"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                    Message <span className="text-[#00e676]">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Tell me about your project, timeline, goals..."
                    className="bg-white/[0.03] border border-white/8 hover:border-white/15 focus:border-[#00e676]/40 focus:bg-[#00e676]/[0.03] rounded-xl px-4 py-3 text-sm text-white placeholder-gray-600 outline-none transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex items-center justify-center gap-2 bg-[#00e676] hover:bg-[#00ff85] disabled:opacity-60 text-black font-bold px-7 py-3.5 rounded-xl text-sm transition-all duration-200 hover:shadow-xl hover:shadow-[#00e676]/25 hover:-translate-y-0.5 self-start"
                >
                  {status === "sending" ? "Sending..." : "Send Message →"}
                </button>

              </form>
            )}
          </div>

          {/* ── Side Info ── */}
          <div className="flex flex-col gap-5">

            {/* Availability */}
            <div className="bg-[#00e676]/5 border border-[#00e676]/15 rounded-2xl p-6 flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00e676] animate-pulse" />
                <span className="text-sm font-bold text-[#00e676]">Available for Work</span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Currently accepting new projects. Typical response time is under 24 hours.
              </p>
            </div>

            {/* Contact Links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 bg-white/[0.02] hover:bg-[#00e676]/5 border border-white/8 hover:border-[#00e676]/20 rounded-xl px-5 py-4 transition-all duration-200"
                >
                  <span className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 text-[#00e676] text-sm font-bold group-hover:bg-[#00e676]/10 transition-colors duration-200 flex-shrink-0">
                    {link.icon}
                  </span>
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="text-[10px] text-gray-600 uppercase tracking-widest">{link.label}</span>
                    <span className="text-sm text-gray-300 group-hover:text-white transition-colors duration-200 truncate">
                      {link.value}
                    </span>
                  </div>
                  <span className="ml-auto text-gray-700 group-hover:text-[#00e676] transition-colors duration-200 text-xs">→</span>
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}