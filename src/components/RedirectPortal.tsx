import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Instagram, 
  Facebook, 
  AtSign, 
  ArrowRight, 
  Loader2, 
  ShieldCheck, 
  Terminal, 
  Globe, 
  Info, 
  Compass, 
  X, 
  Cpu,
  Tv,
  CheckCircle,
  ExternalLink
} from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

interface RedirectPortalProps {
  url: string | null;
  onClose: () => void;
}

export default function RedirectPortal({ url, onClose }: RedirectPortalProps) {
  const [countdown, setCountdown] = useState(3);
  const [logs, setLogs] = useState<string[]>([]);
  const [verified, setVerified] = useState(false);
  const [bypassTriggered, setBypassTriggered] = useState(false);

  // Determine platform logo and details
  let platformName = "EXTERNAL NODE";
  let platformIcon = <Globe className="w-8 h-8 text-amber-400" />;
  let platformColor = "text-amber-400 border-amber-550/20";
  let platformGlow = "glow-gold";

  if (url) {
    if (url.includes('instagram.com')) {
      platformName = "INSTAGRAM NETWORK";
      platformIcon = <Instagram className="w-8 h-8 text-purple-400" />;
      platformColor = "text-purple-400 border-purple-500/20";
      platformGlow = "glow-purple";
    } else if (url.includes('threads.com') || url.includes('threads.net')) {
      platformName = "THREADS NETWORK";
      platformIcon = <AtSign className="w-8 h-8 text-cyan-400" />;
      platformColor = "text-cyan-400 border-cyan-500/20";
      platformGlow = "glow-teal";
    } else if (url.includes('facebook.com')) {
      platformName = "FACEBOOK DIRECT";
      platformIcon = <Facebook className="w-8 h-8 text-blue-400 animate-pulse" />;
      platformColor = "text-blue-400 border-blue-500/20";
      platformGlow = "bg-blue-500/10";
    }
  }

  // Generate tactical network-looking diagnostics logs
  useEffect(() => {
    if (!url) return;
    
    // Play enter sound
    soundEngine.playHover();

    const messages = [
      `[SYSTEM] INITIALIZING OUTBOUND HANDSHAKE...`,
      `[PROXY] RESOLVING SECURE GATEWAY ROUTE: ${url.substring(0, 42)}...`,
      `[NODE] CONNECTING TO ANANTHU CA CERTIFIED STATION...`,
      `[VALIDATOR] CRYPTOGRAPHIC SIGNATURE MATCHED (TRIANGLE_SECURE)...`,
      `[NETWORK] SPEED ALIGNMENT CONFIRMED AT 10GBps`,
      `[REDIRECT] CHANNEL OPENED. COMMENCING DEPARTURE SEQUENCES...`
    ];

    let currentLogIndex = 0;
    const logInterval = setInterval(() => {
      if (currentLogIndex < messages.length) {
        setLogs(prev => [...prev, messages[currentLogIndex]]);
        currentLogIndex++;
        soundEngine.playHover();
      } else {
        setVerified(true);
        clearInterval(logInterval);
      }
    }, 450);

    return () => clearInterval(logInterval);
  }, [url]);

  // Countdown auto-redirect handle
  useEffect(() => {
    if (!url || bypassTriggered) return;

    if (countdown <= 0) {
      executeRedirect();
      return;
    }

    const timer = setTimeout(() => {
      setCountdown(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [countdown, url, bypassTriggered]);

  const executeRedirect = () => {
    if (!url) return;
    setBypassTriggered(true);
    soundEngine.playClick();
    
    // Smooth delay before actual redirection triggers
    setTimeout(() => {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClose();
    }, 200);
  };

  if (!url) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 selection:bg-amber-500/20"
    >
      {/* Dynamic graphic grids */}
      <div className="absolute inset-0 bg-grid opacity-[0.035] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 via-amber-500/5 to-transparent rounded-full blur-[140px] pointer-events-none" />

      {/* Frame Corners */}
      <div className="absolute top-10 left-10 w-8 h-8 border-t-2 border-l-2 border-white/10 hidden md:block" />
      <div className="absolute top-10 right-10 w-8 h-8 border-t-2 border-r-2 border-white/10 hidden md:block" />
      <div className="absolute bottom-10 left-10 w-8 h-8 border-b-2 border-l-2 border-white/10 hidden md:block" />
      <div className="absolute bottom-10 right-10 w-8 h-8 border-b-2 border-r-2 border-white/10 hidden md:block" />

      {/* Main Terminal Centerpiece */}
      <div className="relative w-full max-w-2xl bg-zinc-950/80 rounded-[44px] border border-white/10 p-6 md:p-12 overflow-hidden shadow-2xl space-y-8 select-none">
        
        {/* Absolute header metadata banner */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-600 via-amber-500 to-teal-400" />
        
        {/* Core Redirect Header Block */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/5 pb-6">
          <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
            <div className={cn("p-4 rounded-2xl bg-white/5 border backdrop-blur-md flex items-center justify-center", platformColor, platformGlow)}>
              {platformIcon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-emerald-400 font-bold">SECURE CHANNEL ACTIVATED</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-black text-white uppercase tracking-tight m-0 mt-0.5">
                {platformName}
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="p-3.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:scale-105 transition-all self-end sm:self-center"
            title="Abort Transfer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Display Destination & Sync Indicator */}
        <div className="space-y-4 text-left">
          <div className="bg-black/60 border border-white/5 rounded-2xl p-5 md:p-6 space-y-2 relative">
            <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">TARGET TRANSMISSION URL</span>
            <div className="flex items-center justify-between gap-4">
              <span className="text-white text-xs md:text-sm font-mono truncate select-all pr-2 font-light">
                {url}
              </span>
              <span className="p-1 px-2.5 rounded bg-amber-500/10 text-amber-500 font-mono text-[8px] tracking-widest uppercase font-bold text-right shrink-0">
                EXTERNAL_STATION
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Diagnostics Terminal Output */}
        <div className="space-y-3 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-gray-500 font-mono text-[9.5px] uppercase tracking-wider">
              <Terminal className="w-3.5 h-3.5 text-amber-500" />
              <span>TERMINAL ALIGNMENT LOGS</span>
            </div>
            {verified && (
              <span className="text-[8.5px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" /> VERIFIED
              </span>
            )}
          </div>
          
          <div className="h-40 bg-black border border-white/5 rounded-2.5xl p-5 overflow-y-auto font-mono text-[10px] space-y-2 text-gray-400 custom-scrollbar scroll-smooth">
            <AnimatePresence>
              {logs.map((log, id) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "leading-relaxed font-light tracking-wide",
                    log.includes('SYSTEM') && "text-purple-400",
                    log.includes('VALIDATOR') && "text-emerald-400 font-medium",
                    log.includes('PROXY') && "text-cyan-400"
                  )}
                >
                  {log}
                </motion.div>
              ))}
              {!verified && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  className="flex items-center gap-2 text-[10px] text-gray-600 italic cursor-wait"
                >
                  <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
                  <span>establishing live proxy nodes...</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Immersive Ring Dial countdown and CTA Button options */}
        <div className="grid sm:grid-cols-12 gap-6 items-center border-t border-white/5 pt-8">
          
          {/* Circular dial tracker in left column */}
          <div className="sm:col-span-5 flex items-center gap-4 justify-center sm:justify-start">
            <div className="relative w-16 h-16 flex items-center justify-center bg-white/[0.03] rounded-full border border-white/10 shrink-0">
              {/* Spinning active loader frame */}
              <div className="absolute inset-1 rounded-full border-t border-l border-amber-400 animate-spin" />
              <span className="text-xl font-display font-black text-white font-mono">
                {countdown}s
              </span>
            </div>
            
            <div className="text-left">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#7C3AED] font-black leading-none block">REDIRECT IN PROGRESS</span>
              <p className="text-gray-500 text-[10px] font-light leading-relaxed max-w-[180px] m-0 pt-1">
                Auto departure commences in {countdown} seconds to prevent latency loops.
              </p>
            </div>
          </div>

          {/* Action trigger bypass triggers */}
          <div className="sm:col-span-7 flex flex-col sm:flex-row gap-3 w-full justify-end">
            <button
              onClick={() => {
                soundEngine.playClick();
                onClose();
              }}
              className="px-6 py-4.5 rounded-2sxl rounded-2xl bg-white/5 hover:bg-white/10 text-gray-300 font-mono text-[10px] font-bold uppercase tracking-widest text-center border border-white/5 active:scale-95 transition-all"
            >
              Abort Connection
            </button>

            <button
              onClick={executeRedirect}
              className="px-7 py-4.5 rounded-2sxl rounded-2xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-mono text-[10px] font-black uppercase tracking-widest text-center flex items-center justify-center gap-2 glow-gold active:scale-95 transition-all"
            >
              <span>Depart Portal Instantly</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>

        </div>

        {/* Legal and compliance disclaimer label info */}
        <div className="pt-2 flex items-center gap-2 justify-center text-gray-600 text-[8.5px] uppercase font-mono tracking-widest">
          <Cpu className="w-3 h-3 text-purple-600" />
          <span>ROUTE RESOLVED SECURELY BY ORIGINAL TRIANGLE SYSTEM INTEGRATOR PROFILES</span>
        </div>

      </div>
    </motion.div>
  );
}
