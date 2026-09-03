import React from 'react';
import { MapPin, Clock, ArrowUpRight, Star } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';

export default function PlaceCard({ place, onSelectPlace, isFeatured = false }) {
  const imageSearchQuery = place.imageQuery || `${place.name} ${place.location || ''}`;

  if (isFeatured) {
    return (
      <div
        onClick={() => onSelectPlace(place)}
        className="group relative rounded-3xl bg-slate-900/90 border border-amber-400/30 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/15 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 mb-8"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onSelectPlace(place)}
        aria-label={`View details for featured place: ${place.name}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[380px]">
          
          {/* FEATURED DYNAMIC IMAGE COLUMN */}
          <div className="lg:col-span-7 relative overflow-hidden bg-slate-950 min-h-[260px] lg:min-h-full">
            <ImageWithFallback
              query={imageSearchQuery}
              alt={place.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent pointer-events-none" />

            {/* FEATURED BADGE */}
            <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider shadow-lg">
              <Star className="w-3.5 h-3.5 fill-slate-950" />
              <span>MUST-SEE LANDMARK</span>
            </div>
          </div>

          {/* FEATURED CONTENT COLUMN */}
          <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between relative z-10">
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-xs font-semibold text-amber-300 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                  {place.category}
                </span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  {place.suggestedDuration}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-amber-300 transition-colors mb-2">
                {place.name}
              </h3>

              <p className="text-xs font-medium text-slate-400 flex items-center gap-1 mb-4">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{place.location}</span>
              </p>

              <p className="text-sm text-slate-300 leading-relaxed font-normal mb-6">
                {place.shortDescription}
              </p>

              {/* HIGHLIGHT MINI-PILLS */}
              <div className="flex flex-wrap gap-2 mb-6">
                {place.highlights.slice(0, 3).map((h, i) => (
                  <span
                    key={i}
                    className="text-[11px] font-medium text-slate-300 bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg"
                  >
                    ✨ {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-sm font-semibold text-amber-400 group-hover:text-amber-300">
              <span>Explore Place Details</span>
              <div className="w-8 h-8 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-all">
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // STANDARD PLACE CARD
  return (
    <div
      onClick={() => onSelectPlace(place)}
      className="group relative flex flex-col h-full rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/10 hover:border-white/25 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onSelectPlace(place)}
      aria-label={`View details for ${place.name}`}
    >
      {/* CARD DYNAMIC IMAGE */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        <ImageWithFallback
          query={imageSearchQuery}
          alt={place.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

        {/* CATEGORY TAG */}
        <div className="absolute top-3.5 left-3.5 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-amber-300 uppercase tracking-wider">
          {place.category}
        </div>

        {/* ARROW ICON */}
        <div className="absolute top-3.5 right-3.5 z-20 w-8 h-8 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-90 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all duration-300">
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* CARD BODY */}
      <div className="flex flex-col flex-grow p-6 justify-between">
        <div>
          <h4 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
            {place.name}
          </h4>

          <p className="text-xs font-medium text-slate-400 flex items-center gap-1 mb-3">
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>{place.location}</span>
          </p>

          <p className="text-sm text-slate-300 leading-relaxed line-clamp-2 font-normal">
            {place.shortDescription}
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400 group-hover:text-slate-200">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            {place.suggestedDuration}
          </span>
          <span className="font-semibold text-amber-400 flex items-center gap-1">
            Details <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}
