import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Eye, Heart, Share2, X, Sparkles, Film, ArrowRight } from 'lucide-react';
import { REELS, ReelItem } from '../data/creatorData';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

export default function ReelsShowcase() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedReel, setSelectedReel] = useState<ReelItem | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories = ['All', 'Cinematic', 'Lifestyle', 'Travel', 'Storytelling', 'Viral'];

  const filteredReels = activeCategory === 'All' 
    ? REELS 
    : REELS.filter(item => item.category === activeCategory);

  const handleCardHover = (id: string | null) => {
    setHoveredId(id);
    if (id) {
      soundEngine.playHover();
    }
  };

  const openReel = (reel: ReelItem) => {
    soundEngine.playClick();
    setSelectedReel(reel);
  };

  return (
    <section id="ecosystem" className="py-32 relative z-10 w-full bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-20 gap-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/40 border border-purple-500/30 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Film className="w-3 h-3" />
              <span>Netflix-Quality Showcases</span>
            </div>
            <h2 className="text-5xl sm:text-6xl font-display font-medium tracking-tight uppercase">
              THE CELEBRITY <span className="text-gradient-purple font-bold">REELS</span>
            </h2>
            <p className="text-gray-400 text-sm max-w-xl leading-relaxed">
              Experience visual narratives crafted specifically to inspire, disrupt, and trigger wild engagement matrices on a global scale.
            </p>
          </div>

          {/* Luxury Categories Tabs */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveCategory(cat);
                }}
                className={cn(
                  "px-5 py-2.5 rounded-full text-xs uppercase tracking-widest font-bold border transition-all active:scale-95",
                  activeCategory === cat
                    ? "bg-amber-500/10 border-amber-500/40 text-amber-400 glow-gold"
                    : "bg-white/5 border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Reels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredReels.map((reel) => (
              <motion.div
                key={reel.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => handleCardHover(reel.id)}
                onMouseLeave={() => handleCardHover(null)}
                onClick={() => openReel(reel)}
                className="group relative h-[500px] rounded-[32px] overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 transition-all shadow-xl hover:-translate-y-2 hover:border-purple-500/20"
              >
                {/* Background Cover Visual with gradient overlays */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${reel.coverImage})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:via-black/50 transition-all" />
                
                {/* Visual Glow Layer on hover */}
                <div className="absolute inset-0 bg-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                {/* Vertical interactive progress simulation bar */}
                <div className="absolute bottom-4 left-6 right-6 h-[2px] bg-white/20 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 to-amber-500"
                    animate={{ width: hoveredId === reel.id ? '100%' : '0%' }}
                    transition={{ duration: hoveredId === reel.id ? 2.5 : 0.3, ease: "linear" }}
                  />
                </div>

                {/* Floating Meta */}
                <div className="absolute top-6 left-6 flex gap-2">
                  <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-white text-[9px] uppercase tracking-widest font-mono">
                    {reel.category}
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-black/60 border border-white/10 text-amber-400 text-[9px] uppercase tracking-widest font-mono">
                    {reel.duration}
                  </span>
                </div>

                {/* Bottom Core Info */}
                <div className="absolute bottom-10 left-6 right-6 space-y-3">
                  <h3 className="text-xl font-display font-medium text-white tracking-wide group-hover:text-gradient-purple group-hover:font-semibold transition-all">
                    {reel.title}
                  </h3>
                  
                  {/* Real-time stats */}
                  <div className="flex items-center gap-6 pt-2 border-t border-white/10 text-xs text-gray-400 font-mono">
                    <span className="flex items-center gap-1.5">
                      <Play className="w-3.5 h-3.5 text-cyan-400" /> {reel.views} Views
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Heart className="w-3.5 h-3.5 text-rose-500" /> {reel.likes}
                    </span>
                  </div>
                </div>

                {/* Hover Play Monolith button overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-black/20">
                  <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl">
                    <Play className="w-6 h-6 text-white fill-white translate-x-0.5" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Cinematheque Realtime Video Modal */}
        <AnimatePresence>
          {selectedReel && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 md:p-10 select-none overflow-y-auto"
            >
              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedReel(null);
                  }}
                  className="p-3.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all hover:scale-105 active:scale-95"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Theater Layout */}
              <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                {/* Immersive Videotheque Block */}
                <div className="lg:col-span-7 aspect-[9/16] max-h-[75vh] mx-auto w-full max-w-md rounded-[40px] border border-white/10 overflow-hidden relative bg-neutral-900 shadow-2xl">
                  {/* Overlay Simulated Cinematic Grading Filter */}
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-purple-600/10 mix-blend-color-dodge pointer-events-none z-10" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,180,0,0.02),transparent)] mix-blend-screen pointer-events-none z-10" />

                  <img 
                    src={selectedReel.coverImage} 
                    alt={selectedReel.title} 
                    className="absolute inset-0 w-full h-full object-cover blur-sm brightness-50"
                  />
                  
                  {/* Central interactive simulated cinema action */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20 space-y-4 text-center px-8">
                    <div className="w-20 h-20 rounded-full border border-amber-500/50 bg-amber-500/10 flex items-center justify-center animate-pulse glow-gold">
                      <Sparkles className="w-10 h-10 text-amber-400" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.4em] text-cyan-400 font-bold">Streaming Cinema Mode</span>
                    <span className="text-gray-400 text-xs font-mono">Resolution: Lossless Anamorphic Depth</span>
                  </div>

                  {/* Simulated cinematic timelines progress */}
                  <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                    <div className="h-[3px] w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-amber-500 w-2/3 animate-pulse" />
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                      <span>0:42</span>
                      <span>{selectedReel.duration}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Film Narrative / Meta Details */}
                <div className="lg:col-span-5 space-y-8 text-left">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-[10px] font-mono uppercase tracking-widest">
                      VIP Creative Asset
                    </div>
                    <h1 className="text-4xl font-display font-medium text-white tracking-wide leading-tight uppercase">
                      {selectedReel.title}
                    </h1>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {selectedReel.narrative}
                    </p>
                  </div>

                  {/* On-Chain Metrics Dashboard */}
                  <div className="grid grid-cols-2 gap-4 p-6 rounded-3xl bg-white/5 border border-white/5">
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Total Reach</div>
                      <div className="text-2xl font-display font-bold text-white uppercase">{selectedReel.views}</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Interactions</div>
                      <div className="text-2xl font-display font-bold text-white uppercase">{selectedReel.likes}</div>
                    </div>
                    <div className="space-y-1 col-span-2 pt-3 border-t border-white/5">
                      <div className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">Engagement Rate</div>
                      <div className="text-xl font-display font-bold text-emerald-400">{selectedReel.engagement} (Extreme)</div>
                    </div>
                  </div>

                  <div className="pt-4 flex gap-4">
                    <button className="flex-1 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all glow-purple">
                      Book Direct Rights
                    </button>
                    <button className="px-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all flex items-center justify-center">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
