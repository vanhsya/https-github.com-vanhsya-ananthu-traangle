import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Instagram, Heart, MessageCircle, MapPin, Sparkles, AlertCircle, Share2, Check, ExternalLink, Calendar, Grid, Facebook, AtSign, Plus, Trash2, RotateCcw, Camera, UploadCloud } from 'lucide-react';
import { INSTAGRAM_FEED, InstagramPost } from '../data/creatorData';
import { soundEngine } from '../lib/audio';
import { cn } from '../lib/utils';

export default function InstagramCinema() {
  const [posts, setPosts] = useState<InstagramPost[]>(() => {
    const saved = localStorage.getItem('ANANTHU_INSTAGRAM_FEED');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback to initial
      }
    }
    return INSTAGRAM_FEED;
  });

  const [selectedPost, setSelectedPost] = useState<InstagramPost | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State Configuration
  const [showIntegrator, setShowIntegrator] = useState(false);
  const [newCaption, setNewCaption] = useState(
    "Broadcasting the ultimate visual paradigm. Every line, every shadow, and every luxury asset aligned to perfection. Presenting the pristine corporate alignment series under the sovereign Triangle."
  );
  const [newCategory, setNewCategory] = useState<InstagramPost['category']>("Corporate Alignments");
  const [newLocation, setNewLocation] = useState("Executive Penthouse Suite, Singapore");
  const [newImageUrl, setNewImageUrl] = useState("/input_file_1.png");
  const [customImageUrl, setCustomImageUrl] = useState("");
  const [newLikes, setNewLikes] = useState("184K");
  const [newComments, setNewComments] = useState("2.4K");
  const [newAspect, setNewAspect] = useState<"square" | "portrait">("portrait");
  
  const [isPublishing, setIsPublishing] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [errorText, setErrorText] = useState("");

  const handleCardHover = (id: string | null) => {
    setHoveredId(id);
    if (id) {
      soundEngine.playHover();
    }
  };

  const handleOpenPost = (post: InstagramPost) => {
    soundEngine.playClick();
    setSelectedPost(post);
  };

  const shareInstagram = (id: string) => {
    soundEngine.playClick();
    navigator.clipboard.writeText(`https://www.instagram.com/ananthu_ca_triangle/`);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Live submission handler
  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaption.trim()) {
      setErrorText("A majestic caption description is required.");
      return;
    }
    if (!newLocation.trim()) {
      setErrorText("A shoot location alignment is required.");
      return;
    }

    setErrorText("");
    setIsPublishing(true);
    soundEngine.playClick();

    setTimeout(() => {
      const finalImage = customImageUrl.trim() || newImageUrl;
      const formattedPost: InstagramPost = {
        id: `custom-post-${Date.now()}`,
        imageUrl: finalImage,
        caption: newCaption,
        date: "JUST NOW",
        likes: newLikes || "120K",
        comments: newComments || "1.3K",
        category: newCategory,
        location: newLocation,
        aspect: newAspect
      };

      const updatedPosts = [formattedPost, ...posts];
      setPosts(updatedPosts);
      localStorage.setItem('ANANTHU_INSTAGRAM_FEED', JSON.stringify(updatedPosts));

      setIsPublishing(false);
      setFormSuccess(true);
      soundEngine.playHover();

      // Reset standard field presets
      setNewCaption("New luxury synergy photoshoot treatment completed successfully. Architectural alignment achieved.");
      setCustomImageUrl("");

      setTimeout(() => {
        setFormSuccess(false);
        setShowIntegrator(false);
        const anchor = document.getElementById('sovereign-feed-anchor');
        if (anchor) {
          anchor.scrollIntoView({ behavior: 'smooth' });
        }
      }, 1500);

    }, 1400);
  };

  const handleResetFeed = () => {
    soundEngine.playClick();
    if (window.confirm("Revert dynamic feed to default original database? Custom posts will be erased.")) {
      setPosts(INSTAGRAM_FEED);
      localStorage.removeItem('ANANTHU_INSTAGRAM_FEED');
      soundEngine.playHover();
    }
  };

  return (
    <section id="instagram-portfolio" className="py-32 relative z-10 w-full overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-black border-y border-white/5">
      {/* Immersive glow highlights */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Profile Header Design */}
        <div className="glass-panel rounded-[40px] border-white/5 p-8 sm:p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 text-white/5 pointer-events-none">
            <Instagram className="w-48 h-48" />
          </div>

          <div className="flex flex-col lg:flex-row items-center lg:items-start gap-10 lg:gap-14 relative z-10">
            {/* Ava Frame */}
            <div className="relative">
              {/* Instagram Story Gradient Circle */}
              <div className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-amber-500 via-purple-600 to-indigo-600 animate-spin-slow" />
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full border-[5px] border-black overflow-hidden bg-neutral-900 shadow-2xl">
                <img 
                  referrerPolicy="no-referrer"
                  src="/input_file_1.png" 
                  alt="Ananthu CA Avatar" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Profile Statistics Block */}
            <div className="text-center lg:text-left space-y-6 flex-1">
              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <h2 className="text-3xl font-display font-bold tracking-tight text-white uppercase flex items-center gap-2">
                  ananthu_ca_triangle
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-500 text-white">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
                    </svg>
                  </span>
                </h2>
                
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  <a 
                    href="https://www.instagram.com/ananthu_ca_triangle/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-white/5 active:scale-95 transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5 text-white" />
                    <span>Instagram</span>
                  </a>
                  
                  <a 
                    href="https://www.threads.com/@ananthu_ca_triangle?xmt=AQG0V2zldSfCsBC54aG3SZUaqpBjH5hvbdWCdBUiIW171uc" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-white/5 active:scale-95 transition-all"
                  >
                    <AtSign className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Threads</span>
                  </a>

                  <a 
                    href="https://www.facebook.com/Ananthu.Ca.Triangle/?ref=NONE_xav_ig_profile_page_web#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => soundEngine.playClick()}
                    className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 border border-white/5 active:scale-95 transition-all"
                  >
                    <Facebook className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Facebook</span>
                  </a>

                  <button 
                    onClick={() => shareInstagram('profile')}
                    className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center border border-white/5"
                  >
                    {copiedId === 'profile' ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Verified Metrics Counter */}
              <div className="grid grid-cols-3 gap-6 py-6 border-y border-white/5 max-w-lg mx-auto lg:mx-0">
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-display font-black text-white">420+</div>
                  <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Posts Broadcast</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-display font-black text-gradient-purple">3.4M</div>
                  <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Followers</div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-3xl font-display font-black text-gradient-gold">19.4%</div>
                  <div className="text-[9px] uppercase tracking-widest text-gray-400 font-bold">Engagement Rate</div>
                </div>
              </div>

              <div className="space-y-2 text-sm sm:text-base leading-relaxed text-gray-400 max-w-2xl font-light">
                <div className="font-bold text-white uppercase tracking-wider text-xs">Ananthu CA • Visual Director • Triangle Universe</div>
                <p className="text-xs sm:text-sm">
                  Deconstructing the traditional creative boundaries. Delivering luxurious cinematic narratives, premium visual campaigns, and deep storytelling frameworks for global giants. Creator of the Triangle.
                </p>
                <div className="text-cyan-400 font-mono text-xs pt-1 flex items-center justify-center lg:justify-start gap-1">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Verified Creator Index: #092C-TRN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brand promotion banner */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-[32px] bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20 flex flex-col justify-between h-64 shadow-xl">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-widest text-amber-400 font-bold">Luxurious Alignment I</span>
              <h3 className="text-xl font-display font-medium text-white tracking-wide uppercase leading-snug">Elite Campaigns Promotion</h3>
              <p className="text-gray-400 text-xs">Unlock ultra fidelity 8K video content designed to dominate the organic algorithm feeds globally.</p>
            </div>
            <a href="#collaborations" className="text-amber-405 text-[10px] font-bold uppercase tracking-widest text-amber-400 hover:text-white transition-colors">Launch Synergy Deck</a>
          </div>

          <div className="p-8 rounded-[32px] bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/20 flex flex-col justify-between h-64 shadow-xl">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-widest text-purple-400 font-bold">Luxurious Alignment II</span>
              <h3 className="text-xl font-display font-medium text-white tracking-wide uppercase leading-snug">The Masterclass Series</h3>
              <p className="text-gray-400 text-xs">Private lectures on storytelling architectures, compositional grid alignment, and spatial sound designs.</p>
            </div>
            <button onClick={() => alert("Exquisite private masterclass portal broadcast pending invite verification!")} className="text-purple-400 text-left text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Request Invite Link</button>
          </div>

          <div className="p-8 rounded-[32px] bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/20 flex flex-col justify-between h-64 shadow-xl md:col-span-2 lg:col-span-1">
            <div className="space-y-2">
              <span className="text-[9px] uppercase tracking-widest text-cyan-400 font-bold">Luxurious Alignment III</span>
              <h3 className="text-xl font-display font-medium text-white tracking-wide uppercase leading-snug">Exclusive Creator Assets</h3>
              <p className="text-gray-400 text-xs">Custom cinematic lut tables, raw sound packs, and visual templates engineered to professional standards.</p>
            </div>
            <a href="#pathways" className="text-cyan-400 text-[10px] font-bold uppercase tracking-widest hover:text-white transition-colors">Download Media Booklet</a>
          </div>
        </div>

        {/* HIGHLY CUSTOMIZED DYNAMIC FORM AND INTEGRATOR BLOCK */}
        <div className="mb-20 glass-panel rounded-[40px] p-6 sm:p-12 border border-white/5 bg-zinc-950/60 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-b from-amber-500/10 to-transparent rounded-full blur-[100px] pointer-events-none" />
          
          <div className="max-w-4xl mx-auto space-y-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-white/5 pb-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <UploadCloud className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500 font-bold">SOVEREIGN GRAPHICS INTEGRATOR</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-medium text-white uppercase tracking-tight">
                  LIVE PORTFOLIO INSTAGRAM FORM
                </h3>
                <p className="text-gray-400 text-xs font-light">
                  Dynamically publish your custom photoshoots and celebrity promotional shoots directly to the live feed below.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setShowIntegrator(!showIntegrator);
                  }}
                  className="px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-[10px] uppercase tracking-wider hover:bg-amber-400 active:scale-95 transition-all flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{showIntegrator ? "Collapse Studio Form" : "Open Studio Form"}</span>
                </button>

                <button
                  onClick={handleResetFeed}
                  className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors border border-white/5"
                  title="Reset to Curated Originals"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            <AnimatePresence>
              {showIntegrator && (
                <motion.form
                  key="form-panel"
                  onSubmit={handlePublishPost}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 pt-2 overflow-hidden"
                >
                  {errorText && (
                    <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-mono flex items-center gap-2">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errorText}</span>
                    </div>
                  )}

                  {formSuccess && (
                    <div className="p-4 rounded-xl bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-xs font-mono flex items-center gap-2 animate-bounce">
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>POST RESOLVED AND BROADCASTED TO LIVE FEED SUCCESSFULLY!</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left details fields */}
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">1. Active Shoot Caption</label>
                        <textarea
                          rows={3}
                          value={newCaption}
                          onChange={(e) => setNewCaption(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 min-h-[90px] font-light leading-relaxed resize-none"
                          placeholder="Write the luxury framing story details..."
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">2. Shoot Location</label>
                          <input
                            type="text"
                            value={newLocation}
                            onChange={(e) => setNewLocation(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 font-light"
                            placeholder="e.g. Paris Fashion Week / Ritz-Carlton"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">3. Shoot Category</label>
                          <select
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value as any)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-xs text-white focus:outline-none focus:border-amber-400"
                          >
                            <option value="Corporate Alignments">Corporate Alignments</option>
                            <option value="Behind The Scenes">Behind The Scenes</option>
                            <option value="Cinematography">Cinematography</option>
                            <option value="Lifestyle">Lifestyle</option>
                            <option value="Masterclass">Masterclass</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">4. Simulated Likes</label>
                          <input
                            type="text"
                            value={newLikes}
                            onChange={(e) => setNewLikes(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white text-center focus:outline-none focus:border-amber-400 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">5. Comments qty</label>
                          <input
                            type="text"
                            value={newComments}
                            onChange={(e) => setNewComments(e.target.value)}
                            className="w-full bg-black/60 border border-white/10 rounded-xl p-3 text-xs text-white text-center focus:outline-none focus:border-amber-400 font-mono"
                          />
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">6. Aspect Ratio</label>
                          <div className="grid grid-cols-2 gap-1.5 h-[46px]">
                            <button
                              type="button"
                              onClick={() => { soundEngine.playClick(); setNewAspect("portrait"); }}
                              className={cn(
                                "rounded-lg text-[9px] font-mono uppercase tracking-wider text-center border font-bold transition-all",
                                newAspect === "portrait" ? "bg-amber-400/15 border-amber-400/40 text-amber-500" : "bg-black/40 border-white/5 text-gray-500 hover:text-white"
                              )}
                            >
                              3:4
                            </button>
                            <button
                              type="button"
                              onClick={() => { soundEngine.playClick(); setNewAspect("square"); }}
                              className={cn(
                                "rounded-lg text-[9px] font-mono uppercase tracking-wider text-center border font-bold transition-all",
                                newAspect === "square" ? "bg-amber-400/15 border-amber-400/40 text-amber-500" : "bg-black/40 border-white/5 text-gray-500 hover:text-white"
                              )}
                            >
                              1:1
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Image / Portrait Picker */}
                    <div className="space-y-4">
                      <div>
                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold mb-2">7. Align Portrait Image File Reference</span>
                        
                        <div className="grid grid-cols-4 gap-2.5">
                          {[
                            { name: "Executive Shot (Referenced)", url: "/input_file_1.png" },
                            { name: "Library", url: "/input_file_0.png" },
                            { name: "Chateau Wedding", url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800" },
                            { name: "Classic Porsche", url: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800" }
                          ].map((item, id) => (
                            <button
                              key={id}
                              type="button"
                              onClick={() => {
                                soundEngine.playClick();
                                setNewImageUrl(item.url);
                                setCustomImageUrl("");
                              }}
                              className={cn(
                                "relative aspect-square rounded-xl overflow-hidden border-2 transition-all bg-neutral-900 group",
                                newImageUrl === item.url && !customImageUrl
                                  ? "border-amber-400 scale-[1.02] shadow-xl"
                                  : "border-transparent opacity-65 hover:opacity-100"
                              )}
                              title={item.name}
                            >
                              <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                              <div className="absolute inset-0 bg-black/45 group-hover:bg-transparent transition-all flex items-end p-1">
                                <span className="text-[7.5px] font-mono text-white tracking-tighter truncate w-full block bg-black/80 px-1 py-0.5 rounded leading-none">{item.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-0.5">
                        <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest block font-bold">OR: PASTE ANY CUSTOM IMAGE URL</label>
                        <input
                          type="text"
                          value={customImageUrl}
                          onChange={(e) => setCustomImageUrl(e.target.value)}
                          className="w-full bg-black/60 border border-white/10 rounded-xl p-3.5 text-xs text-white placeholder-gray-600 focus:outline-none focus:border-amber-400 font-mono"
                          placeholder="https://images.unsplash.com/your-custom-image-url"
                        />
                      </div>

                      {/* Launch Submit Trigger */}
                      <button
                        type="submit"
                        disabled={isPublishing}
                        className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-mono text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-2 glow-gold disabled:opacity-50"
                      >
                        {isPublishing ? (
                          <>
                            <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            <span>Broadcasting To Media Stream...</span>
                          </>
                        ) : (
                          <>
                            <Camera className="w-4 h-4" />
                            <span>Deploy Shoot To Instagram Portfolio</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Simulated Instagram Content Grid */}
        <div id="sovereign-feed-anchor" className="space-y-8">
          <div className="flex items-center justify-between border-b border-white/5 pb-4">
            <div className="flex items-center gap-2">
              <Grid className="w-5 h-5 text-amber-400" />
              <h3 className="text-white font-mono text-[10px] uppercase tracking-[0.3em] font-bold">Sovereign Feed Sync (@ananthu_ca_triangle)</h3>
            </div>
            <span className="text-xs text-emerald-400 font-mono flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 py-1 px-3 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              Live API Connected
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {posts.map((post) => (
                <motion.div
                  key={post.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  onMouseEnter={() => handleCardHover(post.id)}
                  onMouseLeave={() => handleCardHover(null)}
                  onClick={() => handleOpenPost(post)}
                  className="group relative h-[450px] rounded-[32px] overflow-hidden cursor-pointer bg-neutral-900 border border-white/5 shadow-2xl transition-all hover:-translate-y-1.5 hover:border-amber-400/20 text-left"
                >
                  {/* Image */}
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                    style={{ backgroundImage: `url(${post.imageUrl})` }}
                  />
                  
                  {/* Luxury filters and overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-85 group-hover:via-black/50 transition-all opacity-90" />
                  <div className="absolute inset-0 bg-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                  {/* Vertical hover progress line */}
                  <div className="absolute bottom-4 left-6 right-6 h-[2px] bg-white/10 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-amber-500 to-purple-600"
                      animate={{ width: hoveredId === post.id ? '100%' : '0%' }}
                      transition={{ duration: hoveredId === post.id ? 2.2 : 0.3, ease: 'linear' }}
                    />
                  </div>

                  {/* Floating Meta badges */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-center bg-transparent z-10 pointer-events-none">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-black/75 border border-white/10 text-white text-[9px] uppercase tracking-widest font-mono rounded-full backdrop-blur-md">
                        {post.category}
                      </span>
                      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[9px] uppercase tracking-widest font-mono rounded-full flex items-center gap-1 backdrop-blur-md">
                        <MapPin className="w-2.5 h-2.5" />
                        {post.location.split(',')[0]}
                      </span>
                    </div>

                    {/* Delete button specifically visible on custom added posts for pristine admin experience */}
                    {post.id.startsWith('custom-') && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          soundEngine.playClick();
                          const filter = posts.filter(p => p.id !== post.id);
                          setPosts(filter);
                          localStorage.setItem('ANANTHU_INSTAGRAM_FEED', JSON.stringify(filter));
                        }}
                        className="p-2 bg-black/75 border border-white/10 text-rose-500 hover:bg-rose-500 hover:text-white rounded-full transition-all pointer-events-auto shadow-md"
                        title="Delete Custom Post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Content Overlay */}
                  <div className="absolute bottom-10 left-6 right-6 space-y-3 text-left">
                    <p className="text-gray-300 text-xs line-clamp-2 leading-relaxed font-light italic">
                      "{post.caption}"
                    </p>
                    
                    {/* Stats line */}
                    <div className="flex items-center gap-5 pt-3 border-t border-white/10 text-[11px] text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> {post.likes}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageCircle className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" /> {post.comments}
                      </span>
                      <span className="ml-auto text-gray-500 uppercase tracking-widest text-[9px]">
                        {post.date}
                      </span>
                    </div>
                  </div>

                  {/* Hover trigger effect icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100 bg-black/35">
                    <div className="w-14 h-14 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/50 flex items-center justify-center text-amber-400 shadow-2xl">
                      <Instagram className="w-6 h-6 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Detailed Post Lightbox Dialog */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-10 select-none overflow-y-auto"
            >
              {/* Outer clicking listener */}
              <div className="absolute inset-0 z-0" onClick={() => setSelectedPost(null)} />

              <div className="absolute top-6 right-6 z-10">
                <button
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedPost(null);
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
              <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 rounded-[40px] border border-white/10 overflow-hidden bg-zinc-950/80 shadow-2xl aspect-video max-h-[85vh] md:max-h-none h-auto">
                {/* Left block - Aspect Correct Image View */}
                <div className={cn(
                  "col-span-12 md:col-span-7 relative bg-black flex items-center justify-center",
                  selectedPost.aspect === 'square' ? 'aspect-square' : 'aspect-[3/4]'
                )}>
                  {/* Blurred back */}
                  <img 
                    src={selectedPost.imageUrl} 
                    alt="Background blur" 
                    className="absolute inset-0 w-full h-full object-cover blur-md opacity-30 select-none pointer-events-none"
                  />
                  
                  <img 
                    src={selectedPost.imageUrl} 
                    alt={selectedPost.category} 
                    className="relative z-10 max-h-[70vh] w-auto max-w-full object-contain"
                  />

                  {/* Lens Grading layer overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 mix-blend-color-dodge pointer-events-none z-10" />
                </div>

                {/* Right block - Detail Narratives */}
                <div className="col-span-12 md:col-span-5 p-8 sm:p-10 flex flex-col justify-between space-y-8 bg-zinc-950/60 text-left border-l border-white/5">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-neutral-900 border border-white/10">
                        <img src="/input_file_1.png" alt="Ananthu Logo" className="w-full h-full object-cover" />
                      </div>
                      <div className="text-left font-sans">
                        <h4 className="text-white text-xs font-bold uppercase tracking-wider">ananthu_ca_triangle</h4>
                        <span className="text-gray-500 text-[10px] font-mono flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-cyan-400" />
                          {selectedPost.location}
                        </span>
                      </div>
                    </div>

                    {/* Paragraph */}
                    <div className="space-y-4">
                      <span className="px-3 py-1 bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[9px] uppercase tracking-widest font-mono rounded-full font-bold">
                        {selectedPost.category} Sync
                      </span>
                      <p className="text-gray-300 text-xs sm:text-sm leading-relaxed font-light select-text">
                        {selectedPost.caption}
                      </p>
                    </div>
                  </div>

                  {/* Actions & Metrics Lock */}
                  <div className="space-y-5 pt-6 border-t border-white/5 font-mono">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-rose-500">
                        <Heart className="w-4 h-4 fill-rose-500" /> {selectedPost.likes} Loves
                      </span>
                      <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-cyan-400">
                        <MessageCircle className="w-4 h-4 fill-cyan-400" /> {selectedPost.comments}
                      </span>
                      <span className="text-[10px] text-gray-500">{selectedPost.date}</span>
                    </div>

                    <div className="flex gap-4">
                      <a 
                        href="https://www.instagram.com/ananthu_ca_triangle/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={() => soundEngine.playClick()}
                        className="flex-1 py-4.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-xs uppercase tracking-widest text-center hover:scale-105 active:scale-95 transition-all shadow-xl glow-gold block"
                      >
                        Interrogate Feed
                      </a>
                      <button
                        onClick={() => shareInstagram(selectedPost.id)}
                        className="px-5 rounded-2xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors flex items-center justify-center"
                      >
                        {copiedId === selectedPost.id ? <Check className="w-5 h-5 text-emerald-400" /> : <Share2 className="w-5 h-5" />}
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
