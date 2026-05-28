import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Globe, Menu, X, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

export default function NavbarCinema() {
  const [isOpen, setIsOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Check initial audio state
    setSoundEnabled(soundEngine.getActiveState());
  }, []);

  const handleAudioToggle = () => {
    soundEngine.playClick();
    const targetState = soundEngine.toggleAmbient();
    setSoundEnabled(targetState);
  };

  const handleMenuItemAction = (id: string) => {
    soundEngine.playClick();
    setIsOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5 bg-black/[0.05] backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Brand Logo Identity */}
          <div 
            onClick={() => handleMenuItemAction('root')} 
            className="flex-shrink-0 flex items-center gap-3 cursor-pointer group"
          >
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-11 h-11 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-amber-500 p-[1px] group-hover:rotate-12 transition-transform"
            >
              <div className="absolute inset-0 bg-black rounded-xl" />
              <Globe className="w-6 h-6 text-amber-400 relative z-10 animate-spin-slow" />
            </motion.div>
            <div className="flex flex-col text-left">
              <span className="font-display font-bold text-xl tracking-[0.25em] text-gradient-gold uppercase leading-none">
                ANANTHU CA
              </span>
              <span className="text-[7px] uppercase tracking-[0.45em] text-gray-500 font-bold leading-none mt-1">
                TRIANGLE PROTOCOL
              </span>
            </div>
          </div>

          {/* Desktop Luxury Directory Links */}
          <div className="hidden lg:flex items-center space-x-10">
            {[
              { label: 'Ecosystem', id: 'ecosystem' },
              { label: 'Philosophy', id: 'vault' },
              { label: 'Feed', id: 'instagram-portfolio' },
              { label: 'Metrics', id: 'pathways' },
              { label: 'Collaborate', id: 'collaborations' }
            ].map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                onClick={() => handleMenuItemAction(item.id)}
                className="text-gray-400 hover:text-white text-[10px] font-bold uppercase tracking-[0.25em] transition-all hover:tracking-[0.35em]"
              >
                {item.label}
              </motion.button>
            ))}
          </div>

          {/* Luxury Controls (Audio Trigger + Launch application) */}
          <div className="hidden md:flex items-center gap-5">
            {/* Audio Toggle */}
            <button
              onClick={handleAudioToggle}
              className={`p-3 rounded-xl border transition-all active:scale-95 ${
                soundEnabled 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-400 glow-gold' 
                  : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleMenuItemAction('collaborations')}
              className="relative px-7 py-3 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] overflow-hidden group glow-purple"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white flex items-center gap-2">
                Launch Deck <Sparkles className="w-3.5 h-3.5" />
              </span>
            </motion.button>
          </div>

          {/* Mobile directory menu triggers */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2.5 rounded-lg bg-white/5 border border-white/5"
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden glass-panel border-t border-white/5 absolute w-full left-0 right-0 top-24 bg-black/95 backdrop-blur-3xl z-40"
          >
            <div className="px-4 pt-6 pb-10 space-y-4">
              {[
                { label: 'Ecosystem', id: 'ecosystem' },
                { label: 'Philosophy', id: 'vault' },
                { label: 'Feed', id: 'instagram-portfolio' },
                { label: 'Metrics', id: 'pathways' },
                { label: 'Collaborations', id: 'collaborations' }
              ].map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleMenuItemAction(item.id)}
                  className="w-full py-4 rounded-2xl bg-white/5 border border-white/5 text-center font-bold uppercase tracking-[0.25em] text-xs text-gray-300 hover:text-white"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-4 flex gap-4">
                <button 
                  onClick={handleAudioToggle}
                  className={cn(
                    "flex-1 py-4.5 rounded-2xl border text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2",
                    soundEnabled ? "bg-amber-500/10 border-amber-500/20 text-amber-400" : "bg-white/5 border-white/5 text-gray-400"
                  )}
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span>Spatial Audio</span>
                </button>
                <button 
                  onClick={() => handleMenuItemAction('collaborations')}
                  className="flex-1 py-4.5 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase tracking-widest"
                >
                  Launch Deck
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
