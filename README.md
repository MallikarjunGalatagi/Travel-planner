# 🌍 Travelia — Modern AI-Powered Global Travel Planner

> **Your Next Journey Starts Here.**  
> Travelia is an intelligent, high-performance web application designed to help travelers explore top global destinations, discover verified real-world places to visit, check live weather forecasts, calculate distance from their origin, and generate custom day-by-day travel itineraries powered by **Google Gemini AI**.

---

## 🌟 Key Features

### 🗺️ 1. 28 Curated Global Destinations
- Handpicked dataset of **28 top global travel destinations** across Europe, Asia, Americas, Africa, and the Middle East.
- Featured placement for iconic global spots including **Taj Mahal (Agra, India)** at Position #2, **Paris**, **Tokyo**, **Jaipur (Pink City)**, **Rome**, **Banff**, **Santorini**, **Machu Picchu**, **Dubai**, **New York City**, and **Petra**.
- Rich destination metadata: language, currency, timezone, coordinates, best time to visit, and curated highlights.

### 🏛️ 2. 210 Real-World Verified Places to Visit
- Every destination features **EXACTLY 7 authentic, real-world verified landmarks** (210 total places).
- Includes suggested visit duration, ideal visiting seasons, exact location addresses, category tags, and key highlights.
- Examples include *Mehtab Bagh*, *Fatehpur Sikri*, *Baby Taj*, *Eiffel Tower*, *Louvre Museum*, *Hawa Mahal*, *Amber Fort*, *Shibuya Crossing*, *Colosseum*, *Blue Lagoon*, and *Al-Khazneh*.

### 🤖 3. Built-in Gemini AI Travel Assistant
- Integrated with Google's `@google/genai` SDK using the **Gemini 2.5** model.
- Provides real-time, context-aware travel Q&A for every destination.
- Instant suggested starters (e.g., *"Best 3-day itinerary"*, *"Local food recommendations"*, *"Ideal travel season"*).

### 🗓️ 4. Custom AI Day-by-Day Itinerary Planner
- Generate personalized multi-day travel schedules (1 to 14 days).
- Customization options for travel style (Solo, Couple, Family, Friends), budget level, and interest tags (Culture, Food, Adventure, Nature, Relaxation).
- Interactive itinerary view complete with daily morning, afternoon, and evening breakdowns, local tips, and export options.

### 🌦️ 5. Real-Time Weather Integration
- Live weather widget integrated across destination detail pages and origin location banners.
- Powered by **Open-Meteo** and **OpenWeather** APIs.
- Displays current temperature (°C / °F), weather conditions (Sunny, Rain, Snow, Clouds), wind speed, and humidity.

### 📍 6. Location Awareness & Distance Calculation
- Auto-detect origin via HTML5 Geolocation API or search any city worldwide.
- Reverse geocoding powered by **OpenStreetMap Nominatim API**.
- Calculates exact origin-to-destination distance in kilometers using the mathematical **Haversine formula**.

