import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ItineraryForm from '../components/itinerary/ItineraryForm';
import ItineraryView from '../components/itinerary/ItineraryView';
import ItinerarySkeleton from '../components/itinerary/ItinerarySkeleton';
import { generateStructuredItinerary } from '../services/geminiApi';
import { Sparkles, AlertCircle, Compass } from 'lucide-react';

export default function ItineraryPlannerPage() {
  const [viewState, setViewState] = useState('form');
  const [itinerary, setItinerary] = useState(null);
  const [currentPreferences, setCurrentPreferences] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleGenerate = async (preferences) => {
    setCurrentPreferences(preferences);
    setViewState('loading');
    setErrorMessage(null);

    try {
      const data = await generateStructuredItinerary(preferences);
      setItinerary(data);
      setViewState('result');
    } catch (err) {
      console.error('Itinerary page error:', err);
      setErrorMessage("Something went wrong while creating your itinerary. Please try again.");
      setViewState('error');
    }
  };

  const handleRegenerate = () => {
    if (currentPreferences) {
      handleGenerate(currentPreferences);
    }
  };

  const handleEditPreferences = () => {
    setViewState('form');
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      <Navbar />

      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* HEADER BANNER */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-[0.25em] uppercase mb-4">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>AI ITINERARY PLANNER</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-tight serif-title mb-4 leading-tight">
              Plan your perfect journey with AI<span className="text-amber-400">.</span>
            </h1>

            <p className="text-lg text-slate-300 font-normal leading-relaxed max-w-2xl mx-auto">
              Select your destination, trip length, and travel preferences to generate a custom day-by-day travel schedule.
            </p>
          </div>

          {/* MAIN CONTENT CARD */}
          <div className="p-6 sm:p-10 rounded-3xl bg-slate-900/60 border border-white/10 shadow-2xl backdrop-blur-xl">
            {viewState === 'form' && (
              <ItineraryForm onGenerate={handleGenerate} isLoading={false} />
            )}

            {viewState === 'loading' && <ItinerarySkeleton />}

            {viewState === 'result' && (
              <ItineraryView
                itinerary={itinerary}
                onRegenerate={handleRegenerate}
                onEditPreferences={handleEditPreferences}
                onReset={() => setViewState('form')}
              />
            )}

            {viewState === 'error' && (
              <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/30 text-center space-y-4">
                <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
                <h4 className="text-xl font-bold text-white">Generation Failed</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">{errorMessage}</p>
                <button
                  type="button"
                  onClick={handleEditPreferences}
                  className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer"
                >
                  Try again
                </button>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 bg-slate-950 border-t border-white/10 text-center text-xs text-slate-400">
        <p>© 2026 Travelia. Designed for modern travel experiences.</p>
      </footer>
    </div>
  );
}
