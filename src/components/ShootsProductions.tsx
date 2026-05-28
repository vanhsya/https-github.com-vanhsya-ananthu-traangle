import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Sparkles, Star, Heart, Flame, Settings, Play, Check, ArrowRight, UserCheck, ShieldAlert, Award } from 'lucide-react';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

interface ShootProject {
  id: string;
  title: string;
  client: string;
  description: string;
  imgUrl: string;
  specs: string;
  location: string;
  highlights: string[];
  metrics: string;
  tag: string;
}

const CELEB_COLLABS: ShootProject[] = [
  {
    id: "collab-1",
    title: "The Sovereign Identity Campaign",
    client: "Ritz-Carlton x Elite Global Ambassadorship",
    description: "Multi-million dollar luxury campaign capturing the essence of modern royalty. Highly structured anamorphic sequences featuring brand ambassadors in Singapore, framed by dark marble and deep golden reflections.",
    imgUrl: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
    specs: "ARRI ALEXA 35 • COOKE ANAMORPHIC/F • RED GLOW FILTERS",
    location: "Sovereign Presidential Suite",
    highlights: ["Global Billboard Distribution", "4K HDR Dolby Vision Native", "8.2M Algorithm Reach"],
    metrics: "+420% Brand Luxury Recall",
    tag: "Celebrity Promotion"
  },
  {
    id: "collab-2",
    title: "Golden Hour Velocity Protocol",
    client: "Lamborghini Squadra Corse",
    description: "An elite promotional cinematic shoot integrating hyper-speed tracking vehicles with modern streetwear aesthetics. High contrast styling built to capture raw engine power and aerodynamic luxury.",
    imgUrl: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
    specs: "RED V-RAPTOR • 8K 120FPS • TILT-SHIFT GLASS",
    location: "Abu Dhabi Yas Marina Circuit",
    highlights: ["Sub-second motion scaling", "Visceral spatial soundscapes", "Exclusive preview events"],
    metrics: "2.4M Combined Organic Shares",
    tag: "High-End Collab"
  },
  {
    id: "collab-3",
    title: "Monochrome Majesty Series",
    client: "Haute Couture Editorial x K-Pop Icon",
    description: "Extravagant high-contrast black and white photoshoots documenting elite celebrity performance. Embracing heavy shadows, structured light nets, and sharp silver reflections.",
    imgUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    specs: "HASSELBLAD X2D • 100MP • COAXIAL SPOTLIGHTS",
    location: "Studio Zero, Seoul",
    highlights: ["Vogue cover issue priority", "Direct-to-digital spatial exhibits", "Sovereign NFT digital asset series"],
    metrics: "3.2M Social Thread Mentions",
    tag: "Luxury Celebrity"
  }
];

const PROFESSIONAL_SHOOTS: ShootProject[] = [
  {
    id: "shoot-1",
    title: "Cyberpunk Noir Editorial",
    client: "Architectural Digest x Cybernetic Wear",
    description: "Experimental photography exploration testing the outer boundaries of low light. Fusing glowing neon rain reflections with futuristic, high-tech carbon ensembles.",
    imgUrl: "https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800",
    specs: "LEICA M11 MONOCHROM • APO-SUMMICRON 50 • TRIPTYCH GRID",
    location: "Neon Alleys of Kabukicho, Tokyo",
    highlights: ["Sovereign light sculpting", "16-bit uncompressed grain profiles", "Atmospheric smoke dynamics"],
    metrics: "Awarded Cinematic Shoot of the Year",
    tag: "Professional Studio"
  },
  {
    id: "shoot-2",
    title: "Liquid Light & Metal Shards",
    client: "Aura Fine Jewelry Collective",
    description: "Macro studio photoshoot utilizing custom liquid prism elements to split high-intensity light beams across ultra-premium gemstone structures.",
    imgUrl: "https://images.unsplash.com/photo-1616448242690-b08bc25de03f?auto=format&fit=crop&q=80&w=800",
    specs: "PHANTOM FLEX 4K • 1000FPS SLOW • LAOWA MACRO PRO",
    location: "Triangle Soundstage A, Dubai",
    highlights: ["Perfect alignment math", "Hyper-resolved asset textures", "Subatomic visual focus layers"],
    metrics: "100% Client Satisfaction Index",
    tag: "Visual Masterpiece"
  }
];

