
import React, { useEffect, useRef, useState } from 'react';
import { CORE_STATS, PRODUCTS, NAVIGATION_LINKS, MARKET_PROBLEM, SEDAI_SOLUTION, TIMELINE, PRESS_LOGOS } from './constants';
import Navbar from './components/Navbar';
import AIAssistant from './components/AIAssistant';

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
  return (
    <div className="min-h-screen bg-black selection:bg-[#b46c00]/30 text-zinc-100">
      <Navbar />

      {/* Hero Section */}
      <header className="relative h-screen min-h-[900px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1540946484710-44737ef01819?auto=format&fit=crop&q=90&w=2000" 
            className="w-full h-full object-cover opacity-80 scale-x-[-1] animate-kenBurns"
            alt="Sedai Aero Craft"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />
          <div className="glow-overlay opacity-40" />
        </div>

        <div className="relative z-10 w-full max-w-[1800px] px-10 flex flex-col justify-between h-full pt-48 pb-16">
          <div className="max-w-4xl">
            <h2 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-6 animate-pulse">01 // FLIGHT SYSTEMS ONLINE</h2>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-6 font-heading leading-[1.2] uppercase gradient-text animate-fadeInUp" style={{ animationDelay: '400ms' }}>
              THE WORLD IS READY <br /> 
              <span className="text-[#b46c00]">FOR FLYING CARS</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-12 font-light italic tracking-tight animate-fadeInUp" style={{ animationDelay: '600ms' }}>
              Sedai Aero — Aircraft for All People
            </p>
            <div className="flex flex-wrap gap-6 animate-fadeInUp" style={{ animationDelay: '800ms' }}>
              <button className="px-12 py-5 bg-white text-black text-[11px] font-black tracking-[0.3em] uppercase hover:bg-[#b46c00] hover:text-white transition-all duration-500">
                DISCOVER PERFORMANCE
              </button>
              <button className="px-12 py-5 bg-black/40 backdrop-blur-xl border border-white/10 text-white text-[11px] font-black tracking-[0.3em] uppercase hover:bg-white/10 transition-all duration-500">
                REQUEST TELEMETRY
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 border-t border-white/5 pt-12">
            {CORE_STATS.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col group animate-fadeInUp`} style={{ animationDelay: `${1000 + i * 100}ms` }}>
                <span className="text-zinc-600 text-[9px] font-black tracking-[0.2em] mb-2 uppercase">CH_{i + 1} // {stat.label}</span>
                <span className="text-2xl md:text-4xl font-bold font-heading text-white tracking-tighter group-hover:text-[#b46c00] transition-colors duration-500">{stat.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Bold Belief & Quote Section */}
      <section id="about" className="py-64 px-10 relative overflow-hidden bg-zinc-950/20">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-12 gap-20 items-center">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] mb-12 uppercase">02 // MISSION PHILOSOPHY</p>
              <p className="text-3xl md:text-6xl font-light text-zinc-300 leading-[1.1] mb-20 tracking-tighter">
                For decades, flying cars were a dream reserved for the future. <br />
                <span className="text-white font-black italic uppercase tracking-tighter text-5xl md:text-8xl block mt-8">That future is now.</span>
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:pt-32">
            <Reveal delay="reveal-delay-3">
              <div className="p-12 glass-panel rounded-[2rem] border-l-2 border-[#b46c00]/50">
                 <p className="text-xl italic text-zinc-400 leading-relaxed">
                  "Sedai Aero was founded on a bold belief: Flight should be accessible, exhilarating, and safe — without barriers."
                 </p>
              </div>
            </Reveal>
          </div>
        </div>
        <div className="max-w-[1800px] mx-auto mt-40 border-t border-white/5 pt-20">
          <Reveal delay="reveal-delay-4">
            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl leading-relaxed">
              We engineered Sedai Aero to remove the complexity, cost, and limitations that have held the industry back — while delivering unmatched luxury and performance.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Who We Are & What We Do: Offset Gallery Layout */}
      <section id="tech" className="py-40 border-y border-white/5">
        <div className="max-w-[1800px] mx-auto px-10">
          <div className="grid lg:grid-cols-2 gap-40 items-start">
            <div className="space-y-40">
              <div className="max-w-xl">
                <Reveal>
                  <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-8">01. ORIGINS</h3>
                  <h2 className="text-5xl md:text-7xl font-black font-heading mb-12 uppercase leading-none tracking-tighter">WHO <br /> WE ARE</h2>
                  <p className="text-zinc-500 text-xl leading-relaxed mb-16 italic">
                    Sedai Aero is a proprietary hybrid eVTOL manufacturer driven by a commitment to the unreachable.
                  </p>
                </Reveal>
                <div className="space-y-8">
                  {['Innovation', 'Safety', 'Performance', 'Accessibility'].map((item, i) => (
                    <Reveal key={item} delay={`reveal-delay-${i + 1}`}>
                      <div className="flex justify-between items-center group cursor-default">
                        <span className="text-zinc-700 font-mono text-sm tracking-tighter italic pr-8">INDEX_0{i}</span>
                        <span className="text-2xl font-bold text-zinc-300 group-hover:text-[#b46c00] group-hover:translate-x-2 transition-all duration-500 uppercase tracking-tighter">{item}</span>
                        <div className="flex-1 border-b border-white/5 mx-8 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
              <Reveal className="relative group overflow-hidden rounded-[3rem] aspect-[4/5] max-w-md ml-auto border border-white/5">
                 <img src="https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" alt="Engine" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700"></div>
                 <div className="absolute bottom-10 left-10">
                    <p className="text-[9px] font-black text-white tracking-[0.4em] uppercase">SYSTEM PERFORMANCE</p>
                 </div>
              </Reveal>
            </div>
            <div className="lg:pt-64 space-y-40">
              <Reveal className="relative group overflow-hidden rounded-[3rem] aspect-[4/3] w-full border border-white/5">
                 <img src="https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" alt="Cockpit" />
                 <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all duration-700"></div>
              </Reveal>
              <div className="max-w-xl">
                <Reveal>
                  <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-8">02. EXECUTION</h3>
                  <h2 className="text-5xl md:text-7xl font-black font-heading mb-12 uppercase leading-none tracking-tighter">WHAT <br /> WE DO</h2>
                  <p className="text-zinc-500 text-xl leading-relaxed mb-12">
                    We engineer and manufacture high-performance hybrid electric eVTOLs that redefine the very nature of flight.
                  </p>
                </Reveal>
                <div className="grid grid-cols-1 gap-6 mb-16">
                  {['Safety standards', 'Flight range', 'Design expectations', 'The flying experience'].map((item, i) => (
                    <Reveal key={item} delay={`reveal-delay-${i + 1}`}>
                      <div className="p-8 glass-panel rounded-2xl hover:bg-white/5 transition-colors border border-white/5 group">
                        <span className="text-[#b46c00] text-xs font-black mr-4 group-hover:translate-x-1 inline-block transition-transform">→</span>
                        <span className="text-xl font-bold uppercase tracking-tight text-zinc-300 group-hover:text-white">{item}</span>
                      </div>
                    </Reveal>
                  ))}
                </div>
                <Reveal delay="reveal-delay-4">
                  <p className="text-zinc-500 italic text-sm leading-relaxed border-l border-zinc-800 pl-6">
                    Sedai Aero fuses a proprietary power delivery system with a cutting-edge fuselage and advanced aerospace technologies to create the world’s first luxury ultralight HPEV.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specification Section */}
      <section className="py-64 px-10 bg-black relative">
        <div className="max-w-[1800px] mx-auto">
          <div className="text-center mb-40">
            <Reveal>
              <h2 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-8">Engineering Thresholds</h2>
              <h3 className="text-5xl md:text-8xl font-black font-heading mb-10 tracking-tighter uppercase leading-none">THE FIRST <br /> ULTRALIGHT <br /> <span className="text-zinc-700 italic">HPEV</span> EVER BUILT</h3>
            </Reveal>
          </div>
          <div className="grid lg:grid-cols-3 gap-1">
             <Reveal className="p-20 border border-white/5 flex flex-col justify-between group hover:bg-zinc-900 transition-colors duration-700">
                <div className="text-zinc-700 text-[10px] font-bold tracking-[0.3em] uppercase">Powerplant</div>
                <div>
                   <div className="text-7xl font-black font-heading text-[#b46c00] mb-4 tracking-tighter">462 HP</div>
                   <div className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Total System Output</div>
                </div>
             </Reveal>
             <Reveal delay="reveal-delay-2" className="p-20 border border-white/5 flex flex-col justify-between group hover:bg-zinc-900 transition-colors duration-700">
                <div className="text-zinc-700 text-[10px] font-bold tracking-[0.3em] uppercase">Propulsion</div>
                <div>
                   <div className="text-7xl font-black font-heading text-white mb-4 tracking-tighter italic">V-TWIN</div>
                   <div className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Hybrid + Advanced e-Motor</div>
                </div>
             </Reveal>
             <Reveal delay="reveal-delay-3" className="p-20 border border-white/5 flex flex-col justify-between group hover:bg-zinc-900 transition-colors duration-700">
                <div className="text-zinc-700 text-[10px] font-bold tracking-[0.3em] uppercase">Redundancy</div>
                <div>
                   <div className="text-7xl font-black font-heading text-zinc-300 mb-4 tracking-tighter">6-LAYER</div>
                   <div className="text-zinc-500 text-xs font-bold tracking-widest uppercase">Safety Redundancy System</div>
                </div>
             </Reveal>
          </div>
          <div className="mt-40 text-center">
            <Reveal delay="reveal-delay-4">
              <p className="text-2xl md:text-4xl text-zinc-500 font-light italic max-w-4xl mx-auto leading-tight">
                "This is the most power-dense ultralight ever made. <span className="text-white font-bold not-italic">More power. More range. More confidence.</span>"
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Infrastructure Section: Smart Marina */}
      <section id="infrastructure" className="py-64 px-10 border-y border-white/5 bg-zinc-950/40">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-2 gap-32 items-center">
           <div>
              <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-8">Infrastructure 2.0</h3>
              <h2 className="text-5xl md:text-8xl font-black font-heading mb-12 uppercase leading-none tracking-tighter">HARBOR <br /> <span className="text-zinc-700">VERTIPORTS</span></h2>
              <p className="text-zinc-400 text-2xl font-light italic leading-relaxed mb-16">
                Instead of expensive real estate builds, Sedai Aero introduces marina-based vertiports. Dock space is affordable, scalable, and fits inside standard marina boat parking.
              </p>
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-8 border border-white/5 rounded-2xl">
                    <p className="text-white font-bold uppercase text-xs tracking-widest mb-2">2 Million</p>
                    <p className="text-zinc-500 text-[11px] leading-tight">Potential coastal owners in CA & FL markets.</p>
                 </div>
                 <div className="p-8 border border-white/5 rounded-2xl">
                    <p className="text-white font-bold uppercase text-xs tracking-widest mb-2">Zero Build</p>
                    <p className="text-zinc-500 text-[11px] leading-tight">Utilize existing harbor infrastructure.</p>
                 </div>
              </div>
           </div>
           <Reveal delay="reveal-delay-3" className="relative">
              <div className="aspect-[4/3] rounded-[4rem] overflow-hidden border border-white/10 group">
                <img src="https://images.unsplash.com/photo-1493238507129-15510bfad19a?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" alt="Marina" />
              </div>
              <div className="absolute -bottom-10 -right-10 p-12 glass-panel rounded-[3rem] max-w-sm hidden md:block">
                 <p className="text-[#b46c00] font-black italic text-3xl font-heading mb-4 leading-none uppercase">Amphibious <br /> Freedom</p>
                 <p className="text-zinc-500 text-xs">Sedai Aero meets commuters where they already are.</p>
              </div>
          </Reveal>
        </div>
      </section>

      {/* Fleet Showcase */}
      <section className="py-64 px-10 bg-black">
        <div className="max-w-[1800px] mx-auto">
          <Reveal className="flex justify-between items-end mb-40">
            <h2 className="text-5xl md:text-8xl font-black font-heading leading-none uppercase tracking-tighter">OUR <br /> <span className="text-white/20">FLEET</span></h2>
            <p className="text-zinc-600 font-black tracking-[0.5em] text-[10px] uppercase pb-4">Scalable Mobility</p>
          </Reveal>
          <div className="grid lg:grid-cols-3 gap-12">
            {PRODUCTS.map((product, i) => (
              <Reveal key={product.id} delay={`reveal-delay-${i + 1}`} className="group flex flex-col">
                <div className="aspect-[4/3] overflow-hidden rounded-[3rem] mb-12 relative border border-white/5">
                  <img src={product.imageUrl} className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[2s]" alt={product.name} />
                  <div className="absolute top-8 left-8">
                     <span className="px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-[9px] font-black tracking-widest text-white uppercase">ID_0{i+1}</span>
                  </div>
                </div>
                <div>
                   <h3 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-4">{product.category}</h3>
                   <h4 className="text-4xl font-bold font-heading mb-6 tracking-tight uppercase group-hover:text-[#b46c00] transition-colors">{product.name}</h4>
                   <p className="text-zinc-500 text-lg leading-relaxed italic mb-10">{product.description}</p>
                   <div className="space-y-3">
                      {product.specs.slice(0, 3).map(spec => (
                        <div key={spec} className="flex items-center justify-between border-b border-white/5 pb-2">
                           <span className="text-zinc-600 text-[10px] font-bold uppercase tracking-widest">{spec.split(' ')[0]}</span>
                           <span className="text-zinc-300 text-[11px] font-black uppercase tracking-tight">{spec.split(' ').slice(1).join(' ')}</span>
                        </div>
                      ))}
                   </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <AIAssistant />

      <section className="py-64 px-10 text-center bg-black relative">
        <div className="glow-overlay opacity-30" />
        <div className="max-w-6xl mx-auto relative z-10">
          <Reveal>
            <h3 className="text-[#b46c00] text-[10px] font-black tracking-[1em] uppercase mb-12">DESTINATION REACHED</h3>
            <h2 className="text-6xl md:text-9xl font-black font-heading mb-20 uppercase tracking-tighter leading-[0.85] gradient-text">
              THE FUTURE OF <br /> PERSONAL MOBILITY
            </h2>
            <p className="text-zinc-500 text-3xl font-light italic mb-32 max-w-4xl mx-auto leading-tight">
              Sedai Aero isn’t just building aircraft. We’re building a scalable coastal flight network and a movement toward accessible aviation.
            </p>
          </Reveal>
          <Reveal delay="reveal-delay-2" className="mb-40">
             <p className="text-4xl md:text-6xl font-black font-heading mb-10 text-white leading-none uppercase tracking-tighter italic">
                "The Future Belongs to Those Who Believe in the Beauty of Their Dreams"
             </p>
             <p className="text-zinc-600 uppercase tracking-[0.5em] font-black text-xs">— ELEANOR ROOSEVELT</p>
          </Reveal>
          <Reveal delay="reveal-delay-3" className="flex flex-col items-center gap-16">
             <h3 className="text-4xl md:text-6xl font-black font-heading uppercase tracking-tighter leading-none">THE WORLD IS READY.</h3>
             <button className="group relative overflow-hidden px-24 py-10 bg-white text-black font-black rounded-full transition-all duration-700 hover:bg-[#b46c00] hover:text-white transform hover:scale-105 active:scale-95">
               <span className="relative z-10 text-2xl tracking-[0.1em] uppercase">ARE YOU READY TO FLY?</span>
               <div className="absolute inset-0 bg-[#b46c00] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
             </button>
          </Reveal>
        </div>
      </section>

      <footer className="py-40 px-10 border-t border-white/5 bg-black">
        <div className="max-w-[1800px] mx-auto grid lg:grid-cols-4 gap-20">
          <Reveal className="lg:col-span-2">
            <div className="text-4xl font-black tracking-[0.2em] font-heading leading-none mb-12 uppercase">SEDAI <span className="text-[#b46c00]">AERO</span></div>
            <p className="text-zinc-600 text-sm max-w-sm leading-relaxed mb-12">
               Proprietary hybrid eVTOL manufacturer redefining the limits of personal mobility through luxury engineering and accessible infrastructure.
            </p>
            <div className="flex gap-8 opacity-20 hover:opacity-100 transition-opacity">
               {PRESS_LOGOS.slice(0, 5).map(l => (
                 <span key={l} className="text-[10px] font-black uppercase tracking-widest text-white">{l}</span>
               ))}
            </div>
          </Reveal>
          <Reveal delay="reveal-delay-2">
             <h5 className="text-zinc-400 text-[10px] font-black tracking-[0.4em] mb-10 uppercase">Navigation</h5>
             <div className="space-y-6 flex flex-col">
                {NAVIGATION_LINKS.map(link => (
                  <a key={link.name} href={link.href} className="text-zinc-600 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">{link.name}</a>
                ))}
             </div>
          </Reveal>
          <Reveal delay="reveal-delay-3">
             <h5 className="text-zinc-400 text-[10px] font-black tracking-[0.4em] mb-10 uppercase">Registry</h5>
             <div className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.2em] space-y-2">
                <p>© 2024 Sedai Aero Systems</p>
                <p>California, USA | Florida, USA</p>
                <p>Privacy Policy | Terms of Operation</p>
             </div>
          </Reveal>
        </div>
      </footer>
    </div>
  );
};

export default App;
