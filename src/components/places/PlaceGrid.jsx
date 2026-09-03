import React from 'react';
import PlaceCard from './PlaceCard';
import { Compass, AlertCircle, RotateCcw } from 'lucide-react';

export default function PlaceGrid({ places, isLoading, isError, onRetry, onSelectPlace }) {
  // 1. SKELETON LOADING STATE
  if (isLoading) {
    return (
      <div className="space-y-8 animate-fade-in">
        {/* Featured Skeleton */}
        <div className="h-96 rounded-3xl bg-slate-900/60 border border-white/10 animate-pulse" />
        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-slate-900/60 border border-white/10 animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  // 2. ERROR STATE
  if (isError) {
    return (
      <div className="py-16 px-4 text-center bg-slate-900/40 rounded-3xl border border-rose-500/20 max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4 text-rose-400">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h4 className="text-xl font-bold text-white mb-2">Places couldn't be loaded</h4>
        <p className="text-sm text-slate-300 mb-6">
          We encountered an issue retrieving notable places for this destination.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-6 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Try again</span>
        </button>
      </div>
    );
  }

  // 3. EMPTY STATE
  if (!places || places.length === 0) {
    return (
      <div className="py-16 px-4 text-center bg-slate-900/40 rounded-3xl border border-white/10 max-w-lg mx-auto my-8">
        <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <Compass className="w-7 h-7" />
        </div>
        <h4 className="text-xl font-bold text-white mb-2">No places to display yet</h4>
        <p className="text-sm text-slate-300">
          We are currently curating iconic landmarks and hidden gems for this destination.
        </p>
      </div>
    );
  }

  // Separate featured place from regular places
  const featuredPlace = places.find((p) => p.isFeatured) || places[0];
  const remainingPlaces = places.filter((p) => p.id !== featuredPlace?.id);

  return (
    <div className="space-y-8">
      {/* FEATURED PLACE HERO CARD */}
      {featuredPlace && (
        <PlaceCard
          place={featuredPlace}
          onSelectPlace={onSelectPlace}
          isFeatured={true}
        />
      )}

      {/* MORE NOTABLE PLACES GRID */}
      {remainingPlaces.length > 0 && (
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-6 flex items-center gap-2">
            <span>MORE PLACES TO EXPLORE</span>
            <span className="w-12 h-px bg-white/10" />
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {remainingPlaces.map((place) => (
              <PlaceCard
                key={place.id}
                place={place}
                onSelectPlace={onSelectPlace}
                isFeatured={false}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
