import React, { useState } from 'react';
import { useWeather } from '../../hooks/useWeather';
import WeatherIcon from './WeatherIcon';
import WeatherSkeleton from './WeatherSkeleton';
import WeatherError from './WeatherError';
import { RefreshCw, Droplets, Wind, Thermometer, CloudSun, MapPin, Sparkles } from 'lucide-react';

export default function WeatherCard({ latitude, longitude, locationName, onChangeLocation, compact = false }) {
  const { weather, loading, error, refresh } = useWeather(latitude, longitude, locationName);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshClick = async () => {
    setIsRefreshing(true);
    await refresh();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // 1. NO COORDINATES PROVIDED
  if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
    return (
      <WeatherError
        message="Choose a location to view real-time live weather conditions."
        onChangeLocation={onChangeLocation}
      />
    );
  }

  // 2. LOADING STATE
  if (loading && !weather) {
    return <WeatherSkeleton />;
  }

  // 3. ERROR STATE
  if (error && !weather) {
    return (
      <WeatherError
        message={error}
        onRetry={refresh}
        onChangeLocation={onChangeLocation}
      />
    );
  }

  if (!weather) return null;

  if (compact) {
    return (
      <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-slate-900/80 border border-white/10 text-xs">
        <WeatherIcon iconType={weather.iconType} className="w-6 h-6 text-amber-400 shrink-0" />
        <div>
          <span className="text-white font-bold text-sm block leading-none">
            {weather.temperature}°C
          </span>
          <span className="text-slate-400 text-[11px]">
            {weather.condition} • Feels {weather.feelsLike}°
          </span>
        </div>
      </div>
    );
  }

  return (
    <section id="weather" className="pt-10 pb-8 border-t border-white/10">
      
      {/* SECTION HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold tracking-[0.2em] uppercase mb-2">
            <CloudSun className="w-3.5 h-3.5 text-amber-400" />
            <span>REAL-TIME WEATHER</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight serif-title">
            Live Weather Conditions<span className="text-amber-400">.</span>
          </h3>
        </div>

        {/* REFRESH BUTTON */}
        <button
          type="button"
          onClick={handleRefreshClick}
          disabled={loading || isRefreshing}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-300 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer disabled:opacity-60"
          aria-label="Refresh weather data"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${isRefreshing || loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* WEATHER CARD CONTAINER */}
      <div className="relative w-full p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-white/10 shadow-2xl backdrop-blur-xl overflow-hidden group">
        
        {/* Subtle Background Glow */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-white/10">
          
          {/* LEFT: LOCATION & TEMPERATURE */}
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center shrink-0 shadow-lg">
              <WeatherIcon iconType={weather.iconType} className="w-9 h-9" />
            </div>

            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span className="text-sm font-bold text-slate-200">
                  {weather.locationName}
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded-full text-amber-300">
                  {weather.condition}
                </span>
              </div>

              {/* DOMINANT TEMPERATURE DISPLAY */}
              <div className="flex items-baseline gap-3">
                <span className="text-5xl sm:text-6xl font-black text-white tracking-tight font-sans">
                  {weather.temperature}°<span className="text-3xl font-light text-slate-300">C</span>
                </span>
                
                <span className="text-sm font-medium text-slate-300">
                  Feels like <strong className="text-amber-300 font-bold">{weather.feelsLike}°C</strong>
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: DESCRIPTION & TIMESTAMP */}
          <div className="text-left md:text-right space-y-1">
            <p className="text-base font-semibold text-white">
              {weather.description}
            </p>
            <p className="text-xs text-slate-400 flex items-center gap-1 md:justify-end">
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Updated {weather.updatedAt}</span>
            </p>
          </div>

        </div>

        {/* BOTTOM WEATHER STATS GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 text-xs text-slate-300">
          
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <Droplets className="w-4 h-4 text-cyan-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                Humidity
              </span>
              <span className="text-sm font-bold text-white">
                {weather.humidity}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
            <Wind className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                Wind Speed
              </span>
              <span className="text-sm font-bold text-white">
                {weather.windSpeed} km/h
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5 col-span-2 sm:col-span-1">
            <Thermometer className="w-4 h-4 text-amber-300 shrink-0" />
            <div>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 block">
                Weather Source
              </span>
              <span className="text-sm font-bold text-white">
                Live {weather.apiSource}
              </span>
            </div>
          </div>

        </div>

      </div>

    </section>
  );
}
