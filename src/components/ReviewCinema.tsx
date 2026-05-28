import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Sparkles, MoveLeft, MoveRight } from 'lucide-react';
import { REVIEWS } from '../data/creatorData';
import { soundEngine } from '../lib/audio';

export default function ReviewCinema() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    soundEngine.playClick();
    setActiveIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    soundEngine.playClick();
    setActiveIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const currentReview = REVIEWS[activeIndex];

  return (
    <section className="py-32 relative z-10 w-full overflow-hidden bg-black/40 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative glass-panel rounded-[40px] border-white/5 p-10 sm:p-16 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/5 rounded-full blur-[180px] pointer-events-none" />

          {/* Quote Giant Indicator */}
          <div className="absolute top-8 right-12 opacity-5 text-white">
            <Quote className="w-56 h-56 stroke-[1]" />
          </div>

          <div className="relative z-10 space-y-10 max-w-4xl">
            {/* Top Indicator */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-gray-500">EXECUTIVE TESTIMONIALS</span>
            </div>

            {/* Quote slider container */}
            <div className="min-h-[180px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-6"
                >
                  <p className="text-xl sm:text-2xl font-light text-gray-200 leading-relaxed italic">
                    "{currentReview.text}"
                  </p>
                  
                  <div className="space-y-1">
                    <h5 className="text-white font-bold text-sm tracking-widest uppercase">
                      {currentReview.author}
                    </h5>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-amber-400 font-mono">
                      Project: {currentReview.project}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Actions Slider Controls */}
            <div className="flex items-center gap-6 pt-6 border-t border-white/5 justify-between">
              <div className="text-xs text-gray-500 font-mono">
                {activeIndex + 1} / {REVIEWS.length}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handlePrev}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors hover:scale-105"
                >
                  <MoveLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-4 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-colors hover:scale-105"
                >
                  <MoveRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
