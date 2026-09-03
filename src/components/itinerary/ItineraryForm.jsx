import React, { useState } from 'react';
import { DESTINATIONS } from '../../data/destinations';
import { Sparkles, Calendar, Compass, Users, Tag, ArrowRight } from 'lucide-react';

export default function ItineraryForm({ initialDestination = '', onGenerate, isLoading }) {
  const [destinationName, setDestinationName] = useState(
    initialDestination || DESTINATIONS[0].name
  );
  const [durationDays, setDurationDays] = useState(3);
  const [style, setStyle] = useState('Balanced');
  const [travelerType, setTravelerType] = useState('Couple');
  const [selectedInterests, setSelectedInterests] = useState(['Sightseeing', 'Culture', 'Food & Dining']);

  const durationOptions = [1, 2, 3, 4, 5, 7];
  const styleOptions = ['Relaxed', 'Balanced', 'Packed'];
  const travelerOptions = ['Solo', 'Couple', 'Family', 'Friends'];
  const interestOptions = [
    'Sightseeing',
    'Culture',
    'Food & Dining',
    'Nature',
    'Adventure',
    'Shopping',
    'Landmarks',
    'Nightlife'
  ];

  const toggleInterest = (interest) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;

    onGenerate({
      destinationName,
      durationDays,
      style,
      travelerType,
      interests: selectedInterests
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-6">
      
      {/* 1. DESTINATION SELECTOR */}
      <div>
        <label htmlFor="itinerary-destination-select" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-400" />
          <span>Target Destination</span>
        </label>
        <select
          id="itinerary-destination-select"
          value={destinationName}
          onChange={(e) => setDestinationName(e.target.value)}
          className="w-full px-4 py-3.5 rounded-2xl bg-slate-900 border border-white/15 text-white font-medium focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 cursor-pointer"
        >
          {DESTINATIONS.map((dest) => (
            <option key={dest.id} value={dest.name}>
              {dest.name}, {dest.country} ({dest.region})
            </option>
          ))}
        </select>
      </div>

      {/* 2. DURATION PICKER CHIPS */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-amber-400" />
          <span>Trip Duration</span>
        </label>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
          {durationOptions.map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => setDurationDays(days)}
              className={`py-2.5 rounded-xl text-xs font-bold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer ${
                durationDays === days
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20 scale-[1.02]'
                  : 'bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300'
              }`}
            >
              {days} {days === 1 ? 'Day' : 'Days'}
            </button>
          ))}
        </div>
      </div>

      {/* 3. TRAVEL STYLE & TRAVELER TYPE */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* TRAVEL STYLE */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Pacing & Style
          </label>
          <div className="flex rounded-xl bg-slate-900 p-1 border border-white/10">
            {styleOptions.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => setStyle(st)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  style === st
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* TRAVELER TYPE */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Travelers</span>
          </label>
          <div className="flex rounded-xl bg-slate-900 p-1 border border-white/10">
            {travelerOptions.map((tr) => (
              <button
                key={tr}
                type="button"
                onClick={() => setTravelerType(tr)}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  travelerType === tr
                    ? 'bg-amber-400 text-slate-950 font-bold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* 4. INTEREST TAGS */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2 flex items-center gap-1.5">
          <Tag className="w-3.5 h-3.5 text-amber-400" />
          <span>Interests & Experiences</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {interestOptions.map((interest) => {
            const active = selectedInterests.includes(interest);
            return (
              <button
                key={interest}
                type="button"
                onClick={() => toggleInterest(interest)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all cursor-pointer ${
                  active
                    ? 'bg-amber-400/20 border-amber-400 text-amber-300 font-bold'
                    : 'bg-white/5 border-white/10 text-slate-400 hover:text-slate-200'
                }`}
              >
                {active ? '✓ ' : '+ '}{interest}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. GENERATE SUBMIT CTA */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 font-extrabold text-base transition-all shadow-xl shadow-amber-400/20 flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer disabled:opacity-50"
      >
        <Sparkles className="w-5 h-5 fill-slate-950" />
        <span>{isLoading ? 'Creating Your Trip...' : '✨ Create My Itinerary'}</span>
        <ArrowRight className="w-5 h-5" />
      </button>

    </form>
  );
}
