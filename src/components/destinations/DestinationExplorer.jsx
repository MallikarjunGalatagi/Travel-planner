import React, { useState, useMemo } from 'react';
import { DESTINATIONS, CATEGORIES } from '../../data/destinations';
import { PLACES } from '../../data/places';
import DestinationSearch from './DestinationSearch';
import DestinationFilters from './DestinationFilters';
import DestinationGrid from './DestinationGrid';
import LocationSelector from '../location/LocationSelector';
import { useLocationContext } from '../../context/LocationContext';
import { calculateDistanceKm } from '../../services/locationApi';
import { Compass, Sparkles, ArrowUpDown } from 'lucide-react';

export default function DestinationExplorer() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortBy, setSortBy] = useState('recommended');
  const { location } = useLocationContext();

  // Filter, deduplicate, and sort destinations
  const filteredDestinations = useMemo(() => {
    // 1. Strict Set deduplication to guarantee 30 completely unique destinations
    const seenIds = new Set();
    const uniqueDestinations = DESTINATIONS.filter((destination) => {
      if (!destination || !destination.id || seenIds.has(destination.id)) {
        return false;
      }
      seenIds.add(destination.id);
      return true;
    });

    // 2. Category & Search filtering (includes searching famous places in PLACES)
    let list = uniqueDestinations.filter((destination) => {
      let matchesCategory = true;
      if (activeFilter !== 'All') {
        const catLower = activeFilter.toLowerCase();
        matchesCategory = destination.categories.some(
          (c) => c.toLowerCase() === catLower
        );
      }

      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const queryLower = searchQuery.toLowerCase().trim();

        // Check if any child famous place of this destination matches the search term
        const destPlaces = PLACES.filter((p) => p.destinationId === destination.id);
        const matchesPlace = destPlaces.some(
          (p) =>
            p.name.toLowerCase().includes(queryLower) ||
            p.category.toLowerCase().includes(queryLower) ||
            p.location.toLowerCase().includes(queryLower) ||
            p.shortDescription.toLowerCase().includes(queryLower)
        );

        matchesSearch =
          destination.name.toLowerCase().includes(queryLower) ||
          destination.country.toLowerCase().includes(queryLower) ||
          destination.region.toLowerCase().includes(queryLower) ||
          destination.categories.some((c) => c.toLowerCase().includes(queryLower)) ||
          destination.shortDescription.toLowerCase().includes(queryLower) ||
          destination.highlights.some((h) => h.toLowerCase().includes(queryLower)) ||
          matchesPlace;
      }

      return matchesCategory && matchesSearch;
    });

    // 3. Sorting logic
    if (sortBy === 'nearest' && location?.latitude && location?.longitude) {
      list = [...list].sort((a, b) => {
        const distA = calculateDistanceKm(
          location.latitude,
          location.longitude,
          a.coordinates.latitude,
          a.coordinates.longitude
        );
        const distB = calculateDistanceKm(
          location.latitude,
          location.longitude,
          b.coordinates.latitude,
          b.coordinates.longitude
        );
        return distA - distB;
      });
    } else if (sortBy === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchQuery, activeFilter, sortBy, location]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('All');
    setSortBy('recommended');
  };

  return (
    <section
      id="explore"
      className="relative w-full py-24 md:py-32 bg-[#080c14] border-t border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-[0.25em] uppercase mb-4">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>EXPLORE DESTINATIONS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight serif-title mb-6 leading-tight">
            Find places that inspire your next journey<span className="text-amber-400">.</span>
          </h2>

          <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
            Browse handpicked escapes, search by region or travel style, and uncover extraordinary experiences across the globe.
          </p>
        </div>

        {/* LOCATION SELECTOR EMBEDDED BANNER */}
        <LocationSelector />

        {/* SEARCH BAR */}
        <DestinationSearch
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* CATEGORY FILTER CHIPS */}
        <DestinationFilters
          categories={CATEGORIES}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />

        {/* RESULTS METRIC COUNTER & SORT DROPDOWN */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-6 px-2 text-sm text-slate-400 border-b border-white/5 pb-4">
          <span className="flex items-center gap-2 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
            <span>
              {filteredDestinations.length === DESTINATIONS.length
                ? `Showing all ${DESTINATIONS.length} unique curated destinations`
                : `Found ${filteredDestinations.length} unique destination${
                    filteredDestinations.length === 1 ? '' : 's'
                  }`}
            </span>
          </span>

          <div className="flex items-center gap-4">
            {/* SORT BY DROPDOWN */}
            <div className="flex items-center gap-2 text-xs">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <label htmlFor="sort-by-select" className="sr-only">Sort destinations</label>
              <select
                id="sort-by-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-900 border border-white/15 text-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:border-amber-400"
              >
                <option value="recommended">Recommended</option>
                <option value="name">Alphabetical (A-Z)</option>
                {location?.latitude && location?.longitude && (
                  <option value="nearest">Nearest to my location</option>
                )}
              </select>
            </div>
          </div>
        </div>

        {/* DESTINATION GRID */}
        <DestinationGrid
          destinations={filteredDestinations}
          onResetFilters={handleResetFilters}
        />
      </div>
    </section>
  );
}
