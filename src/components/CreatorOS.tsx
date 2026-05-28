import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Globe, 
  Sliders, 
  Terminal, 
  Activity, 
  Send, 
  Sparkles, 
  Check, 
  Play, 
  Pause,
  Zap, 
  Layers, 
  Shield, 
  TrendingUp, 
  Tv, 
  Network, 
  Award, 
  Lock, 
  Eye,
  Camera,
  Compass,
  Briefcase
} from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

// Visitor Personas for Intellectual Personalization
interface VisitorPersona {
  id: 'brand' | 'director' | 'investor' | 'creator';
  label: string;
  icon: React.ReactNode;
  subtitle: string;
  manifesto: string;
  metricLabel: string;
  metricVal: string;
  projection: string;
  actionCall: string;
  soundPitch: number;
}

const PERSONAS: VisitorPersona[] = [
  {
    id: 'brand',
    label: 'Brand Collaborator',
    icon: <Briefcase className="w-4 h-4" />,
    subtitle: 'Strategic Corporate Synergy',
    manifesto: 'Translate absolute creative supremacy into compound market scale. We reject standardized media channels; we build cinematic universes around your product. Frame, speed, and premium positioning combined with organic viral delivery loops.',
    metricLabel: 'Projected Campaign Dominance',
    metricVal: '3.4x ROI',
    projection: 'Secure complete visual takeover across vertical networks with mathematical retention.',
    actionCall: 'Request Corporate Briefing',
    soundPitch: 100
  },
  {
    id: 'director',
    label: 'Creative Director',
    icon: <Camera className="w-4 h-4" />,
    subtitle: 'High-Art Co-production',
    manifesto: 'Shatter boundaries of traditional capture matrices. For directors crafting visual poetry, legacy systems represent a bottleneck. Leverage our custom-designed anamorphic lenses, low-light tracking sensors, and sound spatialization rigs.',
    metricLabel: 'Visual Precision Factor',
    metricVal: '8K Master',
    projection: 'Deploy absolute color fidelity and volumetric spatial rendering targets.',
    actionCall: 'Request Equipment Synchronization',
    soundPitch: 150
  },
  {
    id: 'investor',
    label: 'Venture Investor',
    icon: <TrendingUp className="w-4 h-4" />,
    subtitle: 'Sovereign Content Assets',
    manifesto: 'Entertainment is undergoing a radical transition from centralized media nodes into hyper-individualized global creator empires. Align capital with an ecosystem generating 48.2M+ monthly impressions with absolute organic authority.',
    metricLabel: 'Audience CAGR (YoY)',
    metricVal: '+184%',
    projection: 'Unify equity, branding systems, and global digital asset networks for compounding returns.',
    actionCall: 'Access Financial Deck',
    soundPitch: 80
  },
  {
    id: 'creator',
    label: 'Apex Filmmaker',
    icon: <Zap className="w-4 h-4" />,
    subtitle: 'Creative Evolution',
    manifesto: 'Stop uploading. Start constructing. The creator of tomorrow runs on custom code, localized sound libraries, and raw narrative courage. Access the exact technical layouts, color grading maps, and sound templates utilized for Apple and Porsche.',
    metricLabel: 'Cognitive Upscale Core',
    metricVal: 'Top 0.1%',
    projection: 'Bypass legacy algorithms. Construct an unshakeable digital citadel of raw artistic authority.',
    actionCall: 'Decrypt Masterclass Key',
    soundPitch: 220
  }
];

// Structural Timeline of the Digital Empire
const CHRONICLES = [
  {
    year: '2020',
    era: 'THE RAW APERTURE',
    focus: 'Optical Foundations & Light Bending',
    desc: 'Challenging physical low-light boundaries. Drafting primitive algorithms to couple slow-cinematic frame tracks with structural bass notes.',
    metric: '120,000 Frames'
  },
  {
    year: '2022',
    era: 'APEX ARCHITECTURE',
    focus: 'Hyper-Scale Distribution',
    desc: 'Bypassing algorithmic constraints. Amassing over 15M monthly impressions by introducing speed-transition timing architectures.',
    metric: '18.4% Baseline Engagement'
  },
  {
    year: '2024',
    era: 'SOVEREIGN TRIANGLE',
    focus: 'Corporate Alliances',
    desc: 'Securing multi-year campaign integrations with Apple Vision Pro engineers, Porsche Classic divisions, and Leica optics.',
    metric: '48.2M Global Impressions'
  },
  {
    year: '2026+',
    era: 'CREATOR INTELLIGENCE',
    focus: 'Localized Multi-User OS',
    desc: 'Transforming this digital canvas into an active creator operating ecosystem. Unveiling fully automated, high-art creative pipelines.',
    metric: '100% Organic Retainment'
  }
];

