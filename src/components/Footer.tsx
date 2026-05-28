import { motion } from 'motion/react';
import { Globe, Twitter, Github, Disc as Discord } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5 bg-black/80 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="md:col-span-1 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-amber-500 p-[1px]">
                <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
                  <Globe className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-display font-bold text-xl tracking-widest text-gradient-gold uppercase">
                Vanhsya
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              The world's first decentralized migration ecosystem. Tokenizing borders, empowering global citizens.
            </p>
            <div className="flex gap-4">
              {[Twitter, Github, Discord].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full glass-panel border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 transition-all">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Protocol</h4>
            <ul className="space-y-4">
              {['Whitepaper', 'Smart Contracts', 'Tokenomics', 'Governance'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-medium mb-6">Ecosystem</h4>
            <ul className="space-y-4">
              {['Metaverse Embassy', 'AI Pathways', 'Identity NFTs', 'Validator Nodes'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-400 hover:text-purple-400 text-sm transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter/CTA */}
          <div>
            <h4 className="text-white font-medium mb-6">Join the Network</h4>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe for protocol updates and early access to new migration corridors.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="0x... or Email" 
                className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-amber-500 text-white font-medium hover:opacity-90 transition-opacity">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-gray-500 text-sm">
            © 2026 Vanhsya Protocol. All rights reserved.
          </div>
          
          {/* Mock Analytics / Status */}
          <div className="flex items-center gap-6 text-xs font-mono text-gray-500">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Mainnet Active
            </div>
            <div>Block: 14,293,011</div>
            <div>TPS: 2,401</div>
          </div>
        </div>

      </div>
    </footer>
  );
}
