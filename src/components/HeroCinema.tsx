import { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Play, Sparkles, MoveRight, Layers, Volume2, X } from 'lucide-react';
import TriangleMonolith3D from './TriangleMonolith3D';
import { soundEngine } from '../lib/audio';

export default function HeroCinema() {
  const [showreelOpen, setShowreelOpen] = useState(false);

  const watchShowreelAction = () => {
    soundEngine.playClick();
    soundEngine.playActionTransition();
    setShowreelOpen(true);
  };

  const exploreUniverseAction = () => {
    soundEngine.playClick();
    const elem = document.getElementById('ecosystem');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 overflow-hidden bg-black">
      {/* 3D WEBGL MONOLITH CANVAS LAYER */}
      <div className="absolute inset-0 z-0 opacity-80 h-full w-full">
        <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }}>
          <Suspense fallback={null}>
            <TriangleMonolith3D />
          </Suspense>
        </Canvas>
      </div>

      {/* Cinematic Grid Lines Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:5rem_5rem] pointer-events-none" />
      
      {/* Dynamic atmospheric radial glow highlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-purple-900/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-5 right-10 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Narrative Display Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center space-y-12">
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-amber-400 text-[10px] font-bold uppercase tracking-[0.35em]"
          >
            <Sparkles className="w-3.5 h-3.5 animate-spin" />
            <span>DECONSTRUCTING THE CINEMATIC TIMELINE</span>
          </motion.div>

          {/* Majestic High-End Editorial Title */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: 'easeOut' }}
              className="text-6xl sm:text-8xl lg:text-[10rem] font-display font-black leading-[0.85] tracking-tight uppercase m-0 p-0 text-white"
            >
              ANANTHU CA
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.35 }}
              className="text-gradient-gold font-display font-medium text-3xl sm:text-[2.8rem] uppercase tracking-[0.4em] pt-2"
            >
              TRIANGLE
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto tracking-widest uppercase font-light leading-relaxed"
          >
            Creating elite, luxurious visual narratives for high-end global creator brands.
          </motion.p>
        </div>

        {/* Magnetic simulated actions buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center pt-4"
        >
          <button
            onClick={exploreUniverseAction}
            className="group relative px-9 py-4.5 rounded-full font-bold text-xs uppercase tracking-[0.2em] overflow-hidden transition-all hover:scale-110 active:scale-95 glow-purple"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
            <span className="relative text-white flex items-center gap-2 z-10">
              Explore Universe
              <MoveRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </span>
          </button>

          <button
            onClick={watchShowreelAction}
            className="group px-9 py-4.5 rounded-full bg-white/[0.03] border border-white/10 text-gray-300 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-all hover:scale-110 hover:bg-white/5 active:scale-95 flex items-center gap-2.5"
          >
            <Play className="w-4 h-4 fill-current text-amber-400 translate-x-0.5" />
            <span>Watch Showreel</span>
          </button>
        </motion.div>

        {/* Floating Quick metrics panel */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-14 pt-16 border-t border-white/5 max-w-4xl mx-auto"
        >
          {[
            { label: "Combined Reach", val: "3.4M+" },
            { label: "Active Engagement", val: "19.4%" },
            { label: "Audited MoM Growth", val: "+24.8%" },
            { label: "Elite Campaigns Completed", val: "420+" }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-xl sm:text-2xl font-display font-bold text-white tracking-wide">{stat.val}</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-gray-500 font-bold">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Cinematic Showreel Fullscreen Cinema Modal */}
      <AnimatePresence>
        {showreelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] bg-black/98 flex items-center justify-center p-6 sm:p-12 overflow-hidden"
          >
            <button
              onClick={() => {
                soundEngine.playClick();
                setShowreelOpen(false);
              }}
              className="absolute top-6 right-6 p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:scale-105 active:scale-95 transition-all z-20"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="w-full max-w-5xl aspect-video rounded-[32px] border border-white/10 overflow-hidden relative shadow-2xl bg-black">
              {/* Grading Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-15" />
              
              <img 
                src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&q=80&w=1200" 
                alt="Showreel Preview" 
                className="absolute inset-0 w-full h-full object-cover blur-sm brightness-50"
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 space-y-4">
                <div className="w-24 h-24 rounded-full border border-purple-500 bg-purple-500/10 flex items-center justify-center animate-ping">
                  <Play className="w-10 h-10 text-white fill-white translate-x-1" />
                </div>
                <h3 className="text-2xl font-display uppercase tracking-widest text-white font-medium">ANANTHU CA • SHOWREEL 2026</h3>
                <span className="text-xs text-cyan-400 uppercase tracking-widest font-mono">Status: Stream Buffer 100%</span>
              </div>

              {/* simulated actions */}
              <div className="absolute bottom-6 left-6 right-6 z-20 flex justify-between items-center text-xs font-mono text-gray-400">
                <span className="flex items-center gap-2">
                  <Volume2 className="w-4 h-4 text-amber-400" /> Standard stereo output (48kHz)
                </span>
                <span>0:00 / 2:30</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
