import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import DestinationExplorer from '../components/destinations/DestinationExplorer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT AREA */}
      <main className="flex-grow">
        {/* HERO SECTION WITH VIDEO LOOP & SCROLL INDICATOR */}
        <Hero />

        {/* DESTINATION EXPLORER SECTION */}
        <DestinationExplorer />
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-white/10 bg-[#06090f] text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} Travelia. Crafted for modern travel experiences.
          </p>
          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <a href="#explore" className="hover:text-amber-300 transition-colors">Destinations</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}
