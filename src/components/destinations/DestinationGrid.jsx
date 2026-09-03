import React from 'react';
import DestinationCard from './DestinationCard';
import { SearchX, RotateCcw } from 'lucide-react';

export default function DestinationGrid({ destinations, onResetFilters }) {
  if (!destinations || destinations.length === 0) {
    return (
      <div className="py-20 px-4 text-center bg-slate-900/40 rounded-3xl border border-white/10 max-w-xl mx-auto my-8 animate-fade-in">
        <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
          <SearchX className="w-8 h-8" />
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-2">No destinations found</h3>
        <p className="text-base text-slate-300 mb-6 max-w-md mx-auto">
          We couldn't find any places matching your current search or category filter. Try adjusting your search term or reset filters.
        </p>

        <button
          type="button"
          onClick={onResetFilters}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full transition-all duration-300 shadow-lg shadow-amber-400/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset filters & search</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
      {destinations.map((destination) => (
        <DestinationCard key={destination.id} destination={destination} />
      ))}
    </div>
  );
}
