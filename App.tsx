import React, { useEffect, useRef, useState } from 'react';
import { CORE_STATS, PRODUCTS, NAVIGATION_LINKS, MARKET_PROBLEM, SEDAI_SOLUTION, TIMELINE, PRESS_LOGOS } from './constants';
import Navbar from './components/Navbar';
import InquiryModal, { ModalMode } from './components/InquiryModal';
import ComparisonTable from './components/ComparisonTable';
import SlantedButton from './components/SlantedButton';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: string;
  triggerOnce?: boolean;
}

const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = '', triggerOnce = true }) => {
  const [isActive, setIsActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsActive(true);
          if (triggerOnce) observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [triggerOnce]);

  return (
    <div
      ref={ref}
      className={`reveal ${isActive ? 'active' : ''} ${delay} ${className}`}
    >
      {children}
    </div>
  );
};

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<ModalMode>('inquiry');

  // Quick footer waitlist form state
  const [waitlistName, setWaitlistName] = useState('');
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [waitlistSubscribed, setWaitlistSubscribed] = useState(false);
  const [isWaitlistSubmitting, setIsWaitlistSubmitting] = useState(false);

  const openInquiryModal = () => {
    setModalMode('inquiry');
    setIsModalOpen(true);
  };

  const openWaitlistModal = () => {
    setModalMode('waitlist');
    setIsModalOpen(true);
  };

  const handleFooterWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!waitlistEmail || !waitlistName) return;
    
    setIsWaitlistSubmitting(true);
    const formData = new FormData();
    formData.append("access_key", "312925eb-f5a6-44aa-ae3f-ae2159469ac8");
    formData.append("subject", "New Sedai Aero Footer Waitlist Signup");
    formData.append("name", waitlistName);
    formData.append("email", waitlistEmail);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      if (response.ok) {
        setWaitlistSubscribed(true);
        setTimeout(() => {
          setWaitlistSubscribed(false);
          setWaitlistName('');
          setWaitlistEmail('');
        }, 4000);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsWaitlistSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black selection:bg-[#b46c00]/30 text-zinc-100 font-sans">
      <Navbar onContactClick={openInquiryModal} />

      {/* Hero Section */}
      <header className="relative min-h-screen pt-32 pb-10 flex flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/images/Sedai Aero.png"
            className="w-full h-full object-cover opacity-80 scale-x-[-1] animate-kenBurns"
            alt="Sedai Aero"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60" />
          <div className="glow-overlay opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] mx-auto px-10 flex flex-col justify-between flex-grow pt-10">
          {/* Main Hero Content */}
          <div className="max-w-4xl pt-8 pb-12">
            <h2 className="text-[#b46c00] text-[11px] font-black tracking-[0.5em] uppercase mb-6 animate-pulse">
              01 // FLIGHT SYSTEMS ONLINE
            </h2>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tighter mb-6 font-heading leading-[1.1] uppercase gradient-text animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              THE WORLD IS READY <br />
              <span className="text-[#b46c00]">FOR FLYING CARS</span>
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-300 mb-6 font-light italic tracking-tight animate-fadeInUp max-w-2xl" style={{ animationDelay: '600ms' }}>
              Sedai Aero — Aircraft for All People
            </p>
            <p className="text-zinc-400 text-sm sm:text-base mb-10 max-w-xl leading-relaxed animate-fadeInUp" style={{ animationDelay: '700ms' }}>
              Reimagining personal flight through luxury hybrid electric eVTOL technology, six-times redundant safety systems, and accessible harbor infrastructure.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
              <SlantedButton 
                variant="accent" 
                size="lg"
                onClick={openInquiryModal}
              >
                SEND INQUIRY
              </SlantedButton>
              <SlantedButton 
                variant="secondary" 
                size="lg"
                onClick={openWaitlistModal}
              >
                JOIN THE WAITLIST
              </SlantedButton>
            </div>
          </div>

          {/* Hero Feature Icons Strip - Anchored Lower at Bottom of Hero Banner */}
          <div className="mt-auto pt-8 pb-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 animate-fadeInUp" style={{ animationDelay: '1000ms' }}>
            {[
              {
                icon: (
                  <svg className="w-5 h-5 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ),
                title: "POWERPLANT",
                sub: "462 HP V-Twin"
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                ),
                title: "CRUISE SPEED",
                sub: "140 Knots"
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 002 2h1.5a2.5 2.5 0 002.5-2.5V14M12 22a10 10 0 100-20 10 10 0 000 20z" />
                  </svg>
                ),
                title: "MAX RANGE",
                sub: "700 NM Hybrid"
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ),
                title: "PAYLOAD",
                sub: "250 lb Commuter"
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "REDUNDANCY",
                sub: "6-Times Redundant"
              },
              {
                icon: (
                  <svg className="w-5 h-5 text-[#b46c00]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ),
                title: "VERTIPORTS",
                sub: "Water-Based Dock"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col p-5 rounded-2xl bg-black/40 backdrop-blur-md border border-white/10 hover:border-[#b46c00]/60 transition-all duration-300 group shadow-lg">
                <div className="w-9 h-9 rounded-xl bg-black/80 border border-white/15 flex items-center justify-center mb-4 group-hover:border-[#b46c00] group-hover:scale-105 transition-all">
                  {item.icon}
                </div>
                <span className="text-[9px] font-black tracking-[0.2em] text-zinc-500 uppercase mb-1">{item.title}</span>
                <span className="text-sm font-bold text-white tracking-tight group-hover:text-[#b46c00] transition-colors">{item.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Quote Philosophy Section */}
      <section id="about" className="py-24 px-10 relative overflow-hidden bg-gradient-to-b from-black via-zinc-950/40 to-black">
        <div className="max-w-[1800px] mx-auto">
          <Reveal>
            <div className="max-w-5xl mx-auto text-center border border-white/10 glass-panel p-12 sm:p-20 rounded-3xl relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-6 py-1 bg-[#b46c00] text-black text-[9px] font-black tracking-[0.4em] uppercase rounded-full">
                MISSION PHILOSOPHY
              </div>
              <p className="text-2xl sm:text-4xl md:text-5xl font-light text-zinc-200 leading-tight tracking-tight mb-8">
                For decades, flying cars were a dream reserved for the future. <br />
                <span className="text-white font-black italic uppercase tracking-tighter text-3xl sm:text-5xl md:text-6xl block mt-4 text-[#b46c00]">
                  That future is now.
                </span>
              </p>
              <p className="text-zinc-400 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed">
                "Sedai Aero was founded on a bold belief: Flight should be accessible, exhilarating, and safe — without barriers. We engineered Sedai Aero to remove complexity, cost, and limitations while delivering unmatched luxury."
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 1: ORIGINS // WHO WE ARE (Text Left, Image Right) */}
      <section id="origins" className="py-28 px-10 border-t border-white/10 bg-black relative">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b46c00]" />
                <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase">01. ORIGINS</h3>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-heading mb-8 uppercase leading-tight tracking-tighter">
                WHO WE ARE
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-10 italic">
                Sedai Aero is a proprietary hybrid eVTOL manufacturer driven by a commitment to the unreachable.
              </p>
            </Reveal>

            <div className="space-y-6 mb-12">
              {['Innovation', 'Safety', 'Performance', 'Accessibility'].map((item, i) => (
                <Reveal key={item} delay={`reveal-delay-${i + 1}`}>
                  <div className="flex justify-between items-center group cursor-default p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#b46c00]/30 transition-all">
                    <span className="text-zinc-600 font-mono text-xs italic">INDEX_0{i + 1}</span>
                    <span className="text-xl font-bold text-zinc-200 group-hover:text-[#b46c00] transition-colors uppercase tracking-tight">{item}</span>
                    <span className="text-[#b46c00] opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay="reveal-delay-4">
              <SlantedButton variant="primary" size="lg" onClick={openInquiryModal}>
                INQUIRE ABOUT ORIGINS
              </SlantedButton>
            </Reveal>
          </div>

          <Reveal className="relative group overflow-hidden rounded-3xl aspect-[4/3] w-full border border-white/10 shadow-2xl">
            <img src="/assets/images/who-we-are.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Who We Are" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-8 left-8 p-6 glass-panel rounded-2xl border border-white/10 max-w-sm">
              <span className="text-[#b46c00] text-[9px] font-black tracking-[0.4em] uppercase block mb-1">PROPRIETARY R&D</span>
              <p className="text-white font-bold text-sm uppercase tracking-wide">Engineered for absolute safety and autonomy.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 2: EXECUTION // WHAT WE DO (Image Left, Text Right) */}
      <section id="execution" className="py-28 px-10 border-t border-white/10 bg-zinc-950/40 relative">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <Reveal className="order-2 lg:order-1 relative group overflow-hidden rounded-3xl aspect-[4/3] w-full border border-white/10 shadow-2xl">
            <img src="/assets/images/what-we-do.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="What We Do" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-8 left-8 p-6 glass-panel rounded-2xl border border-white/10 max-w-sm">
              <span className="text-[#b46c00] text-[9px] font-black tracking-[0.4em] uppercase block mb-1">LUXURY HPEV AIRCRAFT</span>
              <p className="text-white font-bold text-sm uppercase tracking-wide">Redefining flight expectations for everyone.</p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b46c00]" />
                <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase">02. EXECUTION</h3>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-heading mb-8 uppercase leading-tight tracking-tighter">
                WHAT WE DO
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                We engineer and manufacture high-performance hybrid electric eVTOLs that redefine the very nature of flight.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {['Safety standards', 'Flight range', 'Design expectations', 'The flying experience'].map((item, i) => (
                <Reveal key={item} delay={`reveal-delay-${i + 1}`}>
                  <div className="p-5 glass-panel rounded-xl border border-white/5 hover:border-[#b46c00]/40 transition-colors group">
                    <span className="text-[#b46c00] text-xs font-black mr-3 inline-block group-hover:translate-x-1 transition-transform">→</span>
                    <span className="text-sm font-bold uppercase tracking-tight text-zinc-300 group-hover:text-white">{item}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay="reveal-delay-4">
              <p className="text-zinc-400 italic text-sm leading-relaxed border-l-2 border-[#b46c00] pl-4 mb-8">
                Sedai Aero fuses a proprietary power delivery system with a cutting-edge fuselage and advanced aerospace technologies to create the world’s first luxury ultralight HPEV.
              </p>
              <SlantedButton variant="accent" size="lg" onClick={openInquiryModal}>
                REQUEST CAPABILITIES PACK
              </SlantedButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 3: ENGINEERING THRESHOLDS // SEDAI AERO HPEV (Text Left, Image Right) */}
      <section id="performance" className="py-28 px-10 border-t border-white/10 bg-black relative">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b46c00]" />
                <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase">03. PROPULSION & PERFORMANCE</h3>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-heading mb-6 uppercase leading-tight tracking-tighter">
                THE FIRST ULTRALIGHT <br />
                <span className="text-[#b46c00]">HPEV</span> EVER BUILT
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Powered by a 462 HP V-Twin hybrid system paired with an advanced e-Motor for extreme power density and 700 NM endurance.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <Reveal className="p-6 border border-white/10 rounded-2xl glass-panel">
                <span className="text-zinc-500 text-[9px] font-black tracking-widest uppercase block mb-2">POWER OUTPUT</span>
                <span className="text-3xl font-black font-heading text-[#b46c00] tracking-tight">462 HP</span>
                <span className="text-zinc-400 text-xs block mt-1">V-Twin Hybrid System</span>
              </Reveal>
              <Reveal delay="reveal-delay-2" className="p-6 border border-white/10 rounded-2xl glass-panel">
                <span className="text-zinc-500 text-[9px] font-black tracking-widest uppercase block mb-2">SAFETY REDUNDANCY</span>
                <span className="text-3xl font-black font-heading text-white tracking-tight">6-LAYER</span>
                <span className="text-zinc-400 text-xs block mt-1">Multi-Tier Redundancy</span>
              </Reveal>
            </div>

            <Reveal delay="reveal-delay-3">
              <SlantedButton variant="primary" size="lg" onClick={openInquiryModal}>
                REQUEST TECHNICAL SPECS
              </SlantedButton>
            </Reveal>
          </div>

          <Reveal className="relative group overflow-hidden rounded-3xl aspect-[4/3] w-full border border-white/10 shadow-2xl">
            <img src="/assets/images/sedai-fleet.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Sedai Fleet" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
            <div className="absolute top-8 right-8 p-4 glass-panel rounded-xl border border-white/10">
              <span className="text-[10px] font-black text-[#b46c00] tracking-widest uppercase block">SEDAI AERO HPEV</span>
              <span className="text-xs text-white font-bold uppercase">462 HP Hybrid System</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 4: INFRASTRUCTURE 2.0 // HARBOR VERTIPORTS (Image Left, Text Right) */}
      <section id="infrastructure" className="py-28 px-10 border-t border-white/10 bg-zinc-950/40 relative">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <Reveal className="order-2 lg:order-1 relative group overflow-hidden rounded-3xl aspect-[4/3] w-full border border-white/10 shadow-2xl">
            <img src="/assets/images/harbor.png" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Harbor Vertiport" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-8 left-8 p-6 glass-panel rounded-2xl border border-white/10 max-w-sm">
              <span className="text-[#b46c00] text-[9px] font-black tracking-[0.4em] uppercase block mb-1">AMPHIBIOUS FREEDOM</span>
              <p className="text-white font-bold text-sm uppercase tracking-wide">Dock inside standard marina boat slips.</p>
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b46c00]" />
                <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase">04. INFRASTRUCTURE 2.0</h3>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-heading mb-8 uppercase leading-tight tracking-tighter">
                HARBOR VERTIPORTS
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Instead of expensive real estate builds, Sedai Aero introduces marina-based vertiports. Dock space is affordable, scalable, and fits inside standard marina boat parking.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 mb-10">
              <Reveal className="p-6 border border-white/10 rounded-2xl glass-panel">
                <p className="text-white font-bold uppercase text-sm tracking-wide mb-1">2 Million</p>
                <p className="text-zinc-500 text-xs leading-normal">Potential coastal owners in CA & FL markets.</p>
              </Reveal>
              <Reveal delay="reveal-delay-2" className="p-6 border border-white/10 rounded-2xl glass-panel">
                <p className="text-white font-bold uppercase text-sm tracking-wide mb-1">Zero Build</p>
                <p className="text-zinc-500 text-xs leading-normal">Utilize existing harbor infrastructure.</p>
              </Reveal>
            </div>

            <Reveal delay="reveal-delay-3">
              <SlantedButton variant="accent" size="lg" onClick={openInquiryModal}>
                VERTIPORT PARTNERSHIPS
              </SlantedButton>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRIAL SOLUTIONS // SEDAI CROPDUSTER (Text Left, Image Right) */}
      <section id="industrial" className="py-28 px-10 border-t border-white/10 bg-black relative">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div>
            <Reveal>
              <div className="flex items-center gap-3 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#b46c00]" />
                <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase">05. INDUSTRIAL SOLUTIONS</h3>
              </div>
              <h2 className="text-4xl sm:text-6xl font-black font-heading mb-8 uppercase leading-tight tracking-tighter">
                SEDAI CROPDUSTER
              </h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Industrial agriculture and surveying drone platform. Built for performance, heavy payload capacity, and automated flight precision.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {['Industrial Scale', 'Surveying Platform', 'Heavy Payload', 'Automated Flight'].map((spec, i) => (
                <Reveal key={spec} delay={`reveal-delay-${i + 1}`}>
                  <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b46c00]" />
                    <span className="text-xs font-bold text-zinc-300 uppercase tracking-tight">{spec}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay="reveal-delay-4">
              <SlantedButton variant="primary" size="lg" onClick={openInquiryModal}>
                GET INDUSTRIAL QUOTE
              </SlantedButton>
            </Reveal>
          </div>

          <Reveal className="relative group overflow-hidden rounded-3xl aspect-[4/3] w-full border border-white/10 shadow-2xl">
            <img src="/assets/images/crop-duster.jpg" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000" alt="Sedai CropDuster" />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-8 left-8 p-6 glass-panel rounded-2xl border border-white/10 max-w-sm">
              <span className="text-[#b46c00] text-[9px] font-black tracking-[0.4em] uppercase block mb-1">AGRITECH PLATFORM</span>
              <p className="text-white font-bold text-sm uppercase tracking-wide">Automated high-capacity aerial spraying & mapping.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SECTION 6: MARKET COMPARISON TABLE */}
      <section id="comparison" className="py-28 px-10 border-t border-white/10 bg-zinc-950/50">
        <div className="max-w-[1800px] mx-auto">
          <Reveal className="text-center mb-16">
            <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-4">MARKET REVOLUTION</h3>
            <h2 className="text-4xl sm:text-6xl font-black font-heading uppercase tracking-tighter">
              WHY SEDAI AERO WINS
            </h2>
          </Reveal>

          <Reveal delay="reveal-delay-2">
            <ComparisonTable />
          </Reveal>
        </div>
      </section>

      {/* DESTINATION CALL TO ACTION */}
      <section className="py-32 px-10 text-center bg-black relative overflow-hidden">
        <div className="glow-overlay opacity-30" />
        <div className="max-w-5xl mx-auto relative z-10">
          <Reveal>
            <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.8em] uppercase mb-8">DESTINATION REACHED</h3>
            <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black font-heading mb-12 uppercase tracking-tighter leading-none gradient-text">
              THE FUTURE OF <br /> PERSONAL MOBILITY
            </h2>
            <p className="text-zinc-400 text-xl font-light italic mb-16 max-w-3xl mx-auto leading-relaxed">
              Sedai Aero isn’t just building aircraft. We’re building a scalable coastal flight network and a movement toward accessible aviation.
            </p>
          </Reveal>
          
          <Reveal delay="reveal-delay-2" className="flex justify-center">
            <SlantedButton variant="accent" size="lg" onClick={openInquiryModal}>
              SEND AN INQUIRY
            </SlantedButton>
          </Reveal>
        </div>
      </section>

      {/* FOOTER (Matching Reference Image Layout with Waitlist Signup) */}
      <footer className="py-20 px-10 border-t border-white/10 bg-zinc-950">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Brand & Social */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center gap-3">
              <img src="/assets/images/Sedai%20Aero%20logo.webp" alt="Sedai Aero Logo" className="h-8 w-auto object-contain" />
              <span className="text-2xl font-black tracking-[0.3em] font-heading uppercase text-white">
                SEDAI <span className="text-[#b46c00]">AERO</span>
              </span>
            </div>

            <p className="text-zinc-400 text-sm max-w-md leading-relaxed">
              Proprietary hybrid eVTOL manufacturer redefining the limits of personal mobility through luxury engineering, six-times redundant safety systems, and accessible harbor infrastructure.
            </p>

            {/* Social Icons */}
            <div className="pt-4 flex items-center gap-6">
              {[
                { name: 'X', svg: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' },
                { name: 'LinkedIn', svg: 'M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.6 1.6 0 1 0 0 3.2 1.6 1.6 0 0 0 0-3.2z' },
                { name: 'YouTube', svg: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                { name: 'Instagram', svg: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' }
              ].map(s => (
                <a key={s.name} href="#" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-[#b46c00] hover:border-[#b46c00] transition-all">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d={s.svg} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: USA Manufacturing & Company Info */}
          <div className="lg:col-span-6 space-y-6">
            <h4 className="text-white font-black text-xl tracking-[0.1em] font-heading uppercase leading-tight">
              INNOVATED, DESIGNED, MANUFACTURED & LAUNCHED FROM THE USA
            </h4>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Sedai Aero is proud to lead the next generation of aerospace technology right here in the United States. From our engineering labs in California to flight test operations in Florida, every component of our hybrid eVTOL platform is crafted for performance, endurance, and uncompromising safety.
            </p>

            <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center text-xs text-zinc-500 font-bold uppercase tracking-widest gap-4">
              <p>© 2026 Sedai Aero Systems. All Rights Reserved.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-white transition-colors">Terms of Operation</a>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mode={modalMode} />
    </div>
  );
};

export default App;
