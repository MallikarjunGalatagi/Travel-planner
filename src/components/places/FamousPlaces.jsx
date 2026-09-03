import React, { useState, useEffect } from 'react';
import { PLACES } from '../../data/places';
import PlaceGrid from './PlaceGrid';
import PlaceModal from './PlaceModal';
import { Compass, Sparkles } from 'lucide-react';

export default function FamousPlaces({ destinationId }) {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);

  // Load destination places
  const loadPlaces = () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const matched = PLACES.filter((p) => p.destinationId === destinationId);
      setPlaces(matched);
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading famous places:', err);
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPlaces();
  }, [destinationId]);

  return (
    <section id="famous-places" className="pt-12 pb-8 border-t border-white/10">
      
      {/* SECTION HEADER */}
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-[0.25em] uppercase mb-4">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>PLACES WORTH EXPERIENCING</span>
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight serif-title mb-3">
          Iconic places, unforgettable moments<span className="text-amber-400">.</span>
        </h3>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl font-normal leading-relaxed">
          Discover the landmarks, neighborhoods and experiences that make this destination special.
        </p>
      </div>

      {/* PLACES GRID CONTAINER */}
      <PlaceGrid
        places={places}
        isLoading={isLoading}
        isError={isError}
        onRetry={loadPlaces}
        onSelectPlace={(place) => setSelectedPlace(place)}
      />

      {/* PLACE DETAILS MODAL */}
      <PlaceModal
        place={selectedPlace}
        onClose={() => setSelectedPlace(null)}
      />

    </section>
  );
}
