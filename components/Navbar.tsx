
import React, { useState, useEffect } from 'react';
import { NAVIGATION_LINKS } from '../constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? 'bg-black/80 backdrop-blur-2xl py-6 border-b border-white/5' : 'bg-transparent py-10'}`}>
      <div className="max-w-[1800px] mx-auto px-10 flex justify-between items-center">
        <div className="flex items-center gap-20">
          <div className="flex flex-col group cursor-pointer">
            <span className="text-2xl font-black tracking-[0.3em] font-heading leading-none group-hover:text-[#b46c00] transition-colors uppercase">SEDAI</span>
            <span className="text-[8px] tracking-[0.5em] text-zinc-600 font-black uppercase mt-1">AERO SYSTEMS</span>
          </div>
          
          <div className="hidden xl:flex items-center gap-14">
            {NAVIGATION_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-[9px] font-black tracking-[0.3em] text-zinc-500 hover:text-white transition-all uppercase relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b46c00] group-hover:w-full transition-all duration-500"></span>
              </a>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-12">
          <div className="hidden sm:flex items-center gap-10">
            <a href="#" className="text-[9px] font-black tracking-[0.2em] uppercase text-zinc-600 hover:text-white transition-colors">Portal</a>
            <div className="flex items-center gap-2 text-[9px] font-black tracking-[0.2em] uppercase">
              <span className="text-white">EN</span>
              <div className="w-1 h-1 rounded-full bg-[#b46c00]"></div>
              <span className="text-zinc-700">US</span>
            </div>
          </div>
          <button className="px-8 py-3 bg-transparent border border-white/10 hover:border-[#b46c00]/40 text-white text-[9px] font-black tracking-[0.4em] uppercase transition-all duration-500 hover:bg-white/5">
            Configurator
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
