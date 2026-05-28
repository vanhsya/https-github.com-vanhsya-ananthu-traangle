import { motion } from 'motion/react';
import { Globe, Menu, X, Rocket } from 'lucide-react';
import { useState } from 'react';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 glass-panel border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
            <motion.div
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 p-[1px] group-hover:rotate-12 transition-transform"
            >
              <div className="absolute inset-0 bg-black rounded-2xl" />
              <Globe className="w-7 h-7 text-amber-400 relative z-10" />
            </motion.div>
            <div className="flex flex-col">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="font-display font-bold text-2xl tracking-[0.2em] text-gradient-gold uppercase leading-none"
              >
                Vanhsya
              </motion.span>
              <span className="text-[8px] uppercase tracking-[0.4em] text-gray-500 font-bold">Migration Protocol</span>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-10">
              {['Ecosystem', 'Vault', 'Pathways', 'Governance'].map((item, i) => (
                <motion.a
                  key={item}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  href={`#${item.toLowerCase()}`}
                  className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all hover:tracking-[0.2em]"
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex items-center gap-4">
            <button className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors">
              Docs
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative px-8 py-3 rounded-full font-bold text-xs uppercase tracking-widest overflow-hidden group glow-purple"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90 group-hover:opacity-100 transition-opacity" />
              <span className="relative text-white flex items-center gap-2">
                Launch App
                <Rocket className="w-4 h-4" />
              </span>
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="lg:hidden glass-panel border-t border-white/5 absolute w-full"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {['Ecosystem', 'Vault', 'Pathways', 'Governance'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-300 hover:text-white block px-3 py-4 rounded-2xl bg-white/5 border border-white/5 text-center font-bold uppercase tracking-widest text-sm"
                >
                  {item}
                </a>
              ))}
              <button className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-5 rounded-2xl font-bold uppercase tracking-widest text-sm shadow-xl">
                Launch App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

import { AnimatePresence } from 'motion/react';

