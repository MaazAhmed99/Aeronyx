"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import {
  Wind, TrendingUp, Cpu, BarChart3, Layers, ArrowRight, CheckCircle2,
} from "lucide-react";
import Header from "../components/Header";

gsap.registerPlugin(ScrollTrigger);

/* ── Counter ── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
}

function Counter({ end, suffix = "", prefix = "", duration = 1800 }: { end: number; suffix?: string; prefix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, end, duration]);
  return <span ref={ref}>{prefix}{val}{suffix}</span>;
}

const HIGHLIGHTS = [
  { icon: TrendingUp, title: "Growing Renewable Market", desc: "The UK renewable energy market is projected to double by 2030 — Aeronyx is positioned at the forefront of this growth." },
  { icon: Cpu, title: "Smart Energy Technology", desc: "Our proprietary AI-driven platform sets us apart from traditional energy providers with real-time optimization." },
  { icon: Layers, title: "Scalable Business Model", desc: "Modular systems mean we can scale from single-site deployments to nationwide infrastructure rapidly." },
  { icon: BarChart3, title: "Multiple Revenue Streams", desc: "Installation services, monitoring subscriptions, energy trading, and maintenance contracts diversify our income." },
];

export default function Investors() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", { opacity: 0, y: 60, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-image", { opacity: 0, scale: 0.85, rotation: -3, duration: 1.5, delay: 0.3, ease: "back.out(1.7)" });
      gsap.from(".hero-text", { opacity: 0, y: 40, duration: 1, delay: 0.5, ease: "power2.out" });
      gsap.from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.8, delay: 0.8, ease: "back.out(2)" });

      gsap.from(".stat-item", {
        scrollTrigger: { trigger: ".stats-bar", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 0.7, stagger: 0.1, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".section-heading", {
        scrollTrigger: { trigger: ".highlights-grid", start: "top 90%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.9, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".highlight-card", {
        scrollTrigger: { trigger: ".highlights-grid", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 50, duration: 0.8, stagger: 0.15, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".cta-section", {
        scrollTrigger: { trigger: ".cta-section", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 1, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".footer-section", {
        scrollTrigger: { trigger: ".footer-section", start: "top 95%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 1, ease: "power2.out", immediateRender: false,
      });

      ScrollTrigger.refresh();
    }, containerRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach((t) => t.kill()); };
  }, []);

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
        .float-c{animation:floatC 4.5s ease-in-out .5s infinite}
        .highlight-card{transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s}
        .highlight-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 40px rgba(2,6,23,0.12)}
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
      `}</style>

      <Header />

      {/* ═══ HERO ═══ */}
      <section className="relative hero-bg pt-28 pb-20 overflow-hidden">
        <div className="orb w-[650px] h-[650px] -top-24 -right-24 float-a" style={{ background: "radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 65%)", filter: "blur(80px)" }} />
        <div className="orb w-[450px] h-[450px] bottom-0 -left-20 float-b" style={{ background: "radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 65%)", filter: "blur(70px)" }} />
        <div className="orb w-[320px] h-[320px] top-1/3 left-1/3 float-c" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="absolute inset-0 dot-grid opacity-60" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="hero-heading">
                <span className="inline-block bg-violet-100 text-violet-700 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">Investors</span>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.08] mb-6">
                  Investment <span className="gradient-text">Opportunities</span>
                </h1>
              </div>
              <div className="hero-text">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Aeronyx is building the next generation of intelligent renewable energy systems. We invite investors to be part of a scalable and future-ready energy solution.
                </p>
                <Link href="/contact" className="btn-primary text-white font-bold px-7 py-3 rounded-full inline-flex items-center gap-2">
                  Contact Investment Team <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="hero-image relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] rounded-2xl border-2 border-violet-300/20" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
              </div>
              <div className="hero-image-card glass-card rounded-2xl p-3 shadow-2xl relative hero-shimmer overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60"
                  alt="Investment meeting"
                  width={600}
                  height={450}
                  className="rounded-xl w-full h-auto relative z-0"
                />
              </div>
              <div className="hero-badge absolute -bottom-4 -left-4 md:-left-8 glass-card rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black">£50M+ Opportunity</div>
                  <div className="text-xs text-slate-500">Growing Market</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS WITH COUNTER ═══ */}
      <section className="stats-bar py-16 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="glass-card rounded-3xl p-10 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { end: 50, prefix: "£", suffix: "M+", label: "Market Opportunity" },
                { end: 98, suffix: "%", label: "Uptime Guarantee" },
                { end: 30, suffix: "%", label: "Avg Cost Savings" },
                { end: 40, suffix: "+", label: "UK Installations" },
              ].map((s) => (
                <div key={s.label} className="stat-item">
                  <div className="text-3xl lg:text-4xl font-black gradient-text mb-2">
                    <Counter end={s.end} suffix={s.suffix} prefix={s.prefix || ""} />
                  </div>
                  <div className="text-sm text-slate-600 font-semibold">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ HIGHLIGHTS ═══ */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="section-heading text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Why Invest in Aeronyx</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">A compelling combination of market timing, technology edge, and scalable growth.</p>
          </div>
          <div className="highlights-grid grid md:grid-cols-2 gap-8">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="highlight-card glass-card rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle,#0ea5e9,transparent 70%)" }} />
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center mb-6">
                  <h.icon className="w-7 h-7 text-sky-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">{h.title}</h3>
                <p className="text-slate-600 leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="cta-section py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="glass-card rounded-3xl p-12 shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle,#0ea5e9,transparent 70%)" }} />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle,#6366f1,transparent 70%)" }} />
            <h2 className="text-3xl lg:text-4xl font-black mb-4 relative z-10">Contact Our Investment Team</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto relative z-10">
              Interested in learning more? Our team is ready to share our roadmap, financials, and partnership structures.
            </p>
            <Link href="/contact" className="btn-primary text-white font-bold px-8 py-3.5 rounded-full text-lg inline-flex items-center gap-2 relative z-10">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
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
