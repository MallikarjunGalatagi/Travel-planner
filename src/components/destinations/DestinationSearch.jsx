import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { DESTINATIONS } from '../../data/destinations';
import { PLACES } from '../../data/places';
import { fetchDestinationImage, fetchPlaceImage } from '../../services/imageApi';
import { Search, X, MapPin, Compass, ArrowRight, Sparkles } from 'lucide-react';

export default function DestinationSearch({ searchQuery, setSearchQuery }) {
  const [isOpen, setIsOpen] = useState(false);
  const [destResults, setDestResults] = useState([]);
  const [placeResults, setPlaceResults] = useState([]);
  const [imagesMap, setImagesMap] = useState({});
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter matching destinations and famous places live as user types
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 1) {
      setDestResults([]);
      setPlaceResults([]);
      setIsOpen(false);
      return;
    }

    const q = searchQuery.toLowerCase().trim();

    // 1. Filter Destinations
    const matchedDests = DESTINATIONS.filter((d) => {
      const nameMatch = d.name.toLowerCase().includes(q);
      const countryMatch = d.country.toLowerCase().includes(q);
      const regionMatch = d.region.toLowerCase().includes(q);
      const catMatch = d.categories.some((c) => c.toLowerCase().includes(q));
      const descMatch = d.shortDescription.toLowerCase().includes(q);

      // Check if any child famous place matches query
      const placesMatch = PLACES.filter((p) => p.destinationId === d.id).some(
        (p) => p.name.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q)
      );

      return nameMatch || countryMatch || regionMatch || catMatch || descMatch || placesMatch;
    }).slice(0, 6);

    // 2. Filter Famous Places directly
    const matchedPlaces = PLACES.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q)
      );
    }).slice(0, 6);

    setDestResults(matchedDests);
    setPlaceResults(matchedPlaces);
    setIsOpen(true);

    // Load thumbnails for search dropdown results asynchronously
    matchedDests.forEach((d) => {
      if (!imagesMap[d.id]) {
        fetchDestinationImage(d).then((imgObj) => {
          setImagesMap((prev) => ({ ...prev, [d.id]: imgObj.thumbUrl || imgObj.url }));
        });
      }
    });

    matchedPlaces.forEach((p) => {
      if (!imagesMap[p.id]) {
        fetchPlaceImage(p).then((imgObj) => {
          setImagesMap((prev) => ({ ...prev, [p.id]: imgObj.thumbUrl || imgObj.url }));
        });
      }
    });
  }, [searchQuery]);

  const handleSelectDestination = (destId) => {
    setIsOpen(false);
    navigate(`/destination/${destId}`);
  };

  const handleSelectPlace = (place) => {
    setIsOpen(false);
    navigate(`/destination/${place.destinationId}`);
  };

  const hasResults = destResults.length > 0 || placeResults.length > 0;

  return (
    <div ref={dropdownRef} className="relative w-full max-w-2xl mx-auto z-40">
      <label htmlFor="destination-search-input" className="sr-only">
        Search destinations by name, country, region or famous places
      </label>

      <div className="relative flex items-center">
        {/* SEARCH ICON */}
        <div className="absolute left-4.5 pointer-events-none text-slate-400">
          <Search className="w-5 h-5 text-amber-400" />
        </div>

        {/* INPUT FIELD */}
        <input
          id="destination-search-input"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => {
            if (searchQuery.trim().length > 0) setIsOpen(true);
          }}
          placeholder="Search places or destinations... (e.g. Paris, Taj Mahal, Hawa Mahal, Tokyo, Eiffel Tower)"
          className="w-full pl-12 pr-11 py-4 text-base text-slate-100 bg-slate-900/90 backdrop-blur-xl border border-white/20 rounded-2xl placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 transition-all duration-300 shadow-2xl"
          autoComplete="off"
        />

        {/* CLEAR BUTTON */}
        {searchQuery && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setIsOpen(false);
            }}
            className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            aria-label="Clear search input"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* LIVE PREDICTIVE SEARCH DROPDOWN POPUP */}
      {isOpen && searchQuery.trim().length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-3 bg-slate-900/95 border border-white/20 rounded-3xl shadow-2xl backdrop-blur-2xl overflow-hidden transition-all animate-fade-in divide-y divide-white/10">
          
          {/* A. MATCHING DESTINATIONS SECTION */}
          {destResults.length > 0 && (
            <div className="p-4">
              <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-amber-400 uppercase tracking-widest mb-2">
                <Compass className="w-3.5 h-3.5" />
                <span>Matching Destinations ({destResults.length})</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {destResults.map((dest) => {
                  const placeCount = PLACES.filter((p) => p.destinationId === dest.id).length;
                  const thumb = imagesMap[dest.id] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=300&auto=format&fit=crop';

                  return (
                    <button
                      key={dest.id}
                      onClick={() => handleSelectDestination(dest.id)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-amber-400/10 border border-transparent hover:border-amber-400/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={thumb}
                          alt={dest.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                        />
                        <div className="truncate">
                          <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                            {dest.name}
                          </h4>
                          <p className="text-xs text-slate-400 truncate">
                            {dest.country} • {dest.region}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[11px] font-semibold text-slate-300 bg-white/10 px-2.5 py-1 rounded-full">
                          {placeCount} Places
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* B. MATCHING FAMOUS PLACES TO VISIT SECTION */}
          {placeResults.length > 0 && (
            <div className="p-4 bg-slate-950/40">
              <div className="flex items-center gap-2 px-3 py-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>Famous Places to Visit ({placeResults.length})</span>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {placeResults.map((place) => {
                  const parentDest = DESTINATIONS.find((d) => d.id === place.destinationId);
                  const thumb = imagesMap[place.id] || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=300&auto=format&fit=crop';

                  return (
                    <button
                      key={place.id}
                      onClick={() => handleSelectPlace(place)}
                      className="w-full flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-emerald-400/10 border border-transparent hover:border-emerald-400/30 transition-all text-left group"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <img
                          src={thumb}
                          alt={place.name}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-white/10 group-hover:scale-105 transition-transform"
                        />
                        <div className="truncate">
                          <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors truncate">
                            {place.name}
                          </h4>
                          <p className="text-xs text-slate-400 truncate">
                            Located in <span className="text-slate-200 font-medium">{parentDest?.name || 'Destination'}</span> • {place.category}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[11px] font-semibold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 px-2.5 py-1 rounded-full">
                          View Place
                        </span>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* C. NO RESULTS FOUND STATE */}
          {!hasResults && (
            <div className="p-8 text-center">
              <Sparkles className="w-8 h-8 text-amber-400 mx-auto mb-3 opacity-60" />
              <p className="text-sm font-medium text-white mb-1">
                No matching destination or place found
              </p>
              <p className="text-xs text-slate-400">
                Try searching for <span className="text-amber-300 font-semibold">"Paris"</span>, <span className="text-amber-300 font-semibold">"Taj Mahal"</span>, <span className="text-amber-300 font-semibold">"Jaipur"</span>, or <span className="text-amber-300 font-semibold">"Eiffel Tower"</span>
              </p>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
