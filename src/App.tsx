/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import NavbarCinema from './components/NavbarCinema';
import HeroCinema from './components/HeroCinema';
import ReelsShowcase from './components/ReelsShowcase';
import CreatorOS from './components/CreatorOS';
import AboutCinema from './components/AboutCinema';
import ShootsProductions from './components/ShootsProductions';
import InstagramCinema from './components/InstagramCinema';
import MediaKitCinema from './components/MediaKitCinema';
import CampaignSimulator from './components/CampaignSimulator';
import ReviewCinema from './components/ReviewCinema';
import ArtExhibition from './components/ArtExhibition';
import FooterCinema from './components/FooterCinema';
import RedirectPortal from './components/RedirectPortal';
import { AnimatePresence } from 'motion/react';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [redirectUrl, setRedirectUrl] = useState<string | null>(null);

  // Global listener to capture all external redirections and render the premium portal
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      let target = e.target as HTMLElement | null;
      while (target && target !== document.body) {
        if (target.tagName === 'A') {
          const href = target.getAttribute('href');
          // If it is a real outbound absolute URL
          if (
            href && 
            (href.startsWith('http://') || href.startsWith('https://')) && 
            !href.includes(window.location.hostname)
          ) {
            e.preventDefault();
            setRedirectUrl(href);
            break;
          }
        }
        target = target.parentElement;
      }
    };
    
    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <div id="root" className="min-h-screen relative text-white bg-black select-none selection:bg-amber-500/30">
      {/* Cinematic dark scanning noise or backgrounds */}
      <div className="fixed inset-0 bg-noise opacity-[0.035] pointer-events-none z-[90]" />
      
      {loading ? (
        <Preloader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <NavbarCinema />
          
          <main>
            <HeroCinema />
            <ReelsShowcase />
            <CreatorOS />
            <AboutCinema />
            <ShootsProductions />
            <InstagramCinema />
            <MediaKitCinema />
            <CampaignSimulator />
            <ReviewCinema />
            <ArtExhibition />
          </main>

          <FooterCinema />

          {/* Majestic Redirect Channel Gateway */}
          <AnimatePresence mode="wait">
            {redirectUrl && (
              <RedirectPortal 
                url={redirectUrl} 
                onClose={() => setRedirectUrl(null)} 
              />
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

