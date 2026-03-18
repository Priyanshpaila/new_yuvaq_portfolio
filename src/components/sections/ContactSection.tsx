"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, MoveRight, Send } from "lucide-react";
import emailjs from "@emailjs/browser";

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  projectDetails: string;
};

type SubmitStatus = "idle" | "loading" | "success" | "error";

export function ContactSection() {
  const [formData, setFormData] = useState<FormState>({
    firstName: "",
    lastName: "",
    email: "",
    projectDetails: "",
  });

  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const now = new Date();
    const formattedDate = `${String(now.getDate()).padStart(2, "0")}/${String(
      now.getMonth() + 1
    ).padStart(2, "0")}/${now.getFullYear()} at ${now.toLocaleTimeString(
      "en-IN",
      {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }
    )}`;

    const templateParams = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      fullName: `${formData.firstName} ${formData.lastName}`.trim(),
      email: formData.email,
      projectDetails: formData.projectDetails,
      message: formData.projectDetails,
      date: formattedDate,
    };

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("Missing EmailJS environment variables");
      }

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        projectDetails: "",
      });

      setTimeout(() => setStatus("idle"), 4000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="relative bg-black py-24">
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="mb-4 block font-mono text-sm tracking-widest text-cyan-400 uppercase">
              Contact
            </span>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Let&apos;s discuss your{" "}
              <span className="font-serif italic text-gray-500">
                architecture.
              </span>
            </h2>

            <p className="mb-12 text-lg leading-relaxed font-light text-white/50">
              Whether you need a complete enterprise system overhaul, a scalable
              SaaS MVP, or AI agent integration, our engineering team is ready
              to architect a solution.
            </p>

            <div className="space-y-6 border-l-2 border-white/10 pl-6">
              <div>
                <h4 className="mb-1 font-medium text-white">Direct Email</h4>
                <a
                  href="mailto:hello@yuvaq.com"
                  className="text-cyan-400 transition-colors hover:text-cyan-300"
                >
                  connect@yuvaq.com
                </a>
              </div>

              <div>
                <h4 className="mb-1 font-medium text-white">Headquarters</h4>
                <p className="text-white/50">
                  Nagpur, Maharashtra
                  <br />
                  (Remote globally)
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 md:p-10"
          >
            {status === "success" && (
              <div className="mb-6 flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-500/15 px-4 py-3 text-sm text-green-300">
                <CheckCircle size={18} />
                Inquiry sent successfully.
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 rounded-xl border border-red-500/40 bg-red-500/15 px-4 py-3 text-sm text-red-300">
                Something went wrong. Please try again.
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                    placeholder="John"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-white/70">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Work Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                  placeholder="john@company.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-white/70">
                  Project Details
                </label>
                <textarea
                  name="projectDetails"
                  rows={4}
                  required
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full resize-none rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-white transition-colors focus:border-cyan-500 focus:outline-none"
                  placeholder="Tell us about the scale, scope, and timeline..."
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-4 font-semibold text-black transition-colors hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "loading" ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-black border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Submit Inquiry
                    <MoveRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}