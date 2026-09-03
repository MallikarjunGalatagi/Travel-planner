import React, { useState, useEffect } from 'react';
import { generateStructuredItinerary } from '../../services/geminiApi';
import ItineraryForm from './ItineraryForm';
import ItineraryView from './ItineraryView';
import ItinerarySkeleton from './ItinerarySkeleton';
import { X, Sparkles, AlertCircle } from 'lucide-react';

export default function ItineraryPlannerModal({ isOpen, onClose, initialDestination = '' }) {
  const [viewState, setViewState] = useState('form'); // 'form' | 'loading' | 'result' | 'error'
  const [itinerary, setItinerary] = useState(null);
  const [currentPreferences, setCurrentPreferences] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleGenerate = async (preferences) => {
    setCurrentPreferences(preferences);
    setViewState('loading');
    setErrorMessage(null);

    try {
      const data = await generateStructuredItinerary(preferences);
      setItinerary(data);
      setViewState('result');
    } catch (err) {
      console.error('Itinerary generation error:', err);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      
      {/* BACKDROP */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md animate-fade-in"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-slate-950 border border-white/20 rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col no-scrollbar animate-fade-in-up p-6 sm:p-8">
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* MODAL HEADER */}
        <div className="mb-6 pb-4 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI ITINERARY PLANNER</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white serif-title">
            {viewState === 'form' ? 'Plan Your Custom Trip' : 'Your Custom Itinerary'}
          </h3>
        </div>

        {/* BODY VIEWS */}
        {viewState === 'form' && (
          <ItineraryForm
            initialDestination={initialDestination}
            onGenerate={handleGenerate}
            isLoading={false}
          />
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
              className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs"
            >
              Try again
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
