"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { Mail, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon, InstagramIcon } from "@/components/BrandIcons";
import { Profile } from "@/lib/types";

interface ContactSectionProps {
  profile: Profile;
}

export default function ContactSection({ profile }: ContactSectionProps) {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }, 600);
  };

  return (
    <section id="contact" className="py-24 relative bg-dot-grid border-t border-zinc-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Card Wrapper: BoardUI Crisp Card */}
          <div className="glass-card rounded-2xl p-8 sm:p-12 border border-zinc-200/90 shadow-xs relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 relative z-10">
              {/* Left Column: Direct Info */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-100 border border-zinc-200/80 mb-4 text-xs font-semibold text-zinc-800">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Get in Touch</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-zinc-950 tracking-tight leading-tight">
                  Let’s Build Something Amazing Together.
                </h2>

                <p className="text-zinc-600 text-sm sm:text-base mt-4 leading-relaxed">
                  Have a product idea, looking for an AI engineer or Sales Operations analyst, or want to collaborate on a high-impact project? Drop me a message anytime!
                </p>

                <div className="mt-8 space-y-3">
                  <a
                    href={`mailto:${profile.email}`}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-zinc-50 hover:bg-zinc-100 border border-zinc-200/80 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-zinc-950 text-white flex items-center justify-center shadow-2xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs text-zinc-500 font-medium block">Direct Email</span>
                      <span className="text-sm font-semibold text-zinc-950 group-hover:text-zinc-700 transition-colors">
                        {profile.email}
                      </span>
                    </div>
                  </a>
                </div>

                {/* Social Icons */}
                <div className="mt-8 flex items-center gap-2.5">
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-200/70 flex items-center justify-center text-zinc-700 transition-colors"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-200/70 flex items-center justify-center text-zinc-700 transition-colors"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </a>
                  {profile.twitter && (
                    <a
                      href={profile.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-200/70 flex items-center justify-center text-zinc-700 transition-colors"
                    >
                      <TwitterIcon className="w-4 h-4" />
                    </a>
                  )}
                  {profile.instagram && (
                    <a
                      href={profile.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-950 hover:text-white border border-zinc-200/70 flex items-center justify-center text-zinc-700 transition-colors"
                    >
                      <InstagramIcon className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="bg-white p-6 sm:p-7 rounded-xl border border-zinc-200/90 shadow-2xs">
                {submitted ? (
                  <div className="text-center py-12 flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold text-zinc-950">Message Sent!</h3>
                    <p className="text-zinc-600 text-sm mt-2 max-w-xs">
                      Terima kasih! Pesan kamu sudah terkirim, saya akan segera membalasnya secepat mungkin.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormState({ name: "", email: "", message: "" });
                      }}
                      className="mt-6 px-4 py-2 rounded-lg text-xs font-medium bg-zinc-100 hover:bg-zinc-200 text-zinc-800"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-800 mb-1.5">
                        Message / Project Scope
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        placeholder="Tell me about your idea or project..."
                        className="w-full px-3.5 py-2.5 rounded-lg border border-zinc-200 bg-white text-sm text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 rounded-xl bg-zinc-950 hover:bg-zinc-800 text-white font-semibold text-sm border border-zinc-950 shadow-xs transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {loading ? (
                        <span>Mengirim...</span>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
