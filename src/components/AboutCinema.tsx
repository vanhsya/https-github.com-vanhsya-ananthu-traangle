import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, AudioLines, Library, Sparkles, MoveRight, Camera, Target, Compass } from 'lucide-react';
import { soundEngine } from '../lib/audio';

export default function AboutCinema() {
  const [activeFrame, setActiveFrame] = useState<'strategist' | 'visionary'>('strategist');

  const handleHoverElement = () => {
    soundEngine.playHover();
  };

  const toggleFrame = (frame: 'strategist' | 'visionary') => {
    soundEngine.playClick();
    setActiveFrame(frame);
  };

  const frames = {
    strategist: {
      image: '/input_file_1.png',
      credo: 'THE SOVEREIGN STRATEGIST',
      headline: 'AGGRESSIVE MEDIA DISTRIBUTION',
      sub: 'Three-piece charcoal, pristine blue hour high-rise penthouses. Building corporate alignment structures for elite creators.',
      specs: 'LEICA M11 • 50MM APO • f/1.4'
    },
    visionary: {
      image: '/input_file_0.png',
      credo: 'THE CREATIVE CONCEPTUALIST',
      headline: 'INTELLIGENT VISUAL DESIGN',
      sub: 'Mahogany bookshelves, deep shadows, fine crystal glass, fireplace. Cultivating raw narrative treatments for brand legacy.',
      specs: 'HASSELBLAD X2D • 38MM V • f/2.5'
    }
  };

  return (
    <section id="vault" className="py-32 relative z-10 overflow-hidden bg-black/50 border-t border-white/5">
      {/* Decorative vector background */}
      <div className="absolute top-1/4 right-1/10 w-96 h-96 bg-cyan-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          {/* Creative Imagery Block */}
          <div className="space-y-6">
            <div className="relative h-[650px] w-full rounded-[40px] overflow-hidden border border-white/10 group bg-neutral-950">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFrame}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <img 
                    src={frames[activeFrame].image} 
                    alt={frames[activeFrame].credo}
                    className="w-full h-full object-cover grayscale contrast-115 group-hover:scale-105 transition-transform duration-1000 brightness-95"
                  />
                  
                  {/* Heavy color-gradient grading overlay layers */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent z-10" />
                  
                  {/* Camera lens crosshair lines decoration */}
                  <div className="absolute inset-0 border-[20px] border-black/10 z-15 pointer-events-none flex items-center justify-center">
                    <Target className="w-8 h-8 text-white/5" />
                  </div>

                  {/* Technical Lens Overlays */}
                  <div className="absolute top-8 left-8 z-20 font-mono text-[9px] text-gray-500 tracking-[0.25em] flex items-center gap-2">
                    <Camera className="w-3.5 h-3.5 text-amber-500" />
                    <span>{frames[activeFrame].specs}</span>
                  </div>

                  <div className="absolute top-8 right-8 z-20 font-mono text-[9px] text-gray-500 tracking-[0.1em] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
                    <span>REC • RAW 16BIT</span>
                  </div>

                  {/* Bottom Brand Credo tag */}
                  <div className="absolute bottom-10 left-10 right-10 z-20 space-y-3">
                    <span className="text-[10px] tracking-[0.4em] uppercase font-bold text-amber-400">
                      {frames[activeFrame].credo}
                    </span>
                    <h3 className="text-3xl font-display text-white uppercase font-bold leading-[1.1] tracking-tight">
                      {frames[activeFrame].headline}
                    </h3>
                    <p className="text-gray-400 text-xs font-light max-w-sm line-clamp-2 leading-relaxed">
                      {frames[activeFrame].sub}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Glowing 3D ambient light overlay */}
              <div className="absolute top-1/3 left-1/4 w-48 h-48 bg-purple-500/20 rounded-full blur-[80px] pointer-events-none animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-36 h-36 bg-amber-500/10 rounded-full blur-[60px] pointer-events-none" />
            </div>

            {/* Premium Selector System Buttons */}
            <div className="flex justify-center gap-4">
              <button
                onClick={() => toggleFrame('strategist')}
                onMouseEnter={handleHoverElement}
                className={`flex-1 py-4 px-6 rounded-2xl font-mono text-[10px] uppercase tracking-widest border transition-all ${
                  activeFrame === 'strategist'
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                I. The Strategist
              </button>
              <button
                onClick={() => toggleFrame('visionary')}
                onMouseEnter={handleHoverElement}
                className={`flex-1 py-4 px-6 rounded-2xl font-mono text-[10px] uppercase tracking-widest border transition-all ${
                  activeFrame === 'visionary'
                    ? 'bg-white text-black border-white font-bold'
                    : 'bg-white/5 text-gray-400 border-white/5 hover:text-white hover:bg-white/10'
                }`}
              >
                II. The Visionary
              </button>
            </div>
          </div>

          {/* Narrative content block */}
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em]">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>Philosophical Framework</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-display font-medium uppercase leading-[0.9] tracking-tight text-white m-0">
                THE TRIANGLE OF <br />
                <span className="text-gradient-gold font-bold">CREATION</span>
              </h2>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                Ananthu CA doesn’t produce content—he crafts legendary experiences. Under the banner of the "Triangle," his philosophy merges three separate absolute vectors into one supreme visual force.
              </p>
            </div>

            {/* Creative Vectors */}
            <div className="space-y-6">
              {[
                { 
                  icon: <Eye className="w-5 h-5" />, 
                  title: "I. Pure Visual Sophistication", 
                  desc: "Utilizing professional-grade anamorphic glass templates, precise color-grading vectors, high dynamic ranges, and strict compositional constraints." 
                },
                { 
                  icon: <AudioLines className="w-5 h-5" />, 
                  title: "II. High-Fidelity Soundscapes", 
                  desc: "Constructing physical acoustic realities procedurally. Deep bass impacts and atmospheric sound designs engineered to stir physiological emotional responses." 
                },
                { 
                  icon: <Library className="w-5 h-5" />, 
                  title: "III. Intellectual Narrative Systems", 
                  desc: "Rejecting fast food content loops in favor of dense, poetic story arcs that command viewers' undivided attention on the web." 
                }
              ].map((item, i) => (
                <div 
                  key={i} 
                  onMouseEnter={handleHoverElement}
                  className="flex items-start gap-4 p-5 rounded-3xl glass-panel border-white/5 hover:border-white/15 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="p-3 rounded-xl bg-white/[0.03] border border-white/5 text-amber-400">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white text-base font-bold tracking-wide mb-1 uppercase">{item.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a 
                href="#collaborations" 
                className="inline-flex items-center gap-3 text-amber-400 text-xs font-bold uppercase tracking-[0.25em] hover:text-white transition-colors group animate-bounce-horizontal"
              >
                Assemble A Synergy Project
                <MoveRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
