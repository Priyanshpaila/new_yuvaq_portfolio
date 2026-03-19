"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "918770047163"; // replace with your number in international format, no + or spaces

type FormState = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
};

export default function StartProjectPage() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    company: "",
    service: "",
    budget: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const text = `Hello YuvaQ, I want to discuss a project.

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Company: ${formData.company}
Service Needed: ${formData.service}
Budget Range: ${formData.budget}

Project Details:
${formData.message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black pt-32 pb-16">
      <div className="pointer-events-none absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-[0.04]" />
      <div className="pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[320px] w-[320px] rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="container relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55 }}
            className="max-w-xl"
          >
            <span className="mb-4 block font-mono text-xs tracking-[0.22em] text-cyan-400 uppercase sm:text-sm">
              Start a Project
            </span>

            <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl">
              Let&apos;s start your next{" "}
              <span className="font-serif italic text-gray-500">build.</span>
            </h1>

            <p className="mb-10 text-base leading-relaxed font-light text-white/60 sm:text-lg">
              Fill in your details and we will open WhatsApp with your inquiry
              prefilled. You only need to press send.
            </p>

            <div className="space-y-5 border-l border-white/10 pl-5">
              <div>
                <div className="mb-1 text-sm font-medium text-white">Fast response</div>
                <p className="text-sm text-white/50">
                  Best for quick project discussions and requirements sharing.
                </p>
              </div>

              <div>
                <div className="mb-1 text-sm font-medium text-white">Direct WhatsApp handoff</div>
                <p className="text-sm text-white/50">
                  Your form data is added into the message automatically.
                </p>
              </div>

              <div>
                <div className="mb-1 text-sm font-medium text-white">Better project clarity</div>
                <p className="text-sm text-white/50">
                  Share scope, budget, and timeline in one structured message.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="rounded-[32px] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Work Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Company</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Your company"
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Service Needed</label>
                  <select
                    name="service"
                    required
                    value={formData.service}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="" className="bg-black">
                      Select a service
                    </option>
                    <option value="Custom Software Development" className="bg-black">
                      Custom Software Development
                    </option>
                    <option value="SaaS Product Development" className="bg-black">
                      SaaS Product Development
                    </option>
                    <option value="AI Integration" className="bg-black">
                      AI Integration
                    </option>
                    <option value="Web Platform" className="bg-black">
                      Web Platform
                    </option>
                    <option value="Mobile App" className="bg-black">
                      Mobile App
                    </option>
                    <option value="Cloud / DevOps" className="bg-black">
                      Cloud / DevOps
                    </option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">Budget Range</label>
                  <select
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="" className="bg-black">
                      Select budget
                    </option>
                    <option value="Below ₹50,000" className="bg-black">
                      Below ₹50,000
                    </option>
                    <option value="₹50,000 - ₹2,00,000" className="bg-black">
                      ₹50,000 - ₹2,00,000
                    </option>
                    <option value="₹2,00,000 - ₹5,00,000" className="bg-black">
                      ₹2,00,000 - ₹5,00,000
                    </option>
                    <option value="₹5,00,000+" className="bg-black">
                      ₹5,00,000+
                    </option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">Project Details</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your idea, timeline, goals, and required features..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white placeholder:text-white/30 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-4 font-semibold text-white transition-all hover:shadow-[0_0_25px_rgba(6,182,212,0.35)]"
              >
                <MessageCircle className="h-5 w-5" />
                Continue on WhatsApp
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </main>
  );
}