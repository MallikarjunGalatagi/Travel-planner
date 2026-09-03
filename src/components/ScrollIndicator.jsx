import React from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator() {
  const handleScrollClick = (e) => {
    e.preventDefault();
    const teaserElement = document.getElementById('teaser');
    if (teaserElement) {
      teaserElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-center animate-fade-in delay-500">
      <button
        onClick={handleScrollClick}
        className="group inline-flex flex-col items-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 p-2 rounded-lg transition-opacity duration-300 hover:opacity-100 opacity-80"
        aria-label="Scroll to explore content below"
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-300 group-hover:text-amber-300 transition-colors">
          SCROLL TO EXPLORE
        </span>
        
        <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/15 flex items-center justify-center animate-float-bounce group-hover:bg-white/20 group-hover:border-amber-400/50 transition-colors">
          <ChevronDown className="w-4 h-4 text-slate-200 group-hover:text-amber-300 transition-colors" />
        </div>
      </button>
    </div>
  );
}
