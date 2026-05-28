import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Download, CheckCircle, Smartphone, Map, Globe, Shield } from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

export default function MediaKitCinema() {
  const [activeTab, setActiveTab] = useState<'Platforms' | 'Geographics'>('Platforms');

  const triggerDownloadAction = () => {
    soundEngine.playClick();
    soundEngine.playActionTransition();
    alert("Broadcasting secure luxury MediaKit PDF bundle direct to your device frame!");
  };

  return (
    <section id="pathways" className="py-32 relative z-10 w-full overflow-hidden bg-black/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Detailed analytics graphics side */}
          <div className="glass-panel rounded-[40px] border-white/5 p-8 sm:p-10 space-y-8 relative">
            <div className="absolute top-0 right-10 w-32 h-32 bg-purple-600/10 rounded-full blur-2xl" />

            <div className="flex justify-between items-center pb-6 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-white text-xs font-mono">Live KPI Tracking • Connected API</span>
              </div>
              <div className="flex gap-2">
                {['Platforms', 'Geographics'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      soundEngine.playClick();
                      setActiveTab(tab as any);
                    }}
                    className={cn(
                      "px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-bold border transition-colors",
                      activeTab === tab
                        ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400"
                        : "bg-transparent border-transparent text-gray-500 hover:text-white"
                    )}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* TAB CONTENT: Platforms percentage metrics */}
            {activeTab === 'Platforms' ? (
              <div className="space-y-6">
                {[
                  { name: 'Instagram Reels', val: '65%', color: 'bg-indigo-600' },
                  { name: 'YouTube Shorts', val: '20%', color: 'bg-red-600' },
                  { name: 'Special VR / Spatial Content', val: '10%', color: 'bg-cyan-500' },
                  { name: 'Traditional Brand Streams', val: '5%', color: 'bg-amber-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">{item.name}</span>
                      <span className="text-white font-mono">{item.val}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        whileInView={{ width: item.val }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={cn("h-full rounded-full", item.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // TAB CONTENT: Regional Geographic Metrics
              <div className="space-y-6">
                {[
                  { name: 'North America & UK', val: '45%', region: 'US/EU/CA', color: 'bg-emerald-500' },
                  { name: 'Asia Pacific', val: '35%', region: 'APAC', color: 'bg-amber-500' },
                  { name: 'Middle East', val: '15%', region: 'MENA', color: 'bg-purple-500' },
                  { name: 'Others', val: '5%', region: 'Global', color: 'bg-gray-500' }
                ].map((item, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400 font-bold uppercase tracking-wider">{item.name}</span>
                      <span className="text-white font-mono">{item.val}</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: '0%' }}
                        whileInView={{ width: item.val }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className={cn("h-full rounded-full", item.color)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Performance confidence matrix badge */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4">
              <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-cyan-400">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h5 className="text-white font-bold text-xs uppercase tracking-wider">Independent Audit Compliance</h5>
                <p className="text-gray-500 text-[10px]">All reach and retention metrics are verified against third-party analytics APIs.</p>
              </div>
            </div>
          </div>

          {/* Media kit storytelling and text */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Layers className="w-3 h-3" />
                <span>Interactive Media Kit</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-display font-medium uppercase leading-[0.9] tracking-tight text-white mb-6">
                DATA-DRIVEN <br />
                <span className="text-gradient-purple font-bold">INFLUENCE</span>
              </h2>
              <p className="text-gray-400 text-sm leading-relaxed">
                Premium brands run on data, not guesses. Ananthu CA is fully transparency-compliant, serving detailed demographics splits, retention loops, and CTR percentages. Access verified metrics to unlock guaranteed visual conversion.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                "19.4% Avg Engagement",
                "92% Retention Hold",
                "3.4M Core Followers",
                "Audited Audience Quality"
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-white text-xs font-bold uppercase tracking-wider">{point}</span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <button
                onClick={triggerDownloadAction}
                className="inline-flex items-center gap-3 px-8 py-4.5 rounded-full border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/5 active:scale-95 transition-all shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Download Media Booklet PDF</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
