import React from 'react';

export default function DestinationFilters({ categories, activeFilter, setActiveFilter }) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2 my-6">
      <div className="flex items-center justify-start md:justify-center gap-2 min-w-max px-2">
        {categories.map((category) => {
          const isActive = activeFilter === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer ${
                isActive
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-lg shadow-amber-400/20 scale-105'
                  : 'bg-slate-900/70 text-slate-300 hover:text-white hover:bg-slate-800/80 border border-white/10 hover:border-white/20'
              }`}
              aria-pressed={isActive}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}