const WEDDING_SHOOTS: ShootProject[] = [
  {
    id: "wedding-1",
    title: "The Chateau Legacy Symphony",
    client: "Sovereign Union of Royal Houses",
    description: "Haute-couture, editorial luxury wedding documentation. Merging traditional French elegance with absolute cinematic grandeur. Golden hour champagne toasts, trailing white silk, and raw emotional resonance.",
    imgUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800",
    specs: "ARRI ALEXA LF • COOKE ANAMORPHIC • 4K NATIVE NARRATIVE",
    location: "Chateau de Chantilly, France",
    highlights: ["Full length orchestral soundtrack", "Custom printed leather memory tome", "100-year digital permanence cloud"],
    metrics: "Featured in Vogue & Harper's Bazaar",
    tag: "Royal Editorial"
  },
  {
    id: "wedding-2",
    title: "Midnight Gondola Romance",
    client: "Elite Private Union Campaign",
    description: "A breathtaking twilight and midnight storytelling documentation in Venice. Deep shadows, ambient candle flickers on historical waters, and high-fashion editorial poses in custom designer attire.",
    imgUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&q=80&w=800",
    specs: "SONY VENICE 2 • ZEISS SUPREME PRIMES • LOW-LIGHT CHIP",
    location: "Grand Canal Palazzos, Venice",
    highlights: ["Atmospheric fog & boat tracking", "Custom candlelight color profiles", "Immersive audio architecture"],
    metrics: "Best Wedding Cinematography Premium nomination",
    tag: "Luxury Destination"
  },
  {
    id: "wedding-3",
    title: "Amber Dunes Eternal Vows",
    client: "Desert Oasis Legacy Celebration",
    description: "An awe-inspiring, isolated desert-dune sunset ceremony. Visual elements include giant beige fabrics floating in high winds, glowing orange horizon lines, and stunning dynamic drone captures.",
    imgUrl: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=800",
    specs: "DJI INSPIRE 3 • 8K PRORES RAW • STABILIZED ANAMORPHIC",
    location: "Sovereign Desert Dunes, Oman",
    highlights: ["Sunset tracking from 400ft", "Multi-cam synchronized angles", "Sovereign visual master grading"],
    metrics: "Over 45 Million Organic Views",
    tag: "Epic Wilderness"
  }
];