// Customizable Dynamic Sound & Accent Aura System
interface AuraTheme {
  id: 'obsidian' | 'gold' | 'emerald' | 'crimson';
  name: string;
  primaryColor: string;
  glowClass: string;
  textColor: string;
  gradient: string;
}

const AURAS: AuraTheme[] = [
  {
    id: 'obsidian',
    name: 'Amethyst Nebula',
    primaryColor: '#7C3AED',
    glowClass: 'shadow-purple-500/20 shadow-lg border-purple-500/35',
    textColor: 'text-purple-400',
    gradient: 'from-purple-900/30 via-zinc-950 to-purple-950/20'
  },
  {
    id: 'gold',
    name: 'Solar Flare',
    primaryColor: '#F59E0B',
    glowClass: 'shadow-amber-500/20 shadow-lg border-amber-500/35',
    textColor: 'text-amber-400',
    gradient: 'from-amber-950/20 via-zinc-950 to-amber-900/10'
  },
  {
    id: 'emerald',
    name: 'Hyper Jade',
    primaryColor: '#10B981',
    glowClass: 'shadow-emerald-500/20 shadow-lg border-emerald-500/35',
    textColor: 'text-emerald-400',
    gradient: 'from-emerald-950/20 via-zinc-950 to-emerald-900/10'
  },
  {
    id: 'crimson',
    name: 'Deep Nova',
    primaryColor: '#EF4444',
    glowClass: 'shadow-red-500/20 shadow-lg border-red-500/35',
    textColor: 'text-red-400',
    gradient: 'from-red-950/20 via-zinc-950 to-red-900/10'
  }
];

