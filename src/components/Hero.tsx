import { motion } from 'motion/react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { ArrowRight, Sparkles, Globe2, ChevronDown } from 'lucide-react';
import Scene3D from './Scene3D';
import { cn } from '../lib/utils';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden">
      {/* 3D Background Layer */}
      <div className="absolute inset-0 z-0 opacity-60">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        </Canvas>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="flex flex-col items-center text-center space-y-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-amber-500/30 text-amber-400 text-xs font-medium tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3 h-3" />
            <span>The Sovereign Migration Protocol</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-7xl sm:text-8xl lg:text-[10rem] font-display font-bold leading-[0.85] tracking-tighter uppercase"
            >
              Vanhsya <br />
              <span className="text-gradient-purple">Protocol</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed tracking-wide"
            >
              Decentralizing global mobility through tokenized identity, 
              AI-governed pathways, and zero-knowledge verification.
            </motion.p>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 pt-8"
          >
            <button className="group relative px-10 py-5 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95 glow-purple">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600" />
              <span className="relative text-white flex items-center justify-center gap-3">
                Mint Access NFT
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <button className="px-10 py-5 rounded-full font-bold text-lg glass-panel hover:bg-white/10 transition-all border-white/10 flex items-center justify-center gap-3 text-gray-300 hover:text-white active:scale-95">
              <Globe2 className="w-5 h-5" />
              Enter Metaverse
            </button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16 pt-16 border-t border-white/5 w-full max-w-4xl"
          >
            {[
              { label: "Total Value Locked", val: "$1.2B+" },
              { label: "Active Citizens", val: "42.5K" },
              { label: "Nodes Online", val: "1,204" },
              { label: "TPS (Visa Ops)", val: "8.4K" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-1">
                <div className="text-2xl font-display font-bold text-white">{stat.val}</div>
                <div className="text-[10px] uppercase tracking-widest text-gray-500 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500 flex flex-col items-center gap-2 cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Explore Protocol</span>
        <ChevronDown className="w-4 h-4" />
      </motion.div>
    </section>
  );
}
