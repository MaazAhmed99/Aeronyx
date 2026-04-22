"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Wind, Building2, Store, Leaf, ArrowRight } from "lucide-react";
import Header from "../components/Header";

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    title: "Commercial Building Installation",
    tag: "Coming Soon",
    tagColor: "bg-sky-100 text-sky-700",
    desc: "A full-scale hybrid wind and grid energy system designed for a multi-storey commercial complex in Central London, targeting 35% energy cost reduction.",
    highlights: ["250 kW capacity", "AI load balancing", "G99 grid compliant"],
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Retail Energy Optimization",
    tag: "Concept",
    tagColor: "bg-violet-100 text-violet-700",
    desc: "Intelligent energy management for a UK retail chain — reducing peak demand charges and enabling automated off-peak storage cycling.",
    highlights: ["Multi-site rollout", "Smart scheduling", "40% peak reduction"],
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60",
  },
  {
    title: "Farm Energy System",
    tag: "Pilot Project",
    tagColor: "bg-emerald-100 text-emerald-700",
    desc: "A pilot deployment combining small-scale wind turbines with app-based control for an agricultural operation in the Yorkshire Dales.",
    highlights: ["50 kW turbine", "Remote monitoring", "Off-grid capable"],
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop&q=60",
  },
];

export default function Projects() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-heading", { opacity: 0, y: 60, duration: 1.2, ease: "power3.out" });
      gsap.from(".hero-image", { opacity: 0, scale: 0.85, rotation: -3, duration: 1.5, delay: 0.3, ease: "back.out(1.7)" });
      gsap.from(".hero-badge", { opacity: 0, scale: 0.8, duration: 0.8, delay: 0.8, ease: "back.out(2)" });
      gsap.from(".hero-sub", { opacity: 0, y: 30, duration: 1, delay: 0.5, ease: "power2.out" });

      gsap.from(".project-card", {
        scrollTrigger: { trigger: ".projects-grid", start: "top 80%", toggleActions: "play none none none" },
        opacity: 0, y: 60, duration: 0.9, stagger: 0.2, ease: "power2.out", immediateRender: false,
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
        .project-card{transition:transform .45s cubic-bezier(.22,1,.36,1),box-shadow .45s}
        .project-card:hover{transform:translateY(-6px);box-shadow:0 20px 40px rgba(2,6,23,0.12)}
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
                <span className="inline-block bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full mb-5 tracking-wide uppercase">Projects</span>
                <h1 className="text-5xl lg:text-7xl font-black leading-[1.08] mb-6">
                  Our <span className="gradient-text">Projects</span>
                </h1>
              </div>
              <div className="hero-sub">
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  We are actively developing and deploying smart wind energy systems across multiple sectors.
                </p>
                <Link href="/contact" className="btn-primary text-white font-bold px-7 py-3 rounded-full inline-flex items-center gap-2">
                  Discuss Your Project <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
            <div className="hero-image relative">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] rounded-2xl border-2 border-amber-300/20" style={{ animation: "pulse-ring 3s ease-out infinite" }} />
              </div>
              <div className="hero-image-card glass-card rounded-2xl p-3 shadow-2xl relative hero-shimmer overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60"
                  alt="Construction project site"
                  width={600}
                  height={450}
                  className="rounded-xl w-full h-auto relative z-0"
                />
              </div>
              <div className="hero-badge absolute -bottom-4 -left-4 md:-left-8 glass-card rounded-2xl px-5 py-3 shadow-lg flex items-center gap-3">
                <div className="w-10 h-10 btn-primary rounded-xl flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-sm font-black">3 Active Projects</div>
                  <div className="text-xs text-slate-500">Across the UK</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="projects-grid space-y-10">
            {PROJECTS.map((p) => (
              <div key={p.title} className="project-card glass-card rounded-3xl overflow-hidden shadow-lg">
                <div className="grid md:grid-cols-2">
                  <div className="h-64 md:h-auto bg-cover bg-center" style={{ backgroundImage: `url(${p.image})` }} />
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <span className={`inline-block w-fit text-xs font-bold px-3 py-1 rounded-full mb-4 ${p.tagColor}`}>
                      {p.tag}
                    </span>
                    <h3 className="text-2xl font-bold mb-3">{p.title}</h3>
                    <p className="text-slate-600 leading-relaxed mb-6">{p.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {p.highlights.map((h) => (
                        <span key={h} className="bg-slate-100 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-full">{h}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <div className="glass-card rounded-3xl p-12 shadow-xl relative overflow-hidden">
            <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle,#0ea5e9,transparent 70%)" }} />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full opacity-15 pointer-events-none" style={{ background: "radial-gradient(circle,#6366f1,transparent 70%)" }} />
            <h2 className="text-3xl lg:text-4xl font-black mb-4 relative z-10">Have a Project in Mind?</h2>
            <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto relative z-10">
              Whether you&apos;re exploring renewable energy or ready to deploy, we&apos;d love to hear from you.
            </p>
            <Link href="/contact" className="btn-primary text-white font-bold px-8 py-3.5 rounded-full text-lg inline-flex items-center gap-2 relative z-10">
              Get in Touch <ArrowRight className="w-5 h-5" />
            </Link>
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
