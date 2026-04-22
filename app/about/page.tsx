"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Wind, Target, Eye, Lightbulb, Leaf, Users, CheckCircle2 } from "lucide-react";
import Header from "../components/Header";

gsap.registerPlugin(ScrollTrigger);

/* ── Counter component (same as home) ── */
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

export default function AboutUs() {
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

      gsap.from(".mission-content", {
        scrollTrigger: { trigger: ".mission-section", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 50, duration: 1, ease: "power2.out", immediateRender: false,
      });
      gsap.from(".mission-image", {
        scrollTrigger: { trigger: ".mission-section", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, x: 60, duration: 1, delay: 0.2, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".vision-mission", {
        scrollTrigger: { trigger: ".vm-section", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 50, duration: 0.9, stagger: 0.2, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".values-card", {
        scrollTrigger: { trigger: ".values-section", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 0.8, stagger: 0.15, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".gallery-image", {
        scrollTrigger: { trigger: ".gallery-section", start: "top 85%", toggleActions: "play none none none" },
        opacity: 0, scale: 0.9, y: 30, duration: 0.8, stagger: 0.15, ease: "power2.out", immediateRender: false,
      });

      gsap.from(".footer-section", {
        scrollTrigger: { trigger: ".footer-section", start: "top 95%", toggleActions: "play none none none" },
        opacity: 0, y: 40, duration: 1, ease: "power2.out", immediateRender: false,
      });

      ScrollTrigger.refresh();
    }, containerRef);
    return () => { ctx.revert(); ScrollTrigger.getAll().forEach(t => t.kill()); };
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-900 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <style>{`
        html,body,#__next{height:100%}
        *{font-family:'Plus Jakarta Sans',sans-serif;box-sizing:border-box}
        .values-card{transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s}
        .values-card:hover{transform:translateY(-8px) scale(1.02);box-shadow:0 20px 40px rgba(2,6,23,0.12)}
        .glass-card{background:rgba(255,255,255,0.62);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border:1px solid rgba(255,255,255,0.82)}
        .glass-deep{background:rgba(255,255,255,0.26);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(255,255,255,0.52)}
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
        .flip-card{background-color:transparent;perspective:1000px}
        .flip-card-inner{position:relative;width:100%;height:100%;text-align:center;transition:transform .8s;transform-style:preserve-3d}
        .flip-card:hover .flip-card-inner{transform:rotateY(180deg)}
        .flip-card-front,.flip-card-back{position:absolute;width:100%;height:100%;-webkit-backface-visibility:hidden;backface-visibility:hidden;border-radius:24px;overflow:hidden}
        .flip-card-back{transform:rotateY(180deg);background:linear-gradient(135deg,rgba(14,165,233,0.9),rgba(99,102,241,0.9));color:#fff;display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px}
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

      {/* ═══ HERO BANNER ═══ */}
      <section className="relative hero-bg pt-28 pb-20 overflow-hidden">
        <div className="orb w-[650px] h-[650px] -top-24 -right-24 float-a" style={{ background: "radial-gradient(circle,rgba(14,165,233,0.18) 0%,transparent 65%)", filter: "blur(80px)" }} />
        <div className="orb w-[450px] h-[450px] bottom-0 -left-20 float-b" style={{ background: "radial-gradient(circle,rgba(99,102,241,0.14) 0%,transparent 65%)", filter: "blur(70px)" }} />
        <div className="orb w-[320px] h-[320px] top-1/3 left-1/3 float-c" style={{ background: "radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)", filter: "blur(55px)" }} />
        <div className="absolute inset-0 dot-grid opacity-60" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="hero-heading">
                <span className="inline-block bg-sky-100 text-sky-700 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">About Aeronyx</span>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.08] mb-6">
                  Engineering the <span className="gradient-text">Future</span> of Energy
                </h1>
              </div>
              <div className="hero-text">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  Aeronyx is a UK-based renewable energy company focused on delivering intelligent wind turbine solutions for modern infrastructure.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/solutions" className="btn-primary text-white font-bold px-7 py-3 rounded-full inline-flex items-center gap-2">
                    Our Solutions <span className="text-lg">→</span>
                  </Link>
                  <Link href="/contact" className="bg-white/80 text-slate-800 font-bold px-7 py-3 rounded-full inline-flex items-center gap-2 border border-slate-200 hover:bg-white transition-all">
                    Get in Touch
                  </Link>
                </div>
              </div>
            </div>

            <div className="hero-image relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] rounded-2xl border-2 border-sky-300/20" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
              </div>
              <div className="hero-image-card glass-card rounded-2xl p-3 shadow-2xl relative hero-shimmer overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=60"
                  alt="Wind Turbines at Sunset"
                  width={600}
                  height={450}
                  className="rounded-xl w-full h-auto relative z-0"
                />
              </div>
              <div className="hero-badge absolute -bottom-4 -left-4 md:-left-8 glass-card rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
                  <Wind className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black">Since 2020</div>
                  <div className="text-xs text-slate-500">Powering the UK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <section className="stats-bar py-16 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="glass-card rounded-3xl p-10 shadow-xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { end: 98, suffix: "%", label: "Uptime Guarantee" },
                { end: 40, suffix: "+", label: "UK Installations" },
                { end: 30, suffix: "%", label: "Avg Cost Savings" },
                { end: 50, prefix: "£", suffix: "M+", label: "Investment Secured" },
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

      {/* ═══ OUR MISSION ═══ */}
      <section className="mission-section relative py-28 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle,rgba(255,255,255,0.04) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="orb w-[500px] h-[500px] top-0 right-0" style={{ background: "radial-gradient(circle,rgba(14,165,233,0.12) 0%,transparent 70%)", filter: "blur(60px)" }} />
        <div className="orb w-[400px] h-[400px] bottom-0 left-0" style={{ background: "radial-gradient(circle,rgba(99,102,241,0.10) 0%,transparent 70%)", filter: "blur(50px)" }} />

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* Left: Content */}
            <div className="mission-content">
              <div className="inline-flex items-center gap-2 border border-emerald-500/30 bg-emerald-500/10 rounded-full px-4 py-1.5 mb-6">
                <Target className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-bold tracking-[0.12em] text-emerald-400 uppercase">Our Mission</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black leading-tight mb-6 text-white">
                Transforming How the <span className="gradient-text">World Powers</span> Itself
              </h2>
              <p className="text-lg text-slate-300 leading-relaxed mb-5">
                Founded in 2020, Aeronyx has been at the forefront of the green energy revolution. We integrate wind energy with existing grid systems using advanced load management technology.
              </p>
              <p className="text-lg text-slate-400 leading-relaxed mb-8">
                Our proprietary AI-driven algorithms ensure optimal energy distribution. By 2030, we aim to power 1 million homes with clean, renewable energy.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-8">
                {[
                  { label: "ISO 14001 Certified", icon: "✓" },
                  { label: "AI Energy Optimization", icon: "✓" },
                  { label: "G98/G99 UK Compliant", icon: "✓" },
                  { label: "Scalable & Modular", icon: "✓" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                    <span className="text-slate-300 text-sm font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
              <Link href="/solutions" className="btn-primary text-white font-bold px-7 py-3 rounded-full inline-flex items-center gap-2">
                Our Solutions <span className="text-lg">→</span>
              </Link>
            </div>

            {/* Right: Image stack */}
            <div className="mission-image relative">
              <div className="relative">
                {/* Main image */}
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 border border-white/10">
                  <Image src="https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=800&auto=format&fit=crop&q=60" alt="Wind turbines" width={600} height={400} className="w-full h-auto" />
                </div>
                {/* Floating stat card */}
                <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-6 py-4 shadow-xl border border-white/50">
                  <div className="text-3xl font-black gradient-text mb-1">
                    <Counter end={1} suffix="M" prefix="" />
                  </div>
                  <div className="text-xs text-slate-600 font-semibold">Homes by 2030</div>
                </div>
                {/* Floating image overlay */}
                <div className="absolute -top-6 -right-6 w-36 h-36 rounded-2xl overflow-hidden shadow-xl border-4 border-slate-900 float-b">
                  <Image src="https://images.unsplash.com/photo-1548337138-e87d889cc369?w=400&auto=format&fit=crop&q=60" alt="Wind turbine close-up" width={160} height={160} className="w-full h-full object-cover" />
                </div>
              </div>
              {/* Glow accent behind */}
              <div className="absolute inset-0 -z-10 rounded-2xl" style={{ background: "radial-gradient(circle at 50% 50%,rgba(14,165,233,0.08) 0%,transparent 70%)", transform: "scale(1.2)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VISION & MISSION ═══ */}
      <section className="vm-section py-24 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Vision & Mission</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Driving the renewable energy revolution with innovative technology and sustainable solutions.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="vision-mission glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><Eye className="w-8 h-8 text-sky-600" /></div>
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-slate-600 leading-relaxed">To redefine how energy is generated and managed globally, creating a sustainable future for generations to come. We envision a world where clean energy is accessible, affordable, and abundant.</p>
            </div>
            <div className="vision-mission glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6"><Target className="w-8 h-8 text-emerald-600" /></div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-slate-600 leading-relaxed">To deliver smart, scalable, and sustainable energy solutions that empower businesses and communities worldwide. Through innovation and partnership, we accelerate the transition to renewable energy.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CORE VALUES ═══ */}
      <section className="values-section py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Lightbulb, title: "Innovation", desc: "We push the boundaries of renewable energy technology, constantly developing new solutions to meet evolving needs.", color: "text-violet-500", bg: "bg-violet-100" },
              { icon: Leaf, title: "Sustainability", desc: "Every decision we make prioritizes environmental responsibility and long-term ecological balance.", color: "text-emerald-500", bg: "bg-emerald-100" },
              { icon: Users, title: "Partnership", desc: "We believe in collaboration, working closely with clients, communities, and stakeholders to achieve shared goals.", color: "text-rose-500", bg: "bg-rose-100" },
            ].map((v) => (
              <div key={v.title} className="values-card glass-card rounded-3xl p-8 shadow-xl text-center">
                <div className={`w-16 h-16 ${v.bg} rounded-2xl flex items-center justify-center mx-auto mb-6`}><v.icon className={`w-8 h-8 ${v.color}`} /></div>
                <h3 className="text-xl font-bold mb-4">{v.title}</h3>
                <p className="text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ OUR IMPACT ═══ */}
      <section className="gallery-section py-24 bg-white/50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Impact</h2>
            <p className="text-xl text-slate-600">See how we&apos;re transforming energy landscapes across the UK</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { front: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80", title: "Hybrid Systems", sub: "Combining solar and wind for maximum efficiency", backTitle: "Hybrid Integration", backDesc: "Our hybrid systems combine wind and solar power with intelligent load balancing, providing 24/7 renewable energy with 99.5% reliability.", tags: ["Solar + Wind", "AI Control"] },
              { front: "https://images.unsplash.com/photo-1532601224476-15c79f2f7a51?w=1200&auto=format&fit=crop&q=80", title: "Wind Farms", sub: "Large-scale renewable energy production", backTitle: "Commercial Wind Farms", backDesc: "From 5MW to 50MW installations, our wind farms deliver clean energy to industrial complexes and urban centers across the UK.", tags: ["5-50MW Scale", "G98/G99"] },
              { front: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?w=1200&auto=format&fit=crop&q=80", title: "Smart Grids", sub: "Intelligent energy distribution systems", backTitle: "Smart Grid Technology", backDesc: "Our AI-powered grid management system optimizes energy flow, reduces losses by 40%, and ensures seamless integration.", tags: ["AI Optimization", "40% Loss Reduction"] },
            ].map((card) => (
              <div key={card.title} className="gallery-image flip-card h-80">
                <div className="flip-card-inner h-full">
                  <div className="flip-card-front glass-card rounded-3xl overflow-hidden shadow-xl h-full" style={{ backgroundImage: `url(${card.front})`, backgroundSize: "cover", backgroundPosition: "center" }}>
                    <div className="p-6 bg-gradient-to-t from-black/50 to-transparent h-full flex flex-col justify-end">
                      <h3 className="font-semibold mb-2 text-white">{card.title}</h3>
                      <p className="text-white/80 text-sm">{card.sub}</p>
                    </div>
                  </div>
                  <div className="flip-card-back rounded-3xl shadow-xl h-full">
                    <div className="p-6 flex flex-col justify-center h-full">
                      <h3 className="font-bold text-xl mb-4">{card.backTitle}</h3>
                      <p className="text-sm leading-relaxed mb-4">{card.backDesc}</p>
                      <div className="text-xs flex gap-2 justify-center">
                        {card.tags.map((t) => (<span key={t} className="bg-white/20 px-2 py-1 rounded-full">{t}</span>))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
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
