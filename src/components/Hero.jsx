import React, { useRef, useEffect } from 'react';
import { Compass, ArrowRight, Sparkles } from 'lucide-react';
import ScrollIndicator from './ScrollIndicator';

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#080c14]">
      
      {/* 1. BACKGROUND VIDEO CONTAINER */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/hero-poster.jpg"
          className="w-full h-full object-cover opacity-100 brightness-[1.08] contrast-[1.05] transition-all duration-700"
        >
          <source src="/assets/hero-travel.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-flying-above-clouds-5491/1080p.mp4" type="video/mp4" />
          Your browser does not support HTML5 video.
        </video>

        {/* REFINED LIGHT OVERLAY FOR HIGH VIDEO FOCUS & CLEAR TEXT CONTRAST */}
        <div className="absolute inset-0 bg-black/25 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080c14] via-[#080c14]/20 to-black/40 z-10" />
        <div className="absolute inset-0 hero-vignette z-10 pointer-events-none" />
      </div>

      {/* 2. HERO CONTENT AREA */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 w-full">
        <div className="max-w-3xl text-left">
          
          {/* TAG / LUXURY BADGE */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-semibold tracking-widest uppercase mb-6 animate-fade-in-up shadow-lg">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>CURATED TRAVEL EXPERIENCES</span>
          </div>

          {/* MAIN HEADLINE */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.05] hero-text-shadow mb-6 animate-fade-in-up delay-100">
            YOUR NEXT <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-amber-200">
              JOURNEY STARTS
            </span>{' '}
            HERE<span className="text-amber-400">.</span>
          </h1>

          {/* SUPPORTING SENTENCE */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-200 font-normal leading-relaxed max-w-2xl mb-10 hero-text-shadow animate-fade-in-up delay-200">
            Discover remarkable places, find your next escape, and plan a journey made for you.
          </p>

          {/* CALL TO ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 animate-fade-in-up delay-300">
            
            {/* PRIMARY CTA */}
            <a
              href="#explore"
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full transition-all duration-300 shadow-xl shadow-amber-400/20 hover:shadow-amber-400/35 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Explore Destinations"
            >
              <span>Explore Destinations</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* SECONDARY CTA */}
            <a
              href="/planner"
              className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-md border border-white/25 hover:border-white/40 rounded-full transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label="Plan a Trip"
            >
              <Compass className="w-5 h-5 text-amber-300" />
              <span>Plan a Trip</span>
            </a>

          </div>

        </div>
      </div>

      {/* 3. SCROLL INDICATOR */}
      <ScrollIndicator />

    </section>
  );
}
