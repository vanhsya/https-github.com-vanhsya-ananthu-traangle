// Elegant cinematic dataset for Ananthu CA Triangle

export interface ReelItem {
  id: string;
  title: string;
  category: string;
  duration: string;
  views: string;
  likes: string;
  engagement: string;
  coverImage: string;
  narrative: string;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  caption: string;
  date: string;
  likes: string;
  comments: string;
  category: "Behind The Scenes" | "Corporate Alignments" | "Cinematography" | "Lifestyle" | "Masterclass";
  location: string;
  aspect: "square" | "portrait";
}

export const INSTAGRAM_FEED: InstagramPost[] = [
  {
    id: "ig-boardroom",
    imageUrl: "/input_file_1.png",
    caption: "The corporate director's desk is where high-concept treatments translate into massive market scaling. Blending three-piece sophistication with aggressive visual distribution networks for ultimate brand dominance.",
    date: "2 HOURS AGO",
    likes: "84K",
    comments: "1.2K",
    category: "Corporate Alignments",
    location: "Executive Penthouse Suite, Singapore",
    aspect: "portrait"
  },
  {
    id: "ig-library",
    imageUrl: "/input_file_0.png",
    caption: "Drafting the visual blueprint for Porsche's upcoming hybrid campaign. Every frame, every sequence, every dynamic transition must align with absolute mathematical precision. Space, time, and luxury under one unified Triangle.",
    date: "1 DAY AGO",
    likes: "142K",
    comments: "3.4K",
    category: "Masterclass",
    location: "Sovereign Cinematic Library",
    aspect: "square"
  },
  {
    id: "ig-tokyo",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deceeaf7?auto=format&fit=crop&q=80&w=800",
    caption: "Midnight scouting in Shinjuku. Challenging the limits of low-light anamorphic glass. When neon flares pierce the shadows, poetry is born.",
    date: "3 DAYS AGO",
    likes: "95K",
    comments: "810",
    category: "Cinematography",
    location: "Shinjuku district, Tokyo",
    aspect: "portrait"
  },
  {
    id: "ig-canyon",
    imageUrl: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800",
    caption: "Chasing gold gradients at 6,000 RPM. Speed and light are the primary fuels of cinematic storytelling. A breathtaking twilight session with the Porsche classic 911.",
    date: "1 WEEK AGO",
    likes: "210K",
    comments: "4.5K",
    category: "Lifestyle",
    location: "Malibu Canyon Pass, CA",
    aspect: "portrait"
  },
  {
    id: "ig-studio",
    imageUrl: "https://images.unsplash.com/photo-1518156677180-95a2893f3e9f?auto=format&fit=crop&q=80&w=800",
    caption: "On set with Apple Vision Pro engineers. Fine-tuning our custom spatial audio templates to produce visceral, chest-vibrating physical resonance. The future of content isn't seen; it's experienced.",
    date: "2 WEEKS AGO",
    likes: "115K",
    comments: "1.9K",
    category: "Behind The Scenes",
    location: "Apple Developer Academy",
    aspect: "square"
  }
];

export const REELS: ReelItem[] = [
  {
    id: "r1",
    title: "The Silent Symphony of Ladakh",
    category: "Cinematic",
    duration: "1:24",
    views: "2.4M",
    likes: "450K",
    engagement: "18.4%",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=800",
    narrative: "An exploratory cinematic masterpiece highlighting Ladakh's deep silence, captured through hyper-stabilized drone tracks, raw anamorphic lenses, and procedural audio designs."
  },
  {
    id: "r2",
    title: "A Porsche 911 Midnight Run",
    category: "Travel",
    duration: "0:59",
    views: "4.8M",
    likes: "820K",
    engagement: "21.1%",
    coverImage: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?auto=format&fit=crop&q=80&w=800",
    narrative: "An adrenaline-fueled visual profile of the classic 911 carving canyons in twilight shadows. Cinematic sound design combined with speed-gradient transition templates."
  },
  {
    id: "r3",
    title: "Living in 2050: Tokyo Odyssey",
    category: "Storytelling",
    duration: "2:04",
    views: "1.9M",
    likes: "390K",
    engagement: "15.8%",
    coverImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800",
    narrative: "A deeply philosophical narrative mapping futuristic human-cybernetic coexistence. Directed and sound-designed specifically to evoke existential wonder."
  },
  {
    id: "r4",
    title: "Perfect Light: Portrait of an Artist",
    category: "Lifestyle",
    duration: "1:15",
    views: "3.2M",
    likes: "612K",
    engagement: "19.2%",
    coverImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800",
    narrative: "An intimate, beautifully graded profile tracking a contemporary luxury designer in raw, unscripted moments using real-time atmospheric focus pulls."
  },
  {
    id: "r5",
    title: "Borders of Sand: Sahara Nomads",
    category: "Travel",
    duration: "1:40",
    views: "1.1M",
    likes: "210K",
    engagement: "14.3%",
    coverImage: "https://images.unsplash.com/photo-1547234935-80c7145ec969?auto=format&fit=crop&q=80&w=800",
    narrative: "Award-winning travel documentary highlighting ancestral dunes and Sahara tribes. Captured completely with dynamic ambient light and high-fidelity sound synthesis."
  },
  {
    id: "r6",
    title: "Chasing Shadows: Neo Noir Cyberpunk",
    category: "Viral",
    duration: "0:45",
    views: "6.7M",
    likes: "1.4M",
    engagement: "24.5%",
    coverImage: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&q=80&w=800",
    narrative: "A high-octane visual dynamic short integrating glowing rain reflections, silver-chrome cybernetic elements, and heavy bass transition drops."
  }
];

export const BRANDS = [
  { name: "Porsche", logo: "porsche", scale: "luxury" },
  { name: "Leica Camera", logo: "leica", scale: "obsidian" },
  { name: "Apple Vision Pro", logo: "apple", scale: "spatial" },
  { name: "Nike Vision", logo: "nike", scale: "athletic" },
  { name: "Sony Alpha", logo: "sony", scale: "cinematic" }
];

export const STATS = [
  { label: "Global Audience", count: "3.4M+", rate: "+18.4% MoM" },
  { label: "Monthly Impressions", count: "48.2M", rate: "+31.2% MoM" },
  { label: "Avg Engagement", count: "19.4%", rate: "3x Competitors" },
  { label: "Successful Campaigns", count: "420+", rate: "100% Brand NPS" }
];

export const REVIEWS = [
  {
    author: "Global Brand Director, Porsche",
    text: "Ananthu doesn't just produce content; he constructs cinematic universes that elevate automobiles into legendary visual art.",
    project: "911 Canyon Campaign"
  },
  {
    author: "VP of Creative & Spatial Media, Apple",
    text: "His mastery over vertical visual dynamics and immersive spatial soundscapes is unparalleled. He sets new benchmarks of quality.",
    project: "Vision Pro Launch Video"
  },
  {
    author: "Head of Influencer Marketing, Leica Camera",
    text: "He is the ultimate creative ally. A perfect hybrid of high-level director and highly engaging modern icon.",
    project: "M11 Monochrom Campaign"
  }
];
