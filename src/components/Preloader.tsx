import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../lib/audio';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const duration = 2800; // 2.8s
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsLoaded(true);
          return 100;
        }
        return Math.min(prev + step, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const handleEnterUniverse = () => {
    if (soundEnabled) {
      soundEngine.toggleAmbient(true);
      soundEngine.playActionTransition();
    }
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center select-none overflow-hidden">
      {/* Cinematic grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(109,40,217,0.08),transparent_70%)]" />

      <div className="relative z-10 w-full max-w-lg px-6 flex flex-col items-center text-center">
        {/* Monolith logo wireframe concept */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <motion.div
            animate={{ 
              rotateY: [0, 360],
              y: [-10, 10, -10]
            }}
            transition={{
              rotateY: { duration: 6, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            className="w-24 h-24 border-2 border-amber-500/30 rounded-full flex items-center justify-center"
          >
            {/* Elegant glowing SVG triangle logo */}
            <svg viewBox="0 0 100 100" className="w-12 h-12 text-amber-500 drop-shadow-[0_0_12px_rgba(245,158,11,0.6)]">
              <polygon points="50,15 90,85 10,85" fill="none" stroke="currentColor" strokeWidth="4" />
            </svg>
          </motion.div>
          {/* Scanning light sweeps */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyan-500/10 to-transparent h-1/2 w-full animate-pulse blur-md" />
        </div>

        {/* Dynamic loading text */}
        <div className="space-y-3 mb-12">
          <h2 className="text-3xl font-display font-medium tracking-[0.3em] uppercase text-white">
            ANANTHU CA
          </h2>
          <div className="text-[10px] uppercase tracking-[0.5em] text-cyan-400 font-bold flex items-center gap-2 justify-center">
            <Sparkles className="w-3 h-3 animate-spin" />
            <span>Cinematic Universe v1.02</span>
          </div>
        </div>

        {/* Enter triggers */}
        <AnimatePresence mode="wait">
          {!isLoaded ? (
            <motion.div 
              key="loader"
              exit={{ opacity: 0 }}
              className="w-full space-y-3"
            >
              <div className="flex justify-between items-center text-[10px] font-mono tracking-widest text-gray-500 uppercase">
                <span>Synchronizing Systems</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-purple-600 via-cyan-400 to-amber-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="actions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-6 w-full"
            >
              {/* Luxury Audio Enable Button */}
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border text-xs tracking-widest uppercase font-bold transition-all hover:scale-105 active:scale-95 ${
                  soundEnabled 
                    ? 'bg-amber-500/10 border-amber-500/50 text-amber-400 glow-gold' 
                    : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                <span>{soundEnabled ? 'Ambient Audio Enabled' : 'Enable Spatial Audio'}</span>
              </button>

              <button
                onClick={handleEnterUniverse}
                className="group relative px-10 py-5 rounded-full font-bold text-xs uppercase tracking-[0.25em] overflow-hidden hover:scale-105 active:scale-95 transition-all glow-purple"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600" />
                <span className="relative text-white z-10 flex items-center gap-2 justify-center">
                  Enter The Universe
                </span>
                <div className="absolute top-0 right-0 bottom-0 left-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-10 text-[9px] font-mono text-gray-600 uppercase tracking-widest">
        Designed for Luxury • Ultra-High Fidelity rendering
      </div>
    </div>
  );
}
