import React from 'react';
import { CloudOff, RotateCcw, MapPin } from 'lucide-react';

export default function WeatherError({ message, onRetry, onChangeLocation }) {
  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-slate-900/60 border border-amber-400/20 text-center animate-fade-in">
      <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-4 text-amber-400">
        <CloudOff className="w-6 h-6" />
      </div>

      <h4 className="text-xl font-bold text-white mb-2">Weather unavailable</h4>
      <p className="text-sm text-slate-300 mb-6 max-w-md mx-auto">
        {message || "We couldn't get the latest weather for this location."}
      </p>

      <div className="flex items-center justify-center gap-3">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full transition-all cursor-pointer shadow-md shadow-amber-400/15"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Try again</span>
          </button>
        )}

        {onChangeLocation && (
          <button
            type="button"
            onClick={onChangeLocation}
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-all cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-amber-400" />
            <span>Change location</span>
          </button>
        )}
      </div>
    </div>
  );
}
