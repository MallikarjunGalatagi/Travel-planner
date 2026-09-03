import React from 'react';

export default function WeatherSkeleton() {
  return (
    <div className="w-full p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl animate-pulse">
      <div className="flex items-center justify-between mb-6">
        <div className="w-36 h-4 bg-slate-800 rounded-md" />
        <div className="w-20 h-6 bg-slate-800 rounded-full" />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-6 border-b border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 shrink-0" />
          <div className="space-y-2">
            <div className="w-24 h-10 bg-slate-800 rounded-xl" />
            <div className="w-32 h-4 bg-slate-800 rounded-md" />
          </div>
        </div>

        <div className="w-40 h-8 bg-slate-800 rounded-xl" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
        <div className="w-full h-12 bg-slate-800 rounded-xl" />
        <div className="w-full h-12 bg-slate-800 rounded-xl" />
        <div className="w-full h-12 bg-slate-800 rounded-xl" />
      </div>
    </div>
  );
}
