import { useState, useCallback } from 'react';

export function useGeolocation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const requestPosition = useCallback(() => {
    return new Promise((resolve, reject) => {
      clearError();

      if (!navigator.geolocation) {
        const errMessage = "Geolocation is not supported by your browser. You can search for a location manually instead.";
        setError(errMessage);
        reject(new Error(errMessage));
        return;
      }

      setLoading(true);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLoading(false);
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (geoError) => {
          setLoading(false);
          let friendlyMsg = "We couldn't determine your location. You can search for a location manually instead.";

          switch (geoError.code) {
            case geoError.PERMISSION_DENIED:
              friendlyMsg = "Location access wasn't granted. You can search for a location manually instead.";
              break;
            case geoError.POSITION_UNAVAILABLE:
              friendlyMsg = "Location information is currently unavailable. Try searching for a location manually.";
              break;
            case geoError.TIMEOUT:
              friendlyMsg = "Location request timed out. You can search for a location manually instead.";
              break;
            default:
              friendlyMsg = "We couldn't determine your location. Try searching for a place instead.";
          }

          setError(friendlyMsg);
          reject(new Error(friendlyMsg));
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 min cache
        }
      );
    });
  }, [clearError]);

  return { requestPosition, loading, error, clearError };
}
