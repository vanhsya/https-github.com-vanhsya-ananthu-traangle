import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, Zap, Shield, Cpu, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const countries = [
  { name: 'Canada', success: 92, time: '14d', cost: '0.5 ETH' },
  { name: 'United Kingdom', success: 85, time: '21d', cost: '0.8 ETH' },
  { name: 'Australia', success: 88, time: '18d', cost: '0.6 ETH' },
  { name: 'Germany', success: 79, time: '30d', cost: '0.4 ETH' },
  { name: 'Singapore', success: 95, time: '7d', cost: '1.2 ETH' },
];

export default function PathwaySimulator() {
  const [selected, setSelected] = useState(countries[0]);
  const [isSimulating, setIsSimulating] = useState(false);

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 3000);
  };

  return (
    <section id="pathways" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl font-display font-bold uppercase tracking-tight">
            AI Pathway <span className="text-gradient-purple">Simulator</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Our neural network analyzes global immigration policies in real-time 
            to calculate your optimal decentralized migration route.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <div className="glass-panel p-6 rounded-3xl border-white/10 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Destination Node</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select 
                    value={selected.name}
                    onChange={(e) => setSelected(countries.find(c => c.name === e.target.value) || countries[0])}
                    className="w-full bg-black/40 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white focus:outline-none focus:border-purple-500 appearance-none cursor-pointer"
                  >
                    {countries.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Risk Tolerance</span>
                  <span className="text-purple-400 font-mono">Low</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-600 w-1/3" />
                </div>
              </div>

              <button 
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <Cpu className="w-5 h-5 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    Run Simulation
                  </>
                )}
              </button>
            </div>

            <div className="glass-panel p-6 rounded-3xl border-amber-500/20 bg-amber-500/5">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <Shield className="w-5 h-5" />
                <span className="font-bold text-sm uppercase tracking-wider">ZK-Proof Ready</span>
              </div>
              <p className="text-xs text-amber-400/70 leading-relaxed">
                Your simulation data is encrypted using zero-knowledge proofs. 
                Vanhsya never stores your personal attributes on-chain.
              </p>
            </div>
          </div>

          {/* Visualization */}
          <div className="lg:col-span-2 glass-panel rounded-3xl border-white/10 p-8 relative overflow-hidden min-h-[400px]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.1),transparent)] pointer-events-none" />
            
            <AnimatePresence mode="wait">
              {isSimulating ? (
                <motion.div 
                  key="simulating"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center space-y-8"
                >
                  <div className="relative">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border-4 border-purple-500/20 border-t-purple-500 rounded-full"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Cpu className="w-8 h-8 text-purple-400 animate-pulse" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-display font-bold text-white mb-2">Analyzing Global Nodes</div>
                    <div className="text-sm text-gray-500 font-mono">Scanning: {selected.name} Immigration Protocol v4.2</div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="h-full grid md:grid-cols-2 gap-8"
                >
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-purple-400" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-widest text-gray-500">Target Destination</div>
                        <div className="text-2xl font-display font-bold text-white">{selected.name}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Success Rate</div>
                        <div className="text-2xl font-display font-bold text-emerald-400">{selected.success}%</div>
                      </div>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                        <div className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">Est. Time</div>
                        <div className="text-2xl font-display font-bold text-white">{selected.time}</div>
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-purple-600/10 border border-purple-500/20">
                      <div className="text-xs uppercase tracking-widest text-purple-400 mb-4 font-bold">Recommended Smart Contract</div>
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium">Standard Mobility v2</span>
                        <span className="text-amber-400 font-mono font-bold">{selected.cost}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-transparent rounded-full blur-3xl" />
                    <div className="relative z-10 text-center space-y-6">
                      <div className="w-40 h-40 mx-auto rounded-full border border-white/10 flex items-center justify-center relative">
                        <div className="absolute inset-0 border-2 border-dashed border-purple-500/30 rounded-full animate-spin-slow" />
                        <div className="text-4xl font-display font-bold text-white">A+</div>
                      </div>
                      <div className="text-sm text-gray-400 max-w-[200px] mx-auto">
                        Your profile matches the <span className="text-white font-bold">{selected.name}</span> digital nomad corridor.
                      </div>
                      <button className="flex items-center gap-2 text-purple-400 font-bold hover:text-purple-300 transition-colors mx-auto">
                        View Full Report <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
