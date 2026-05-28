import { motion } from 'motion/react';
import { ShieldCheck, ArrowUpRight, ExternalLink } from 'lucide-react';

const stories = [
  {
    id: "0x7F...9A2B",
    name: "Elena R.",
    route: "EU to Canada",
    time: "14 Days",
    status: "Verified",
    quote: "The smart contract handled everything. My credentials were verified instantly via zero-knowledge proofs. No paperwork, no delays.",
    gradient: "from-purple-500/20 to-indigo-900/20",
    border: "border-purple-500/30"
  },
  {
    id: "0x3C...1D4E",
    name: "Dr. Chen W.",
    route: "Asia to UK",
    time: "21 Days",
    status: "Verified",
    quote: "Tokenizing my medical degrees as NFTs made the recognition process seamless. Vanhsya's DAO governance ensured fair assessment.",
    gradient: "from-amber-500/20 to-orange-900/20",
    border: "border-amber-500/30"
  },
  {
    id: "0x9E...5F8C",
    name: "Sarah J.",
    route: "US to Australia",
    time: "10 Days",
    status: "Verified",
    quote: "Paid my entire migration fee in stablecoins. The AI pathway predictor found a route I didn't even know existed. Pure magic.",
    gradient: "from-emerald-500/20 to-teal-900/20",
    border: "border-emerald-500/30"
  }
];

export default function SuccessStories() {
  return (
    <section id="governance" className="py-24 relative z-10 bg-black/40 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-900/30 border border-amber-500/30 text-amber-400 text-sm font-medium mb-6"
            >
              <ShieldCheck className="w-4 h-4" />
              On-Chain Verification
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-bold mb-4"
            >
              Verified <span className="text-gradient-gold">Journeys</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-400 text-lg"
            >
              Real migration success stories, cryptographically proven and permanently recorded on the Vanhsya blockchain.
            </motion.p>
          </div>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel border-white/10 hover:bg-white/5 transition-colors text-white font-medium whitespace-nowrap"
          >
            View Explorer <ExternalLink className="w-4 h-4" />
          </motion.button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`glass-panel rounded-3xl p-8 bg-gradient-to-br ${story.gradient} border ${story.border} relative group hover:-translate-y-2 transition-transform duration-300`}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="text-xs font-mono text-gray-400 mb-1 flex items-center gap-2">
                    Tx: {story.id}
                    <ArrowUpRight className="w-3 h-3 text-gray-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-white">{story.name}</h3>
                </div>
                <div className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  {story.status}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6 p-4 rounded-2xl bg-black/40 border border-white/5">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Pathway</div>
                  <div className="text-sm font-medium text-gray-300">{story.route}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Processing</div>
                  <div className="text-sm font-medium text-gray-300">{story.time}</div>
                </div>
              </div>

              {/* Quote */}
              <p className="text-gray-400 text-sm leading-relaxed italic">
                "{story.quote}"
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
