import React from 'react';
import { Compass, Globe, MapPin, Mountain, Sun, Waves, Sparkles, ArrowUpRight } from 'lucide-react';

export default function TeaserSection() {
  const teaserCategories = [
    {
      icon: Waves,
      title: 'Coastal Escapes',
      tag: 'Sun & Ocean',
      gradient: 'from-blue-500/20 via-cyan-500/10 to-transparent',
      border: 'hover:border-cyan-500/40',
    },
    {
      icon: Mountain,
      title: 'Alpine Sanctuaries',
      tag: 'High Altitude',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      border: 'hover:border-amber-500/40',
    },
    {
      icon: Globe,
      title: 'Iconic Cities',
      tag: 'Culture & Life',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      border: 'hover:border-emerald-500/40',
    },
  ];

  return (
    <section
      id="teaser"
      className="relative w-full py-28 md:py-36 bg-gradient-to-b from-[#080c14] via-[#0b101c] to-[#080c14] border-t border-white/5 overflow-hidden"
    >
      {/* BACKGROUND ACCENT GLOWS */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* HEADER AREA */}
        <div className="max-w-3xl mx-auto text-center">
          
          {/* SMALL LABEL */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPLORE THE WORLD</span>
          </div>

          {/* LARGE HEADING */}
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight serif-title mb-6 leading-tight">
            Find a place worth remembering<span className="text-amber-400">.</span>
          </h2>

          {/* SHORT DESCRIPTION */}
          <p className="text-lg sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            From iconic cities to quiet escapes, discover destinations that match the way you want to travel.
          </p>

        </div>

        {/* ELEGANT TEASER PLACEHOLDER CARDS FOR FUTURE EXPANSION */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {teaserCategories.map((cat, index) => {
            const IconComponent = cat.icon;
            return (
              <div
                key={cat.title}
                className={`group relative rounded-2xl bg-slate-900/60 border border-white/10 p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/5 ${cat.border} overflow-hidden`}
              >
                {/* CARD INNER GRADIENT GLOW */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div className="relative z-10 flex flex-col justify-between h-full min-h-[180px]">
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-amber-400 group-hover:border-amber-400 transition-all duration-300">
                        <IconComponent className="w-6 h-6 text-amber-400 group-hover:text-slate-950 transition-colors duration-300" />
                      </div>
                      <span className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {cat.tag}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors">
                      {cat.title}
                    </h3>
                  </div>

                  <div className="pt-6 flex items-center justify-between border-t border-white/5 text-xs text-slate-400 group-hover:text-slate-200">
                    <span className="font-medium">Curated Experiences</span>
                    <ArrowUpRight className="w-4 h-4 text-amber-400/70 group-hover:text-amber-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* SUBTLE CALLOUT FOOTNOTE */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>More destinations and custom itinerary planning launching soon.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
