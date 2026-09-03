import React from 'react';
import { Sparkles } from 'lucide-react';

export default function ItinerarySkeleton() {
  return (
    <div className="w-full space-y-6 animate-pulse">
      
      {/* HEADER SKELETON */}
      <div className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/10 text-amber-300 text-xs font-bold">
          <Sparkles className="w-4 h-4 animate-spin text-amber-400" />
          <span>Creating your perfect trip...</span>
        </div>
        <div className="w-64 h-8 bg-slate-800 rounded-xl mx-auto" />
        <div className="w-96 max-w-full h-4 bg-slate-800 rounded-md mx-auto" />
      </div>

      {/* DAY SKELETON CARDS */}
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-8 rounded-3xl bg-slate-900/80 border border-white/10 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="w-32 h-6 bg-slate-800 rounded-lg" />
            <div className="w-24 h-5 bg-slate-800 rounded-full" />
          </div>

          <div className="space-y-6 pl-4">
            <div className="space-y-2">
              <div className="w-20 h-4 bg-slate-800 rounded-md" />
              <div className="w-48 h-5 bg-slate-800 rounded-lg" />
              <div className="w-full h-4 bg-slate-800 rounded-md" />
            </div>
            <div className="space-y-2">
              <div className="w-20 h-4 bg-slate-800 rounded-md" />
              <div className="w-56 h-5 bg-slate-800 rounded-lg" />
              <div className="w-full h-4 bg-slate-800 rounded-md" />
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}
