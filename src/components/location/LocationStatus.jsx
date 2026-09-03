import React from 'react';
import { MapPin, Navigation, ChevronDown } from 'lucide-react';
import { useLocationContext } from '../../context/LocationContext';

export default function LocationStatus() {
  const { location, openLocationModal } = useLocationContext();

  const handleClick = () => {
    openLocationModal();
    const elem = document.getElementById('location-selector');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 border border-white/15 text-xs font-semibold text-slate-100 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer shadow-sm"
      aria-label={location ? `Active location: ${location.formattedAddress}. Click to change.` : 'Set your location'}
    >
      <div className="w-5 h-5 rounded-full bg-amber-400/20 flex items-center justify-center text-amber-400">
        {location?.source === 'geolocation' ? (
          <Navigation className="w-3 h-3 fill-amber-400 text-amber-400" />
        ) : (
          <MapPin className="w-3 h-3 text-amber-400" />
        )}
      </div>

      <span className="truncate max-w-[140px] sm:max-w-[180px]">
        {location ? location.name : 'Set Location'}
      </span>

      <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
    </button>
  );
}