export default function ShootsProductions() {
  const [activeCategory, setActiveCategory] = useState<'collab' | 'professional' | 'wedding'>('collab');
  const [selectedProject, setSelectedProject] = useState<ShootProject | null>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  // Creative Treatment Interactive State
  const [shootStyle, setShootStyle] = useState('High-Society Elite');
  const [shootScale, setShootScale] = useState('Celebrity Campaign');
  const [shootGear, setShootGear] = useState('Medium Format Cinema');
  const [calculating, setCalculating] = useState(false);
  const [treatmentOutput, setTreatmentOutput] = useState<any>(null);

  const handleInteractiveHover = () => {
    soundEngine.playHover();
  };

  const selectCat = (cat: 'collab' | 'professional' | 'wedding') => {
    soundEngine.playClick();
    setActiveCategory(cat);
  };

  const viewProject = (proj: ShootProject) => {
    soundEngine.playClick();
    setSelectedProject(proj);
  };

  const generateTreatment = () => {
    soundEngine.playClick();
    setCalculating(true);
    setTreatmentOutput(null);
    setTimeout(() => {
      setCalculating(false);
      // Premium algorithm logic for custom creative setups
      let camera = "ARRI ALEXA 35 (Sovereign Package)";
      let lens = "Cooke Anamorphics Elite 2X Prime Bundle";
      let crew = "18 Elite Members (Director, DP, 1st AC, Key Grip, Gaffer, Location Scout, Hair & Makeup, Stylists)";
      let light = "Profoto Pro-11 High-Speed Nodes & Custom Diffusion Silk Sails";
      let delivery = "14 Business Days - Raw + Fully Graded 8K DCI Files + Immersive Spatial Sound Pack";

      if (shootStyle === 'Cyberpunk Noir') {
        camera = "RED V-Raptor 8K VV + Low-Light Sensor Tuning";
        lens = "Atlas Orion Anamorphic Glass Custom Set";
        light = "Deity LED Arrays with procedural RGB flickering controls";
      } else if (shootStyle === 'Editorial Fine-Art') {
        camera = "Hasselblad H6D-100c + 100MP Medium Format Back";
        lens = "HC high-speed lenses (APO graded)";
        light = "Natural ambient light modifiers + Single Profoto custom B10X Node";
      }

      if (shootGear === 'Hasselblad Medium Format') {
        camera = "Hasselblad X2D 100C High Fidelity System";
        lens = "XCD premium f/2.5 lenses";
      } else if (shootGear === 'Leica Legendary M') {
        camera = "Leica M11 Monochrom and M11-P Systems";
        lens = "50mm APO Summicron f/2.0 + 35mm Summilux f/1.4";
      }

      if (shootScale === 'Royal Wedding Union') {
        crew = "24 Specialized Personnel including Multi-Camera DPs, Drone Flight Command, and Legacy Wedding curators";
        delivery = "28 Business Days - Gold Level Leather Tome, Cine-Documentary Feature (120 mins), Teaser Reel, Spatial Audio";
      }

      setTreatmentOutput({
        camera,
        lens,
        crew,
        light,
        delivery,
        keyCue: `${shootStyle.toUpperCase()} // ${shootScale.toUpperCase()} // RESOLVED BY TRIANGLE NETWORK`
      });
      soundEngine.playHover();
    }, 1500);
  };

  const getProjects = () => {
    if (activeCategory === 'collab') return CELEB_COLLABS;
    if (activeCategory === 'professional') return PROFESSIONAL_SHOOTS;
    return WEDDING_SHOOTS;
  };

  return (
    <section id="ecosystem" className="py-32 relative z-10 w-full overflow-hidden bg-black border-b border-white/5">
      {/* Immersive radial glows */}
      <div className="absolute top-0 right-1/4 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Head Block */}
        <div className="text-center space-y-4 mb-20 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-[0.25em] animate-pulse">
            <Flame className="w-3.5 h-3.5 text-amber-500" />
            <span>High-End Production Studio</span>
          </div>
          
          <h2 className="text-5xl sm:text-6xl font-display font-black tracking-tight text-white uppercase leading-tight">
            PRODUCTIONS & <span className="text-gradient-purple font-black">SHOOTS VAULT</span>
          </h2>
          
          <p className="text-gray-400 text-sm sm:text-base font-light leading-relaxed">
            Delivering cinematic excellence across the trifecta of visual storytelling: exclusive celebrity promotions, elite professional photoshoots, and legendary destination marriages. Inspired by absolute mathematical layout precision.
          </p>
        </div>

        {/* Premium Production Category Selector Tabs */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16 max-w-4xl mx-auto">
          <button
            onClick={() => selectCat('collab')}
            onMouseEnter={handleInteractiveHover}
            className={cn(
              "w-full sm:w-auto px-8 py-4.5 rounded-2xl font-mono text-[10px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2",
              activeCategory === 'collab'
                ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-500/30 font-bold glow-purple"
                : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>I. Celebrity & Promotional Collabs</span>
          </button>

          <button
            onClick={() => selectCat('professional')}
            onMouseEnter={handleInteractiveHover}
            className={cn(
              "w-full sm:w-auto px-8 py-4.5 rounded-2xl font-mono text-[10px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2",
              activeCategory === 'professional'
                ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white border-amber-400/30 font-bold glow-gold"
                : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <Camera className="w-4 h-4 text-cyan-400" />
            <span>II. Professional Photoshoots & Videos</span>
          </button>

          <button
            onClick={() => selectCat('wedding')}
            onMouseEnter={handleInteractiveHover}
            className={cn(
              "w-full sm:w-auto px-8 py-4.5 rounded-2xl font-mono text-[10px] uppercase tracking-widest border transition-all flex items-center justify-center gap-2",
              activeCategory === 'wedding'
                ? "bg-gradient-to-r from-teal-500 to-emerald-600 text-white border-teal-500/30 font-bold glow-teal"
                : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
            )}
          >
            <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
            <span>III. Royal Weddings & Marriages</span>
          </button>
        </div>

        {/* Dynamic Project Grid displaying the curated shoots */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          <AnimatePresence mode="popLayout">
            {getProjects().map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  soundEngine.playHover();
                }}
                onMouseLeave={() => setHoveredProjectId(null)}
                className="group relative h-[500px] rounded-[36px] overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 flex flex-col justify-end p-8 shadow-2xl hover:border-white/20 transition-all duration-300"
              >
                {/* Background image container with subtle parallax zoom */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-100 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.imgUrl})` }}
                />
                
                {/* Visual grading layers */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent opacity-90 group-hover:via-black/45 transition-all" />
                <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/10 via-amber-500/5 to-transparent mix-blend-color-dodge opacity-80 pointer-events-none" />

                {/* Floating tags */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="px-3.5 py-1.5 rounded-full bg-black/65 border border-white/10 text-white font-mono text-[9px] uppercase tracking-[0.2em] backdrop-blur-md">
                    {project.tag}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 font-bold font-mono text-[9px] tracking-wider">
                    {project.location.split(',')[0]}
                  </span>
                </div>

                {/* Main information content block */}
                <div className="relative z-10 space-y-4">
                  <div className="space-y-1.5 text-left">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#7C3AED] leading-none block font-black">
                      {project.client}
                    </span>
                    <h3 className="text-2xl font-display font-medium text-white uppercase tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <p className="text-gray-400 text-xs font-light leading-relaxed line-clamp-2 text-left">
                    {project.description}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[9px] font-mono text-gray-500 tracking-[0.2em]">
                      {project.specs.split('•')[0]}
                    </span>
                    
                    <button 
                      onClick={() => viewProject(project)}
                      className="px-4.5 py-2 rounded-full bg-white/10 hover:bg-white text-white hover:text-black font-mono text-[9px] uppercase tracking-widest font-black transition-all flex items-center gap-1.5 border border-white/5 active:scale-95"
                    >
                      <span>Explore Spec</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                {/* Interactive scale line showing alignment progress */}
                <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/5">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-purple-500 via-amber-500 to-teal-500"
                    animate={{ width: hoveredProjectId === project.id ? '100%' : '0%' }}
                    transition={{ duration: hoveredProjectId === project.id ? 2.5 : 0.3 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* HIGH-LEVEL INTERACTIVE COMPONENT: Dynamic Treatment customulator */}
        <div id="treatment-builder" className="glass-panel rounded-[40px] p-8 sm:p-14 border border-white/5 relative overflow-hidden bg-gradient-to-b from-zinc-950/60 to-black/80">
          {/* Inner vector patterns */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Setting controller parameters (Left) */}
            <div className="lg:col-span-6 space-y-8 text-left">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-amber-400 animate-spin-slow" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold">SOVEREIGN CONFIGURATOR v1.9</span>
                </div>
                <h3 className="text-3xl font-display font-medium text-white uppercase tracking-tight m-0">
                  DEVELOP YOUR VISUAL TREATMENT
                </h3>
                <p className="text-gray-400 text-xs font-light leading-relaxed">
                  Tailor-make or configure the technical setup parameters for your upcoming professional shoot, elite campaign promotion, or royal wedding union.
                </p>
              </div>

              {/* Selector 1: Artistic Direction ThemeStyle */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">1. SELECT ARTISTIC THEME STYLE</span>
                <div className="grid grid-cols-3 gap-3">
                  {['High-Society Elite', 'Cyberpunk Noir', 'Editorial Fine-Art'].map((style) => (
                    <button
                      key={style}
                      onClick={() => { soundEngine.playClick(); setShootStyle(style); }}
                      className={cn(
                        "py-3 px-1 rounded-xl font-mono text-[9px] uppercase tracking-wider text-center border transition-all truncate",
                        shootStyle === style
                          ? "bg-amber-500/10 border-amber-500/40 text-amber-400 font-bold"
                          : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {style}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 2: Scope & Scaling */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">2. SELECT PRODUCTION SCALE AND TARGET</span>
                <div className="grid grid-cols-3 gap-3">
                  {['Celebrity Campaign', 'Professional Shoot', 'Royal Wedding Union'].map((scale) => (
                    <button
                      key={scale}
                      onClick={() => { soundEngine.playClick(); setShootScale(scale); }}
                      className={cn(
                        "py-3 px-1 rounded-xl font-mono text-[9px] uppercase tracking-wider text-center border transition-all truncate",
                        shootScale === scale
                          ? "bg-purple-500/10 border-purple-500/40 text-purple-400 font-bold"
                          : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {scale.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Selector 3: Camera Optics System */}
              <div className="space-y-3">
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest block font-bold">3. SELECT HARDWARE MEDIUM/OPTICS</span>
                <div className="grid grid-cols-3 gap-3">
                  {['Arri Anamorphic', 'Hasselblad Medium Format', 'Leica Legendary M'].map((gear) => (
                    <button
                      key={gear}
                      onClick={() => { soundEngine.playClick(); setShootGear(gear); }}
                      className={cn(
                        "py-3 px-1 rounded-xl font-mono text-[9px] uppercase tracking-wider text-center border transition-all truncate",
                        shootGear === gear
                          ? "bg-teal-500/10 border-teal-500/40 text-teal-400 font-bold"
                          : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                      )}
                    >
                      {gear.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate treatment trigger button */}
              <button
                onClick={generateTreatment}
                disabled={calculating}
                className="w-full py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 to-purple-600 text-white font-mono text-[10px] font-bold uppercase tracking-wider hover:opacity-95 transition-all flex items-center justify-center gap-2 glow-gold disabled:opacity-50 active:scale-95"
              >
                {calculating ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    <span>Syncing Mathematical Alignment...</span>
                  </>
                ) : (
                  <>
                    <span>Compile Photographic Treatment</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                  </>
                )}
              </button>
            </div>

            {/* Calculated Blueprint Output (Right) */}
            <div className="lg:col-span-6 bg-black/45 border border-white/5 rounded-[32px] p-8 md:p-10 text-left min-h-[420px] flex flex-col justify-between relative">
              
              <AnimatePresence mode="wait">
                {treatmentOutput ? (
                  <motion.div
                    key="output"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    className="space-y-6 flex-1 flex flex-col justify-between"
                  >
                    <div className="space-y-5">
                      <div className="flex items-center justify-between border-b border-white/5 pb-3">
                        <span className="text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/25">
                          <Check className="w-3 h-3 text-emerald-400" />
                          ALIGNED SUCCESSFULLY
                        </span>
                        <span className="text-[9px] font-mono text-gray-500 uppercase">INDEX_09X-B</span>
                      </div>

                      <div className="space-y-4 font-mono text-xs">
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-bold mb-1">SOVEREIGN IMAGER</span>
                          <span className="text-white text-sm font-semibold">{treatmentOutput.camera}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-bold mb-1">OPTICS & COAXIAL ENHANCEMENT</span>
                          <span className="text-amber-400 text-sm font-semibold">{treatmentOutput.lens}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-bold mb-1">CREATIVE ENSEMBLE/CREW</span>
                          <span className="text-white text-sm font-light leading-relaxed block">{treatmentOutput.crew}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-bold mb-1">LIGHTING GRID</span>
                          <span className="text-purple-400 font-light text-sm">{treatmentOutput.light}</span>
                        </div>
                        <div>
                          <span className="text-gray-500 text-[10px] uppercase tracking-wider block font-bold mb-1">ESTIMATED EXCLUSIVITY RELEASE</span>
                          <span className="text-teal-400 font-bold text-sm">{treatmentOutput.delivery}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
                      <span className="text-[8px] font-mono text-gray-500 uppercase tracking-widest">
                        {treatmentOutput.keyCue}
                      </span>
                      <a
                        href="#collaborations"
                        onClick={() => soundEngine.playClick()}
                        className="px-5 py-2.5 rounded-full bg-white text-black font-semibold text-[9px] uppercase tracking-widest hover:bg-amber-400 hover:text-black hover:font-bold transition-all block text-center"
                      >
                        Secure Date Slate
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center space-y-4"
                  >
                    <div className="w-16 h-16 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-gray-500">
                      <Camera className="w-7 h-7" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-xs uppercase tracking-wider">Awaiting Creative Alignment</h4>
                      <p className="text-gray-500 text-xs font-light max-w-xs mx-auto leading-relaxed pt-1.5">
                        Configure the parameters on the left and compile to generate a custom, premium photographic specsheet.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* Detailed Project SPECIFICATION MODAL LIGHTBOX */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-3xl flex items-center justify-center p-4 sm:p-10 select-none overflow-y-auto"
            >
              <div className="absolute inset-0 z-0" onClick={() => setSelectedProject(null)} />

              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedProject(null);
                  }}
                  className="p-3.5 rounded-full bg-white/5 border border-white/10 text-gray-400 hover:text-white transition-all hover:scale-105 active:scale-95"
                >
                  <svg viewBox="0 0 24 24" className="w-6 h-6 stroke-current" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              {/* Theater Layout */}
              <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-[40px] border border-white/10 overflow-hidden bg-zinc-950/80 shadow-2xl h-auto">
                {/* Image block side */}
                <div className="col-span-12 md:col-span-7 relative bg-black aspect-video md:aspect-auto md:min-h-[550px] flex items-center justify-center">
                  <img src={selectedProject.imgUrl} alt={selectedProject.title} className="absolute inset-0 w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent z-10" />
                  
                  <div className="absolute bottom-8 left-8 z-20 text-left space-y-1">
                    <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-widest bg-black/75 px-3 py-1 rounded-full border border-white/10">{selectedProject.tag}</span>
                    <h4 className="text-white text-3xl font-display uppercase font-bold tracking-tight">{selectedProject.title}</h4>
                  </div>
                </div>

                {/* Technical Specifications specs and highlights list side */}
                <div className="col-span-12 md:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-zinc-950/60 text-left border-l border-white/5">
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <span className="text-gray-500 font-mono text-[9px] uppercase tracking-widest block font-bold leading-none">THE BRAND/CLIENT UNION</span>
                      <h4 className="text-white text-xl uppercase font-semibold m-0">{selectedProject.client}</h4>
                      <span className="text-gray-500 text-[10px] font-mono block">STAGE LOCATION: {selectedProject.location}</span>
                    </div>

                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light select-text">
                      {selectedProject.description}
                    </p>

                    <div className="space-y-3 pt-4 border-t border-white/5">
                      <span className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.2em] block font-bold">PROJECT METRICS DIRECT</span>
                      <div className="p-4 rounded-2xl bg-white/5 border border-white/5 font-mono text-emerald-400 text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-emerald-400" />
                        {selectedProject.metrics}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <span className="text-gray-500 font-mono text-[9px] uppercase tracking-[0.2em] block font-bold">KEY PRODUCTION HIGHLIGHTS</span>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.highlights.map((h, index) => (
                          <span key={index} className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 font-mono text-[10px] uppercase tracking-wide">
                            • {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/5 font-mono space-y-4">
                    <div className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
                      <span>OPTICS SPECIFICATION: {selectedProject.specs}</span>
                    </div>

                    <div className="flex gap-4">
                      <button
                        onClick={() => {
                          soundEngine.playClick();
                          setSelectedProject(null);
                          const col = document.getElementById('collaborations');
                          if (col) col.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="flex-1 py-4.5 rounded-2xl bg-white hover:bg-amber-400 text-black font-bold text-xs uppercase tracking-widest text-center transition-all block"
                      >
                        Inquire Treatment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
