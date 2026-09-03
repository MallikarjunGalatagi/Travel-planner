import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, ArrowUpRight, Navigation } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';
import { useLocationContext } from '../../context/LocationContext';
import { calculateDistanceKm } from '../../services/locationApi';

export default function DestinationCard({ destination }) {
  const { location } = useLocationContext();

  // Compute proximity distance if user location is set
  let distanceKm = null;
  if (location && location.latitude && location.longitude && destination.coordinates) {
    distanceKm = calculateDistanceKm(
      location.latitude,
      location.longitude,
      destination.coordinates.latitude,
      destination.coordinates.longitude
    );
  }

  const imageSearchQuery = `${destination.name} ${destination.country} travel`;

  return (
    <Link
      to={`/destination/${destination.id}`}
      className="group relative flex flex-col h-full rounded-2xl bg-slate-900/80 border border-white/10 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-amber-500/10 hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
      aria-label={`Explore ${destination.name}, ${destination.country}`}
    >
      {/* 1. SLEEK COMPACT DYNAMIC IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
        
        {/* DYNAMIC IMAGE WITH FALLBACK */}
        <ImageWithFallback
          query={imageSearchQuery}
          alt={`${destination.name}, ${destination.country}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* IMAGE OVERLAY GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none" />

        {/* COUNTRY BADGE OVERLAY */}
        <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/65 backdrop-blur-md border border-white/15 text-[11px] font-semibold text-slate-200">
          <MapPin className="w-3 h-3 text-amber-400" />
          <span>{destination.country}</span>
        </div>

        {/* PROXIMITY DISTANCE BADGE */}
        {distanceKm !== null && (
          <div className="absolute bottom-2.5 left-2.5 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-bold shadow-md">
            <Navigation className="w-2.5 h-2.5 fill-slate-950" />
            <span>{distanceKm.toLocaleString()} km away</span>
          </div>
        )}

        {/* HOVER ARROW AFFORDANCE */}
        <div className="absolute top-2.5 right-2.5 z-20 w-7 h-7 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-90 group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 transition-all duration-300 group-hover:scale-105">
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </div>
      </div>

      {/* 2. CARD CONTENT BODY */}
      <div className="flex flex-col flex-grow p-4 sm:p-4.5 justify-between">
        <div>
          {/* CATEGORY TAGS */}
          <div className="flex flex-wrap gap-1 mb-2">
            {destination.categories.slice(0, 2).map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-semibold text-amber-300/90 uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20"
              >
                {cat}
              </span>
            ))}
            <span className="text-[10px] font-medium text-slate-400 self-center">
              • {destination.region}
            </span>
          </div>

          {/* NAME */}
          <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors duration-300 mb-1.5 leading-snug">
            {destination.name}
          </h3>

          {/* SHORT DESCRIPTION */}
          <p className="text-xs text-slate-300 leading-relaxed line-clamp-2 font-normal">
            {destination.shortDescription}
          </p>
        </div>

        {/* CARD FOOTER */}
        <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 group-hover:text-slate-200">
          <span>Best: {destination.bestTimeToVisit.split('&')[0]}</span>
          <span className="font-semibold text-amber-400 flex items-center gap-0.5">
            Discover <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
