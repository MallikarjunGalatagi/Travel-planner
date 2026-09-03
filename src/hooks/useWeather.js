import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchCurrentWeather } from '../services/weatherApi';

export function useWeather(latitude, longitude, locationName = "Target Location") {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const loadWeather = useCallback(async () => {
    if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
      setWeather(null);
      setLoading(false);
      setError(null);
      return;
    }

    // Cancel any previous in-flight weather request to prevent stale overrides
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    const controller = new AbortController();
    abortControllerRef.current = controller;

    setLoading(true);
    setError(null);

    try {
      const data = await fetchCurrentWeather(latitude, longitude, locationName, controller.signal);
      setWeather(data);
      setLoading(false);
    } catch (err) {
      if (err.name === 'AbortError') {
        // Request aborted due to location change - ignore
        return;
      }
      console.error('Weather fetch error:', err);
      setError("We couldn't get the latest weather for this location.");
      setLoading(false);
    }
  }, [latitude, longitude, locationName]);

  useEffect(() => {
    loadWeather();

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadWeather]);

  return { weather, loading, error, refresh: loadWeather };
}
