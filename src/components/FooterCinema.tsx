import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Globe, Github, Twitter, Disc as Discord, Sparkles, Volume2, VolumeX, Mail, Instagram, Facebook, AtSign } from 'lucide-react';
import { soundEngine } from '../lib/audio';

export default function FooterCinema() {
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Keep internal audio status in sync
    setSoundEnabled(soundEngine.getActiveState());
  }, []);

  const handleAudioToggle = () => {
    soundEngine.playClick();
    const targetState = soundEngine.toggleAmbient();
    setSoundEnabled(targetState);
  };

  return (
    <footer className="relative z-10 border-t border-white/5 bg-black pt-28 pb-12 overflow-hidden">
      {/* Decorative vertical light beam */}
      <div className="absolute left-1/2 bottom-0 w-[1px] h-96 bg-gradient-to-t from-cyan-500/10 via-purple-500/5 to-transparent -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          
          {/* Brand & Concept */}
          <div className="md:col-span-5 space-y-6 text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-amber-500 p-[1px]">
                <div className="w-full h-full bg-black rounded-2xl flex items-center justify-center">
                  <Globe className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-xl tracking-[0.25em] text-gradient-gold uppercase leading-none">
                  ANANTHU CA
                </span>
                <span className="text-[7px] uppercase tracking-[0.45em] text-gray-500 font-bold leading-none mt-1">
                  TRIANGLE UNIVERSE
                </span>
              </div>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed max-w-sm">
              Constructing world-class cinematic experiences, luxury narrative portfolios, and futuristic branding alignments. Architect of the digital trinity.
            </p>
            
            {/* Connected Social Universes */}
            <div className="flex gap-4 pt-1">
              <a 
                href="https://www.instagram.com/ananthu_ca_triangle/" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="text-gray-600 hover:text-amber-400 transition-colors"
                title="Instagram Link"
              >
                <Instagram className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://www.threads.com/@ananthu_ca_triangle?xmt=AQG0V2zldSfCsBC54aG3SZUaqpBjH5hvbdWCdBUiIW171uc" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="text-gray-600 hover:text-cyan-400 transition-colors"
                title="Threads Link"
              >
                <AtSign className="w-4.5 h-4.5" />
              </a>
              <a 
                href="https://www.facebook.com/Ananthu.Ca.Triangle/?ref=NONE_xav_ig_profile_page_web#" 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={() => soundEngine.playClick()}
                className="text-gray-600 hover:text-indigo-400 transition-colors"
                title="Facebook Link"
              >
                <Facebook className="w-4.5 h-4.5" />
              </a>
            </div>

            {/* Audio Toggle button in Footer */}
            <div className="pt-2">
              <button
                onClick={handleAudioToggle}
                className={`flex items-center gap-2.5 px-5 py-2.5 rounded-full border text-[9px] uppercase tracking-widest font-bold transition-all hover:scale-105 active:scale-95 ${
                  soundEnabled 
                    ? 'bg-amber-500/15 border-amber-500/30 text-amber-400 glow-gold' 
                    : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'
                }`}
              >
                {soundEnabled ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
                <span>{soundEnabled ? 'Spatial Engine Active' : 'Start Cinematic Sound'}</span>
              </button>
            </div>
          </div>

          {/* Links 1 */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">DIRECTORY</h4>
            <ul className="space-y-3.5">
              {['Home Workspace', 'Reels Ecosystem', 'Brand Synergy', 'Data MediaKit'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-amber-400 text-xs uppercase tracking-widest transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Links 2 */}
          <div className="md:col-span-2 space-y-4 text-left">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">CREDENTIALS</h4>
            <ul className="space-y-3.5">
              {['Press Room', 'Case Studies', 'Awwwards Profile', 'Immersive FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-500 hover:text-purple-400 text-xs uppercase tracking-widest transition-colors font-medium">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct booking/newsletter */}
          <div className="md:col-span-3 space-y-4 text-left">
            <h4 className="text-white text-[10px] font-bold uppercase tracking-[0.3em]">SECURE DISPATCH</h4>
            <div className="space-y-3">
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Receive exclusive visual breakdowns and early campaign drops.
              </p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="enter dispatch email" 
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/5 text-white placeholder-gray-600 text-xs focus:outline-none focus:border-purple-500 transition-colors"
                />
                <button 
                  onClick={() => soundEngine.playClick()}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold text-xs uppercase hover:opacity-90 transition-opacity"
                >
                  Join
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar diagnostics details */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="text-gray-600 text-[10px] uppercase tracking-widest font-mono">
            © 2026 ANANTHU CA TRIANGLE. All global visual rights reserved.
          </div>
          
          {/* Active spatial system diagnostics */}
          <div className="flex items-center gap-6 text-[9px] font-mono text-gray-500 uppercase tracking-widest">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Rendering Engine: 120 FPS
            </div>
            <div>Decentralized IP Nodes: 3</div>
            <div>Latency: 14ms</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
