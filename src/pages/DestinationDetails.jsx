import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { DESTINATIONS } from '../data/destinations';
import { getDestinationHeroImage } from '../services/imageService';
import Navbar from '../components/Navbar';
import FamousPlaces from '../components/places/FamousPlaces';
import WeatherCard from '../components/weather/WeatherCard';
import ImageWithFallback from '../components/ImageWithFallback';
import TravelChatbot from '../components/chat/TravelChatbot';
import ItineraryPlannerModal from '../components/itinerary/ItineraryPlannerModal';
import {
  ArrowLeft,
  MapPin,
  Globe,
  Calendar,
  Clock,
  Coins,
  Languages,
  CheckCircle2,
  Sparkles,
  Compass,
  ArrowRight
} from 'lucide-react';

export default function DestinationDetails() {
  const { id } = useParams();
  const [isPlannerOpen, setIsPlannerOpen] = useState(false);

  // Find target destination by ID
  const destination = DESTINATIONS.find((d) => d.id === id);

  // 1. DESIGNED 404 NOT FOUND STATE FOR INVALID ROUTE
  if (!destination) {
    return (
      <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col justify-between">
        <Navbar />
        <main className="flex-grow flex items-center justify-center py-32 px-4">
          <div className="text-center max-w-lg mx-auto bg-slate-900/60 border border-white/10 p-10 rounded-3xl shadow-2xl backdrop-blur-xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center mx-auto mb-6 text-amber-400">
              <Compass className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-3">Destination not found</h1>
            <p className="text-slate-300 text-base mb-8">
              We couldn't locate the destination you are looking for. Let's find somewhere else inspiring to explore.
            </p>
            <Link
              to="/#explore"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full transition-all shadow-lg shadow-amber-400/20"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Explore Destinations</span>
            </Link>
          </div>
        </main>
        <footer className="w-full py-6 border-t border-white/10 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} Travelia — Modern Travel Experiences
        </footer>
      </div>
    );
  }

  const heroImageUrl = getDestinationHeroImage(destination);

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
      
      {/* GLOBAL NAVBAR */}
      <Navbar />

      <main className="flex-grow">
        
        {/* 2. EDITORIAL DESTINATION HERO BANNERS */}
        <section className="relative w-full min-h-[75vh] flex items-end justify-start overflow-hidden bg-[#080c14] pb-16 pt-32">
          
          {/* HERO BACKGROUND IMAGE */}
          <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
            <ImageWithFallback
              query={`${destination.name} ${destination.country} travel`}
              alt={`${destination.name}, ${destination.country}`}
              className="w-full h-full object-cover animate-fade-in"
              showCredit={true}
            />
            
            {/* CINEMATIC DARK GRADIENTS & MASK */}
            <div className="absolute inset-0 bg-black/40 z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/40 to-black/60 z-10" />
          </div>

          {/* HERO CONTENT */}
          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            
            {/* BACK LINK */}
            <Link
              to="/#explore"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-slate-200 hover:text-white hover:bg-black/70 transition-all text-xs font-semibold uppercase tracking-wider mb-8 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <ArrowLeft className="w-4 h-4 text-amber-400" />
              <span>Back to Explorer</span>
            </Link>

            <div className="max-w-3xl">
              
              {/* COUNTRY & REGION BADGE */}
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 backdrop-blur-md border border-amber-400/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  {destination.country}
                </span>
                <span className="text-sm font-semibold text-slate-300">
                  • {destination.region}
                </span>
              </div>

              {/* DESTINATION NAME */}
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight hero-text-shadow mb-4">
                {destination.name}
              </h1>

              {/* TAGLINE */}
              <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed mb-8 max-w-2xl hero-text-shadow">
                "{destination.shortDescription}"
              </p>

              {/* HERO CTA BUTTON */}
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsPlannerOpen(true)}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full transition-all duration-300 shadow-xl shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-slate-950 fill-slate-950" />
                  <span>Plan a Trip to {destination.name}</span>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* 3. MAIN EDITORIAL DETAILS BODY */}
        <section className="py-20 bg-[#080c14]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              
              {/* LEFT & CENTER: OVERVIEW & HIGHLIGHTS */}
              <div className="lg:col-span-2 space-y-12">
                
                {/* OVERVIEW STORY */}
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3">
                    <Sparkles className="w-4 h-4" />
                    <span>OVERVIEW</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white serif-title mb-6">
                    Discover {destination.name}
                  </h2>
                  <p className="text-slate-300 text-lg leading-relaxed font-normal">
                    {destination.description}
                  </p>
                </div>

                {/* HIGHLIGHTS */}
                <div className="pt-8 border-t border-white/10">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                    <span>Key Experiences & Highlights</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {(destination.highlights || []).map((highlight, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3.5 p-4 rounded-2xl bg-slate-900/60 border border-white/10 hover:border-amber-400/30 transition-all duration-300"
                      >
                        <div className="w-7 h-7 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-amber-400" />
                        </div>
                        <span className="text-slate-200 font-medium text-base leading-snug">
                          {highlight}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* FAMOUS PLACES & ATTRACTIONS SECTION */}
                <FamousPlaces destinationId={destination.id} />

                {/* REAL-TIME LIVE WEATHER SECTION */}
                {destination.coordinates && (
                  <WeatherCard
                    latitude={destination.coordinates.latitude}
                    longitude={destination.coordinates.longitude}
                    locationName={`${destination.name}, ${destination.country}`}
                  />
                )}

                {/* AI TRAVEL CHATBOT WITH GEMINI */}
                <TravelChatbot destination={destination} />

              </div>

              {/* RIGHT SIDEBAR: QUICK INFORMATION SNAPSHOT */}
              <div className="lg:col-span-1">
                <div className="sticky top-28 p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl space-y-6">
                  
                  <h3 className="text-xl font-bold text-white border-b border-white/10 pb-4 flex items-center justify-between">
                    <span>Travel Snapshot</span>
                    <Globe className="w-5 h-5 text-amber-400" />
                  </h3>

                  {/* QUICK INFO ITEMS */}
                  <div className="space-y-5 text-sm">
                    
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                          Best Time to Visit
                        </span>
                        <span className="text-slate-100 font-medium">
                          {destination.bestTimeToVisit || 'Year-round'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Languages className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                          Language Spoken
                        </span>
                        <span className="text-slate-100 font-medium">
                          {destination.language || 'Official Language'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Coins className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                          Local Currency
                        </span>
                        <span className="text-slate-100 font-medium">
                          {destination.currency || 'Local Currency'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                          Timezone
                        </span>
                        <span className="text-slate-100 font-medium">
                          {destination.timezone || 'Local Time'}
                        </span>
                      </div>
                    </div>

                    {destination.coordinates && (
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                        <div>
                          <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold block">
                            Coordinates
                          </span>
                          <span className="text-slate-100 font-medium">
                            {destination.coordinates.latitude}° N, {destination.coordinates.longitude}° E
                          </span>
                        </div>
                      </div>
                    )}

                  </div>

                  {/* SIDEBAR CTA */}
                  <div className="pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setIsPlannerOpen(true)}
                      className="w-full py-3.5 px-4 text-center text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-2xl transition-all shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                    >
                      <span>Start Planning</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="w-full py-8 border-t border-white/10 bg-[#06090f] text-slate-400 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400 font-medium">
            © {new Date().getFullYear()} Travelia. Crafted for modern travel experiences.
          </p>
          <div className="flex items-center space-x-6 text-xs text-slate-400">
            <Link to="/#explore" className="hover:text-amber-300 transition-colors">Explore All</Link>
            <a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-300 transition-colors">Terms</a>
          </div>
        </div>
      </footer>

      {/* ITINERARY PLANNER MODAL */}
      <ItineraryPlannerModal
        isOpen={isPlannerOpen}
        onClose={() => setIsPlannerOpen(false)}
        initialDestination={destination.name}
      />

    </div>
  );
}
