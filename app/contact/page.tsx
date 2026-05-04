"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Wind, Mail, MapPin, Phone } from "lucide-react";
import Header from "../components/Header";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", { opacity: 0, y: 60, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-image", { opacity: 0, scale: 0.85, rotation: -3, duration: 1.5, delay: 0.3, ease: "back.out(1.7)" });
      gsap.from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.8, delay: 0.8, ease: "back.out(2)" });
      gsap.from(".hero-sub", { opacity: 0, y: 30, duration: 1, delay: 0.5, ease: "power2.out" });

      gsap.from(".info-card", {
        scrollTrigger: { trigger: ".info-grid", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".contact-form", {
        scrollTrigger: { trigger: ".contact-form", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 50, duration: 1, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".footer-section", {
        scrollTrigger: { trigger: ".footer-section", start: "top 95%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 1, ease: "power2.out", immediateRender: false,
      });

      ScrollTrigger.refresh();
    }, containerRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const fd = new FormData(form);
    const name = (fd.get("name") as string) || "";
    const email = (fd.get("email") as string) || "";
    const company = (fd.get("company") as string) || "";
    const message = (fd.get("message") as string) || "";
    const subject = encodeURIComponent(`Website message from ${name || email}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company}\n\nMessage:\n${message}`);
    const mailto = `mailto:info@aeronyx.com?subject=${subject}&body=${body}`;
    // Open user's mail client to forward the message to the site email
    window.location.href = mailto;
    setSubmitted(true);
  };

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-900 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: "100vh" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      <style>{`
        html,body,#__next{height:100%}
        *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box}
        .glass-card{background:rgba(255,255,255,0.62);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.82)}
        .glass-dark{background:rgba(15,23,42,0.78);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);border:1px solid rgba(255,255,255,0.09)}
        .nav-pill{background:rgba(255,255,255,0.58);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.88)}
        .btn-primary{background:linear-gradient(135deg,#0ea5e9,#6366f1);box-shadow:0 8px 24px rgba(14,165,233,0.38);transition:all .25s cubic-bezier(.22,1,.36,1)}
        .btn-primary:hover{transform:translateY(-2px);box-shadow:0 14px 36px rgba(14,165,233,0.52)}
        .gradient-text{background:linear-gradient(135deg,#0ea5e9,#6366f1);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text}
        .hero-bg{background:linear-gradient(145deg,#dbeafe 0%,#bae6fd 38%,#d1fae5 100%)}
        .orb{position:absolute;border-radius:50%;pointer-events:none}
        .float-a{animation:floatA 5s ease-in-out infinite}
        .float-b{animation:floatB 6.5s ease-in-out 1s infinite}
        @keyframes floatA{0%,100%{transform:translateY(0)}50%{transform:translateY(-16px)}}
        @keyframes floatB{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes floatC{0%,100%{transform:translateY(0)}50%{transform:translateY(-22px)}}
        @keyframes heroFloat{0%,100%{transform:translateY(0) rotate(0deg)}50%{transform:translateY(-12px) rotate(.5deg)}}
        @keyframes heroGlow{0%,100%{box-shadow:0 20px 60px rgba(14,165,233,0.15),0 0 0 0 rgba(14,165,233,0)}50%{box-shadow:0 28px 80px rgba(14,165,233,0.25),0 0 40px 4px rgba(99,102,241,0.08)}}
        @keyframes shimmer{0%{background-position:-200% 0}100%{background-position:200% 0}}
        @keyframes pulse-ring{0%{transform:scale(.95);opacity:1}100%{transform:scale(1.15);opacity:0}}
        .hero-image-card{animation:heroFloat 6s ease-in-out infinite,heroGlow 4s ease-in-out infinite}
        .hero-shimmer::after{content:'';position:absolute;inset:0;border-radius:16px;background:linear-gradient(105deg,transparent 40%,rgba(255,255,255,0.35) 50%,transparent 60%);background-size:200% 100%;animation:shimmer 3.5s ease-in-out infinite;pointer-events:none;z-index:1}
        .dot-grid{background-image:radial-gradient(circle,rgba(14,165,233,0.12) 1.5px,transparent 1.5px);background-size:32px 32px}
        .float-c{animation:floatC 4.5s ease-in-out .5s infinite}
      `}</style>

      <Header />

      {/* Hero */}
      <section className="relative hero-bg pt-28 pb-20 overflow-hidden">
        <div className="orb w-[650px] h-[650px] -top-24 -right-24 float-a" style={{ background: "radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 65%)", filter: "blur(80px)" }} />
        <div className="orb w-[450px] h-[450px] bottom-0 -left-20 float-b" style={{ background: "radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 65%)", filter: "blur(70px)" }} />
        <div className="orb w-[320px] h-[320px] top-1/3 left-1/3 float-c" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="absolute inset-0 dot-grid opacity-60" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="hero-heading">
                <span className="inline-block bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">Contact</span>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.08] mb-6">
                  Get in <span className="gradient-text">Touch</span>
                </h1>
              </div>
              <div className="hero-sub">
                <p className="text-xl text-slate-600 leading-relaxed">
                  Have a question or ready to start your renewable energy journey? We&apos;d love to hear from you.
                </p>
              </div>
            </div>
            <div className="hero-image relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] rounded-2xl border-2 border-rose-300/20" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
              </div>
              <div className="hero-image-card glass-card rounded-2xl p-3 shadow-2xl relative hero-shimmer overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=800&auto=format&fit=crop&q=60"
                  alt="Contact us"
                  width={600}
                  height={450}
                  className="rounded-xl w-full h-auto relative z-0"
                />
              </div>
              <div className="hero-badge absolute -bottom-4 -left-4 md:-left-8 glass-card rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black">24hr Response</div>
                  <div className="text-xs text-slate-500">We&apos;re Here to Help</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="info-grid grid md:grid-cols-3 gap-6">
            <div className="info-card glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-sky-500" />
              </div>
              <h3 className="font-bold mb-1">Email</h3>
              <p className="text-slate-600 text-sm">info@aeronyx.com</p>
            </div>
              <div className="info-card glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-violet-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-violet-500" />
              </div>
              <h3 className="font-bold mb-1">Phone</h3>
              <p className="text-slate-600 text-sm">+447737901559</p>
            </div>
            <div className="info-card glass-card rounded-2xl p-6 text-center">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-emerald-500" />
              </div>
              <h3 className="font-bold mb-1">Location</h3>
              <p className="text-slate-600 text-sm">London, UK</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="pb-24">
        <div className="max-w-2xl mx-auto px-6 md:px-12">
          <div className="contact-form glass-card rounded-3xl p-8 lg:p-12 shadow-xl">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-slate-600">We&apos;ve received your message and will get back to you shortly.</p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-6 text-center">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1.5">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                      placeholder="Your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                      placeholder="you@company.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-slate-700 mb-1.5">Company</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all"
                      placeholder="Your company (optional)"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition-all resize-none"
                      placeholder="Tell us about your project or inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary text-white font-bold py-3.5 rounded-xl text-lg"
                  >
                    Send Message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center"><Wind className="w-5 h-5 text-white" /></div>
                <span className="text-xl font-black tracking-tight">Aero<span className="gradient-text">nyx</span></span>
              </div>
              <p className="text-slate-400 leading-relaxed">Engineering the future of renewable energy with intelligent wind turbine solutions.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/solutions" className="hover:text-white transition-colors">Solutions</Link></li>
                <li><Link href="/technology" className="hover:text-white transition-colors">Technology</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Explore</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/projects" className="hover:text-white transition-colors">Projects</Link></li>
                <li><Link href="/partners" className="hover:text-white transition-colors">Partners</Link></li>
                <li><Link href="/investors" className="hover:text-white transition-colors">Investors</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4"><button className="btn-primary text-white font-bold px-6 py-2 rounded-full">Get a Quote</button></div>
              <p className="text-slate-400 text-sm mt-4">Ready to transform your energy infrastructure?</p>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2026 Aeronyx. All rights reserved. Engineering the future of energy.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
