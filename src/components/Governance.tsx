import { motion } from 'motion/react';
import { Vote, Users, MessageSquare, TrendingUp, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const proposals = [
  { id: 'VIP-42', title: 'Expand Digital Nomad Corridor: Portugal', votes: '1.2M VAN', status: 'Active', end: '2d 4h' },
  { id: 'VIP-41', title: 'Adjust Validator Staking Rewards', votes: '840K VAN', status: 'Passed', end: 'Closed' },
  { id: 'VIP-40', title: 'Implement ZK-KYC Protocol v2', votes: '2.1M VAN', status: 'Passed', end: 'Closed' },
];

export default function Governance() {
  return (
    <section id="governance" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-900/30 border border-purple-500/30 text-purple-400 text-xs font-bold uppercase tracking-widest"
            >
              <Users className="w-3 h-3" />
              Community Driven
            </motion.div>
            <h2 className="text-5xl font-display font-bold uppercase tracking-tight">
              DAO <span className="text-gradient-purple">Governance</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Vanhsya is governed by its citizens. Vote on new migration corridors, 
              protocol upgrades, and community support initiatives.
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="glass-panel px-6 py-4 rounded-2xl border-white/5 text-center">
              <div className="text-2xl font-display font-bold text-white">12.4M</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Total Votes</div>
            </div>
            <div className="glass-panel px-6 py-4 rounded-2xl border-white/5 text-center">
              <div className="text-2xl font-display font-bold text-purple-400">4.2K</div>
              <div className="text-[10px] uppercase tracking-widest text-gray-500">Proposals</div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Proposals */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-white font-bold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Live Proposals
              </h4>
              <button className="text-purple-400 text-sm font-bold hover:text-purple-300 transition-colors">View All</button>
            </div>
            
            {proposals.map((prop, i) => (
              <motion.div 
                key={prop.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group glass-panel p-6 rounded-3xl border-white/5 hover:border-purple-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-purple-400">{prop.id}</span>
                    <span className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider",
                      prop.status === 'Active' ? "bg-emerald-500/10 text-emerald-400" : "bg-blue-500/10 text-blue-400"
                    )}>
                      {prop.status}
                    </span>
                  </div>
                  <h5 className="text-white font-bold text-lg group-hover:text-purple-400 transition-colors">{prop.title}</h5>
                </div>
                
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <div className="text-sm font-bold text-white">{prop.votes}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Current Votes</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-gray-300">{prop.end}</div>
                    <div className="text-[10px] uppercase tracking-widest text-gray-500">Ends In</div>
                  </div>
                  <button className="p-3 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-purple-600 hover:border-purple-600 transition-all">
                    <Vote className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Governance Sidebar */}
          <div className="space-y-6">
            <div className="glass-panel p-8 rounded-[40px] border-white/5 bg-gradient-to-br from-purple-900/20 to-black space-y-6">
              <div className="w-12 h-12 rounded-2xl bg-purple-600/20 flex items-center justify-center text-purple-400">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h4 className="text-2xl font-display font-bold text-white">Join the Discussion</h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                Every great proposal starts with a conversation. Join our Discord 
                and Discourse to shape the future of global mobility.
              </p>
              <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                Go to Forum <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="p-8 rounded-[40px] border border-dashed border-white/10 flex flex-col items-center text-center space-y-4">
              <div className="text-gray-500 text-xs uppercase tracking-widest font-bold">Your Voting Power</div>
              <div className="text-3xl font-display font-bold text-white">0.00 VAN</div>
              <button className="text-purple-400 text-sm font-bold hover:underline">Stake Tokens to Vote</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
