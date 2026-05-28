import { motion } from 'motion/react';
import { Network, Activity, Globe } from 'lucide-react';

export default function DataViz() {
  return (
    <section id="pathways" className="py-24 relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual Side */}
          <div className="relative h-[500px] w-full flex items-center justify-center">
            {/* Abstract Globe/Network */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-amber-900/20 rounded-full blur-3xl" />
            
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
              className="relative w-full max-w-md aspect-square border border-white/10 rounded-full flex items-center justify-center"
            >
              {/* Nodes and Connections */}
              {[...Array(12)].map((_, i) => {
                const angle = (i * 30) * (Math.PI / 180);
                const radius = 180;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.8)]"
                    style={{ x, y }}
                  >
                    {/* Connecting lines */}
                    <motion.svg 
                      className="absolute top-1/2 left-1/2 overflow-visible pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 0.3 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + i * 0.1 }}
                    >
                      <line 
                        x1="0" y1="0" 
                        x2={-x} y2={-y} 
                        stroke="url(#grad)" 
                        strokeWidth="1"
                        strokeDasharray="4 4"
                      />
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#F59E0B" />
                          <stop offset="100%" stopColor="#6D28D9" />
                        </linearGradient>
                      </defs>
                    </motion.svg>
                  </motion.div>
                );
              })}
              
              {/* Center Node */}
              <div className="w-16 h-16 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-full flex items-center justify-center glow-purple z-10">
                <Globe className="w-8 h-8 text-white" />
              </div>
            </motion.div>

            {/* Floating Stats */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-10 glass-panel p-4 rounded-xl border-amber-500/30"
            >
              <div className="text-amber-400 font-mono text-xl font-bold">2.4M+</div>
              <div className="text-xs text-gray-400">Active Nodes</div>
            </motion.div>
            
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-10 glass-panel p-4 rounded-xl border-purple-500/30"
            >
              <div className="text-purple-400 font-mono text-xl font-bold">0.02s</div>
              <div className="text-xs text-gray-400">Verification Time</div>
            </motion.div>
          </div>

          {/* Text Side */}
          <div className="space-y-8">
            <div>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-sm font-medium mb-6"
              >
                <Network className="w-4 h-4" />
                Global Network
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-display font-bold mb-6"
              >
                Real-Time <span className="text-gradient-purple">Visa Tracking</span> on Blockchain
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-gray-400 text-lg leading-relaxed"
              >
                Watch migration flows happen in real-time. Our decentralized ledger ensures that every step of the immigration process is transparent, immutable, and instantly verifiable by relevant authorities worldwide.
              </motion.p>
            </div>

            <div className="space-y-4">
              {[
                { title: "Zero-Knowledge Proofs", desc: "Verify credentials without exposing underlying personal data." },
                { title: "Cross-Border Consensus", desc: "Multi-jurisdictional validation through decentralized nodes." },
                { title: "Immutable Audit Trails", desc: "Permanent, tamper-proof records of all migration milestones." }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl glass-panel hover:bg-white/5 transition-colors border-white/5"
                >
                  <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400 mt-1">
                    <Activity className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-400">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
