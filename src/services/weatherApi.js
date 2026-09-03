/**
 * Travelia Real-Time Weather Service
 * Normalized weather data service supporting OpenWeather API and Open-Meteo fallback API.
 */

// WMO Weather Interpretation Codes to human readable descriptions & icon identifiers
const WMO_CODE_MAP = {
  0: { condition: "Clear Sky", description: "Unclouded sunny skies", iconType: "sun" },
  1: { condition: "Mainly Clear", description: "Mostly sunny with light clouds", iconType: "cloud-sun" },
  2: { condition: "Partly Cloudy", description: "Scattered clouds with pleasant breeze", iconType: "cloud-sun" },
  3: { condition: "Overcast", description: "Overcast skies", iconType: "cloud" },
  45: { condition: "Foggy", description: "Dense morning fog", iconType: "cloud-fog" },
  48: { condition: "Depositing Rime Fog", description: "Icy mist and fog", iconType: "cloud-fog" },
  51: { condition: "Light Drizzle", description: "Gentle mist drizzle", iconType: "cloud-rain" },
  53: { condition: "Moderate Drizzle", description: "Continuous light rain", iconType: "cloud-rain" },
  55: { condition: "Dense Drizzle", description: "Heavy drizzling rain", iconType: "cloud-rain" },
  61: { condition: "Slight Rain", description: "Light rainfall", iconType: "cloud-rain" },
  63: { condition: "Moderate Rain", description: "Steady rain showers", iconType: "cloud-rain" },
  65: { condition: "Heavy Rain", description: "Heavy downpour", iconType: "cloud-rain" },
  71: { condition: "Slight Snow", description: "Light snow flurries", iconType: "cloud-snow" },
  73: { condition: "Moderate Snow", description: "Steady snowfall", iconType: "cloud-snow" },
  75: { condition: "Heavy Snow", description: "Heavy blizzard conditions", iconType: "cloud-snow" },
  80: { condition: "Rain Showers", description: "Passing rain showers", iconType: "cloud-rain" },
  81: { condition: "Moderate Showers", description: "Frequent rain showers", iconType: "cloud-rain" },
  82: { condition: "Violent Showers", description: "Torrential downpour", iconType: "cloud-rain" },
  95: { condition: "Thunderstorm", description: "Thunderstorm with rain", iconType: "cloud-lightning" },
  96: { condition: "Thunderstorm & Hail", description: "Severe thunderstorm with hail", iconType: "cloud-lightning" }
};

/**
 * Normalizes OpenWeather API response
 */
function normalizeOpenWeather(data, locationFallback) {
  const main = data.main || {};
  const weather = (data.weather && data.weather[0]) || {};
  const wind = data.wind || {};

  let iconType = "cloud-sun";
  const mainCond = (weather.main || "").toLowerCase();
  if (mainCond.includes("clear")) iconType = "sun";
  else if (mainCond.includes("rain") || mainCond.includes("drizzle")) iconType = "cloud-rain";
  else if (mainCond.includes("snow")) iconType = "cloud-snow";
  else if (mainCond.includes("thunder")) iconType = "cloud-lightning";
  else if (mainCond.includes("fog") || mainCond.includes("mist")) iconType = "cloud-fog";
  else if (mainCond.includes("cloud")) iconType = "cloud";

  return {
    locationName: data.name ? `${data.name}, ${data.sys?.country || ''}` : locationFallback,
    temperature: Math.round(main.temp ?? 20),
    feelsLike: Math.round(main.feels_like ?? main.temp ?? 20),
    condition: weather.main || "Clear",
    description: weather.description ? weather.description.charAt(0).toUpperCase() + weather.description.slice(1) : "Pleasant conditions",
    humidity: Math.round(main.humidity ?? 50),
    windSpeed: Math.round((wind.speed ?? 3) * 3.6), // m/s to km/h
    iconType: iconType,
    updatedAt: "Just now",
    updatedTimestamp: Date.now(),
    apiSource: "OpenWeather"
  };
}

/**
 * Normalizes Open-Meteo API response
 */
function normalizeOpenMeteo(data, locationFallback) {
  const current = data.current_weather || {};
  const code = current.weathercode ?? 0;
  const wmoInfo = WMO_CODE_MAP[code] || { condition: "Fair", description: "Pleasant weather", iconType: "cloud-sun" };

  // Calculate approximate relative humidity from hourly if available
  let humidity = 60;
  if (data.hourly && data.hourly.relative_humidity_2m && data.hourly.relative_humidity_2m.length > 0) {
    humidity = Math.round(data.hourly.relative_humidity_2m[0]);
  }

  const temp = Math.round(current.temperature ?? 20);

  return {
    locationName: locationFallback || "Current Location",
    temperature: temp,
    feelsLike: temp > 25 ? temp + 1 : temp < 10 ? temp - 2 : temp,
    condition: wmoInfo.condition,
    description: wmoInfo.description,
    humidity: humidity,
    windSpeed: Math.round(current.windspeed ?? 10),
    iconType: wmoInfo.iconType,
    updatedAt: "Just now",
    updatedTimestamp: Date.now(),
    apiSource: "Open-Meteo"
  };
}

/**
 * Main API function to fetch current real-time weather by coordinates
 */
export async function fetchCurrentWeather(latitude, longitude, locationName = "Target Location", signal = null) {
  if (latitude === undefined || latitude === null || longitude === undefined || longitude === null) {
    throw new Error("Invalid coordinates provided to weather service.");
  }

  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // 1. Try OpenWeather API if user provided an API key
  if (apiKey && apiKey.trim() !== "") {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey.trim()}`;
      const response = await fetch(url, { signal });
      if (response.ok) {
        const data = await response.json();
        return normalizeOpenWeather(data, locationName);
      }
    } catch (err) {
      if (err.name === 'AbortError') throw err;
      console.warn("OpenWeather API call failed, falling back to Open-Meteo:", err);
    }
  }

  // 2. Open-Meteo Free Global Weather API (Zero-config fallback)
  const openMeteoUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=relative_humidity_2m&timezone=auto`;
  const res = await fetch(openMeteoUrl, { signal });
  
  if (!res.ok) {
    throw new Error(`Weather service returned HTTP ${res.status}`);
  }

  const data = await res.json();
  return normalizeOpenMeteo(data, locationName);
}
