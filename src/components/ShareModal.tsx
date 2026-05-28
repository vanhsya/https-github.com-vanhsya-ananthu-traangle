import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Check, 
  Copy, 
  Twitter, 
  Send as WhatsApp, 
  Mail, 
  Sparkles, 
  Share2, 
  Globe,
  Camera,
  Heart,
  Facebook,
  ExternalLink,
  QrCode
} from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

// Shared type for matching artwork
interface Artwork {
  id: string;
  category: 'celebrity' | 'professional' | 'marriage';
  title: string;
  location: string;
  camera: string;
  src: string;
  size: 'large' | 'tall' | 'wide' | 'standard';
  metrics: string;
  lightPreset: string;
}

interface ShareModalProps {
  art: Artwork | null;
  onClose: () => void;
}

export default function ShareModal({ art, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [activePreview, setActivePreview] = useState<'x' | 'whatsapp' | 'generic' | 'qrcode'>('qrcode');

  if (!art) return null;

  const directUrl = `${window.location.origin}/?photo=${art.id}`;
  
  const shareChannels = [
    {
      name: 'Scan QR Code',
      icon: <QrCode className="w-5 h-5" />,
      href: '#',
      color: 'hover:bg-amber-950/45 hover:text-amber-400 border-amber-500/20 text-amber-300',
      badge: 'INSTANT_SCAN',
      previewId: 'qrcode' as const
    },
    {
      name: 'X (Twitter)',
      icon: <Twitter className="w-5 h-5" />,
      href: `https://twitter.com/intent/tweet?url=${encodeURIComponent(directUrl)}&text=${encodeURIComponent(`Behold this masterpiece still crafted by Sovereign Cinema: "${art.title}"!`)}`,
      color: 'hover:bg-zinc-900 border-zinc-900/40 text-white',
      badge: 'STILL_TRANSMISSION',
      previewId: 'x' as const
    },
    {
      name: 'WhatsApp Node',
      icon: <WhatsApp className="w-5 h-5" />,
      href: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this custom-calibrated Sovereign Cinema photo still: "${art.title}" - ${directUrl}`)}`,
      color: 'hover:bg-emerald-950/45 hover:text-emerald-400 border-emerald-500/20 text-emerald-300',
      badge: 'SECURE_ROUTE',
      previewId: 'whatsapp' as const
    },
    {
      name: 'Email Secure',
      icon: <Mail className="w-5 h-5" />,
      href: `mailto:?subject=${encodeURIComponent(`[SOVEREIGN] Art Still Curatorial Share: ${art.title}`)}&body=${encodeURIComponent(`I would like to share this high-end art still curated with absolute dynamic lighting calibrator:\n\n${art.title}\nSource Link: ${directUrl}`)}`,
      color: 'hover:bg-purple-950/45 hover:text-purple-400 border-purple-500/20 text-purple-300',
      badge: 'DIRECT_MAIL',
      previewId: 'generic' as const
    }
  ];

  const handleCopy = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(directUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[120] bg-black/96 backdrop-blur-3xl flex items-center justify-center p-4 selection:bg-amber-500/20"
    >
      {/* Background aesthetics */}
      <div className="absolute inset-0 bg-grid opacity-[0.025] pointer-events-none" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Container */}
      <div className="relative w-full max-w-2xl bg-zinc-950/90 rounded-[38px] border border-white/10 overflow-hidden shadow-2xl p-6 md:p-10 text-left space-y-8 select-none">
        
        {/* Dynamic header accent bar */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 via-amber-500 to-teal-400" />

        {/* Header Block */}
        <div className="flex items-center justify-between border-b border-white/5 pb-6">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-400 flex items-center justify-center">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-amber-500 font-bold">TRANSMIT MASTERPIECE</span>
              </div>
              <h2 className="text-xl md:text-2xl font-display font-medium text-white uppercase tracking-tight mt-0.5 m-0 pb-0">
                Share Curated Still
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-3 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:scale-105 active:scale-95 transition-all"
            title="Close share station"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic preview mock sandbox (Luxury visual flair) */}
        <div className="space-y-3">
          <span className="text-[9px] font-mono font-bold tracking-widest text-gray-500 uppercase block">LIVE SOCIAL STREAM PREVIEW</span>
          
          <div className="bg-black/80 border border-white/5 rounded-3xl p-5 md:p-6 space-y-4 relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[8px] font-mono text-zinc-600 tracking-wider">PREVIEW_ENGINE_v4.2</div>
            
            {activePreview === 'qrcode' && (
              <div className="flex flex-col sm:flex-row items-center gap-6 py-2">
                <div className="relative p-2 bg-white rounded-2xl shadow-xl shrink-0 border-4 border-amber-500/35">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&color=09090b&bgcolor=ffffff&data=${encodeURIComponent(directUrl)}`}
                    alt="Sovereign QR Link"
                    className="w-28 h-28 md:w-32 md:h-32 block rounded-lg select-all"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-purple-600 to-indigo-600 p-1.5 rounded-lg border border-purple-400/30 text-white shadow-lg flex items-center justify-center">
                    <Sparkles className="w-3 h-3 animate-spin duration-3000" />
                  </div>
                </div>
                <div className="space-y-2 text-left">
                  <span className="px-2.5 py-1 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 font-mono text-[9px] uppercase tracking-widest font-bold">
                    In-Person Direct Sync
                  </span>
                  <h4 className="text-white font-display text-sm uppercase tracking-wider font-semibold">
                    Instant Mobile Transmission
                  </h4>
                  <p className="text-zinc-400 font-mono text-[10px] leading-relaxed max-w-xs">
                    Point any smartphone camera at this custom-calibrated QR matrix to instantly view this uncompressed asset directly on their device.
                  </p>
                </div>
              </div>
            )}

            {activePreview === 'x' && (
              <div className="space-y-3 font-sans text-sm text-zinc-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white font-mono text-xs font-bold">SC</div>
                  <div>
                    <div className="text-white text-xs font-bold">Sovereign Cinema Club <span className="text-zinc-500 font-normal">@sovereign_cinema</span></div>
                  </div>
                </div>
                <p className="text-xs text-zinc-200">
                  Behold this masterpiece still crafted by Sovereign Cinema: "{art.title}"! <span className="text-sky-400">{directUrl}</span>
                </p>
              </div>
            )}

            {activePreview === 'whatsapp' && (
              <div className="space-y-2 font-sans text-xs text-zinc-300">
                <div className="bg-[#0b141a] border-l-4 border-emerald-500 p-3.5 rounded-lg space-y-1">
                  <div className="text-[10px] text-emerald-400 font-bold font-mono">SOVEREIGN CINEMA TRANSMISSION</div>
                  <p className="text-[11px] font-mono text-zinc-400">
                    Check out this custom-calibrated Sovereign Cinema photo still: "{art.title}" - {directUrl}
                  </p>
                </div>
              </div>
            )}

            {activePreview === 'generic' && (
              <div className="space-y-3 font-mono text-[10px] text-zinc-400">
                <div className="flex items-center gap-2 text-purple-400 font-bold">
                  <Globe className="w-3.5 h-3.5" />
                  <span>METADATA HEADER PACKET</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[9px] text-zinc-500">
                  <div>og:title &bull; {art.title}</div>
                  <div>og:site_name &bull; Sovereign Cinema</div>
                  <div>og:url &bull; {directUrl}</div>
                  <div>og:type &bull; artwork.still</div>
                </div>
              </div>
            )}

            {/* Simulated Live card preview widget */}
            <div className="border border-white/5 rounded-2xl overflow-hidden bg-zinc-950 flex flex-col sm:flex-row shadow-lg">
              <div className="w-full sm:w-1/3 h-28 bg-cover bg-center shrink-0" style={{ backgroundImage: `url(${art.src})` }} />
              <div className="p-4 flex flex-col justify-center text-left space-y-1.5 overflow-hidden">
                <span className="text-[8px] font-mono text-[#7C3AED] uppercase font-bold tracking-widest block">{art.category.toUpperCase()}_DIRECT</span>
                <h4 className="text-white text-xs font-semibold uppercase truncate m-0">{art.title}</h4>
                <p className="text-zinc-500 text-[10px] truncate m-0">{art.location} • {art.camera}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Direct link copy block */}
        <div className="space-y-3">
          <span className="text-[9.5px] font-mono font-bold tracking-widest text-gray-500 uppercase block">DIRECT ACCESS ENTRYPOINT</span>
          
          <div className="flex items-center gap-2.5">
            <div className="flex-1 bg-black/60 border border-white/5 rounded-2xl px-5 py-3.5 text-xs text-zinc-300 font-mono select-all truncate">
              {directUrl}
            </div>

            <button
              onClick={handleCopy}
              className={cn(
                "p-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 border transition-all duration-300 active:scale-95 shrink-0 select-none shadow-lg",
                copied 
                  ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-400 glow-emerald"
                  : "bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 border-amber-500/30 text-white shadow-amber-500/10"
              )}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span className="hidden sm:inline">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span className="hidden sm:inline">Copy Link</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Social transmission channel grids */}
        <div className="space-y-3">
          <span className="text-[9.5px] font-mono font-bold tracking-widest text-[#7C3AED] uppercase block">TRANSMIT VIA EXTERNAL PROTOCOL</span>
          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {shareChannels.map((channel, idx) => (
              <a
                key={idx}
                href={channel.href}
                target={channel.href.startsWith('http') ? "_blank" : undefined}
                rel="noopener noreferrer"
                onMouseEnter={() => {
                  soundEngine.playHover();
                  setActivePreview(channel.previewId);
                }}
                onClick={(e) => {
                  soundEngine.playClick();
                  if (channel.href === '#') {
                    e.preventDefault();
                    setActivePreview(channel.previewId);
                  }
                }}
                className={cn(
                  "p-4 rounded-2xl bg-white/[0.03] border border-white/5 text-gray-300 font-mono text-[10px] tracking-widest uppercase flex flex-col items-center justify-center gap-3 transition-all duration-300 text-center select-none shadow-md",
                  channel.color
                )}
              >
                <div className="p-2.5 rounded-full bg-white/5 border border-white/5 flex items-center justify-center">
                  {channel.icon}
                </div>
                <div className="space-y-1">
                  <span className="font-bold block text-[10px] tracking-tight">{channel.name.split(' ')[0]}</span>
                  <span className="text-[7px] text-zinc-500 block font-normal tracking-widest">{channel.badge}</span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Lower compliance footer disclaimer watermark */}
        <div className="pt-2 border-t border-white/5 flex items-center justify-center gap-2 text-zinc-600 font-mono text-[8.5px] uppercase tracking-[0.2em] select-none text-center">
          <Sparkles className="w-3.5 h-3.5 text-amber-500/45" />
          <span>CRYPTO-VERIFIED TRANSMISSIONS CONTROL STATION</span>
        </div>

      </div>
    </motion.div>
  );
}
