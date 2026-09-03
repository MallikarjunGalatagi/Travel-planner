import React, { createContext, useContext, useState, useEffect } from 'react';
import { useGeolocation } from '../hooks/useGeolocation';
import { reverseGeocode } from '../services/locationApi';

const LocationContext = createContext();

const STORAGE_KEY = 'travelia_user_location';

export function LocationProvider({ children }) {
  const [location, setLocationState] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resolvingAddress, setResolvingAddress] = useState(false);
  const { requestPosition, loading: geoLoading, error: geoError, clearError } = useGeolocation();

  // Save location to sessionStorage whenever updated
  useEffect(() => {
    try {
      if (location) {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(location));
      } else {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    } catch (e) {
      console.warn('Failed to save location to sessionStorage:', e);
    }
  }, [location]);

  // Trigger browser Geolocation request
  const detectGeolocation = async () => {
    clearError();
    try {
      const coords = await requestPosition();
      setResolvingAddress(true);
      const resolvedLocation = await reverseGeocode(coords.latitude, coords.longitude);
      setLocationState(resolvedLocation);
      setResolvingAddress(false);
      return resolvedLocation;
    } catch (err) {
      setResolvingAddress(false);
      throw err;
    }
  };

  // Set location from manual search selection
  const selectSearchLocation = (selectedLoc) => {
    clearError();
    const locObj = {
      name: selectedLoc.name,
      country: selectedLoc.country,
      region: selectedLoc.region,
      latitude: selectedLoc.latitude,
      longitude: selectedLoc.longitude,
      formattedAddress: selectedLoc.formattedAddress || `${selectedLoc.name}, ${selectedLoc.country}`,
      source: 'search'
    };
    setLocationState(locObj);
  };

  // Reset / Clear location
  const clearLocation = () => {
    clearError();
    setLocationState(null);
  };

  const openLocationModal = () => setIsModalOpen(true);
  const closeLocationModal = () => setIsModalOpen(false);

  const value = {
    location,
    isLoading: geoLoading || resolvingAddress,
    error: geoError,
    isModalOpen,
    openLocationModal,
    closeLocationModal,
    detectGeolocation,
    selectSearchLocation,
    clearLocation,
    clearError
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocationContext() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocationContext must be used within a LocationProvider');
  }
  return context;
}