export default function CreatorOS() {
  const [visitorType, setVisitorType] = useState<'brand' | 'director' | 'investor' | 'creator'>('brand');
  const [activeAura, setActiveAura] = useState<AuraTheme>(AURAS[0]);
  const [cinemaMode, setCinemaMode] = useState(false);
  const [inviteCode, setInviteCode] = useState('');
  const [inviteStatus, setInviteStatus] = useState<'idle' | 'authorized' | 'declined'>('idle');
  const [inviteMessage, setInviteMessage] = useState('');
  const [logs, setLogs] = useState<string[]>([
    '[SYSTEM_INIT] Sovereign Creator Operating System Online...',
    '[HARDWARE] Arri Alexa LF synced via absolute fiber network.',
    '[METRIC_CORE] Streaming active global engagement metrics...',
    '[DYNAMICS] Spectral contrast calibrator auto-loaded.'
  ]);
  const [systemUtilization, setSystemUtilization] = useState(48.2);
  const [latency, setLatency] = useState(12);

  // References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Auto scroll logs and update values to simulate high-fidelity live telemetry
  useEffect(() => {
    const loggingInterval = setInterval(() => {
      const liveEvents = [
        `[DYNAMICS] Contrast optimization computed for Porsche canyon tracking.`,
        `[GEOLOCATION] Singapore node ping response packet: ${Math.floor(Math.random() * 6) + 7}ms.`,
        `[METRICS] High-intent click detected from executive proxy node.`,
        `[SPECTRAL] Leica M11 shadow curve threshold adjusted to 0.041.`,
        `[INFRASTRUCTURE] Volumetric asset delivery synchronized perfectly.`,
        `[COLLABORATION_ONRAMP] Incoming alignment handshake signal recorded.`
      ];
      const randomMsg = liveEvents[Math.floor(Math.random() * liveEvents.length)];
      setLogs(prev => {
        const current = [...prev, randomMsg];
        if (current.length > 5) current.shift();
        return current;
      });

      // Fluctuate utilization & latency mildly
      setSystemUtilization(prev => {
        const delta = (Math.random() - 0.5) * 4;
        return Math.min(Math.max(prev + delta, 40), 98);
      });
      setLatency(Math.floor(Math.random() * 5) + 8);
    }, 4000);

    return () => clearInterval(loggingInterval);
  }, []);

  // HTML5 Canvas for the 3D Global Audience Map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = canvas.width = canvas.parentElement?.clientWidth || 500;
    let height = canvas.height = 320;

    // Node locations: latitude/longitude scale
    // Central sovereign sync hub is Singapore coordinate
    const centralNode = { x: width * 0.75, y: height * 0.72, label: 'Singapore Penthouse Hub', radius: 7 };
    
    const audienceNodes = [
      { x: width * 0.15, y: height * 0.42, label: 'Los Angeles Terminal', radius: 4 },
      { x: width * 0.46, y: height * 0.35, label: 'London Edge', radius: 4 },
      { x: width * 0.58, y: height * 0.54, label: 'Dubai Gateway', radius: 4 },
      { x: width * 0.69, y: height * 0.58, label: 'Mumbai Port', radius: 4 },
      { x: width * 0.88, y: height * 0.38, label: 'Tokyo Sanctuary', radius: 4 }
    ];

    let t = 0;

    const render = () => {
      t += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw subtle futuristic cybernetic lattice background
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.015)';
      ctx.lineWidth = 1;

      // Vertical grids
      for (let i = 0; i < width; i += 24) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, height);
        ctx.stroke();
      }
      // Horizontal grids
      for (let j = 0; j < height; j += 24) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(width, j);
        ctx.stroke();
      }

      // Draw global geographic connection pings
      audienceNodes.forEach(node => {
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.setLineDash([4, 12]);
        ctx.moveTo(node.x, node.y);
        ctx.lineTo(centralNode.x, centralNode.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Animated connection particles flowing into Singapore hub
        const fraction = (t + node.x * 0.01) % 1;
        const pointerX = node.x + (centralNode.x - node.x) * fraction;
        const pointerY = node.y + (centralNode.y - node.y) * fraction;

        ctx.beginPath();
        ctx.fillStyle = activeAura.primaryColor;
        ctx.arc(pointerX, pointerY, 2, 0, Math.PI * 2);
        ctx.shadowBlur = 4;
        ctx.shadowColor = activeAura.primaryColor;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw node pulse wave
        const waveRadius = (t * 22 + node.radius) % 20;
        ctx.beginPath();
        ctx.strokeStyle = `${activeAura.primaryColor}${Math.floor((1 - waveRadius / 20) * 120).toString(16).padStart(2, '0')}`;
        ctx.lineWidth = 1;
        ctx.arc(node.x, node.y, waveRadius, 0, Math.PI * 2);
        ctx.stroke();

        // Draw Node Core
        ctx.beginPath();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.arc(node.x, node.y, node.radius + 1, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = activeAura.primaryColor;
        ctx.arc(node.x, node.y, node.radius - 1.5, 0, Math.PI * 2);
        ctx.fill();

        // Direct Text identifiers
        ctx.fillStyle = 'rgba(156, 163, 175, 0.45)';
        ctx.font = '7.5px monospace';
        ctx.fillText(node.label.toUpperCase(), node.x + 8, node.y + 3);
      });

      // Draw Main Hub (Singapore Central Exchange Suite)
      // Pulse rings
      const hubPulse = (t * 15) % 35;
      ctx.beginPath();
      ctx.strokeStyle = `${activeAura.primaryColor}55`;
      ctx.lineWidth = 1.5;
      ctx.arc(centralNode.x, centralNode.y, hubPulse, 0, Math.PI * 2);
      ctx.stroke();

      const hubPulseTwo = ((t * 15) + 18) % 35;
      ctx.beginPath();
      ctx.strokeStyle = `${activeAura.primaryColor}22`;
      ctx.lineWidth = 1;
      ctx.arc(centralNode.x, centralNode.y, hubPulseTwo, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.fillStyle = '#ffffff';
      ctx.arc(centralNode.x, centralNode.y, centralNode.radius + 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.beginPath();
      ctx.fillStyle = activeAura.primaryColor;
      ctx.arc(centralNode.x, centralNode.y, centralNode.radius - 2.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 8.5px monospace';
      ctx.fillText('ACTIVE_SOVEREIGN_HUB', centralNode.x - 110, centralNode.y + 3);

      animationFrameId = requestAnimationFrame(render);
    };

    const handleResize = () => {
      width = canvas.width = canvas.parentElement?.clientWidth || 500;
      height = canvas.height = 320;
    };

    render();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [activeAura]);

  // Canvas floating cinema dust ambient particle simulator
  useEffect(() => {
    if (!cinemaMode) return;
    const canvas = particlesCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    let animId: number;

    const count = 38;
    const particles: { x: number; y: number; s: number; vy: number; vx: number; alpha: number }[] = [];

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        s: Math.random() * 2 + 0.5,
        vy: -(Math.random() * 0.45 + 0.15),
        vx: (Math.random() - 0.5) * 0.2,
        alpha: Math.random() * 0.35 + 0.1
      });
    }

    const run = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.fillStyle = `${activeAura.primaryColor}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.shadowBlur = 6;
        ctx.shadowColor = activeAura.primaryColor;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animId = requestAnimationFrame(run);
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    run();
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [cinemaMode, activeAura]);

  const handlePersonaSelect = (persona: VisitorPersona) => {
    soundEngine.playClick();
    setVisitorType(persona.id);
    
    // Auto-map aura based on visitor persona selector
    const auraId = persona.id === 'brand' ? 'obsidian' :
                   persona.id === 'director' ? 'emerald' :
                   persona.id === 'investor' ? 'gold' : 'crimson';
    const foundAura = AURAS.find(a => a.id === auraId);
    if (foundAura) {
      setActiveAura(foundAura);
    }

    setLogs(prev => [
      ...prev.slice(1),
      `[ALIGNMENT] Calibrated interface for persona index: [${persona.label.toUpperCase()}]`
    ]);
  };

  const handleAuraSwitch = (aura: AuraTheme) => {
    soundEngine.playActionTransition();
    setActiveAura(aura);
    setLogs(prev => [
      ...prev.slice(1),
      `[COGNITIVE_AURA] Dynamic atmospheric light set to: ${aura.name.toUpperCase()}`
    ]);
  };

  const verifyCustomCode = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playActionTransition();
    
    const formattedCode = inviteCode.trim().toUpperCase();

    if (formattedCode === 'VIP999') {
      setInviteStatus('authorized');
      setInviteMessage('ELITE DECK AUTHORIZED. Unlocking uncompressed spatial distribution systems & executive direct mail portal keys.');
      setLogs(prev => [
        ...prev.slice(3),
        '[SECURITY] DECRYPTION SUCCESS: Code: VIP999 (Sovereign Elite Tier Enabled)',
        '[INFRA] Unlocking private content vault links...',
        '[AUDIO] Enhancing cognitive sonic harmonics (Volume mod active)'
      ]);
    } else if (formattedCode === 'PORSCHE') {
      setInviteStatus('authorized');
      setInviteMessage('GERMAN AUTOMOTIVE SECTOR SYNCED. Absolute speed-gradient treatment tools initiated.');
      const classicGold = AURAS.find(a => a.id === 'gold');
      if (classicGold) setActiveAura(classicGold);
      setLogs(prev => [
        ...prev.slice(2),
        '[SECURITY] CODE: PORSCHE IDENTIFIED.',
        '[CAMPAIGN] Setting 911 Canyon treatment frames as current workspace visual asset targets.'
      ]);
    } else if (formattedCode === 'APPLE') {
      setInviteStatus('authorized');
      setInviteMessage('SPATIAL DIVISION INTEGRATED. High-fidelity immersive audio nodes verified.');
      setCinemaMode(true);
      setLogs(prev => [
        ...prev.slice(2),
        '[SECURITY] CODE: APPLE IDENTIFIED.',
        '[CINEMA_MODE] Forced override: TRUE. Running spatial dust particles.'
      ]);
    } else if (formattedCode === 'CREATOR') {
      setInviteStatus('authorized');
      setInviteMessage('apex level unlocked. Welcome into the Sovereign Creative Laboratory. Direct credentials dispatched.');
      setLogs(prev => [
        ...prev.slice(3),
        '[SECURITY] CODE: CREATOR AUTHORized.',
        '[OS] Overclocking rendering processors for hyper-art development templates...'
      ]);
    } else {
      setInviteStatus('declined');
      setInviteMessage('ACCESS DECREED APOCRYPHAL. Code pending blockchain authorization or executive sponsorship.');
      setLogs(prev => [
        ...prev.slice(1),
        `[SECURITY_WARNING] Failed unlock attempt with invalid vector token: ${formattedCode}`
      ]);
    }
  };

  const selectedPersonaData = PERSONAS.find(p => p.id === visitorType) || PERSONAS[0];

  return (
    <section id="creator-os" className="py-24 relative overflow-hidden bg-black text-white select-none transition-all duration-700 selection:bg-purple-500/30">
      
      {/* Absolute Cinematic Canvas Background Noise & Aura tinter */}
      <div className="absolute inset-0 bg-noise opacity-[0.03] pointer-events-none z-[80]" />
      
      {/* Ambient background accent light regulated by active dynamic aura */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-[0.14] pointer-events-none transition-all duration-1000 z-[1]"
        style={{ backgroundColor: activeAura.primaryColor }}
      />

      {/* Floating Canvas particles overlay when Immersive Cinema mode is toggled */}
      <AnimatePresence>
        {cinemaMode && (
          <canvas 
            ref={particlesCanvasRef} 
            className="fixed inset-0 pointer-events-none z-[85] transition-opacity duration-1000"
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24">
        
        {/* UPPER BRAND IDENTITY HERO GRID */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="flex items-center gap-3">
              <span className="p-2 bg-zinc-900 rounded-xl border border-white/10 text-xs text-amber-400 font-mono tracking-widest flex items-center gap-1.5 uppercase font-bold">
                <Cpu className="w-3.5 h-3.5 animate-pulse" /> OPERATING SYSTEM v2.0
              </span>
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="font-mono text-[8.5px] uppercase text-emerald-400 tracking-widest font-bold">LIVE HUB STATUS: SYNCHRONIZED</span>
              </div>
            </div>

            <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight uppercase text-white leading-none">
              The Sovereign <span className="text-gradient-purple font-medium">Creative Hub</span>
            </h2>
            <p className="text-zinc-400 text-sm md:text-md leading-relaxed">
              Bypass legacy content frameworks. This is an interactively calibrated creative operating system serving Porsche, Apple, and elite global filmmakers. Define your vector, toggle atmospheric light layers, and access custom assets in real-time.
            </p>
          </div>

          {/* DYNAMIC ATMOSPHERIC CONTROLLER */}
          <div className="p-5 bg-zinc-950/70 rounded-3xl border border-white/5 space-y-4 shrink-0 backdrop-blur-md text-left lg:max-w-sm w-full">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase text-zinc-400 tracking-wider">
              <span>ATMOSPHERIC HARMONIZER</span>
              <span className={activeAura.textColor}>{activeAura.name}</span>
            </div>

            <div className="grid grid-cols-4 gap-2">
              {AURAS.map((aura) => (
                <button
                  key={aura.id}
                  onClick={() => handleAuraSwitch(aura)}
                  className={cn(
                    "py-2.5 rounded-xl border font-mono text-[9px] font-bold tracking-widest uppercase flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 duration-200 hover:bg-white/5 text-center",
                    activeAura.id === aura.id 
                      ? "bg-white/10 text-white" 
                      : "bg-white/[0.02] border-white/5 text-zinc-500"
                  )}
                  style={{ borderColor: activeAura.id === aura.id ? aura.primaryColor : undefined }}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: aura.primaryColor }} />
                  <span className="text-[7.5px] truncate max-w-full uppercase">{aura.id}</span>
                </button>
              ))}
            </div>

            {/* Immersive Cinema Mode Toggler */}
            <button
              onClick={() => {
                soundEngine.playActionTransition();
                setCinemaMode(!cinemaMode);
              }}
              className={cn(
                "w-full py-3.5 rounded-2xl border font-mono text-[9.5px] font-black tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2.5",
                cinemaMode 
                  ? "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-lg shadow-amber-500/10" 
                  : "bg-white/[0.02] border-white/11 text-zinc-300 hover:bg-white/5"
              )}
            >
              {cinemaMode ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{cinemaMode ? 'EXIT IMMERSIVE CINEMA SCREENING' : 'ENTER IMMERSIVE CINEMA SCREENING'}</span>
            </button>
          </div>
        </div>

        {/* INTERACTIVE COMPONENT GRID CORE */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: DIRECT PERSONALIZATION ENGINE (5 cols) */}
          <div className="lg:col-span-5 space-y-8 text-left bg-zinc-950/45 p-6 md:p-8 rounded-[38px] border border-white/5 backdrop-blur-md">
            <div>
              <span className="text-[8.5px] font-mono tracking-widest uppercase text-purple-400 font-bold block mb-1">VISITOR PERSONALIZATION MODULE</span>
              <h3 className="text-xl font-display font-medium text-white uppercase tracking-wider m-0">DECLARE YOUR CLASSIFICATION</h3>
            </div>

            {/* Persona Selecting Cards */}
            <div className="grid grid-cols-2 gap-3">
              {PERSONAS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handlePersonaSelect(p)}
                  className={cn(
                    "p-4 rounded-3xl border text-left flex flex-col justify-between gap-5 transition-all duration-300 active:scale-95",
                    visitorType === p.id 
                      ? "bg-white/[0.04] text-white" 
                      : "bg-white/[0.01] border-white/5 text-zinc-400 hover:bg-white/[0.03]"
                  )}
                  style={{ borderColor: visitorType === p.id ? activeAura.primaryColor : undefined }}
                >
                  <div className="flex items-center justify-between">
                    <div 
                      className="p-2.5 rounded-2xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: visitorType === p.id ? `${activeAura.primaryColor}15` : 'rgba(255,255,255,0.03)',
                        color: visitorType === p.id ? activeAura.primaryColor : '#9ca3af'
                      }}
                    >
                      {p.icon}
                    </div>
                    {visitorType === p.id && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />}
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold block">{p.label}</span>
                    <span className="text-[8px] text-zinc-500 block truncate">{p.subtitle}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Manifesto Output Case */}
            <AnimatePresence mode="wait">
              <motion.div
                key={visitorType}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 15 }}
                transition={{ duration: 0.25 }}
                className="p-6 bg-black rounded-3xl border border-white/5 space-y-5"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: activeAura.primaryColor }} />
                  <span className="font-mono text-[9px] text-zinc-500 uppercase tracking-widest font-bold">SOVEREIGN SYNERGY INSTRUCTIONS</span>
                </div>

                <p className="text-xs text-zinc-300 font-sans italic leading-relaxed m-0">
                  "{selectedPersonaData.manifesto}"
                </p>

                {/* Subsystem Statistics Display */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5 text-left">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      {selectedPersonaData.metricLabel}
                    </span>
                    <span className="text-xl font-display font-black text-white block">
                      {selectedPersonaData.metricVal}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">TARGET DIRECTIONAL VECTOR</span>
                    <span className="text-[10px] font-mono uppercase font-bold text-gray-300 leading-tight block">
                      {selectedPersonaData.projection}
                    </span>
                  </div>
                </div>

                {/* Simulated interactive CTA */}
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    const collElem = document.getElementById('collaborations');
                    if (collElem) {
                      collElem.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="w-full py-4 rounded-2xl bg-white text-black text-xs font-mono font-black uppercase tracking-widest flex items-center justify-center gap-2.5 transition-all duration-300 hover:scale-[1.02] active:scale-95"
                >
                  <span>{selectedPersonaData.actionCall}</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            </AnimatePresence>

          </div>

          {/* MAIN CENTER PANEL: AUDIENCE GLOBAL MAP (7 cols) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            
            {/* 3D Global audience map frame */}
            <div className="relative bg-zinc-950/45 border border-white/5 rounded-[38px] overflow-hidden p-6 md:p-8 backdrop-blur-md">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-purple-400" />
                    <span className="text-[8.5px] font-mono tracking-widest uppercase text-purple-400 font-bold">AUDIENCE SIGNAL TRACKER</span>
                  </div>
                  <h3 className="text-lg font-display uppercase tracking-wider font-semibold m-0 text-white">GEOGRApHiC SYNC WAVEFORM</h3>
                </div>

                {/* Status Pills */}
                <div className="flex gap-2.5">
                  <div className="px-3.5 py-1.5 rounded-xl bg-black/50 border border-white/5 text-[9px] font-mono text-zinc-400 flex items-center gap-1.5 font-bold">
                    <span>PING:</span> <span className="text-indigo-400 font-medium">{latency}ms</span>
                  </div>
                  <div className="px-3.5 py-1.5 rounded-xl bg-black/50 border border-white/5 text-[9px] font-mono text-zinc-400 flex items-center gap-1.5 font-bold">
                    <span>SYS_LOAD:</span> <span className="text-amber-400 font-medium">{systemUtilization.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              {/* The Interactive Map Canvas Container */}
              <div className="relative h-80 rounded-3xl bg-black/60 border border-white/5 overflow-hidden flex items-center justify-center">
                <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
                
                {/* Embedded control labels */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[7.5px] font-mono text-zinc-500 bg-black/80 backdrop-blur-md py-2 px-4 rounded-xl border border-white/5">
                  <span>EXECUTIVE NODE: 1.3544° N, 103.8607° E</span>
                  <span className="animate-pulse">STREAMING TELEMETRY PACKET GRIDS CONTINOUSLY</span>
                </div>
              </div>
            </div>

            {/* REAL-TIME TERMINAL SYSTEM & ACCESS CODES (Dual Split) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              
              {/* Telemetry Output Log */}
              <div className="bg-zinc-950/45 p-6 rounded-[32px] border border-white/5 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-3.5 h-3.5 text-teal-400" />
                    <span className="text-[8px] font-mono tracking-widest text-[#10B981] font-bold">CREATOR CODE COMPATIBILITY</span>
                  </div>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                </div>

                <div className="bg-black border border-white/5 rounded-2xl p-4 h-40 font-mono text-[8.5px] text-zinc-400 overflow-y-auto space-y-2 select-all text-left">
                  {logs.map((log, index) => (
                    <div key={index} className="leading-relaxed border-b border-white/[0.02] pb-1">
                      <span className="text-purple-500 font-bold">&gt;</span> {log}
                    </div>
                  ))}
                </div>
              </div>

              {/* Secure Token Validation Easter Egg Frame */}
              <div className="bg-zinc-950/45 p-6 rounded-[32px] border border-white/5 space-y-4 backdrop-blur-md text-left">
                <div className="flex items-center gap-2">
                  <Shield className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[8px] font-mono tracking-widest text-amber-500 font-bold">VIP CODEGATE PORTAL</span>
                </div>

                <p className="text-[10px] text-zinc-400 leading-normal m-0 pb-1">
                  Unveil hidden narrative dimensions, experimental filters, or high-tier spatial asset specifications using alignment passcodes. 
                </p>

                <form onSubmit={verifyCustomCode} className="space-y-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="ENTER SPONSORSHIP VECTOR TOKEN"
                      value={inviteCode}
                      onChange={(e) => setInviteCode(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-2xl px-4 py-3 text-[10px] font-mono tracking-widest text-white tracking-widest uppercase placeholder:text-zinc-600 focus:outline-none focus:border-amber-500/50"
                    />
                    <button
                      type="submit"
                      className="absolute right-2.5 top-2 py-1.5 px-3 rounded-xl bg-purple-500 hover:bg-purple-600 border border-purple-400/20 font-mono text-[9px] font-bold text-white uppercase active:scale-95 transition-all"
                    >
                      Verify
                    </button>
                  </div>

                  {/* Authentication outcome logs */}
                  <AnimatePresence mode="wait">
                    {inviteStatus !== 'idle' && (
                      <motion.div
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className={cn(
                          "p-3 rounded-xl text-[8.5px] font-mono leading-relaxed border",
                          inviteStatus === 'authorized' 
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" 
                            : "bg-red-500/10 border-red-500/20 text-red-400"
                        )}
                      >
                        {inviteMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </div>

            </div>

          </div>

        </div>

        {/* CHRONICLES ARCHIVE TIMELINE (Horizontal Scrollable Carousel) */}
        <div className="space-y-6 text-left">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-purple-400 animate-spin-slow" />
            <span className="text-[9.5px] font-mono tracking-widest uppercase text-purple-400 font-bold">HISTORICAL CHRONICLES ARCHIVE</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CHRONICLES.map((cron, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-[32px] bg-zinc-950/45 border border-white/5 hover:border-white/10 relative overflow-hidden flex flex-col justify-between h-72 transition-all group backdrop-blur-md"
              >
                {/* Year tag indicator */}
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-display font-black text-white/5 tracking-tighter group-hover:text-white/15 transition-colors">
                    {cron.year}
                  </span>
                  <div className="px-3 py-1 bg-white/5 rounded-full border border-white/5 text-[8.5px] text-zinc-500 uppercase tracking-widest font-mono">
                    PHASE {idx + 1}
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <span className="text-[8px] font-mono tracking-widest uppercase font-bold text-amber-500 block">
                    {cron.era}
                  </span>
                  <h4 className="text-white text-xs font-semibold uppercase font-display leading-tight m-0">
                    {cron.focus}
                  </h4>
                  <p className="text-zinc-500 text-[10px] leading-relaxed font-mono m-0">
                    {cron.desc}
                  </p>
                </div>

                <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[8px] font-mono text-zinc-400 font-bold uppercase tracking-wider">
                  <span>Sync Record:</span>
                  <span className="text-[#7C3AED] leading-none">{cron.metric}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
