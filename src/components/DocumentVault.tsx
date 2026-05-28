import { motion } from 'motion/react';
import { Shield, Lock, Eye, Download, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const docs = [
  { name: 'Global Identity NFT', status: 'Verified', type: 'Soulbound', date: 'Mar 12, 2026' },
  { name: 'Proof of Funds (ZK)', status: 'Active', type: 'Encrypted', date: 'Mar 14, 2026' },
  { name: 'Health Clearance', status: 'Pending', type: 'On-Chain', date: 'Processing' },
];

export default function DocumentVault() {
  return (
    <section className="py-24 relative z-10 bg-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-widest"
              >
                <Lock className="w-3 h-3" />
                Sovereign Storage
              </motion.div>
              <h2 className="text-5xl font-display font-bold uppercase leading-tight">
                Your <span className="text-gradient-gold">Document</span> <br />
                Vault
              </h2>
              <p className="text-gray-400 text-lg max-w-lg">
                Manage your entire migration portfolio in a secure, decentralized vault. 
                You own your data. You control who sees it.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-3xl glass-panel border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">Immutable Proof</h4>
                <p className="text-sm text-gray-500">Every document is hashed and stored on the Vanhsya ledger.</p>
              </div>
              <div className="p-6 rounded-3xl glass-panel border-white/5 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-600/20 flex items-center justify-center text-amber-400">
                  <Eye className="w-5 h-5" />
                </div>
                <h4 className="text-white font-bold">Selective Disclosure</h4>
                <p className="text-sm text-gray-500">Share only what's necessary using ZK-proof technology.</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-amber-500/20 rounded-[40px] blur-3xl" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative glass-panel rounded-[40px] border-white/10 p-8 shadow-2xl overflow-hidden"
            >
              {/* Vault Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-white font-mono text-sm">Vault Status: Secure</span>
                </div>
                <div className="text-gray-500 text-xs font-mono">0x4F...E921</div>
              </div>

              {/* Document List */}
              <div className="space-y-4">
                {docs.map((doc, i) => (
                  <motion.div 
                    key={doc.name}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center",
                        doc.status === 'Verified' ? "bg-emerald-500/10 text-emerald-400" : 
                        doc.status === 'Active' ? "bg-blue-500/10 text-blue-400" : "bg-amber-500/10 text-amber-400"
                      )}>
                        {doc.status === 'Verified' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{doc.name}</div>
                        <div className="text-[10px] text-gray-500 uppercase tracking-wider">{doc.type} • {doc.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-white/10 text-gray-400 hover:text-white">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Action */}
              <button className="w-full mt-8 py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Upload New Document
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
