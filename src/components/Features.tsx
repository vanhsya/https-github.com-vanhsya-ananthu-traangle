import { motion } from 'motion/react';
import { FileCode2, Coins, Users, BrainCircuit, ShieldCheck, Globe } from 'lucide-react';

const features = [
  {
    title: "Tokenized Documents",
    description: "Your immigration documents minted as soulbound NFTs, ensuring immutable proof of identity and history.",
    icon: <FileCode2 className="w-8 h-8 text-purple-400" />,
    colSpan: "md:col-span-2 lg:col-span-2",
    bg: "bg-gradient-to-br from-purple-900/40 to-black",
    border: "border-purple-500/30"
  },
  {
    title: "Smart Contracts",
    description: "Automated service agreements executing seamlessly on-chain.",
    icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
    colSpan: "md:col-span-1 lg:col-span-1",
    bg: "bg-gradient-to-br from-amber-900/20 to-black",
    border: "border-amber-500/30"
  },
  {
    title: "Crypto Payments",
    description: "Frictionless global transactions using stablecoins and native tokens.",
    icon: <Coins className="w-8 h-8 text-emerald-400" />,
    colSpan: "md:col-span-1 lg:col-span-1",
    bg: "bg-gradient-to-br from-emerald-900/20 to-black",
    border: "border-emerald-500/30"
  },
  {
    title: "DAO Governance",
    description: "Community-driven support and policy voting for global migration standards.",
    icon: <Users className="w-8 h-8 text-blue-400" />,
    colSpan: "md:col-span-2 lg:col-span-2",
    bg: "bg-gradient-to-br from-blue-900/20 to-black",
    border: "border-blue-500/30"
  },
  {
    title: "AI Pathways",
    description: "Predictive modeling for optimal visa routes based on global data.",
    icon: <BrainCircuit className="w-8 h-8 text-pink-400" />,
    colSpan: "md:col-span-3 lg:col-span-3",
    bg: "bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-black",
    border: "border-pink-500/30"
  }
];

export default function Features() {
  return (
    <section id="ecosystem" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-bold mb-4"
          >
            The <span className="text-gradient-gold">Decentralized</span> Ecosystem
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Vanhsya replaces outdated bureaucratic systems with transparent, secure, and instant blockchain infrastructure.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`glass-panel rounded-3xl p-8 ${feature.colSpan} ${feature.bg} border ${feature.border} relative overflow-hidden group`}
            >
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="mb-6 inline-flex p-4 rounded-2xl bg-black/50 border border-white/10 backdrop-blur-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-display font-semibold mb-3 text-white group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:opacity-20 transition-opacity duration-500 transform group-hover:scale-110">
                {feature.icon}
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
