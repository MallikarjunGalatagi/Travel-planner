import React, { useEffect } from 'react';
import { X, MapPin, Clock, Calendar, CheckCircle2, Sparkles } from 'lucide-react';
import ImageWithFallback from '../ImageWithFallback';
import { getPlaceImageUrl } from '../../services/imageService';

export default function PlaceModal({ place, onClose }) {
  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!place) return;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [place, onClose]);

  if (!place) return null;

  const imageUrl = getPlaceImageUrl(place);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="place-modal-title"
    >
      {/* BACKDROP BLUR OVERLAY */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* MODAL CONTAINER */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-y-auto z-10 flex flex-col no-scrollbar animate-fade-in-up">
        
        {/* CLOSE BUTTON */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 backdrop-blur-md text-white hover:bg-black/90 hover:scale-105 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* HERO DYNAMIC IMAGE */}
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden shrink-0">
          <ImageWithFallback
            query={place.imageQuery || `${place.name} ${place.location}`}
            alt={place.name}
            className="w-full h-full object-cover"
            showCredit={true}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/30 to-transparent" />

          {/* BADGE */}
          <div className="absolute bottom-4 left-6 inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{place.category}</span>
          </div>
        </div>

        {/* MODAL CONTENT BODY */}
        <div className="p-6 sm:p-8 space-y-6">
          
          <div>
            <h2 id="place-modal-title" className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
              {place.name}
            </h2>
            <p className="text-sm font-semibold text-amber-400 flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{place.location}</span>
            </p>
          </div>

          {/* QUICK STATS ROW */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-slate-200">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Suggested Duration:</strong> {place.suggestedDuration}</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-200">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span><strong>Best Time:</strong> {place.bestTimeToVisit}</span>
            </div>
          </div>

          {/* FULL DESCRIPTION */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
              ABOUT THIS PLACE
            </h3>
            <p className="text-slate-200 text-base leading-relaxed font-normal">
              {place.description}
            </p>
          </div>

          {/* HIGHLIGHTS CHECKLIST */}
          {place.highlights && place.highlights.length > 0 && (
            <div className="pt-4 border-t border-white/10">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                KEY HIGHLIGHTS & WHAT TO SEE
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {place.highlights.map((h, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FOOTER CLOSE */}
          <div className="pt-6 border-t border-white/10 flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full transition-all cursor-pointer"
            >
              Close Details
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
