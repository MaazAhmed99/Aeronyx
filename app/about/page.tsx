"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { Wind, Menu, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = ["Home", "About", "Solutions", "Technology", "Projects", "Partners", "Investors", "Contact"];

export default function AboutUs() {
  const containerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animations
      gsap.from(".hero-heading", {
        opacity: 0,
        y: 60,
        duration: 1.2,
        ease: "power3.out",
      });
      gsap.from(".hero-image", {
        opacity: 0,
        scale: 0.8,
        rotation: -5,
        duration: 1.5,
        delay: 0.3,
        ease: "back.out(1.7)",
      });
      gsap.from(".hero-text", {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 0.6,
        ease: "power2.out",
      });

      // Content section animations with ScrollTrigger
      gsap.from(".content-section", {
        scrollTrigger: {
          trigger: ".content-section",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        immediateRender: false,
      });

      // Vision/Mission cards
      gsap.from(".vision-mission", {
        scrollTrigger: {
          trigger: ".vision-mission",
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        x: -60,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        immediateRender: false,
      });

      // Values cards
      gsap.from(".values-card", {
        scrollTrigger: {
          trigger: ".values-card",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        immediateRender: false,
      });

      // Image gallery
      gsap.from(".gallery-image", {
        scrollTrigger: {
          trigger: ".gallery-image",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        scale: 0.9,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        immediateRender: false,
      });

      // Footer animation
      gsap.from(".footer-section", {
        scrollTrigger: {
          trigger: ".footer-section",
          start: "top 95%",
          toggleActions: "play none none reverse",
        },
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power2.out",
        immediateRender: false,
      });

      // ensure ScrollTrigger measurements are correct after layout
      ScrollTrigger.refresh();
    }, containerRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="bg-slate-50 text-slate-900 overflow-x-hidden" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", minHeight: '100vh' }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />

      <style>{`
    /* ensure root takes full height to avoid dual scrollbars */
    html,body,#__next { height: 100%; }
    * { font-family:'Plus Jakarta Sans',sans-serif; box-sizing:border-box; }
        * { font-family:'Plus Jakarta Sans',sans-serif; box-sizing:border-box; }
        .values-card { transition: transform 0.45s cubic-bezier(.22,1,.36,1), box-shadow 0.45s; }
        .values-card:hover { transform: translateY(-8px) scale(1.02); box-shadow:0 20px 40px rgba(2,6,23,0.12); }
        .glass { background:rgba(255,255,255,0.52); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.78); }
        .glass-card { background:rgba(255,255,255,0.62); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.82); }
        .glass-deep { background:rgba(255,255,255,0.26); backdrop-filter:blur(40px); -webkit-backdrop-filter:blur(40px); border:1px solid rgba(255,255,255,0.52); }
        .glass-dark { background:rgba(15,23,42,0.78); backdrop-filter:blur(32px); -webkit-backdrop-filter:blur(32px); border:1px solid rgba(255,255,255,0.09); }
        .nav-pill { background:rgba(255,255,255,0.58); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.88); }
        .btn-primary { background:linear-gradient(135deg,#0ea5e9,#6366f1); box-shadow:0 8px 24px rgba(14,165,233,0.38); transition:all 0.25s cubic-bezier(.22,1,.36,1); }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(14,165,233,0.52); }
        .gradient-text { background:linear-gradient(135deg,#0ea5e9,#6366f1); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .hero-bg { background: linear-gradient(145deg, #dbeafe 0%, #bae6fd 38%, #d1fae5 100%); }
        .orb { position:absolute; border-radius:50%; pointer-events:none; }
        .float-a { animation: floatA 5s ease-in-out infinite; }
        .float-b { animation: floatB 6.5s ease-in-out 1s infinite; }
        .float-c { animation: floatC 4.5s ease-in-out 0.5s infinite; }
        .flip-card { background-color: transparent; perspective: 1000px; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.8s; transform-style: preserve-3d; }
        .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-front, .flip-card-back { position: absolute; width: 100%; height: 100%; -webkit-backface-visibility: hidden; backface-visibility: hidden; border-radius: 24px; overflow: hidden; }
        .flip-card-back { transform: rotateY(180deg); background: linear-gradient(135deg, rgba(14,165,233,0.9), rgba(99,102,241,0.9)); color: white; display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 20px; }
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
      `}</style>

      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 h-[68px] flex items-center justify-between px-6 md:px-12 transition-all duration-500 ${scrolled ? "glass-dark shadow-xl" : "bg-transparent"}`}>
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center">
            <Wind className="w-5 h-5 text-white"/>
          </div>
          <span className="text-xl font-black tracking-tight" style={{ color: scrolled ? "#fff" : "#0f172a" }}>
            Aero<span className="gradient-text">nyx</span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1 nav-pill rounded-full px-2 py-1.5">
          {NAV_LINKS.map((item, i) => (
            <Link
              key={item}
              href={item === "Home" ? "/" : item === "About" ? "/about" : "#"}
              className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all duration-200 hover:bg-sky-50 hover:text-sky-600 ${i === 1 ? "bg-sky-500 text-white shadow-sm" : "text-slate-600"}`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <button className="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-full">Get a Quote</button>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMenuOpen(!menuOpen)} style={{ color: scrolled ? "#fff" : "#0f172a" }}>
          {menuOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}
        </button>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 glass-dark flex flex-col pt-20 px-8 lg:hidden" onClick={() => setMenuOpen(false)}>
          {NAV_LINKS.map(item => (
            <Link key={item} href={item === "Home" ? "/" : item === "About" ? "/about" : "#"} className="text-white text-xl font-semibold py-4 border-b border-white/10">
              {item}
            </Link>
          ))}
          <button className="btn-primary text-white font-bold px-6 py-3 rounded-2xl mt-6">Get a Quote</button>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative hero-bg py-32 overflow-hidden">
        <div className="orb w-96 h-96 bg-sky-200/20 -top-48 -right-48 float-a"></div>
        <div className="orb w-64 h-64 bg-emerald-200/15 -bottom-32 -left-32 float-b"></div>
        <div className="orb w-48 h-48 bg-violet-200/10 top-1/2 -right-24 float-c"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="hero-heading">
                <h1 className="text-6xl lg:text-7xl font-black leading-tight mb-6">
                  Engineering the <span className="gradient-text">Future</span> of Energy
                </h1>
              </div>
              <div className="hero-text">
                <p className="text-xl text-slate-600 leading-relaxed">
                  Aeronyx is a UK-based renewable energy company focused on delivering intelligent wind turbine solutions for modern infrastructure.
                </p>
              </div>
            </div>
            <div className="hero-image relative">
              <div className="glass-card rounded-3xl p-8 shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=800&auto=format&fit=crop&q=60"
                  alt="Wind Turbines"
                  width={600}
                  height={450}
                  className="rounded-2xl w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="content-section glass-card rounded-3xl p-12 shadow-xl">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Mission</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  Aeronyx is a UK-based renewable energy company focused on delivering intelligent wind turbine solutions for modern infrastructure. Founded in 2020, we've been at the forefront of the green energy revolution, combining cutting-edge technology with sustainable practices.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  We integrate wind energy with existing grid systems using advanced load management technology, creating efficient, reliable, and scalable energy solutions. Our proprietary AI-driven algorithms ensure optimal energy distribution, minimizing waste and maximizing output.
                </p>
                <p className="text-lg text-slate-600 leading-relaxed">
                  Our goal is to transform energy systems into smart, controllable, and cost-efficient ecosystems. By 2030, we aim to power 1 million homes with clean, renewable energy through our innovative turbine technology.
                </p>
              </div>
              <div className="glass-deep rounded-2xl p-8">
                <h3 className="text-2xl font-semibold mb-4 gradient-text">Key Achievements</h3>
                <ul className="space-y-3 text-slate-600">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-sky-500 rounded-full"></div>
                    98% Uptime Guarantee
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                    40+ UK Installations
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-violet-500 rounded-full"></div>
                    30% Average Cost Savings
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                    ISO 14001 Certified
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-rose-500 rounded-full"></div>
                    £50M Investment Secured
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white/50">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Vision & Mission</h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Driving the renewable energy revolution with innovative technology and sustainable solutions.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="vision-mission glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Wind className="w-8 h-8 text-sky-600" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To redefine how energy is generated and managed globally, creating a sustainable future for generations to come. We envision a world where clean energy is accessible, affordable, and abundant.
              </p>
            </div>
            <div className="vision-mission glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-full"></div>
              </div>
              <h3 className="text-2xl font-bold mb-4">Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To deliver smart, scalable, and sustainable energy solutions that empower businesses and communities worldwide. Through innovation and partnership, we accelerate the transition to renewable energy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Core Values</h2>
            <p className="text-xl text-slate-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="values-card glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-violet-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Innovation</h3>
              <p className="text-slate-600 leading-relaxed">
                We push the boundaries of renewable energy technology, constantly developing new solutions to meet evolving needs.
              </p>
            </div>
            <div className="values-card glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-amber-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Sustainability</h3>
              <p className="text-slate-600 leading-relaxed">
                Every decision we make prioritizes environmental responsibility and long-term ecological balance.
              </p>
            </div>
            <div className="values-card glass-card rounded-3xl p-8 shadow-xl text-center">
              <div className="w-16 h-16 bg-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <div className="w-8 h-8 bg-rose-500 rounded-full"></div>
              </div>
              <h3 className="text-xl font-bold mb-4">Partnership</h3>
              <p className="text-slate-600 leading-relaxed">
                We believe in collaboration, working closely with clients, communities, and stakeholders to achieve shared goals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black mb-4">Our Impact</h2>
            <p className="text-xl text-slate-600">See how we're transforming energy landscapes across the UK</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="gallery-image flip-card h-80">
              <div className="flip-card-inner h-full">
                <div className="flip-card-front glass-card rounded-3xl overflow-hidden shadow-xl h-full" style={{ backgroundImage:`url(https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&auto=format&fit=crop&q=80)`, backgroundSize:'cover', backgroundPosition:'center' }}>
                  <div className="p-6 bg-black/20 h-full flex flex-col justify-end">
                    <h3 className="font-semibold mb-2 text-white">Hybrid Systems</h3>
                    <p className="text-white text-sm">Combining solar and wind for maximum efficiency</p>
                  </div>
                </div>
                <div className="flip-card-back glass-card rounded-3xl shadow-xl h-full">
                  <div className="p-6 flex flex-col justify-center h-full">
                    <h3 className="font-bold text-xl mb-4">Hybrid Integration</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      Our hybrid systems combine wind and solar power with intelligent load balancing, providing 24/7 renewable energy with 99.5% reliability.
                    </p>
                    <div className="text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded-full">Solar + Wind</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full ml-2">AI Control</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-image flip-card h-80">
              <div className="flip-card-inner h-full">
                <div className="flip-card-front glass-card rounded-3xl overflow-hidden shadow-xl h-full" style={{ backgroundImage:`url(https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=1200&auto=format&fit=crop&q=80)`, backgroundSize:'cover', backgroundPosition:'center' }}>
                  <div className="p-6 bg-black/20 h-full flex flex-col justify-end">
                    <h3 className="font-semibold mb-2 text-white">Wind Farms</h3>
                    <p className="text-white text-sm">Large-scale renewable energy production</p>
                  </div>
                </div>
                <div className="flip-card-back glass-card rounded-3xl shadow-xl h-full">
                  <div className="p-6 flex flex-col justify-center h-full">
                    <h3 className="font-bold text-xl mb-4">Commercial Wind Farms</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      From 5MW to 50MW installations, our wind farms deliver clean energy to industrial complexes and urban centers across the UK.
                    </p>
                    <div className="text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded-full">5-50MW Scale</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full ml-2">G98/G99 Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-image flip-card h-80">
              <div className="flip-card-inner h-full">
                <div className="flip-card-front glass-card rounded-3xl overflow-hidden shadow-xl h-full" style={{ backgroundImage:`url(https://images.unsplash.com/photo-1551276107-7c0bf0d3b4e7?w=1200&auto=format&fit=crop&q=80)`, backgroundSize:'cover', backgroundPosition:'center' }}>
                  <div className="p-6 bg-black/20 h-full flex flex-col justify-end">
                    <h3 className="font-semibold mb-2 text-white">Smart Grids</h3>
                    <p className="text-white text-sm">Intelligent energy distribution systems</p>
                  </div>
                </div>
                <div className="flip-card-back glass-card rounded-3xl shadow-xl h-full">
                  <div className="p-6 flex flex-col justify-center h-full">
                    <h3 className="font-bold text-xl mb-4">Smart Grid Technology</h3>
                    <p className="text-sm leading-relaxed mb-4">
                      Our AI-powered grid management system optimizes energy flow, reduces losses by 40%, and ensures seamless integration with existing infrastructure.
                    </p>
                    <div className="text-xs">
                      <span className="bg-white/20 px-2 py-1 rounded-full">AI Optimization</span>
                      <span className="bg-white/20 px-2 py-1 rounded-full ml-2">40% Loss Reduction</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-xl btn-primary flex items-center justify-center">
                  <Wind className="w-5 h-5 text-white"/>
                </div>
                <span className="text-xl font-black tracking-tight">
                  Aero<span className="gradient-text">nyx</span>
                </span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Engineering the future of renewable energy with intelligent wind turbine solutions.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors">Wind Turbines</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Grid Integration</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Maintenance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Consulting</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <div className="flex gap-4">
                <button className="btn-primary text-white font-bold px-6 py-2 rounded-full">Get a Quote</button>
              </div>
              <p className="text-slate-400 text-sm mt-4">
                Ready to transform your energy infrastructure?
              </p>
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