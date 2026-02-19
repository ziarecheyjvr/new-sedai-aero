
import React, { useState } from 'react';
import { getCommuteFeasibility } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleConsult = async (e?: React.FormEvent, customOrigin?: string, customDest?: string) => {
    e?.preventDefault();
    const finalOrigin = customOrigin || origin;
    const finalDest = customDest || destination;
    
    if (!finalOrigin || !finalDest) return;
    
    setLoading(true);
    setResult('');
    const analysis = await getCommuteFeasibility(finalOrigin, finalDest);
    setResult(analysis || '');
    setLoading(false);
  };

  const setExample = (o: string, d: string) => {
    setOrigin(o);
    setDestination(d);
    handleConsult(undefined, o, d);
  };

  return (
    <section className="py-64 px-10 bg-black relative border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#b46c00]/20 to-transparent"></div>
      <div className="max-w-[1400px] mx-auto">
        <div className="grid lg:grid-cols-2 gap-32 items-center">
          <div>
            <h2 className="text-[#b46c00] text-[10px] font-black tracking-[0.5em] uppercase mb-8">AI Mission Analysis</h2>
            <h3 className="text-4xl md:text-6xl font-black font-heading mb-10 tracking-tighter uppercase leading-none">COMMUTE <br /> <span className="text-zinc-800">INTELLIGENCE</span></h3>
            <p className="text-zinc-500 text-xl italic leading-relaxed mb-16 max-w-xl">
              Utilize our neural network to calculate real-time flight telemetry, energy consumption, and mission safety ratings based on your target trajectory.
            </p>
            
            <div className="flex flex-wrap gap-3 mb-12">
              <button onClick={() => setExample('Miami', 'Bimini')} className="px-6 py-3 rounded-full border border-white/5 bg-white/5 text-[10px] font-black tracking-widest text-zinc-500 hover:text-white hover:border-[#b46c00]/30 transition-all uppercase">Miami → Bimini</button>
              <button onClick={() => setExample('Newport Beach', 'Catalina')} className="px-6 py-3 rounded-full border border-white/5 bg-white/5 text-[10px] font-black tracking-widest text-zinc-500 hover:text-white hover:border-[#b46c00]/30 transition-all uppercase">Newport → Catalina</button>
            </div>
          </div>

          <div className="p-16 glass-panel rounded-[4rem] border border-white/10 shadow-3xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#b46c00]/5 to-transparent opacity-50"></div>
            <div className="relative z-10">
              <form onSubmit={handleConsult} className="space-y-6 mb-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black tracking-widest text-zinc-600 uppercase ml-2">Departing_From</label>
                    <input 
                      type="text" 
                      placeholder="Origin Port"
                      value={origin}
                      onChange={(e) => setOrigin(e.target.value)}
                      className="w-full bg-black/60 border border-white/5 rounded-2xl p-6 focus:outline-none focus:border-[#b46c00]/50 transition-all text-white placeholder-zinc-800 font-bold uppercase tracking-tight"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black tracking-widest text-zinc-600 uppercase ml-2">Arriving_At</label>
                    <input 
                      type="text" 
                      placeholder="Destination"
                      value={destination}
                      onChange={(e) => setDestination(e.target.value)}
                      className="w-full bg-black/60 border border-white/5 rounded-2xl p-6 focus:outline-none focus:border-[#b46c00]/50 transition-all text-white placeholder-zinc-800 font-bold uppercase tracking-tight"
                    />
                  </div>
                </div>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-8 bg-white text-black font-black rounded-2xl transition-all duration-500 hover:bg-[#b46c00] hover:text-white transform active:scale-95 disabled:opacity-30 flex items-center justify-center gap-4 text-sm tracking-[0.3em] uppercase"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Processing Trajectory_
                    </>
                  ) : 'Sync Flight Data'}
                </button>
              </form>

              {result && (
                <div className="bg-black/60 p-10 rounded-[2.5rem] border border-white/10 animate-in fade-in slide-in-from-bottom-10 duration-700">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-2 h-2 rounded-full bg-[#b46c00] animate-pulse"></div>
                    <span className="text-[9px] font-black tracking-[0.3em] text-[#b46c00] uppercase">Mission Summary Report</span>
                  </div>
                  <div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed font-light text-lg">
                    {result}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