### 🖼️ 7. Dynamic High-Resolution Image Engine
- Custom-built image caching and fetching service ([`imageApi.js`](file:///d:/project/Travel%20site/src/services/imageApi.js)).
- Features **100% unique, non-duplicated Unsplash CDN image URLs** mapped to every destination and all 210 famous places.
- Graceful fallbacks and lazy-loading for optimal performance.

### 🔍 8. Predictive Live Search Autocomplete
- Glassmorphic floating search dropdown ([`DestinationSearch.jsx`](file:///d:/project/Travel%20site/src/components/destinations/DestinationSearch.jsx)).
- Search in real-time across destination names, countries, regions, travel categories, and individual landmark place names.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology / Library |
| :--- | :--- |
| **Frontend Framework** | React 19 + Vite 8 |
| **Styling & UI** | Tailwind CSS v4 + Lucide React Icons |
| **Routing** | React Router DOM v7 |
| **AI Integration** | `@google/genai` (Google Gemini 2.5 API) |
| **State Management** | React Context API (`LocationContext`) |
| **Geocoding & Maps** | OpenStreetMap Nominatim API + Haversine Distance Formula |
| **Weather Engine** | Open-Meteo & OpenWeather REST APIs |
| **Media & Assets** | Unsplash CDN + Pexels API + HTML5 Video |

---

## 🔌 APIs Used

1. **Google Gemini AI API (`@google/genai`)**:
   - Generates intelligent day-by-day travel itineraries and answers conversational destination questions in real-time.
2. **OpenStreetMap Nominatim Reverse Geocoding API**:
   - Converts raw GPS latitude and longitude coordinates into human-readable city, state, and country names.
3. **Open-Meteo Live Weather API**:
   - Fetches real-time weather observations, temperatures, and atmospheric conditions for global destination coordinates.
4. **Unsplash CDN Image API**:
   - Delivers high-definition cover photos and landmark imagery across 28 destinations and 210 famous places.
5. **HTML5 Geolocation API**:
   - Enables browser-native origin location detection for distance calculation.

---

## 🚀 How to Run Locally

### Prerequisites
- **Node.js**: Version `v18.0.0` or higher (`v22.x` recommended)
- **npm**: Version `v9.x` or higher

### Step-by-Step Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/MallikarjunGalatagi/Travel-planner.git
cd Travel-planner
```

#### 2. Install Dependencies
```bash
npm install
```

#### 3. Configure Environment Variables
Create a `.env` file in the root directory:
```env
# Optional: Google Gemini API Key for AI Assistant & Itinerary Planner
VITE_GEMINI_API_KEY=your_google_gemini_api_key_here

# Optional: Unsplash API Key for live dynamic image search
VITE_IMAGE_API_KEY=your_unsplash_api_key_here
```
> *Note: If no API key is supplied, Travelia gracefully falls back to built-in curated responses and pre-configured image registries.*

#### 4. Start Development Server
```bash
npx vite --port 3000
```
Open your browser and navigate to **`http://localhost:3000`**.

#### 5. Build for Production
```bash
npx vite build
```
The optimized production build output will be generated in the `dist/` directory.

---

## 📁 Directory Structure

```text
Travel site/
├── public/
│   ├── assets/              # Static videos and fallback imagery
│   └── favicon.svg          # Travelia brand favicon
├── src/
│   ├── components/
│   │   ├── chat/            # TravelChatbot AI Assistant component
│   │   ├── destinations/    # DestinationExplorer, Grid, Card, Filters, Search
│   │   ├── itinerary/       # Itinerary form, generator, day view, modals
│   │   ├── location/        # LocationSelector banner & LocationModal
│   │   ├── places/          # FamousPlaces grid, PlaceCard, PlaceModal
│   │   ├── weather/         # WeatherCard & WeatherIcon widgets
│   │   ├── Hero.jsx         # Hero video header section
│   │   └── Navbar.jsx       # Fixed header navigation with Travelia branding
│   ├── context/
│   │   └── LocationContext.jsx  # Origin location & distance state manager
│   ├── data/
│   │   ├── destinations.js  # 28 curated global destinations dataset
│   │   └── places.js        # 210 real-world famous places dataset (7 per dest)
│   ├── pages/
│   │   ├── Home.jsx               # Landing page with Explorer & Location banner
│   │   ├── DestinationDetails.jsx # Detailed destination overview & famous places
│   │   └── ItineraryPlanner.jsx   # Standalone AI Itinerary Generator page
│   ├── services/
│   │   ├── geminiApi.js     # Google Gemini AI API integration
│   │   ├── imageApi.js      # Dynamic Unsplash image registry & caching
│   │   ├── locationApi.js   # Nominatim geocoding & Haversine distance calculator
│   │   └── weatherApi.js    # Open-Meteo live weather provider
│   ├── App.jsx              # Main React Router setup
│   └── main.jsx             # React DOM entrypoint
├── index.html               # Main HTML entrypoint with Travelia metadata
├── package.json             # Dependencies and build scripts
└── vite.config.js           # Vite build configuration
```

---

## 📝 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👨‍💻 Developed By

Crafted with ❤️ by **Mallikarjun Galatagi** for modern travel experiences.
