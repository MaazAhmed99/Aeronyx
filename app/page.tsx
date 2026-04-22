"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Wind, Zap, Settings, BarChart3, Shield, ArrowRight,
  ChevronDown, ChevronLeft, ChevronRight, Play, CheckCircle2,
  Building2, Store, Leaf, Landmark, Home, Smartphone, Activity,
  Cpu, TrendingUp, Users, Pause,
} from "lucide-react";
import Header from "./components/Header";

/* ─────────────────────────────── HOOKS ─────────────────────────── */
function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null);
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
  }, []);
  return [ref, inView];
}

/* ─────────────────────────────── COMPONENTS ────────────────────── */
function Reveal({ children, delay = 0, dir = "up", className = "" }: { children: React.ReactNode; delay?: number; dir?: string; className?: string }) {
  const [ref, inView] = useInView(0.1);
  const hidden = { up:"opacity-0 translate-y-10", left:"opacity-0 -translate-x-10", right:"opacity-0 translate-x-10", scale:"opacity-0 scale-90", fade:"opacity-0" }[dir];
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${inView ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hidden} ${className}`} style={{ transitionDelay:`${delay}ms` }}>
      {children}
    </div>
  );
}

function Counter({ end, suffix = "", duration = 1800 }: { end: number | string; suffix?: string; duration?: number }) {
  const [val, setVal] = useState(0);
  const [ref, inView] = useInView(0.3);
  const started = useRef(false);
  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;
    const num = parseFloat(String(end).replace(/[^0-9.]/g, ""));
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - t0) / duration, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * num * 10) / 10);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView]);
  const display = String(end).includes(".") ? val.toFixed(1) : Math.round(val);
  return <span ref={ref}>{display}{suffix}</span>;
}

/* ── Turbine SVG ── */
function TurbineSVG({ accent = "#0ea5e9", size = 340 }: { accent?: string; size?: number }) {
  const [angle, setAngle] = useState(0);
  const raf = useRef<number>(0);
  useEffect(() => {
    let last = 0;
    const tick = (t: number) => {
      raf.current = requestAnimationFrame(tick);
      const d = t - last; last = t;
      setAngle(a => (a + d * 0.04) % 360);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, []);
  const cx = 170, cy = 138, bLen = 108;
  const blades = [0,120,240].map(off => {
    const a = ((angle+off)*Math.PI)/180;
    return { tx:cx+Math.sin(a)*bLen, ty:cy-Math.cos(a)*bLen, s1x:cx+Math.cos(a)*12, s1y:cy+Math.sin(a)*12, s2x:cx-Math.cos(a)*12, s2y:cy-Math.sin(a)*12 };
  });
  return (
    <svg viewBox="0 0 340 400" width={size} height={size} className="drop-shadow-2xl">
      <defs>
        <linearGradient id="twr2" x1="0" x2="1"><stop offset="0%" stopColor="rgba(148,180,220,0.4)"/><stop offset="45%" stopColor="rgba(210,230,252,0.95)"/><stop offset="100%" stopColor="rgba(130,165,205,0.35)"/></linearGradient>
        <linearGradient id="bld2" x1="0" x2="1" y1="0" y2="1"><stop offset="0%" stopColor={accent} stopOpacity="0.96"/><stop offset="100%" stopColor={accent} stopOpacity="0.16"/></linearGradient>
        <filter id="glow2"><feGaussianBlur stdDeviation="4" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <radialGradient id="shadow2" cx="50%" cy="50%"><stop offset="0%" stopColor="rgba(14,165,233,0.2)"/><stop offset="100%" stopColor="transparent"/></radialGradient>
      </defs>
      <ellipse cx="170" cy="390" rx="62" ry="9" fill="url(#shadow2)"/>
      <polygon points="156,152 162,383 178,383 184,152" fill="url(#twr2)"/>
      {blades.map((b,i) => (
        <polygon key={i} filter="url(#glow2)" points={`${cx},${cy} ${b.s1x},${b.s1y} ${b.tx},${b.ty} ${b.s2x},${b.s2y}`} fill="url(#bld2)"/>
      ))}
      <circle cx={cx} cy={cy} r="15" fill="rgba(255,255,255,0.85)" stroke={accent} strokeWidth="2.5"/>
      <circle cx={cx} cy={cy} r="6" fill={accent}/>
    </svg>
  );
}

/* ── Particle canvas ── */
function Particles({ color = "#0ea5e9" }: { color?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let W = canvas.offsetWidth, H = canvas.offsetHeight;
    canvas.width = W; canvas.height = H;
    const onResize = () => { W = canvas.offsetWidth; H = canvas.offsetHeight; canvas.width = W; canvas.height = H; };
    window.addEventListener("resize", onResize);
    const particles = Array.from({ length: 38 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      r: Math.random()*2.5+0.8,
      dx: (Math.random()-0.5)*0.35,
      dy: (Math.random()-0.5)*0.35,
      o: Math.random()*0.35+0.08,
    }));
    let raf: number;
    const draw = () => {
      ctx.clearRect(0,0,W,H);
      particles.forEach(p => {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
        ctx.fillStyle = color + Math.round(p.o*255).toString(16).padStart(2,"0");
        ctx.fill();
      });
      // draw lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i+1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx*dx+dy*dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = color + Math.round((1-dist/100)*0.1*255).toString(16).padStart(2,"0");
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, [color]);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity:0.7 }}/>;
}

/* ─────────────────────────────── DATA ──────────────────────────── */
const HERO_SLIDES = [
  {
    id: 0,
    badge: "UK-Based Renewable Energy",
    headingLine1: "Intelligent Wind Energy",
    headingLine2: "for Modern",
    headingLine3: "Infrastructure",
    sub: "Hybrid wind turbine systems with smart load management—designed for businesses, real estate, and large-scale projects across the UK.",
    accent: "#0ea5e9",
    accentDark: "#0369a1",
    bg: "linear-gradient(145deg, #dbeafe 0%, #bae6fd 38%, #d1fae5 100%)",
    blob1: "rgba(14,165,233,0.22)",
    blob2: "rgba(99,102,241,0.12)",
    tag: "Wind + Grid Hybrid",
    tagIcon: Wind,
  },
  {
    id: 1,
    badge: "G98 / G99 Certified",
    headingLine1: "AI-Driven Load",
    headingLine2: "Control for",
    headingLine3: "Zero Downtime",
    sub: "Our intelligent load management system automatically balances wind and grid power, keeping your operations running 24/7 without interruption.",
    accent: "#6366f1",
    accentDark: "#3730a3",
    bg: "linear-gradient(145deg, #ede9fe 0%, #ddd6fe 38%, #e0f2fe 100%)",
    blob1: "rgba(99,102,241,0.22)",
    blob2: "rgba(14,165,233,0.12)",
    tag: "AI Load Optimisation",
    tagIcon: Cpu,
  },
  {
    id: 2,
    badge: "App-Controlled Platform",
    headingLine1: "Scalable Energy",
    headingLine2: "Solutions Built",
    headingLine3: "for Growth",
    sub: "From a single site to a multi-location rollout, Aeronyx's platform scales with your business, delivering clean energy savings at every level.",
    accent: "#10b981",
    accentDark: "#065f46",
    bg: "linear-gradient(145deg, #d1fae5 0%, #a7f3d0 38%, #cffafe 100%)",
    blob1: "rgba(16,185,129,0.22)",
    blob2: "rgba(14,165,233,0.12)",
    tag: "Scalable Infrastructure",
    tagIcon: TrendingUp,
  },
];

const SERVICES = [
  { icon:Wind,     title:"Wind Turbine Installation",  desc:"Complete setup including design, supply, and installation tailored to your site requirements.", color:"text-sky-500",    bg:"bg-sky-50",    border:"border-sky-100" },
  { icon:Zap,      title:"Grid Integration (G98/G99)", desc:"Full compliance and seamless connection with UK grid systems for reliable energy delivery.",    color:"text-violet-500",bg:"bg-violet-50",border:"border-violet-100" },
  { icon:Cpu,      title:"Smart Load Management",      desc:"Control energy distribution intelligently via app and automation for maximum efficiency.",     color:"text-emerald-500",bg:"bg-emerald-50",border:"border-emerald-100" },
  { icon:Activity, title:"Monitoring & Maintenance",   desc:"Ongoing system monitoring, diagnostics, and servicing to keep your installation performing.",   color:"text-amber-500",  bg:"bg-amber-50",  border:"border-amber-100" },
];

const WHO_WE_SERVE = [
  { icon:Building2, label:"Real Estate Developers" },
  { icon:Store,     label:"Retail Chains" },
  { icon:Home,      label:"Commercial Buildings" },
  { icon:Leaf,      label:"Farms" },
  { icon:Landmark,  label:"Government Projects" },
];

const HOW_IT_WORKS = [
  { step:"01", icon:Wind,       title:"Wind Generates",  desc:"Turbine captures kinetic energy and converts it into clean electricity." },
  { step:"02", icon:Zap,        title:"Grid Backs Up",   desc:"Grid electricity provides seamless backup ensuring zero downtime." },
  { step:"03", icon:Cpu,        title:"System Balances", desc:"AI-driven controller optimises the load split in real time." },
  { step:"04", icon:Smartphone, title:"You Control",     desc:"Monitor and manage your entire energy ecosystem from your phone." },
];

const STATS = [
  { value:"98",  suffix:"%",  label:"Uptime Guarantee" },
  { value:"40",  suffix:"+",  label:"UK Installations" },
  { value:"30",  suffix:"%",  label:"Average Cost Saving" },
  { value:"24",  suffix:"/7", label:"Remote Monitoring" },
];

/* ─────────────────────────────── MAIN ──────────────────────────── */
export default function AeronyxHome() {
  const [slide, setSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState<number | null>(null);
  const [dir, setDir] = useState("next"); // "next" | "prev"
  const [animating, setAnimating] = useState(false);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* auto-advance — simple interval that restarts whenever slide or paused changes */
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setAnimating(true);
      setDir("next");
      setPrevSlide(slide);
      setSlide(s => (s + 1) % HERO_SLIDES.length);
      setTimeout(() => { setPrevSlide(null); setAnimating(false); }, 650);
    }, 5000);
    timerRef.current = id;
    return () => clearInterval(id);
  }, [slide, paused]);

  const advance = useCallback((d = "next") => {
    if (animating) return;
    setAnimating(true);
    setDir(d);
    setPrevSlide(slide);
    setSlide(s => d === "next" ? (s + 1) % HERO_SLIDES.length : (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
    setTimeout(() => { setPrevSlide(null); setAnimating(false); }, 650);
  }, [slide, animating]);

  const goTo = (i: number) => {
    if (i === slide || animating) return;
    setAnimating(true);
    setDir(i > slide ? "next" : "prev");
    setPrevSlide(slide);
    setSlide(i);
    setTimeout(() => { setPrevSlide(null); setAnimating(false); }, 650);
  };

  const sl = HERO_SLIDES[slide];
  const TagIcon = sl.tagIcon;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-x-hidden" style={{ fontFamily:"'Plus Jakarta Sans',sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet"/>

      <style>{`
        * { font-family:'Plus Jakarta Sans',sans-serif; box-sizing:border-box; }
        .glass { background:rgba(255,255,255,0.52); backdrop-filter:blur(24px); -webkit-backdrop-filter:blur(24px); border:1px solid rgba(255,255,255,0.78); }
        .glass-card { background:rgba(255,255,255,0.62); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.82); }
        .glass-deep { background:rgba(255,255,255,0.26); backdrop-filter:blur(40px); -webkit-backdrop-filter:blur(40px); border:1px solid rgba(255,255,255,0.52); }
        .glass-dark { background:rgba(15,23,42,0.78); backdrop-filter:blur(32px); -webkit-backdrop-filter:blur(32px); border:1px solid rgba(255,255,255,0.09); }
        .nav-pill  { background:rgba(255,255,255,0.58); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border:1px solid rgba(255,255,255,0.88); }
        .btn-primary { background:linear-gradient(135deg,#0ea5e9,#6366f1); box-shadow:0 8px 24px rgba(14,165,233,0.38); transition:all 0.25s cubic-bezier(.22,1,.36,1); }
        .btn-primary:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(14,165,233,0.52); }
        .btn-glass { background:rgba(255,255,255,0.65); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.9); box-shadow:0 4px 16px rgba(0,0,0,0.07); transition:all 0.25s; }
        .btn-glass:hover { transform:translateY(-2px); box-shadow:0 10px 28px rgba(0,0,0,0.1); }
        .gradient-text { background:linear-gradient(135deg,#0ea5e9,#6366f1); -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text; }
        .service-card { transition:all 0.35s cubic-bezier(.22,1,.36,1); }
        .service-card:hover { transform:translateY(-6px); box-shadow:0 24px 56px rgba(14,165,233,0.12); }
        .step-card { transition:all 0.3s cubic-bezier(.22,1,.36,1); }
        .step-card:hover { transform:translateY(-4px); }
        .serve-pill { transition:all 0.25s; }
        .serve-pill:hover { transform:translateY(-3px) scale(1.03); }
        .orb { position:absolute; border-radius:50%; pointer-events:none; }

        /* hero bg transition */
        .hero-bg { transition:background 0.9s cubic-bezier(.22,1,.36,1); }

        /* slide content in/out */
        @keyframes slideInRight { from{opacity:0;transform:translateX(48px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideInLeft  { from{opacity:0;transform:translateX(-48px)} to{opacity:1;transform:translateX(0)} }
        @keyframes slideOutRight{ from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(-40px)} }
        @keyframes slideOutLeft { from{opacity:1;transform:translateX(0)} to{opacity:0;transform:translateX(40px)} }
        .slide-in-next  { animation:slideInRight 0.6s cubic-bezier(.22,1,.36,1) both; }
        .slide-in-prev  { animation:slideInLeft  0.6s cubic-bezier(.22,1,.36,1) both; }
        .slide-out-next { animation:slideOutRight 0.5s cubic-bezier(.22,1,.36,1) both; }
        .slide-out-prev { animation:slideOutLeft  0.5s cubic-bezier(.22,1,.36,1) both; }

        /* turbine side */
        @keyframes turbInNext { from{opacity:0;transform:scale(0.88) translateY(20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes turbInPrev { from{opacity:0;transform:scale(0.88) translateY(-20px)} to{opacity:1;transform:scale(1) translateY(0)} }
        .turb-in-next { animation:turbInNext 0.7s cubic-bezier(.22,1,.36,1) both; }
        .turb-in-prev { animation:turbInPrev 0.7s cubic-bezier(.22,1,.36,1) both; }

        /* float animations */
        @keyframes floatA { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-16px)} }
        @keyframes floatB { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes floatC { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-22px)} }
        @keyframes floatD { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-12px) rotate(3deg)} }
        .float-a { animation:floatA 5s ease-in-out infinite; }
        .float-b { animation:floatB 6.5s ease-in-out 1s infinite; }
        .float-c { animation:floatC 4.5s ease-in-out 0.5s infinite; }
        .float-d { animation:floatD 7s ease-in-out 0.2s infinite; }

        /* pulse dot */
        @keyframes pulseDot { 0%,100%{box-shadow:0 0 0 0 rgba(14,165,233,0.45)} 50%{box-shadow:0 0 0 9px rgba(14,165,233,0)} }
        .pulse-dot { animation:pulseDot 2s ease-in-out infinite; }
        @keyframes pulseDotG { 0%,100%{box-shadow:0 0 0 0 rgba(16,185,129,0.45)} 50%{box-shadow:0 0 0 9px rgba(16,185,129,0)} }
        .pulse-dot-g { animation:pulseDotG 2.2s ease-in-out 0.5s infinite; }

        /* progress bar */
        @keyframes progressFill { from{width:0%} to{width:100%} }
        .progress-fill { animation:progressFill 5s linear both; }

        /* glow ring pulse */
        @keyframes ringPulse { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.04)} }
        .ring-pulse { animation:ringPulse 3s ease-in-out infinite; }

        /* stat counter pop */
        @keyframes statPop { 0%{opacity:0;transform:scale(0.85) translateY(10px)} 100%{opacity:1;transform:scale(1) translateY(0)} }
        .stat-pop { animation:statPop 0.5s cubic-bezier(.22,1,.36,1) both; }

        /* widget slide in */
        @keyframes widgetIn { from{opacity:0;transform:translateX(24px) scale(0.9)} to{opacity:1;transform:translateX(0) scale(1)} }
        .widget-in-a { animation:widgetIn 0.7s cubic-bezier(.22,1,.36,1) 0.5s both; }
        @keyframes widgetInB { from{opacity:0;transform:translateX(-24px) scale(0.9)} to{opacity:1;transform:translateX(0) scale(1)} }
        .widget-in-b { animation:widgetInB 0.7s cubic-bezier(.22,1,.36,1) 0.7s both; }
        @keyframes widgetInC { from{opacity:0;transform:translateY(20px) scale(0.9)} to{opacity:1;transform:translateY(0) scale(1)} }
        .widget-in-c { animation:widgetInC 0.7s cubic-bezier(.22,1,.36,1) 0.9s both; }

        /* scroll line */
        .scroll-line { background:linear-gradient(180deg,transparent,rgba(14,165,233,0.5),transparent); }

        /* slide nav dot */
        .slide-dot { transition:all 0.4s cubic-bezier(.22,1,.36,1); }
      `}</style>

      <Header />

      {/* ══════════════════════════════════════════
          HERO — ANIMATED SLIDER
      ══════════════════════════════════════════ */}
      <section
        className="hero-bg relative min-h-screen flex items-center overflow-hidden"
        style={{ background: sl.bg }}
      >
        {/* Particle network */}
        <Particles color={sl.accent}/>

        {/* Background orbs — transition with slide */}
        <div className="orb w-[650px] h-[650px] -top-24 -right-24 transition-all duration-1000" style={{ background:`radial-gradient(circle,${sl.blob1} 0%,transparent 65%)`, filter:"blur(80px)" }}/>
        <div className="orb w-[450px] h-[450px] bottom-0 -left-20 transition-all duration-1000" style={{ background:`radial-gradient(circle,${sl.blob2} 0%,transparent 65%)`, filter:"blur(70px)" }}/>
        <div className="orb w-[320px] h-[320px] top-1/3 left-1/3 transition-all duration-1000" style={{ background:`radial-gradient(circle,rgba(255,255,255,0.5) 0%,transparent 70%)`, filter:"blur(55px)" }}/>

        {/* dot grid */}
        <div className="absolute inset-0" style={{ backgroundImage:`radial-gradient(circle,${sl.accent}22 1.5px,transparent 1.5px)`, backgroundSize:"36px 36px", opacity:0.65, transition:"all 0.9s" }}/>

        {/* slide progress line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/20 z-20">
          <div key={`prog-${slide}`} className="progress-fill h-full rounded-full" style={{ background:`linear-gradient(90deg,${sl.accent},${sl.accentDark})` }}/>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-24 pb-36">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── LEFT — slide copy ── */}
            <div key={`copy-${slide}`} className={`${dir==="next" ? "slide-in-next" : "slide-in-prev"}`}>
              {/* Slide tag */}
              <div className="flex items-center gap-3 mb-5">
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2">
                  <span className="pulse-dot w-2 h-2 rounded-full flex-shrink-0" style={{ background:sl.accent }}/>
                  <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color:sl.accentDark }}>{sl.badge}</span>
                </div>
                <div className="inline-flex items-center gap-1.5 glass-deep rounded-full px-3 py-1.5">
                  <TagIcon className="w-3.5 h-3.5" style={{ color:sl.accent }}/>
                  <span className="text-[11px] font-semibold" style={{ color:sl.accentDark }}>{sl.tag}</span>
                </div>
              </div>

              <h1 className="text-[clamp(34px,5vw,62px)] font-black leading-[1.05] tracking-tight text-slate-900 mb-5">
                {sl.headingLine1}<br/>
                <span style={{ background:`linear-gradient(135deg,${sl.accent},${sl.accentDark})`, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{sl.headingLine2}</span><br/>
                {sl.headingLine3}
              </h1>

              <p className="text-[17px] text-slate-500 leading-relaxed max-w-[490px] mb-9">{sl.sub}</p>

              <div className="flex flex-wrap gap-3 mb-10">
                <button className="btn-primary text-white font-bold text-[15px] px-7 py-3.5 rounded-2xl flex items-center gap-2">
                  Get a Quote <ArrowRight className="w-4 h-4"/>
                </button>
                <button className="btn-glass text-slate-700 font-semibold text-[15px] px-7 py-3.5 rounded-2xl flex items-center gap-2">
                  <Play className="w-4 h-4 fill-current" style={{ color:sl.accent }}/> Explore Solutions
                </button>
              </div>

              <div className="flex flex-wrap items-center gap-5 mb-10">
                {["G98/G99 Compliant","AI-Optimised","App Controlled"].map(t => (
                  <div key={t} className="flex items-center gap-1.5 text-sm text-slate-500">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500"/> {t}
                  </div>
                ))}
              </div>

              {/* Slide navigator */}
              <div className="flex items-center gap-4">
                <button onClick={() => advance("prev")} className="glass-card w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all" disabled={animating}>
                  <ChevronLeft className="w-4 h-4 text-slate-500"/>
                </button>
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((_,i) => (
                    <button key={i} onClick={() => goTo(i)} className="slide-dot rounded-full overflow-hidden" style={{ width:i===slide?32:8, height:8, background:i===slide?sl.accent:"rgba(0,0,0,0.18)" }}>
                      {i===slide && !paused && <div key={`d-${slide}`} className="h-full rounded-full progress-fill" style={{ background:"rgba(255,255,255,0.35)" }}/>}
                    </button>
                  ))}
                </div>
                <button onClick={() => advance("next")} className="glass-card w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all" disabled={animating}>
                  <ChevronRight className="w-4 h-4 text-slate-500"/>
                </button>
                <button onClick={() => setPaused(p => !p)} className="glass-card w-10 h-10 rounded-full flex items-center justify-center hover:scale-110 transition-all ml-1">
                  {paused
                    ? <Play className="w-3.5 h-3.5 fill-current text-slate-500"/>
                    : <Pause className="w-3.5 h-3.5 text-slate-500"/>
                  }
                </button>
                <span className="text-sm text-slate-400 font-semibold ml-1">{slide+1} / {HERO_SLIDES.length}</span>
              </div>
            </div>

            {/* ── RIGHT — turbine + widgets ── */}
            <div key={`turb-${slide}`} className={`relative flex justify-center items-center min-h-[420px] ${dir==="next"?"turb-in-next":"turb-in-prev"}`}>
              {/* Layered glass rings */}
              <div className="absolute w-[360px] h-[360px] rounded-full ring-pulse" style={{ background:`radial-gradient(circle,${sl.blob1} 0%,transparent 65%)`, transition:"background 1s" }}/>
              <div className="glass-deep absolute w-[300px] h-[300px] rounded-full float-c" style={{ borderColor:`${sl.accent}30` }}/>
              <div className="absolute w-[240px] h-[240px] rounded-full float-a" style={{ background:"rgba(255,255,255,0.38)", backdropFilter:"blur(28px)", border:"1px solid rgba(255,255,255,0.72)" }}/>

              {/* Turbine */}
              <div className="relative z-10">
                <TurbineSVG accent={sl.accent} size={300}/>
              </div>

              {/* Floating widget: Live Output */}
              <div className="widget-in-a glass-card absolute top-2 right-0 rounded-2xl p-4 w-48 shadow-xl z-20 float-b">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Live Output</p>
                  <span className="w-2 h-2 rounded-full pulse-dot" style={{ background:sl.accent }}/>
                </div>
                <p className="text-2xl font-black tracking-tight" style={{ color:sl.accent }}>847 MW</p>
                <div className="mt-2.5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full rounded-full" style={{ width:"73%", background:`linear-gradient(90deg,${sl.accent},${sl.accentDark})` }}/>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">73% capacity utilised</p>
              </div>

              {/* Floating widget: CO2 Saved */}
              <div className="widget-in-b glass-card absolute bottom-8 left-0 rounded-2xl p-4 w-44 shadow-xl z-20 float-d">
                <div className="flex items-center justify-between mb-1.5">
                  <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">CO₂ Saved</p>
                  <span className="w-2 h-2 rounded-full pulse-dot-g"/>
                </div>
                <p className="text-2xl font-black tracking-tight text-emerald-500">2.4M t</p>
                <p className="text-[11px] text-slate-400 mt-0.5">This year · ↑ 12%</p>
              </div>

              {/* Floating widget: Efficiency */}
              <div className="widget-in-c glass-card absolute bottom-6 right-2 rounded-2xl p-4 w-40 shadow-xl z-20 float-a" style={{ animationDelay:"2s" }}>
                <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2">Efficiency</p>
                <div className="flex items-end gap-1.5">
                  <p className="text-2xl font-black tracking-tight text-violet-500">98.2</p>
                  <p className="text-sm font-bold text-violet-400 mb-0.5">%</p>
                </div>
                <div className="mt-2 flex gap-1">
                  {[82,88,75,91,95,98].map((h,i) => (
                    <div key={i} className="flex-1 rounded-sm" style={{ height:20, background:"rgba(99,102,241,0.12)" }}>
                      <div className="rounded-sm" style={{ height:`${(h/100)*20}px`, background:`rgba(99,102,241,${0.4+i*0.1})`, marginTop:`${20-(h/100)*20}px` }}/>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats glass bar */}
        <div className="absolute bottom-0 left-0 right-0 glass border-t border-white/80">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s,i) => (
              <div key={i} className={`text-center ${i<3?"md:border-r border-sky-100":""}`}>
                <p className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-none">
                  <Counter end={s.value} suffix={s.suffix}/>
                </p>
                <p className="text-xs text-slate-500 mt-1 font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-28 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-10 scroll-line rounded-full"/>
          <ChevronDown className="w-4 h-4 text-sky-400 animate-bounce"/>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHAT WE DO — SERVICES
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-white">
        <div className="orb w-[500px] h-[500px] bg-sky-100/60 -top-32 -right-32" style={{ filter:"blur(80px)" }}/>
        <div className="orb w-[400px] h-[400px] bg-violet-100/50 -bottom-20 -left-20" style={{ filter:"blur(70px)" }}/>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <Reveal dir="scale">
              <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-100 rounded-full px-4 py-1.5 mb-5">
                <Settings className="w-3.5 h-3.5 text-sky-500"/>
                <span className="text-[11px] font-bold tracking-[0.12em] text-sky-600 uppercase">What We Do</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={80}>
              <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-tight text-slate-900 mb-4">
                End-to-End <span className="gradient-text">Energy Solutions</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={150}>
              <p className="text-lg text-slate-500 max-w-xl mx-auto leading-relaxed">
                We design, install, and manage wind turbine systems integrated with intelligent energy control technology.
              </p>
            </Reveal>
          </div>
          <Reveal dir="scale" delay={100}>
            <div className="glass rounded-3xl p-6 shadow-xl shadow-sky-100/50">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {SERVICES.map((s,i) => (
                  <Reveal key={i} dir="up" delay={i*80}>
                    <div className={`service-card glass-card rounded-2xl p-6 ${s.border} border cursor-pointer h-full`}>
                      <div className={`w-12 h-12 ${s.bg} ${s.border} border rounded-2xl flex items-center justify-center mb-4 shadow-sm`}>
                        <s.icon className={`w-6 h-6 ${s.color}`}/>
                      </div>
                      <h3 className="text-[15px] font-bold text-slate-900 mb-2 leading-snug">{s.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{s.desc}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          INNOVATION SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="orb w-[500px] h-[500px] top-0 right-0" style={{ background:"radial-gradient(circle,rgba(14,165,233,0.15) 0%,transparent 70%)", filter:"blur(40px)" }}/>
        <div className="orb w-[400px] h-[400px] bottom-0 left-0" style={{ background:"radial-gradient(circle,rgba(99,102,241,0.12) 0%,transparent 70%)", filter:"blur(40px)" }}/>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage:"radial-gradient(circle,rgba(255,255,255,0.05) 1px,transparent 1px)", backgroundSize:"40px 40px" }}/>
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <Reveal dir="left">
                <div className="inline-flex items-center gap-2 border border-sky-500/30 bg-sky-500/10 rounded-full px-4 py-1.5 mb-6">
                  <TrendingUp className="w-3.5 h-3.5 text-sky-400"/>
                  <span className="text-[11px] font-bold tracking-[0.12em] text-sky-400 uppercase">Innovation</span>
                </div>
              </Reveal>
              <Reveal dir="left" delay={80}>
                <h2 className="text-[clamp(28px,4vw,48px)] font-black tracking-tight text-white mb-5 leading-tight">
                  Beyond Traditional<br/><span className="gradient-text">Wind Energy</span>
                </h2>
              </Reveal>
              <Reveal dir="left" delay={150}>
                <p className="text-lg text-slate-300 leading-relaxed mb-8 max-w-[500px]">
                  Aeronyx combines wind generation with grid electricity and AI-driven load control, enabling real-time energy optimisation without full reliance on batteries.
                </p>
              </Reveal>
              <Reveal dir="left" delay={220}>
                <div className="space-y-3">
                  {["Hybrid energy system (Wind + Grid)","AI-based load optimisation","Real-time monitoring dashboard","App-based appliance control","Scalable infrastructure"].map((item,i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-sky-400"/>
                      </div>
                      <span className="text-slate-300 text-[15px]">{item}</span>
                    </div>
                  ))}
                </div>
              </Reveal>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon:Wind,       label:"Wind + Grid Hybrid", val:"Hybrid",    color:"text-sky-400",    bg:"bg-sky-500/10",    border:"border-sky-500/20" },
                { icon:Cpu,        label:"AI Optimisation",    val:"Smart",     color:"text-violet-400", bg:"bg-violet-500/10", border:"border-violet-500/20" },
                { icon:BarChart3,  label:"Live Dashboard",     val:"Real-time", color:"text-emerald-400",bg:"bg-emerald-500/10",border:"border-emerald-500/20" },
                { icon:Smartphone, label:"App Control",        val:"Mobile",    color:"text-amber-400",  bg:"bg-amber-500/10",  border:"border-amber-500/20" },
              ].map((card,i) => (
                <Reveal key={i} dir="scale" delay={i*90}>
                  <div className={`glass-dark rounded-2xl p-5 border ${card.border} cursor-pointer step-card h-full`}>
                    <div className={`w-10 h-10 ${card.bg} ${card.border} border rounded-xl flex items-center justify-center mb-4`}>
                      <card.icon className={`w-5 h-5 ${card.color}`}/>
                    </div>
                    <p className={`text-lg font-extrabold ${card.color} mb-1`}>{card.val}</p>
                    <p className="text-sm text-slate-400">{card.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal dir="up" delay={200}>
            <div className="mt-16 glass-dark rounded-2xl p-6 border border-sky-500/20 text-center">
              <p className="text-slate-200 text-lg font-medium italic">
                "Traditional systems generate energy.<span className="gradient-text font-bold not-italic"> Aeronyx controls and optimises it.</span>"
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHO WE SERVE
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-28 px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-sky-50 to-violet-50">
        <div className="orb w-[400px] h-[400px] bg-sky-200/40 top-0 left-1/2 -translate-x-1/2" style={{ filter:"blur(80px)" }}/>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-14">
            <Reveal dir="scale">
              <div className="inline-flex items-center gap-2 bg-white border border-sky-100 rounded-full px-4 py-1.5 mb-5 shadow-sm">
                <Users className="w-3.5 h-3.5 text-sky-500"/>
                <span className="text-[11px] font-bold tracking-[0.12em] text-sky-600 uppercase">Who We Serve</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={80}>
              <h2 className="text-[clamp(26px,4vw,44px)] font-black tracking-tight text-slate-900">
                Powering Every <span className="gradient-text">Sector</span>
              </h2>
            </Reveal>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {WHO_WE_SERVE.map((item,i) => (
              <Reveal key={i} dir="up" delay={i*70}>
                <div className="serve-pill glass-card rounded-2xl px-6 py-5 flex items-center gap-3 shadow-sm border border-white/90 cursor-pointer min-w-[200px]">
                  <div className="w-10 h-10 bg-gradient-to-br from-sky-50 to-violet-50 border border-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-sky-500"/>
                  </div>
                  <span className="text-[15px] font-semibold text-slate-700">{item.label}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          HOW IT WORKS
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-white relative overflow-hidden">
        <div className="orb w-[500px] h-[500px] bg-violet-100/50 top-0 right-0" style={{ filter:"blur(90px)" }}/>
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <Reveal dir="scale">
              <div className="inline-flex items-center gap-2 bg-violet-50 border border-violet-100 rounded-full px-4 py-1.5 mb-5">
                <Shield className="w-3.5 h-3.5 text-violet-500"/>
                <span className="text-[11px] font-bold tracking-[0.12em] text-violet-600 uppercase">How It Works</span>
              </div>
            </Reveal>
            <Reveal dir="up" delay={80}>
              <h2 className="text-[clamp(26px,4vw,44px)] font-black tracking-tight text-slate-900 mb-4">
                Simple. Smart. <span className="gradient-text">Seamless.</span>
              </h2>
            </Reveal>
            <Reveal dir="up" delay={140}>
              <p className="text-lg text-slate-500 max-w-lg mx-auto">Four steps from wind to your fingertips.</p>
            </Reveal>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step,i) => (
              <Reveal key={i} dir="up" delay={i*90}>
                <div className="step-card glass rounded-2xl p-6 border border-white/80 shadow-sm h-full relative overflow-hidden cursor-pointer">
                  <span className="absolute top-3 right-4 text-6xl font-black text-slate-100 select-none leading-none">{step.step}</span>
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-sky-50 to-violet-50 border border-sky-100 rounded-2xl flex items-center justify-center mb-5 shadow-sm">
                      <step.icon className="w-6 h-6 text-sky-500"/>
                    </div>
                    <h3 className="text-[16px] font-bold text-slate-900 mb-2">{step.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
                  </div>
                  {i < HOW_IT_WORKS.length-1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-gradient-to-r from-sky-300 to-violet-300 z-10"/>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════ */}
      <section className="py-24 md:py-32 px-6 md:px-12 relative overflow-hidden bg-gradient-to-br from-sky-100 via-blue-50 to-violet-100">
        <div className="orb w-[600px] h-[600px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ background:"radial-gradient(circle,rgba(14,165,233,0.15) 0%,transparent 65%)", filter:"blur(60px)" }}/>
        <div className="absolute inset-0 opacity-60" style={{ backgroundImage:"radial-gradient(circle,rgba(14,165,233,0.1) 1.5px,transparent 1.5px)", backgroundSize:"40px 40px" }}/>
        <div className="max-w-4xl mx-auto relative">
          <Reveal dir="scale">
            <div className="glass rounded-3xl p-10 md:p-16 text-center shadow-2xl shadow-sky-200/40 border border-white/85 relative overflow-hidden">
              <div className="orb w-64 h-64 -top-20 -left-20 bg-sky-200/30" style={{ filter:"blur(40px)" }}/>
              <div className="orb w-64 h-64 -bottom-20 -right-20 bg-violet-200/25" style={{ filter:"blur(40px)" }}/>
              <div className="relative">
                <Reveal dir="scale" delay={80}>
                  <div className="inline-flex items-center gap-2 bg-sky-50 border border-sky-200 rounded-full px-4 py-1.5 mb-7">
                    <Zap className="w-3.5 h-3.5 text-sky-500"/>
                    <span className="text-[11px] font-bold tracking-[0.12em] text-sky-600 uppercase">Start Your Journey</span>
                  </div>
                </Reveal>
                <Reveal dir="up" delay={140}>
                  <h2 className="text-[clamp(28px,5vw,52px)] font-black tracking-tight text-slate-900 mb-5 leading-tight">
                    Start Your Energy<br/><span className="gradient-text">Transition Today</span>
                  </h2>
                </Reveal>
                <Reveal dir="up" delay={200}>
                  <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed">
                    Talk to our engineering team and get a customised wind energy roadmap built for your project.
                  </p>
                </Reveal>
                <Reveal dir="up" delay={260}>
                  <div className="flex flex-wrap gap-3 justify-center mb-10">
                    <button className="btn-primary text-white font-bold text-[16px] px-8 py-4 rounded-2xl flex items-center gap-2">
                      Get a Quote <ArrowRight className="w-4 h-4"/>
                    </button>
                    <button className="btn-glass text-slate-700 font-semibold text-[16px] px-8 py-4 rounded-2xl">
                      Explore Solutions
                    </button>
                  </div>
                </Reveal>
                <Reveal dir="fade" delay={320}>
                  <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500">
                    {["Free Consultation","No Commitment Required","G98/G99 Certified"].map(f => (
                      <div key={f} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500"/> {f}
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
      <footer className="bg-slate-950 px-6 md:px-12 pt-16 pb-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-sky-500/50 to-transparent"/>
        <div className="orb w-[400px] h-[400px] -top-32 right-0" style={{ background:"radial-gradient(circle,rgba(14,165,233,0.06) 0%,transparent 70%)", filter:"blur(40px)" }}/>
        <div className="max-w-7xl mx-auto relative">
          <Reveal dir="up">
            <div className="glass-dark rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 mb-14 border border-white/8">
              <div>
                <p className="text-white font-bold text-lg">Stay ahead of the wind</p>
                <p className="text-slate-400 text-sm mt-1">Monthly insights on UK wind energy innovation.</p>
              </div>
              <div className="flex gap-3">
                <input placeholder="your@email.com" className="rounded-xl px-4 py-2.5 text-white text-sm outline-none w-56 transition-colors" style={{ background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.15)" }}/>
                <button className="btn-primary text-white text-sm font-bold px-5 py-2.5 rounded-xl whitespace-nowrap">Subscribe</button>
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-xl btn-primary flex items-center justify-center">
                  <Wind className="w-4 h-4 text-white"/>
                </div>
                <span className="text-lg font-extrabold text-white">Aero<span className="text-sky-400">nyx</span></span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[240px] mb-5">UK-based intelligent wind energy for modern infrastructure.</p>
              <div className="flex gap-2">
                {["in","tw","yt"].map(s => (
                  <div key={s} className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center cursor-pointer hover:border-sky-500/50 hover:bg-sky-500/10 transition-all">
                    <span className="text-[10px] font-bold text-slate-400">{s}</span>
                  </div>
                ))}
              </div>
            </div>
            {([
              ["Solutions",["Wind Installation","Grid Integration","Smart Load Mgmt","Maintenance & Support"]],
              ["Company",  ["About Us","Technology","Projects","Investors"]],
              ["Contact",  ["info@aeronyx.com","+44 (0) 20 0000 0000","London, UK","Partner Enquiries"]],
            ] as [string, string[]][]).map(([title, items]) => (
              <div key={title}>
                <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-slate-500 mb-4">{title}</p>
                <ul className="space-y-2.5">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-slate-400 text-sm hover:text-sky-400 transition-all duration-200 hover:pl-1 inline-block">{item}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/7 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-slate-600 text-xs">© 2026 Aeronyx Energy Ltd. All rights reserved.</p>
            <div className="flex gap-5">
              {["Privacy Policy","Terms of Use","Cookies"].map(l => (
                <a key={l} href="#" className="text-xs text-slate-600 hover:text-sky-400 transition-colors">{l}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
