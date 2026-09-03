import React from 'react';
import { Clock, MapPin, Sparkles } from 'lucide-react';

export default function ItineraryDay({ dayData }) {
  const { day, title, theme, activities = [] } = dayData;

  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-xl backdrop-blur-xl mb-6">
      
      {/* DAY HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-white/10 mb-6">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs tracking-wider uppercase shadow-md">
            DAY {day}
          </span>
          <h4 className="text-xl sm:text-2xl font-bold text-white serif-title">
            {title}
          </h4>
        </div>

        {theme && (
          <span className="text-xs font-semibold text-amber-300/90 uppercase tracking-widest bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
            ✨ {theme}
          </span>
        )}
      </div>

      {/* ACTIVITIES TIMELINE */}
      <div className="relative pl-6 space-y-8 before:absolute before:left-2 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-amber-400 before:via-white/20 before:to-transparent">
        {activities.map((act, idx) => (
          <div key={idx} className="relative group">
            
            {/* TIMELINE NODE DOT */}
            <div className="absolute -left-[30px] top-1.5 w-4 h-4 rounded-full bg-slate-950 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

            {/* TIME BADGE */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-amber-300 text-[11px] font-semibold mb-2">
              <Clock className="w-3 h-3 text-amber-400 shrink-0" />
              <span>{act.time}</span>
            </div>

            {/* ACTIVITY TITLE */}
            <h5 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors mb-1">
              {act.title}
            </h5>

            {/* ACTIVITY DESCRIPTION */}
            <p className="text-sm text-slate-300 leading-relaxed font-normal">
              {act.description}
            </p>

          </div>
        ))}
      </div>

    </div>
  );
}
