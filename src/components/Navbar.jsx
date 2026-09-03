import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, ArrowRight } from 'lucide-react';
import LocationStatus from './location/LocationStatus';
import LocationModal from './location/LocationModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Monitor scroll position to transition navbar background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Keyboard accessibility: Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scrolling when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (e, sectionId) => {
    setMobileMenuOpen(false);
    if (sectionId === 'planner') {
      e.preventDefault();
      navigate('/planner');
      return;
    }

    if (sectionId === 'ai-assistant' && !location.pathname.startsWith('/destination/')) {
      e.preventDefault();
      navigate('/destination/paris#ai-assistant');
      setTimeout(() => {
        const elem = document.getElementById('ai-assistant');
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 150);
      return;
    }

    if (location.pathname !== '/') {
      e.preventDefault();
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const elem = document.getElementById(sectionId);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = document.getElementById(sectionId);
      if (elem) {
        e.preventDefault();
        elem.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { name: 'Explore', id: 'explore' },
    { name: 'Destinations', id: 'explore' },
    { name: 'AI Itinerary', id: 'planner' },
    { name: 'AI Assistant', id: 'ai-assistant' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#080c14]/85 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5'
          : 'bg-gradient-to-b from-black/60 via-black/20 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* LOGO */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-md"
            aria-label="Travelia Home"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform duration-300">
              <Compass className="w-5 h-5 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white font-serif">
              Travelia<span className="text-amber-400">.</span>
            </span>
          </Link>

          {/* DESKTOP NAV LINKS */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Main Navigation">
            {navLinks.map((link, idx) => (
              <a
                key={`${link.name}-${idx}`}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-sm font-medium text-slate-200 hover:text-white transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-amber-400 hover:after:w-full after:transition-all after:duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* DESKTOP CTA BUTTON & LOCATION STATUS */}
          <div className="hidden md:flex items-center space-x-4">
            <LocationStatus />
            <a
              href="/#explore"
              onClick={(e) => handleNavClick(e, 'explore')}
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-full transition-all duration-300 shadow-md shadow-amber-400/10 hover:shadow-amber-400/25 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              <span>Plan a Trip</span>
            </a>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-lg text-slate-200 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* MOBILE OVERLAY NAVIGATION MENU */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden fixed inset-0 top-[73px] bg-[#080c14]/95 backdrop-blur-xl border-t border-white/10 z-40 animate-fade-in flex flex-col justify-between p-6 overflow-y-auto"
        >
          <nav className="flex flex-col space-y-6 pt-4" aria-label="Mobile Navigation">
            {navLinks.map((link, idx) => (
              <a
                key={`mobile-${link.name}-${idx}`}
                href={`/#${link.id}`}
                onClick={(e) => handleNavClick(e, link.id)}
                className="text-2xl font-semibold text-slate-100 hover:text-amber-400 transition-colors py-2 border-b border-white/5 flex items-center justify-between"
              >
                <span>{link.name}</span>
                <ArrowRight className="w-5 h-5 text-slate-400" />
              </a>
            ))}
          </nav>

          <div className="pt-8 pb-6 flex flex-col space-y-4">
            <div className="flex justify-center pb-2">
              <LocationStatus />
            </div>
            <a
              href="/#explore"
              onClick={(e) => handleNavClick(e, 'explore')}
              className="w-full py-4 text-center text-base font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:bg-amber-500 rounded-xl transition-all shadow-lg shadow-amber-400/20"
            >
              Plan a Trip
            </a>
            <p className="text-center text-xs text-slate-400 font-medium tracking-wider uppercase pt-2">
              Travelia — Modern Travel Experiences
            </p>
          </div>
        </div>
      )}

      {/* LOCATION SELECTOR MODAL */}
      <LocationModal />
    </header>
  );
}
