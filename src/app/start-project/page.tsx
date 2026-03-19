"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  Building2,
  CalendarClock,
  CheckCircle2,
  Mail,
  Phone,
  Sparkles,
  User,
} from "lucide-react";

const WHATSAPP_NUMBER = "918770047163";

const services = [
  "Custom Software",
  "SaaS Product",
  "AI Integration",
  "Web Platform",
  "Mobile App",
  "Cloud / DevOps",
];

const budgets = [
  "Below ₹50,000",
  "₹50,000 - ₹2,00,000",
  "₹2,00,000 - ₹5,00,000",
  "₹5,00,000+",
];

const timelines = [
  "As soon as possible",
  "Within 2 weeks",
  "Within 1 month",
  "Within 2-3 months",
  "Just exploring",
];

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  timeline: "",
  message: "",
};

function inputClassName(hasValue?: boolean) {
  return [
    "w-full rounded-2xl border px-4 py-3.5 text-white outline-none transition-all",
    "bg-white/[0.03] backdrop-blur-sm",
    hasValue ? "border-cyan-500/30" : "border-white/10",
    "placeholder:text-white/30",
    "focus:border-cyan-400 focus:bg-white/[0.045] focus:shadow-[0_0_0_4px_rgba(34,211,238,0.08)]",
  ].join(" ");
}

function chipClassName(active: boolean) {
  return [
    "rounded-full border px-4 py-2 text-sm transition-all",
    active
      ? "border-cyan-400 bg-cyan-500/15 text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.12)]"
      : "border-white/10 bg-white/[0.03] text-white/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-white",
  ].join(" ");
}

export default function StartProjectPage() {
  const [formData, setFormData] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const setField = (field: keyof FormState, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const text = `Hello YuvaQ, I want to discuss a project.

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
🏢 Company: ${formData.company || "Not specified"}
🛠️ Service Needed: ${formData.service || "Not specified"}
💰 Budget Range: ${formData.budget || "Not specified"}
⏳ Timeline: ${formData.timeline || "Not specified"}

📝 Project Details:
${formData.message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      text,
    )}`;

    window.open(url, "_blank", "noopener,noreferrer");

    setTimeout(() => {
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black pt-32 pb-16">
      {/* <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04]" /> */}
      <div className="pointer-events-none absolute left-1/2 top-20 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-0 bottom-0 h-[260px] w-[260px] rounded-full bg-purple-600/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1.5 text-xs tracking-[0.22em] text-cyan-300 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              Start a Project
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Let&apos;s shape your next{" "}
              <span className="font-serif italic text-gray-500">build.</span>
            </h1>

            <p className="mb-10 text-base leading-relaxed font-light text-white/60 sm:text-lg">
              Fill in your details and we’ll open WhatsApp with your inquiry
              prefilled, ready to send in one tap.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Fast response",
                  desc: "Perfect for quick project discussions and first-level requirement sharing.",
                },
                {
                  title: "Structured inquiry",
                  desc: "Service, budget, timeline, and project goals are all prefilled neatly.",
                },
                {
                  title: "Less back and forth",
                  desc: "You send one complete brief instead of multiple fragmented messages.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-sm"
                >
                  <div className="mb-1 flex items-center gap-2 text-white">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/50">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 md:p-10"
          >
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                Project Brief
              </h2>
              <p className="mt-2 text-sm text-white/50 sm:text-base">
                Share the essentials and continue directly on WhatsApp.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <User className="h-4 w-4 text-cyan-400" />
                  Contact details
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClassName(!!formData.name)}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Work Email</label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@company.com"
                        className={`${inputClassName(!!formData.email)} pl-11`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-5 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/60">
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className={`${inputClassName(!!formData.phone)} pl-11`}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-white/60">Company</label>
                    <div className="relative">
                      <Building2 className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Your company"
                        className={`${inputClassName(!!formData.company)} pl-11`}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center gap-2 text-sm font-medium text-white/70">
                  <Briefcase className="h-4 w-4 text-cyan-400" />
                  Project scope
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-white/60">
                    Service Needed
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {services.map((service) => (
                      <button
                        key={service}
                        type="button"
                        onClick={() => setField("service", service)}
                        className={chipClassName(formData.service === service)}
                      >
                        {service}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm text-white/60">Budget Range</label>
                  <div className="flex flex-wrap gap-3">
                    {budgets.map((budget) => (
                      <button
                        key={budget}
                        type="button"
                        onClick={() => setField("budget", budget)}
                        className={chipClassName(formData.budget === budget)}
                      >
                        {budget}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm text-white/60">Timeline</label>
                  <div className="relative">
                    <CalendarClock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className={`${inputClassName(!!formData.timeline)} pl-11`}
                    >
                      <option value="" className="bg-black">
                        Select timeline
                      </option>
                      {timelines.map((timeline) => (
                        <option
                          key={timeline}
                          value={timeline}
                          className="bg-black"
                        >
                          {timeline}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-white/60">Project Details</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your idea, goals, timeline, required features, and anything important..."
                  className={inputClassName(!!formData.message)}
                />
                <p className="text-xs text-white/35">
                  The more specific your brief is, the better we can respond.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative isolate flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-black bg-black px-8 py-4 font-black text-white uppercase transition-all duration-700 hover:bg-white hover:text-black active:scale-95 active:duration-0 disabled:cursor-not-allowed"
              >
                <span className="absolute -left-full aspect-square w-full rounded-full bg-white transition-all duration-700 before:absolute before:inset-0 group-hover:left-0 group-hover:scale-150" />

                <span
                  className={`relative z-10 truncate transition-all duration-300 ${
                    isSubmitting
                      ? "-translate-x-96 opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                >
                  Continue on WhatsApp
                </span>

                <div
                  className={`absolute z-10 flex flex-row items-center justify-center gap-2 transition-all duration-300 ${
                    isSubmitting
                      ? "translate-x-0 opacity-100"
                      : "-translate-x-96 opacity-0"
                  }`}
                >
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                  <span className="text-black">Processing...</span>
                </div>

                <svg
                  className={`relative z-10 h-4 w-4 fill-white transition-all duration-700 group-hover:fill-black ${
                    isSubmitting
                      ? "translate-x-96 opacity-0"
                      : "translate-x-0 opacity-100"
                  }`}
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="m476.59 227.05-.16-.07L49.35 49.84A23.56 23.56 0 0 0 27.14 52 24.65 24.65 0 0 0 16 72.59v113.29a24 24 0 0 0 19.52 23.57l232.93 43.07a4 4 0 0 1 0 7.86L35.53 303.45A24 24 0 0 0 16 327v113.31A23.57 23.57 0 0 0 26.59 460a23.94 23.94 0 0 0 13.22 4 24.55 24.55 0 0 0 9.52-1.93L476.4 285.94l.19-.09a32 32 0 0 0 0-58.8z" />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
