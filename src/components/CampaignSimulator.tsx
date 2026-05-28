import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ShieldCheck, Mail, Sparkles, Building, TrendingUp, Cpu, Calendar } from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

export default function CampaignSimulator() {
  const [campaignType, setCampaignType] = useState('Reel'); // Reel, Film, Immersive
  const [viewsTarget, setViewsTarget] = useState(3); // (Multipliers: 1M, 2M, 5M, 10M)
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [brandName, setBrandName] = useState('');
  const [brandEmail, setBrandEmail] = useState('');

  const getViewNumber = () => {
    switch(viewsTarget) {
      case 1: return '1.5M';
      case 2: return '3.0M';
      case 3: return '5.0M';
      case 4: return '10.0M+';
      default: return '5.0M';
    }
  };

  const getPriceEstimate = () => {
    let base = 8500; // base reward in USD
    if (campaignType === 'Film') base = 18000;
    if (campaignType === 'Immersive') base = 35000;

    const multiplier = viewsTarget * 0.85;
    return Math.round(base * multiplier);
  };

  const calculateEngagement = () => {
    if (campaignType === 'Reel') return '21.4%';
    if (campaignType === 'Film') return '18.9%';
    return '24.8%';
  };

  const handleSliderChange = (val: number) => {
    setViewsTarget(val);
    soundEngine.playHover();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!brandName || !brandEmail) return;

    soundEngine.playClick();
    soundEngine.playActionTransition();
    setFormSubmitted(true);
  };

  return (
    <section id="collaborations" className="py-32 relative z-10 bg-black/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-[0.2em]">
            <Layers className="w-3 h-3" />
            <span>Synergy Engine v3</span>
          </div>
          <h2 className="text-5xl sm:text-6xl font-display font-medium tracking-tight uppercase">
            BRAND COLLABORATION <span className="text-gradient-purple font-bold">SIMULATOR</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm leading-relaxed">
            Architect custom, high-octane campaigns tailored to premium branding. Calculate views capability, investment brackets, and forecast engagement rate.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Slider & Config Controls */}
          <div className="lg:col-span-7 glass-panel rounded-[40px] border-white/5 p-8 sm:p-10 space-y-10">
            {/* Step 1: Campaign style */}
            <div className="space-y-4">
              <label className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold block">
                01. SELECT CAMPAIGN DELIVERABLE TYPE
              </label>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { id: 'Reel', title: 'Cinematic Reel', desc: 'Slick vertical showcase' },
                  { id: 'Film', title: 'Luxury Brand Film', desc: 'Mainline narrative integration' },
                  { id: 'Immersive', title: 'Metaverse Spaces', desc: 'VR Virtual brand embassy' }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      soundEngine.playClick();
                      setCampaignType(type.id);
                    }}
                    className={cn(
                      "p-5 rounded-2xl border text-left flex flex-col justify-between h-36 transition-all active:scale-95",
                      campaignType === type.id
                        ? "bg-purple-600/10 border-purple-500/50 text-white shadow-xl glow-purple"
                        : "bg-white/5 border-white/5 text-gray-400 hover:border-white/10 hover:text-white"
                    )}
                  >
                    <span className="font-bold text-xs uppercase tracking-widest block">{type.title}</span>
                    <span className="text-[10px] text-gray-500 block leading-tight">{type.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target reach */}
            <div className="space-y-6">
              <div className="flex justify-between items-center text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold">
                <span>02. CHOOSE TARGET IMPRESSIONS MATRIX</span>
                <span className="text-amber-400 font-mono font-bold text-sm">{getViewNumber()} Views guaranteed</span>
              </div>
              <div className="relative pt-4">
                <input
                  type="range"
                  min="1"
                  max="4"
                  step="1"
                  value={viewsTarget}
                  onChange={(e) => handleSliderChange(parseInt(e.target.value))}
                  className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500 focus:outline-none"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-mono pt-3">
                  <span>1.5M views</span>
                  <span>3.0M views</span>
                  <span>5.0M views</span>
                  <span>10M+ views</span>
                </div>
              </div>
            </div>

            {/* Simulated Live Projection Dashboard */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/5">
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Estimated Budget</div>
                <div className="text-lg sm:text-2xl font-display font-bold text-amber-500">${getPriceEstimate().toLocaleString()}</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Forecast Retention</div>
                <div className="text-lg sm:text-2xl font-display font-bold text-cyan-400">{calculateEngagement()}</div>
              </div>
              <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                <div className="text-[9px] uppercase tracking-widest text-gray-500 font-bold mb-1">Production Term</div>
                <div className="text-lg sm:text-2xl font-display font-bold text-white">10-14 days</div>
              </div>
            </div>
          </div>

          {/* Secure Interactive Proposal Form & Receipt Matrix */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/10 to-transparent blur-3xl rounded-[40px]" />
            
            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <motion.div
                  key="form-entry"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative glass-panel rounded-[40px] border-white/10 p-8 sm:p-10 space-y-8 shadow-2xl"
                >
                  <div className="space-y-2">
                    <h3 className="text-2xl font-display font-medium text-white tracking-wide uppercase">
                      SECURE SYNERGY FORM
                    </h3>
                    <p className="text-gray-500 text-xs leading-normal">
                      Initiate premium campaign evaluation. Get official pricing matrix locks based on selections.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block">Brand / Company Entity</label>
                      <div className="relative">
                        <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="text"
                          required
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Porsche AG"
                          className="w-full bg-black/40 border border-white/5 rounded-2xl py-4.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block">Corporate Contact Email</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input
                          type="email"
                          required
                          value={brandEmail}
                          onChange={(e) => setBrandEmail(e.target.value)}
                          placeholder="director@brand.com"
                          className="w-full bg-black/40 border border-white/5 rounded-2xl py-4.5 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[9px] uppercase tracking-widest text-gray-500 font-bold block">Brief Campaign Goals</label>
                      <textarea
                        rows={3}
                        placeholder="Detail launch objectives, targeting ideas..."
                        className="w-full bg-black/40 border border-white/5 rounded-2xl p-4.5 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full sm:py-4.5 py-4 px-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs tracking-widest uppercase font-bold hover:scale-105 active:scale-95 transition-all glow-purple"
                    >
                      Lock In Pricing Matrix
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="receipt-display"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="relative glass-panel rounded-[40px] border-amber-500/30 p-8 sm:p-10 space-y-8 shadow-2xl bg-amber-500/[0.01]"
                >
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto glow-gold animate-bounce">
                      <ShieldCheck className="w-8 h-8" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-xl font-display font-medium text-amber-400 tracking-wide uppercase">
                        CAMPAIGN MATRIX LOCKED
                      </h3>
                      <p className="text-gray-400 text-xs font-mono">Receipt Hash: 0x{brandName.length}A...29B</p>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 border-t border-dashed border-white/10 text-xs font-mono text-gray-400">
                    <div className="flex justify-between">
                      <span>Brand Client:</span>
                      <span className="text-white font-bold">{brandName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Config:</span>
                      <span className="text-white font-bold">{campaignType} Syndicate</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Impressions Lock:</span>
                      <span className="text-white font-bold">{getViewNumber()} Views</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Stated CPM:</span>
                      <span className="text-white font-bold">${(getPriceEstimate() / (parseInt(getViewNumber()) || 5)).toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-white/5 text-amber-400">
                      <span>Staked Budget Matrix:</span>
                      <span className="font-bold">${getPriceEstimate().toLocaleString()} USD</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/25 text-[10px] text-purple-400 text-center leading-relaxed">
                    A cinematic director draft contract has been broadcast keying variables to {brandEmail}. Expect custom brief feedback within 12 hours.
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      setFormSubmitted(false);
                      setBrandName('');
                    }}
                    className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-gray-400 hover:text-white font-bold text-xs uppercase tracking-widest text-center block hover:bg-white/10 active:scale-95 transition-all"
                  >
                    Adjust Campaign Config
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
