import React from 'react';
import ItineraryDay from './ItineraryDay';
import { Sparkles, RefreshCw, Edit3, MapPin, Calendar, Compass } from 'lucide-react';

export default function ItineraryView({ itinerary, onRegenerate, onEditPreferences, onReset }) {
  if (!itinerary) return null;

  const { destination, summary, duration, style, travelerType, interests = [], days = [] } = itinerary;

  return (
    <div className="w-full space-y-8 animate-fade-in">
      
      {/* ITINERARY HEADER SUMMARY CARD */}
      <div className="relative p-6 sm:p-10 rounded-3xl bg-slate-900/90 border border-amber-400/30 shadow-2xl backdrop-blur-xl overflow-hidden">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-3.5 h-3.5 text-amber-400" />
                <span>AI-GENERATED TRAVEL PLAN</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight serif-title mb-2">
              Your {duration}-Day {destination} Itinerary<span className="text-amber-400">.</span>
            </h2>

            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-300">
              <span className="bg-white/10 px-3 py-1 rounded-full text-slate-200">
                ⏱ {duration} {duration === 1 ? 'Day' : 'Days'}
              </span>
              <span className="bg-amber-400/20 text-amber-300 px-3 py-1 rounded-full border border-amber-400/30">
                ⚡ {style} Pacing
              </span>
              {travelerType && (
                <span className="bg-white/10 px-3 py-1 rounded-full">
                  👥 {travelerType}
                </span>
              )}
              {interests.map((interest) => (
                <span key={interest} className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-full text-slate-400">
                  #{interest}
                </span>
              ))}
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onRegenerate}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold transition-all shadow-md cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>

            <button
              type="button"
              onClick={onEditPreferences}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 text-xs font-semibold transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5 text-amber-400" />
              <span>Edit preferences</span>
            </button>
          </div>
        </div>

        {/* SUMMARY DESCRIPTION PARAGRAPH */}
        {summary && (
          <p className="mt-6 text-base text-slate-200 leading-relaxed font-normal">
            "{summary}"
          </p>
        )}

      </div>

      {/* DAY-BY-DAY TIMELINE CARDS */}
      <div>
        <div className="flex items-center justify-between mb-6 px-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-amber-400" />
            <span>Day-by-Day Travel Schedule</span>
          </h3>
          <span className="text-xs text-slate-400">
            {days.length} Days Planned
          </span>
        </div>

        {days.map((dayData) => (
          <ItineraryDay key={dayData.day} dayData={dayData} />
        ))}
      </div>

    </div>
  );
}
