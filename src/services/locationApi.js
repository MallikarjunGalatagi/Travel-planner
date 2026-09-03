/**
 * Travelia Location & Geocoding Service
 * Provides reverse geocoding for GPS coordinates and forward location search.
 * Combines online OpenStreetMap Nominatim geocoding API with a rich offline fallback dataset.
 */

// Fallback city database for instant search response & offline resilience
const POPULAR_CITIES = [
  { name: "Bengaluru", region: "Karnataka", country: "India", latitude: 12.9716, longitude: 77.5946 },
  { name: "Mumbai", region: "Maharashtra", country: "India", latitude: 19.0760, longitude: 72.8777 },
  { name: "New Delhi", region: "Delhi", country: "India", latitude: 28.6139, longitude: 77.2090 },
  { name: "London", region: "Greater London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  { name: "Paris", region: "Île-de-France", country: "France", latitude: 48.8566, longitude: 2.3522 },
  { name: "New York", region: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  { name: "Tokyo", region: "Kanto", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
  { name: "Sydney", region: "New South Wales", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
  { name: "Dubai", region: "Dubai", country: "United Arab Emirates", latitude: 25.2048, longitude: 55.2708 },
  { name: "Singapore", region: "Central", country: "Singapore", latitude: 1.3521, longitude: 103.8198 },
  { name: "Rome", region: "Lazio", country: "Italy", latitude: 41.9028, longitude: 12.4964 },
  { name: "Berlin", region: "Berlin", country: "Germany", latitude: 52.5200, longitude: 13.4050 },
  { name: "Toronto", region: "Ontario", country: "Canada", latitude: 43.6532, longitude: -79.3832 },
  { name: "San Francisco", region: "California", country: "United States", latitude: 37.7749, longitude: -122.4194 },
  { name: "Los Angeles", region: "California", country: "United States", latitude: 34.0522, longitude: -118.2437 },
  { name: "Barcelona", region: "Catalonia", country: "Spain", latitude: 41.3851, longitude: 2.1734 },
  { name: "Amsterdam", region: "North Holland", country: "Netherlands", latitude: 52.3676, longitude: 4.9041 },
  { name: "Cape Town", region: "Western Cape", country: "South Africa", latitude: -33.9249, longitude: 18.4241 },
  { name: "Rio de Janeiro", region: "Rio de Janeiro", country: "Brazil", latitude: -22.9068, longitude: -43.1729 },
  { name: "Bangkok", region: "Bangkok", country: "Thailand", latitude: 13.7563, longitude: 100.5018 }
];

/**
 * Calculate distance between two lat/lng points using Haversine formula (returns kilometers)
 */
export function calculateDistanceKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c);
}

/**
 * Reverse geocode coordinates to a human-readable location
 */
export async function reverseGeocode(latitude, longitude) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&accept-language=en`,
      { signal: controller.signal, headers: { 'User-Agent': 'TraveliaTravelApp/1.0' } }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const address = data.address || {};
      const name = address.city || address.town || address.village || address.county || data.display_name.split(',')[0];
      const country = address.country || '';
      const region = address.state || address.region || '';

      return {
        name: name || 'Current Location',
        country: country,
        region: region,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        formattedAddress: [name, region, country].filter(Boolean).join(', '),
        source: 'geolocation'
      };
    }
  } catch (err) {
    console.warn('Network reverse geocode failed or timed out, using proximity fallback:', err);
  }

  // Proximity fallback using local popular cities list
  let closest = POPULAR_CITIES[0];
  let minDistance = calculateDistanceKm(latitude, longitude, closest.latitude, closest.longitude);

  for (const city of POPULAR_CITIES) {
    const dist = calculateDistanceKm(latitude, longitude, city.latitude, city.longitude);
    if (dist < minDistance) {
      minDistance = dist;
      closest = city;
    }
  }

  // If within 150km, return city name; otherwise return coordinates summary
  if (minDistance <= 150) {
    return {
      name: closest.name,
      country: closest.country,
      region: closest.region,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      formattedAddress: `${closest.name}, ${closest.country}`,
      source: 'geolocation'
    };
  }

  return {
    name: 'Your GPS Position',
    country: '',
    region: '',
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
    formattedAddress: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
    source: 'geolocation'
  };
}

/**
 * Search locations by text query (debounced)
 */
export async function searchLocations(query) {
  if (!query || query.trim().length < 2) return [];

  const cleanQuery = query.trim().toLowerCase();

  // 1. First filter local cities for instant response
  const localMatches = POPULAR_CITIES.filter((city) => {
    return (
      city.name.toLowerCase().includes(cleanQuery) ||
      city.country.toLowerCase().includes(cleanQuery) ||
      city.region.toLowerCase().includes(cleanQuery)
    );
  }).map((city) => ({
    name: city.name,
    country: city.country,
    region: city.region,
    latitude: city.latitude,
    longitude: city.longitude,
    formattedAddress: `${city.name}, ${city.region ? city.region + ', ' : ''}${city.country}`,
    source: 'search'
  }));

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
        cleanQuery
      )}&format=json&addressdetails=1&limit=5&accept-language=en`,
      { signal: controller.signal, headers: { 'User-Agent': 'TraveliaTravelApp/1.0' } }
    );
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = await response.json();
      const apiMatches = data.map((item) => {
        const addr = item.address || {};
        const name = addr.city || addr.town || addr.village || item.display_name.split(',')[0];
        const country = addr.country || '';
        const region = addr.state || addr.region || '';
        return {
          name: name,
          country: country,
          region: region,
          latitude: parseFloat(item.lat),
          longitude: parseFloat(item.lon),
          formattedAddress: [name, region, country].filter(Boolean).join(', '),
          source: 'search'
        };
      });

      // Deduplicate results by name & country
      const combined = [...localMatches];
      apiMatches.forEach((apiItem) => {
        if (!combined.some((c) => c.name.toLowerCase() === apiItem.name.toLowerCase())) {
          combined.push(apiItem);
        }
      });
      return combined.slice(0, 6);
    }
  } catch (err) {
    console.warn('Network location search failed, returning local matches:', err);
  }

  return localMatches;
}
