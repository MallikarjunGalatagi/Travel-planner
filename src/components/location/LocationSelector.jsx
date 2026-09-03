import React, { useState, useEffect, useRef } from 'react';
import { useLocationContext } from '../../context/LocationContext';
import { searchLocations } from '../../services/locationApi';
import WeatherCard from '../weather/WeatherCard';
import {
  MapPin,
  Navigation,
  Search,
  X,
  Loader2,
  CheckCircle2,
  Sparkles,
  Globe,
  RotateCcw
} from 'lucide-react';

const POPULAR_QUICK_CITIES = [
  { name: "Bengaluru", region: "Karnataka", country: "India", latitude: 12.9716, longitude: 77.5946 },
  { name: "Mumbai", region: "Maharashtra", country: "India", latitude: 19.0760, longitude: 72.8777 },
  { name: "New Delhi", region: "Delhi", country: "India", latitude: 28.6139, longitude: 77.2090 },
  { name: "Paris", region: "Île-de-France", country: "France", latitude: 48.8566, longitude: 2.3522 },
  { name: "Tokyo", region: "Kanto", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
  { name: "London", region: "Greater London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  { name: "New York", region: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  { name: "Dubai", region: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708 },
  { name: "Rome", region: "Lazio", country: "Italy", latitude: 41.9028, longitude: 12.4964 },
  { name: "Sydney", region: "New South Wales", country: "Australia", latitude: -33.8688, longitude: 151.2093 }
];

export default function LocationSelector() {
  const {
    location,
    detectGeolocation,
    selectSearchLocation,
    clearLocation,
    isLoading,
    isModalOpen,
    closeLocationModal
  } = useLocationContext();

  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef(null);
  const debounceTimerRef = useRef(null);

  // Sync with context modal trigger if opened from header button
  useEffect(() => {
    if (isModalOpen) {
      setIsSearchExpanded(true);
      closeLocationModal(); // Convert modal request into on-page inline expansion
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isModalOpen, closeLocationModal]);

  // Focus input when inline search opens
  useEffect(() => {
    if (isSearchExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchExpanded]);

  // Debounced search handler
  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    if (!searchQuery || searchQuery.trim().length < 2) {
      setSearchResults([]);
      setIsSearching(false);
      setHasSearched(false);
      return;
    }

    setIsSearching(true);
    debounceTimerRef.current = setTimeout(async () => {
      try {
        const results = await searchLocations(searchQuery);
        setSearchResults(results);
      } catch (err) {
        console.error('Location search error:', err);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
        setHasSearched(true);
      }
    }, 300);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [searchQuery]);

  const handleSelectCity = (cityObj) => {
    selectSearchLocation(cityObj);
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchExpanded(false);
  };

  const handleUseLocation = async () => {
    try {
      await detectGeolocation();
      setIsSearchExpanded(false);
    } catch (e) {
      console.warn('Geolocation detection failed:', e);
    }
  };

  return (
    <div
      id="location-selector"
      className="w-full max-w-4xl mx-auto mb-10 p-6 rounded-3xl bg-slate-900/80 border border-white/15 backdrop-blur-xl shadow-2xl transition-all duration-300"
    >
      {/* 1. TOP CARD SUMMARY ROW */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* LEFT TEXT DETAILS */}
        <div className="flex items-center gap-4 text-left w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 shrink-0">
            {location?.source === 'geolocation' ? (
              <Navigation className="w-6 h-6 fill-amber-400" />
            ) : (
              <MapPin className="w-6 h-6" />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400">
                {location ? 'YOUR ACTIVE ORIGIN' : 'LOCATION AWARENESS'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-white leading-snug">
              {location ? location.formattedAddress : 'Where are you traveling from?'}
            </h3>
            
            <p className="text-xs text-slate-300">
              {location
                ? `Personalizing distance and weather conditions for your origin.`
                : 'Set your origin location to calculate distance and live weather.'}
            </p>
          </div>
        </div>

        {/* RIGHT ACTION BUTTONS & WEATHER SNIPPET */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          {location && (
            <WeatherCard
              latitude={location.latitude}
              longitude={location.longitude}
              locationName={location.name}
              compact={true}
            />
          )}

          {!isSearchExpanded ? (
            <>
              <button
                type="button"
                onClick={handleUseLocation}
                disabled={isLoading}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full transition-all shadow-md shadow-amber-400/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Navigation className="w-4 h-4 fill-slate-950" />
                )}
                <span>Use my location</span>
              </button>

              <button
                type="button"
                onClick={() => setIsSearchExpanded(true)}
                className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold text-slate-200 bg-white/10 hover:bg-white/20 border border-white/15 rounded-full transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-amber-400" />
                <span>{location ? 'Change city' : 'Search city'}</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                setIsSearchExpanded(false);
                setSearchQuery('');
                setSearchResults([]);
              }}
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-all cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Cancel</span>
            </button>
          )}
        </div>

      </div>

      {/* 2. IN-PAGE EXPANDABLE SEARCH PANEL (NO POPUP WINDOW) */}
      {isSearchExpanded && (
        <div className="mt-6 pt-6 border-t border-white/10 animate-fade-in-up space-y-5">
          
          {/* IN-LINE SEARCH INPUT FIELD */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Search className="w-5 h-5 text-amber-400" />
            </div>
            
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search city or region (e.g. Bengaluru, Paris, Tokyo, London, New York)..."
              className="w-full pl-12 pr-10 py-3.5 text-sm font-medium bg-slate-950/80 text-white placeholder-slate-400 border border-white/20 rounded-2xl focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* QUICK PICK POPULAR CITIES CHIPS */}
          {!searchQuery && (
            <div>
              <div className="flex items-center gap-2 mb-3 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <Globe className="w-3.5 h-3.5 text-amber-400" />
                <span>Popular Cities & Origins</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {POPULAR_QUICK_CITIES.map((city) => (
                  <button
                    key={city.name}
                    type="button"
                    onClick={() => handleSelectCity(city)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-white/5 hover:bg-amber-400/15 hover:border-amber-400/30 border border-white/10 rounded-full transition-all cursor-pointer"
                  >
                    <MapPin className="w-3 h-3 text-amber-400" />
                    <span>{city.name}</span>
                    <span className="text-[10px] text-slate-400">({city.country})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SEARCH RESULTS LIST */}
          {isSearching && (
            <div className="flex items-center justify-center py-6 text-slate-400 text-sm gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
              <span>Searching cities...</span>
            </div>
          )}

          {!isSearching && hasSearched && searchResults.length === 0 && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center text-xs text-slate-300">
              No matching city found for "{searchQuery}". Try searching for major cities like <span className="text-amber-400 font-semibold">Bengaluru, Paris, Tokyo, London, or New York</span>.
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Search Results ({searchResults.length})
              </div>
              {searchResults.map((result, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectCity(result)}
                  className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-950/60 hover:bg-amber-400/15 border border-white/10 hover:border-amber-400/40 text-left transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400 group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                        {result.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {[result.region, result.country].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Select Origin →
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* FOOTER ACTIONS INSIDE PANEL */}
          {location && (
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs">
              <button
                type="button"
                onClick={() => {
                  clearLocation();
                  setIsSearchExpanded(false);
                }}
                className="inline-flex items-center gap-1.5 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset to default origin</span>
              </button>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
