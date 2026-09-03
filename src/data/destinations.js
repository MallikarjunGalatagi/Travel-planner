/**
 * Travelia Structured Destination Data Model
 * Reusable dataset for Destination Explorer, Details Pages, and future modules.
 * Curated 28 unique global travel destinations fitting a perfect 4-column grid layout (7 full rows of 4 cards).
 */

export const DESTINATIONS = [
  // 1. PARIS, FRANCE
  {
    id: "paris",
    name: "Paris",
    country: "France",
    region: "Europe",
    coordinates: { latitude: 48.8566, longitude: 2.3522 },
    categories: ["Culture", "Romance", "Landmark"],
    shortDescription: "The City of Light famous for the Eiffel Tower, world-class art at the Louvre, and romantic Seine river cruises.",
    description: "Paris stands as a global center for art, fashion, gastronomy, and culture. Its 19th-century cityscape is crisscrossed by wide boulevards and the River Seine. Beyond such landmarks as the Eiffel Tower and the 12th-century Gothic Notre-Dame cathedral, the city is known for its cafe culture and designer boutiques along the Rue du Faubourg Saint-Honoré.",
    bestTimeToVisit: "June to August & September to October",
    language: "French",
    currency: "Euro (€)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Ascend to the summit of the Eiffel Tower for panoramic city views",
      "Explore thousands of masterpieces inside the Louvre Museum",
      "Stroll along the historic Champs-Élysées to the Arc de Triomphe",
      "Enjoy a sunset boat cruise along the River Seine"
    ],
    famousPlaces: [
      "Eiffel Tower",
      "Louvre Museum",
      "Arc de Triomphe",
      "Notre-Dame Cathedral",
      "Sacré-Cœur Basilica",
      "Palace of Versailles",
      "Sainte-Chapelle"
    ],
    imageQuery: "paris france travel"
  },

  // 2. TAJ MAHAL (AGRA, INDIA) — POSITIONED AT #2 AS REQUESTED
  {
    id: "taj-mahal",
    name: "Taj Mahal (Agra)",
    country: "India",
    region: "Asia",
    coordinates: { latitude: 27.1751, longitude: 78.0421 },
    categories: ["Wonder of the World", "Culture", "Romance"],
    shortDescription: "An immortal monument to love built of pure white marble, featuring symmetrical reflection pools and Mughal gardens.",
    description: "Located on the southern bank of the Yamuna River in Agra, the Taj Mahal is an ivory-white marble mausoleum commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. Regarded as the pinnacle of Mughal architecture and a universally admired UNESCO World Heritage masterpiece.",
    bestTimeToVisit: "October to March (Cool season)",
    language: "Hindi & English",
    currency: "Indian Rupee (₹)",
    timezone: "Indian Standard Time (UTC+5:30)",
    highlights: [
      "Witness the white marble changing colors from pink at sunrise to golden at sunset",
      "Marvel at the intricate pietra dura semi-precious stone inlay work",
      "Walk through the symmetrical Mughal Charbagh reflection gardens",
      "Explore nearby Agra Fort and Mehtab Bagh moonlight garden views"
    ],
    famousPlaces: [
      "Taj Mahal",
      "Agra Fort",
      "Mehtab Bagh",
      "Fatehpur Sikri",
      "Tomb of I'timād-ud-Daulah (Baby Taj)",
      "Tomb of Akbar the Great (Sikandra)",
      "Jama Masjid of Agra"
    ],
    imageQuery: "taj mahal (agra) india travel"
  },

  // 3. TOKYO, JAPAN
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    region: "Asia",
    coordinates: { latitude: 35.6762, longitude: 139.6503 },
    categories: ["City", "Culture", "Food"],
    shortDescription: "A dazzling metropolis blending ultramodern skyscrapers, neon-lit streets, historic Shinto shrines, and world-class culinary scenes.",
    description: "Japan's bustling capital mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples. The opulent Meiji Shinto Shrine is known for its towering gate and surrounding woods. The Imperial Palace sits amid large public gardens. The city is also famed for its vibrant pop culture in Akihabara and world-leading Michelin dining.",
    bestTimeToVisit: "March to May (Cherry Blossom) & September to November",
    language: "Japanese",
    currency: "Japanese Yen (¥)",
    timezone: "Japan Standard Time (UTC+9)",
    highlights: [
      "Cross the world-famous Shibuya Scramble intersection",
      "Visit Tokyo's oldest temple, Sensō-ji in historic Asakusa",
      "Take in 360-degree skyline panoramas from Tokyo Skytree",
      "Savor authentic sushi at the bustling Tsukiji Outer Market"
    ],
    famousPlaces: [
      "Shibuya Crossing",
      "Sensō-ji Temple",
      "Tokyo Skytree",
      "Meiji Jingu Shrine",
      "Akihabara Electric Town",
      "Tsukiji Outer Market",
      "Shinjuku Gyoen National Garden"
    ],
    imageQuery: "tokyo japan travel"
  },

  // 4. AMALFI COAST, ITALY
  {
    id: "amalfi-coast",
    name: "Amalfi Coast",
    country: "Italy",
    region: "Europe",
    coordinates: { latitude: 40.6340, longitude: 14.6027 },
    categories: ["Coastal", "Romance", "Food"],
    shortDescription: "Dramatic Mediterranean sea cliffs dotted with pastel-colored villages, lemon groves, and cliffside infinity pools.",
    description: "The Amalfi Coast is a 50-kilometer stretch of coastline along the southern edge of Italy's Sorrento Peninsula, in the Campania region. It's a popular holiday destination featuring sheer cliffs and a rugged shoreline dotted with small beaches and pastel-colored fishing villages.",
    bestTimeToVisit: "May to June & September to October",
    language: "Italian",
    currency: "Euro (€)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Explore the steep, pastel-colored cliffside village of Positano",
      "Hike the scenic Path of the Gods along mountain ridges",
      "Visit the mountaintop gardens of Villa Rufolo in Ravello",
      "Taste fresh authentic Limoncello crafted from local Amalfi lemons"
    ],
    famousPlaces: [
      "Positano Village",
      "Path of the Gods",
      "Villa Rufolo (Ravello)",
      "Blue Grotto (Capri)",
      "Sorrento Historic Center",
      "Amalfi Cathedral",
      "Emerald Cave"
    ],
    imageQuery: "amalfi coast italy travel"
  },

  // 5. JAIPUR (PINK CITY, INDIA)
  {
    id: "jaipur",
    name: "Jaipur (Pink City)",
    country: "India",
    region: "Asia",
    coordinates: { latitude: 26.9124, longitude: 75.7873 },
    categories: ["Culture", "Landmark", "Heritage"],
    shortDescription: "The capital of Rajasthan, famous for its terracotta pink palaces, honeycomb facade of Hawa Mahal, and hilltop Amber Fort.",
    description: "Known as the Pink City due to the distinct terracotta color of its historic buildings, Jaipur forms India's Golden Triangle alongside Delhi and Agra. Founded in 1727 by Maharaja Sawai Jai Singh II, it houses royal heritage structures including Hawa Mahal, Amber Fort, and the UNESCO Jantar Mantar observatory.",
    bestTimeToVisit: "October to March",
    language: "Hindi, Rajasthani & English",
    currency: "Indian Rupee (₹)",
    timezone: "Indian Standard Time (UTC+5:30)",
    highlights: [
      "Admire the 953 honeycomb windows of Hawa Mahal (Palace of Winds)",
      "Explore the hilltop Amber Fort and its shimmering Sheesh Mahal mirror palace",
      "Tour the City Palace and its vibrant peacock doorways",
      "Sunset views over the Pink City from Nahargarh Fort"
    ],
    famousPlaces: [
      "Hawa Mahal",
      "Amber Fort",
      "City Palace, Jaipur",
      "Jantar Mantar",
      "Nahargarh Fort",
      "Jal Mahal",
      "Jaigarh Fort"
    ],
    imageQuery: "jaipur (pink city) india travel"
  },

  // 6. BANFF NATIONAL PARK, CANADA
  {
    id: "banff",
    name: "Banff National Park",
    country: "Canada",
    region: "Americas",
    coordinates: { latitude: 51.4968, longitude: -115.9281 },
    categories: ["Nature", "Adventure", "Mountains"],
    shortDescription: "Canada's oldest national park featuring turquoise glacial lakes, soaring Canadian Rocky Mountain peaks, and abundant wildlife.",
    description: "Banff National Park encompasses 6,641 square kilometers of mountainous terrain, with numerous glaciers, ice fields, dense coniferous forest, and alpine landscapes. The Icefields Parkway extends from Lake Louise, connecting to Jasper National Park in the north.",
    bestTimeToVisit: "June to August (Hiking) & December to March (Skiing)",
    language: "English & French",
    currency: "Canadian Dollar ($)",
    timezone: "Mountain Standard Time (UTC-7)",
    highlights: [
      "Canoe across the crystal turquoise waters of Lake Louise",
      "Marvel at the intense blue waters of Moraine Lake in the Valley of the Ten Peaks",
      "Ride the Banff Gondola up Sulphur Mountain for 360-degree Rocky Mountain views",
      "Drive the scenic Icefields Parkway past glaciers and waterfalls"
    ],
    famousPlaces: [
      "Lake Louise",
      "Moraine Lake",
      "Johnston Canyon",
      "Banff Gondola",
      "Peyto Lake",
      "Lake Minnewanka",
      "Bow Falls"
    ],
    imageQuery: "banff national park canada travel"
  },

  // 7. SANTORINI, GREECE
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    region: "Europe",
    coordinates: { latitude: 36.3932, longitude: 25.4615 },
    categories: ["Coastal", "Romance", "Island"],
    shortDescription: "A volcanic Aegean island world-famous for whitewashed cliffside villages, blue-domed churches, and iconic sunsets.",
    description: "Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera.",
    bestTimeToVisit: "Late April to early November",
    language: "Greek",
    currency: "Euro (€)",
    timezone: "Eastern European Time (UTC+2)",
    highlights: [
      "Watch the world-famous sunset from the ruins of Oia Castle",
      "Photograph the iconic blue-domed churches of Oia and Fira",
      "Swim at the distinctive Red Beach and volcanic black sand beaches",
      "Take a catamaran sailing cruise inside the volcanic caldera"
    ],
    famousPlaces: [
      "Oia Blue Domes",
      "Fira Caldera Path",
      "Red Beach",
      "Akrotiri Ruins",
      "Ammoudi Bay",
      "Prophet Elias Monastery",
      "Perissa Black Sand Beach"
    ],
    imageQuery: "santorini greece travel"
  },

  // 8. RIO DE JANEIRO, BRAZIL
  {
    id: "rio-de-janeiro",
    name: "Rio de Janeiro",
    country: "Brazil",
    region: "Americas",
    coordinates: { latitude: -22.9068, longitude: -43.1729 },
    categories: ["City", "Coastal", "Culture"],
    shortDescription: "A vibrant coastal city famed for Christ the Redeemer, Sugarloaf Mountain cable cars, and Copacabana beach culture.",
    description: "Rio de Janeiro is a huge seaside city in Brazil, famed for its Copacabana and Ipanema beaches, 38m Christ the Redeemer statue atop Mount Corcovado and for Sugarloaf Mountain, a granite peak with cable cars to its summit. The city is also known for its sprawling favelas and annual Carnival festival.",
    bestTimeToVisit: "December to March (Summer & Carnival)",
    language: "Portuguese",
    currency: "Brazilian Real (R$)",
    timezone: "Brasília Time (UTC-3)",
    highlights: [
      "Stand at the feet of Christ the Redeemer statue atop Corcovado",
      "Ride the glass cable car up Sugarloaf Mountain for sunset views",
      "Stroll the wave-patterned promenade of Copacabana and Ipanema beaches",
      "Climb the colorful tile-covered steps of Escadaria Selarón"
    ],
    famousPlaces: [
      "Christ the Redeemer",
      "Sugarloaf Mountain",
      "Copacabana Beach",
      "Escadaria Selarón",
      "Tijuca National Park",
      "Ipanema Beach",
      "Santa Teresa"
    ],
    imageQuery: "rio de janeiro brazil travel"
  },

  // 9. CAPE TOWN, SOUTH AFRICA
  {
    id: "cape-town",
    name: "Cape Town",
    country: "South Africa",
    region: "Africa",
    coordinates: { latitude: -33.9249, longitude: 18.4241 },
    categories: ["Coastal", "Nature", "Culture"],
    shortDescription: "A breathtaking coastal city where flat-topped Table Mountain meets penguin coves and dramatic ocean capes.",
    description: "Cape Town is a port city on South Africa's southwest coast, on a peninsula beneath the imposing Table Mountain. Slowly rotating cable cars climb to the mountain's flat top, offering sweeping views of the city, the busy harbor and boats heading for Robben Island.",
    bestTimeToVisit: "October to April (Warm summer)",
    language: "English, Afrikaans, Xhosa",
    currency: "South African Rand (R)",
    timezone: "South Africa Standard Time (UTC+2)",
    highlights: [
      "Take the revolving cable car to the top of Table Mountain",
      "Walk alongside wild African penguins at Boulders Beach",
      "Drive to the dramatic cliffs of Cape Point and Cape of Good Hope",
      "Explore the colorful historic houses of the Bo-Kaap neighborhood"
    ],
    famousPlaces: [
      "Table Mountain",
      "Boulders Beach",
      "Cape Point",
      "V&A Waterfront",
      "Kirstenbosch Gardens",
      "Bo-Kaap",
      "Lion's Head"
    ],
    imageQuery: "cape town south africa travel"
  },

  // 10. SWISS ALPS, SWITZERLAND
  {
    id: "swiss-alps",
    name: "Swiss Alps",
    country: "Switzerland",
    region: "Europe",
    coordinates: { latitude: 46.5601, longitude: 8.5612 },
    categories: ["Mountains", "Nature", "Adventure"],
    shortDescription: "Majestic alpine peaks, iconic Matterhorn pyramid, crystal clear mountain lakes, and scenic glacier trains.",
    description: "The Swiss Alps region offers some of Europe's most spectacular mountain scenery. From the iconic pyramid peak of the Matterhorn in Zermatt to the high-altitude ice landscapes of Jungfraujoch, the region is a paradise for outdoor enthusiasts, offering world-class skiing in winter and panoramic alpine hiking in summer.",
    bestTimeToVisit: "June to September (Hiking) & December to April (Skiing)",
    language: "German, French, Italian",
    currency: "Swiss Franc (CHF)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Marvel at the iconic pyramid silhouette of the Matterhorn in Zermatt",
      "Journey on the Glacier Express, the world's most famous panoramic mountain train",
      "Ascend to Jungfraujoch - Top of Europe, Europe's highest railway station",
      "Hike around crystal-clear alpine reflection lakes like Oeschinensee"
    ],
    famousPlaces: [
      "The Matterhorn",
      "Jungfraujoch",
      "Glacier Express",
      "Oeschinen Lake",
      "Grindelwald First",
      "Mount Pilatus",
      "Trümmelbach Falls"
    ],
    imageQuery: "swiss alps switzerland travel"
  },

  // 11. BALI, INDONESIA
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    region: "Asia",
    coordinates: { latitude: -8.4095, longitude: 115.1889 },
    categories: ["Island", "Culture", "Relaxation"],
    shortDescription: "An Indonesian tropical paradise renowned for emerald rice terraces, cliffside sea temples, and spiritual wellness.",
    description: "Bali is an Indonesian island known for its forested volcanic mountains, iconic rice paddies, beaches and coral reefs. The island is home to religious sites such as cliffside Uluwatu Temple. To the south, the beachside city of Kuta has lively bars, while Seminyak, Sanur and Nusa Dua are popular resort towns.",
    bestTimeToVisit: "April to October (Dry season)",
    language: "Indonesian & Balinese",
    currency: "Indonesian Rupiah (Rp)",
    timezone: "Central Indonesia Time (UTC+8)",
    highlights: [
      "Wander through the emerald stepped Tegallalang Rice Terraces in Ubud",
      "Watch the sunset Kecak Fire Dance at the cliffside Uluwatu Temple",
      "Visit the iconic offshore Tanah Lot temple surrounded by crashing waves",
      "Experience a traditional Balinese water purification ritual at Tirta Empul"
    ],
    famousPlaces: [
      "Tegallalang Rice Terraces",
      "Uluwatu Temple",
      "Tanah Lot Temple",
      "Sacred Monkey Forest",
      "Mount Batur",
      "Tirta Empul Temple",
      "Gates of Heaven"
    ],
    imageQuery: "bali indonesia travel"
  },

  // 12. REYKJAVIK, ICELAND
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    region: "Europe",
    coordinates: { latitude: 64.1466, longitude: -21.9426 },
    categories: ["Nature", "Adventure", "Landmark"],
    shortDescription: "Gateway to Iceland's volcanic land of fire and ice, geothermal blue lagoons, cascading waterfalls, and Northern Lights.",
    description: "Reykjavik, on the coast of Iceland, is the country's capital and largest city. It's home to the National and Saga museums, tracing Iceland's Viking history. The striking concrete Hallgrímskirkja church and rotating Perlan glass dome offer views of the sea and nearby hills.",
    bestTimeToVisit: "September to March (Northern Lights) & June to August (Midnight Sun)",
    language: "Icelandic",
    currency: "Icelandic Króna (kr)",
    timezone: "Greenwich Mean Time (UTC+0)",
    highlights: [
      "Soak in the mineral-rich geothermal waters of the Blue Lagoon",
      "Tour the Golden Circle: Gullfoss Waterfall, Geysir, and Þingvellir National Park",
      "Witness the dancing colors of the Northern Lights (Aurora Borealis)",
      "Walk along the black volcanic sand beach of Reynisfjara"
    ],
    famousPlaces: [
      "Blue Lagoon",
      "Gullfoss Waterfall",
      "Strokkur Geysir",
      "Hallgrímskirkja",
      "Reynisfjara Beach",
      "Þingvellir National Park",
      "Harpa Concert Hall"
    ],
    imageQuery: "reykjavik iceland travel"
  },

  // 13. CAIRO, EGYPT
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    region: "Africa",
    coordinates: { latitude: 30.0444, longitude: 31.2357 },
    categories: ["Culture", "Landmark", "Heritage"],
    shortDescription: "The ancient cradle of civilization home to the Great Pyramids of Giza, the Sphinx, and Egyptian Museum treasures.",
    description: "Cairo, Egypt’s sprawling capital, is set on the Nile River. At its heart is Tahrir Square and the vast Egyptian Museum, a trove of antiquities including royal mummies and gilded King Tutankhamun artifacts. Nearby, Giza is the site of the iconic pyramids and Great Sphinx, dating to the 26th century BC.",
    bestTimeToVisit: "October to April (Mild winter)",
    language: "Arabic",
    currency: "Egyptian Pound (E£)",
    timezone: "Eastern European Time (UTC+2)",
    highlights: [
      "Stand in awe before the Great Pyramids of Giza and the limestone Sphinx",
      "Explore the vast collection of ancient pharaonic treasures at the Grand Egyptian Museum",
      "Bargain for lamps and spices in the bustling 14th-century Khan el-Khalili bazaar",
      "Sail along the Nile River on a traditional wooden felucca boat at sunset"
    ],
    famousPlaces: [
      "Great Pyramids of Giza",
      "Grand Egyptian Museum",
      "Khan el-Khalili Bazaar",
      "Citadel of Saladin",
      "Nile Felucca Ride",
      "Saqqara Step Pyramid",
      "Hanging Church"
    ],
    imageQuery: "cairo egypt travel"
  },

  // 14. MALDIVES
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    region: "Asia",
    coordinates: { latitude: 3.2028, longitude: 73.2207 },
    categories: ["Island", "Romance", "Relaxation"],
    shortDescription: "Tropical archipelagos of pristine white sand islands, crystal-clear turquoise lagoons, and luxury overwater villas.",
    description: "The Maldives is a tropical nation in the Indian Ocean composed of 26 ring-shaped atolls, which are made up of more than 1,000 coral islands. It’s known for its beaches, blue lagoons and extensive reefs. The capital, Malé, has a bustling fish market, restaurants and shops on the main road, Majeedhee Magu.",
    bestTimeToVisit: "November to April (Dry monsoon)",
    language: "Dhivehi",
    currency: "Maldivian Rufiyaa (Rf)",
    timezone: "Maldives Time (UTC+5)",
    highlights: [
      "Stay in a luxurious overwater bungalow with direct lagoon access",
      "Snorkel alongside sea turtles and manta rays in vibrant coral reefs",
      "Relax on powder-soft white sand beaches surrounded by crystal turquoise waters",
      "Dine in an underwater glass restaurant surrounded by marine life"
    ],
    famousPlaces: [
      "Overwater Bungalows",
      "Baa Atoll Biosphere",
      "Banana Reef",
      "Vaadhoo Island (Sea of Stars)",
      "Malé Fish Market",
      "Ari Atoll Sandbanks",
      "Subsix Underwater Restaurant"
    ],
    imageQuery: "maldives maldives travel"
  },

  // 15. ROME, ITALY
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    region: "Europe",
    coordinates: { latitude: 41.9028, longitude: 12.4964 },
    categories: ["Culture", "Landmark", "Food"],
    shortDescription: "The Eternal City filled with ancient Roman Colosseum ruins, Vatican Museums, Trevi Fountain, and authentic pasta trattorias.",
    description: "Rome, Italy’s capital, is a sprawling, cosmopolitan city with nearly 3,000 years of globally influential art, architecture and culture on display. Ancient ruins such as the Forum and the Colosseum evoke the power of the former Roman Empire. Vatican City, headquarters of the Roman Catholic Church, has St. Peter’s Basilica and the Sistine Chapel.",
    bestTimeToVisit: "April to May & September to October",
    language: "Italian",
    currency: "Euro (€)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Step inside the ancient Colosseum arena and imagine gladiatorial contests",
      "Throw a coin into the Travertine marble Trevi Fountain to ensure your return to Rome",
      "Marvel at Michelangelo's Sistine Chapel ceiling inside the Vatican Museums",
      "Admire the ancient dome and oculus of the remarkably preserved Pantheon"
    ],
    famousPlaces: [
      "Colosseum",
      "St. Peter's Basilica",
      "Trevi Fountain",
      "Pantheon",
      "Roman Forum",
      "Spanish Steps",
      "Galleria Borghese"
    ],
    imageQuery: "rome italy travel"
  },

  // 16. MACHU PICCHU, PERU
  {
    id: "machu-picchu",
    name: "Machu Picchu",
    country: "Peru",
    region: "Americas",
    coordinates: { latitude: -13.1631, longitude: -72.5450 },
    categories: ["Wonder of the World", "Culture", "Mountains"],
    shortDescription: "The mysterious 15th-century Inca citadel perched high in the Andes mountains above the Urubamba River valley.",
    description: "Machu Picchu is an Incan citadel set high in the Andes Mountains in Peru, above the Urubamba River valley. Built in the 15th century and later abandoned, it’s renowned for its sophisticated dry-stone walls that fuse huge blocks without the use of mortar, intriguing buildings that play on astronomical alignments and panoramic views.",
    bestTimeToVisit: "May to October (Dry Andean season)",
    language: "Spanish & Quechua",
    currency: "Peruvian Sol (S/)",
    timezone: "Peru Time (UTC-5)",
    highlights: [
      "Watch morning mist rise over the dry-stone Incan terraces of the citadel",
      "Hike the steep trail up Huayna Picchu peak for a bird's-eye view of the ruins",
      "Walk through Inti Punku (Sun Gate) for your first glimpse of Machu Picchu",
      "Discover astronomical alignment stones like the sacred Intihuatana"
    ],
    famousPlaces: [
      "Historic Sanctuary Citadel",
      "Huayna Picchu Peak",
      "Inti Punku (Sun Gate)",
      "Intihuatana Stone",
      "Temple of the Condor",
      "Temple of the Sun",
      "Inca Bridge"
    ],
    imageQuery: "machu picchu peru travel"
  },

  // 17. DUBAI, UNITED ARAB EMIRATES
  {
    id: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    coordinates: { latitude: 25.2048, longitude: 55.2708 },
    categories: ["City", "Landmark", "Adventure"],
    shortDescription: "A futuristic desert metropolis known for luxury shopping, the world's tallest Burj Khalifa tower, and desert safaris.",
    description: "Dubai is a city and emirate in the United Arab Emirates known for luxury shopping, ultramodern architecture and a lively nightlife scene. Burj Khalifa, an 830m-tall tower, dominates the skyscraper-filled skyline. At its foot lies Dubai Fountain, with jets and lights choreographed to music. On artificial islands just offshore is Atlantis, The Palm.",
    bestTimeToVisit: "November to March (Cool winter)",
    language: "Arabic & English",
    currency: "UAE Dirham (AED)",
    timezone: "Gulf Standard Time (UTC+4)",
    highlights: [
      "Ascend to the 148th-floor observation deck of Burj Khalifa, the world's tallest building",
      "Watch the spectacular evening performance of the choreographed Dubai Fountain",
      "Experience a 4x4 desert safari with red dune bashing, camel rides, and Bedouin dinners",
      "Explore the palm-shaped artificial island of Palm Jumeirah and Atlantis resort"
    ],
    famousPlaces: [
      "Burj Khalifa",
      "The Dubai Fountain",
      "Palm Jumeirah",
      "Dubai Desert Safari",
      "Dubai Frame",
      "Gold & Spice Souks",
      "Dubai Miracle Garden"
    ],
    imageQuery: "dubai united arab emirates travel"
  },

  // 18. NEW YORK CITY, UNITED STATES
  {
    id: "new-york",
    name: "New York City",
    country: "United States",
    region: "Americas",
    coordinates: { latitude: 40.7128, longitude: -74.0060 },
    categories: ["City", "Culture", "Landmark"],
    shortDescription: "The iconic Big Apple featuring neon-lit Times Square, Central Park, Broadway shows, and the Statue of Liberty.",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers. Its iconic sites include skyscrapers such as the Empire State Building and sprawling Central Park.",
    bestTimeToVisit: "April to June & September to November",
    language: "English",
    currency: "US Dollar ($)",
    timezone: "Eastern Standard Time (UTC-5)",
    highlights: [
      "Feel the energy of the illuminated neon billboards at Times Square",
      "Stroll through Central Park to Bethesda Terrace and Bow Bridge",
      "Take the ferry to Liberty Island to visit the Statue of Liberty",
      "Walk elevated above city streets along the transformed High Line park"
    ],
    famousPlaces: [
      "Times Square",
      "Central Park",
      "Statue of Liberty",
      "Empire State Building",
      "Brooklyn Bridge",
      "The High Line",
      "One World Observatory"
    ],
    imageQuery: "new york city united states travel"
  },

  // 19. SYDNEY, AUSTRALIA
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    region: "Asia-Pacific",
    coordinates: { latitude: -33.8688, longitude: 151.2093 },
    categories: ["City", "Coastal", "Landmark"],
    shortDescription: "Australia's harbor city famous for the shell-roofed Sydney Opera House, Harbour Bridge climb, and Bondi surf culture.",
    description: "Sydney, capital of New South Wales and one of Australia's largest cities, is best known for its harborfront Sydney Opera House, with a distinctive sail-like design. Massive Darling Harbour and the smaller Circular Quay port are hubs of waterside life, with the arched Harbour Bridge and esteemed Royal Botanic Garden nearby.",
    bestTimeToVisit: "September to November & February to April",
    language: "English",
    currency: "Australian Dollar (A$)",
    timezone: "Australian Eastern Standard Time (UTC+10)",
    highlights: [
      "Tour the architectural shell sails of the Sydney Opera House",
      "Climb the steel arches of the Sydney Harbour Bridge for panoramic views",
      "Walk the cliffside coastal trail from Bondi Beach to Bronte",
      "Take the iconic 30-minute Manly Ferry ride across Sydney Harbour"
    ],
    famousPlaces: [
      "Sydney Opera House",
      "Sydney Harbour Bridge",
      "Bondi Beach",
      "Manly Ferry",
      "Royal Botanic Garden",
      "Taronga Zoo",
      "Darling Harbour"
    ],
    imageQuery: "sydney australia travel"
  },

  // 20. BARCELONA, SPAIN
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    region: "Europe",
    coordinates: { latitude: 41.3851, longitude: 2.1734 },
    categories: ["Culture", "City", "Coastal"],
    shortDescription: "A Mediterranean city celebrated for Antoni Gaudí's Sagrada Família, Park Güell mosaics, and vibrant Gothic Quarter tapas bars.",
    description: "Barcelona, the cosmopolitan capital of Spain’s Catalonia region, is known for its art and architecture. The fantastical Sagrada Família church and other modernist landmarks designed by Antoni Gaudí dot the city. Museu Picasso and Fundació Joan Miró feature modern art by their namesakes.",
    bestTimeToVisit: "May to June & September to October",
    language: "Spanish & Catalan",
    currency: "Euro (€)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Marvel at the soaring spires and stained glass inside Gaudí's Sagrada Família",
      "Stroll among colorful tile mosaics at Park Güell overlooking the sea",
      "Wander the narrow medieval alleyways of the Gothic Quarter",
      "Sample fresh Jamón Ibérico and seafood tapas at La Boqueria market"
    ],
    famousPlaces: [
      "Sagrada Família",
      "Park Güell",
      "Casa Batlló",
      "Gothic Quarter",
      "La Boqueria & La Rambla",
      "Casa Milà (La Pedrera)",
      "Montjuïc Castle"
    ],
    imageQuery: "barcelona spain travel"
  },

  // 21. LONDON, UNITED KINGDOM
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    region: "Europe",
    coordinates: { latitude: 51.5074, longitude: -0.1278 },
    categories: ["Culture", "City", "Landmark"],
    shortDescription: "A historic global capital featuring Big Ben, the Tower of London, British Museum treasures, and royal palaces.",
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times. At its center stand the imposing Houses of Parliament, the iconic ‘Big Ben’ clock tower and Westminster Abbey, site of British monarch coronations.",
    bestTimeToVisit: "May to September",
    language: "English",
    currency: "British Pound (£)",
    timezone: "Greenwich Mean Time (UTC+0)",
    highlights: [
      "Photograph Big Ben and the Houses of Parliament from Westminster Bridge",
      "See the Crown Jewels inside the 1,000-year-old Tower of London",
      "Ride the London Eye observation wheel for views across the Thames",
      "Explore world history treasures inside the British Museum"
    ],
    famousPlaces: [
      "Big Ben",
      "Tower Bridge",
      "British Museum",
      "Buckingham Palace",
      "London Eye",
      "Westminster Abbey",
      "St Paul's Cathedral"
    ],
    imageQuery: "london united kingdom travel"
  },

  // 22. VENICE, ITALY
  {
    id: "venice",
    name: "Venice",
    country: "Italy",
    region: "Europe",
    coordinates: { latitude: 45.4408, longitude: 12.3155 },
    categories: ["Romance", "Culture", "Coastal"],
    shortDescription: "The romantic floating city of canals, marble Gothic palaces, gondola rides, and St. Mark's Square.",
    description: "Venice, the capital of northern Italy’s Veneto region, is built on more than 100 small islands in a lagoon in the Adriatic Sea. It has no roads, just canals – including the Grand Canal thoroughfare – lined with Renaissance and Gothic palaces. The central square, Piazza San Marco, contains St. Mark’s Basilica.",
    bestTimeToVisit: "April to May & September to October",
    language: "Italian",
    currency: "Euro (€)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Take a traditional gondola ride along the Grand Canal under Rialto Bridge",
      "Admire the gold mosaics of St. Mark's Basilica in Piazza San Marco",
      "Cross the historic Bridge of Sighs at the Doge's Palace",
      "Visit the colorful rainbow-hued island of Burano"
    ],
    famousPlaces: [
      "Grand Canal",
      "St. Mark's Basilica",
      "Doge's Palace",
      "Burano Island",
      "Murano Island",
      "Teatro La Fenice",
      "Peggy Guggenheim Collection"
    ],
    imageQuery: "venice italy travel"
  },

  // 23. PRAGUE, CZECH REPUBLIC
  {
    id: "prague",
    name: "Prague",
    country: "Czech Republic",
    region: "Europe",
    coordinates: { latitude: 50.0755, longitude: 14.4378 },
    categories: ["Culture", "Landmark", "Romance"],
    shortDescription: "The 'City of a Hundred Spires' known for its Gothic Charles Bridge, Prague Castle, and medieval Astronomical Clock.",
    description: "Prague, capital city of the Czech Republic, is bisected by the Vltava River. Nicknamed “the City of a Hundred Spires,” it's known for its Old Town Square, the heart of its historic core, with colorful baroque buildings, Gothic churches and the medieval Astronomical Clock, which gives an animated hourly show.",
    bestTimeToVisit: "May to September & December (Christmas Markets)",
    language: "Czech",
    currency: "Czech Koruna (Kč)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Walk across the 600-year-old Gothic Charles Bridge at sunrise",
      "Watch the medieval Astronomical Clock hourly show in Old Town Square",
      "Explore the vast hilltop complex of Prague Castle and St. Vitus Cathedral",
      "Enjoy panoramic red-roofed city views from Petřín Lookout Tower"
    ],
    famousPlaces: [
      "Charles Bridge",
      "Prague Castle",
      "Astronomical Clock",
      "Wenceslas Square",
      "Petřín Tower",
      "Josefov Jewish Quarter",
      "Dancing House"
    ],
    imageQuery: "prague czech republic travel"
  },

  // 24. AMSTERDAM, NETHERLANDS
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    region: "Europe",
    coordinates: { latitude: 52.3676, longitude: 4.9041 },
    categories: ["Culture", "City", "Coastal"],
    shortDescription: "Famous for its UNESCO canal ring, gabled merchant houses, van Gogh masterpieces, and cycling culture.",
    description: "Amsterdam is the Netherlands’ capital, known for its artistic heritage, elaborate canal system and narrow houses with gabled facades, legacies of the city’s 17th-century Golden Age. Its Museum District houses the Van Gogh Museum, works by Rembrandt and Vermeer at the Rijksmuseum, and modern art at the Stedelijk.",
    bestTimeToVisit: "April to May (Tulip season) & September to November",
    language: "Dutch",
    currency: "Euro (€)",
    timezone: "Central European Time (UTC+1)",
    highlights: [
      "Take an open-air canal boat cruise along the historic Grachtengordel",
      "See Rembrandt's 'The Night Watch' inside the grand Rijksmuseum",
      "Visit the world's largest Van Gogh collection at the Van Gogh Museum",
      "Cycle through Vondelpark like a local Amsterdam resident"
    ],
    famousPlaces: [
      "Canal Ring (Grachtengordel)",
      "Rijksmuseum",
      "Van Gogh Museum",
      "Anne Frank House",
      "Vondelpark",
      "Royal Palace",
      "Keukenhof Gardens"
    ],
    imageQuery: "amsterdam netherlands travel"
  },

  // 25. ISTANBUL, TURKEY
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    region: "Middle East",
    coordinates: { latitude: 41.0082, longitude: 28.9784 },
    categories: ["Culture", "Landmark", "Food"],
    shortDescription: "A transcontinental metropolis straddling Europe and Asia, featuring Hagia Sophia, Blue Mosque, and the Grand Bazaar.",
    description: "Istanbul is a major city in Turkey that straddles Europe and Asia across the Bosphorus Strait. Its Old City reflects cultural influences of the many empires that once ruled here. In the Sultanahmet district, the open-air, Roman-era Hippodrome was for centuries the site of chariot races, and Egyptian obelisks also remain.",
    bestTimeToVisit: "April to May & September to November",
    language: "Turkish",
    currency: "Turkish Lira (₺)",
    timezone: "Turkey Time (UTC+3)",
    highlights: [
      "Marvel at the floating dome and gold mosaics of Hagia Sophia",
      "Admire the 20,000 blue Iznik tiles inside the Sultan Ahmed (Blue) Mosque",
      "Bargain for rugs and mosaic lamps in the 4,000-shop Grand Bazaar",
      "Take a Bosphorus Strait ferry cruise between Europe and Asia"
    ],
    famousPlaces: [
      "Hagia Sophia",
      "Blue Mosque",
      "Grand Bazaar",
      "Topkapı Palace",
      "Bosphorus Strait Cruise",
      "Basilica Cistern",
      "Galata Tower"
    ],
    imageQuery: "istanbul turkey travel"
  },

  // 26. SINGAPORE
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia",
    coordinates: { latitude: 1.3521, longitude: 103.8198 },
    categories: ["City", "Landmark", "Food"],
    shortDescription: "A garden city metropolis known for Supertree Grove, Marina Bay Sands infinity pool, and vibrant hawker food culture.",
    description: "Singapore, an island nation-state off southern Malaysia, is a global financial center with a tropical climate and multicultural population. Its colonial core centers on the Padang, a cricket field since the 1830s and now flanked by grand buildings such as City Hall. In the 1820s Chinatown sits the Buddha Tooth Relic Temple.",
    bestTimeToVisit: "Year-round (November to January peak)",
    language: "English, Malay, Mandarin, Tamil",
    currency: "Singapore Dollar (S$)",
    timezone: "Singapore Standard Time (UTC+8)",
    highlights: [
      "Witness the nightly light and sound show at Gardens by the Bay Supertree Grove",
      "Enjoy rooftop sky views at Marina Bay Sands",
      "Marvel at the 40-meter indoor HSBC Rain Vortex waterfall at Jewel Changi Airport",
      "Sample authentic Hainanese chicken rice at famous hawker centers"
    ],
    famousPlaces: [
      "Gardens by the Bay",
      "Marina Bay Sands",
      "Jewel Changi Airport",
      "Buddha Tooth Relic Temple",
      "Sentosa Island",
      "Singapore Botanic Gardens",
      "Kampong Gelam"
    ],
    imageQuery: "singapore singapore travel"
  },

  // 27. BANGKOK, THAILAND
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    region: "Asia",
    coordinates: { latitude: 13.7563, longitude: 100.5018 },
    categories: ["City", "Culture", "Food"],
    shortDescription: "Thailand's energetic capital of golden royal palaces, riverside Wat Arun spires, and legendary street food markets.",
    description: "Bangkok, Thailand’s capital, is a large city known for ornate shrines and vibrant street life. The boat-filled Chao Phraya River feeds its network of canals, flowing past the Rattanakosin royal district, home to opulent Grand Palace and its sacred Wat Phra Kaew Temple. Nearby is Wat Pho Temple with an enormous Reclining Buddha.",
    bestTimeToVisit: "November to February (Cool dry season)",
    language: "Thai",
    currency: "Thai Baht (฿)",
    timezone: "Indochina Time (UTC+7)",
    highlights: [
      "Explore the golden stupas and Emerald Buddha at The Grand Palace",
      "Climb the porcelain-tiled central spire of Wat Arun (Temple of Dawn)",
      "Marvel at the 46-meter long gold Reclining Buddha at Wat Pho",
      "Shop at Chatuchak Weekend Market, one of the world's largest outdoor markets"
    ],
    famousPlaces: [
      "The Grand Palace",
      "Wat Arun",
      "Wat Pho",
      "Chatuchak Market",
      "Chao Phraya River Boat",
      "Jim Thompson House",
      "Lumphini Park"
    ],
    imageQuery: "bangkok thailand travel"
  },

  // 28. PETRA, JORDAN
  {
    id: "petra",
    name: "Petra",
    country: "Jordan",
    region: "Middle East",
    coordinates: { latitude: 30.3285, longitude: 35.4444 },
    categories: ["Wonder of the World", "Culture", "Heritage"],
    shortDescription: "The rose-red city carved directly into sandstone canyon cliffs by the Nabataeans over 2,000 years ago.",
    description: "Petra is a famous archaeological site in Jordan's southwestern desert. Dating to around 300 BC, it was the capital of the Nabataean Kingdom. Accessed via a narrow canyon called Al Siq, it contains tombs and temples carved into pink sandstone cliffs, earning its nickname the 'Rose City'. Its most famous structure is Al-Khazneh (The Treasury).",
    bestTimeToVisit: "March to May & September to November",
    language: "Arabic & English",
    currency: "Jordanian Dinar (JOD)",
    timezone: "Eastern European Time (UTC+2)",
    highlights: [
      "Walk through the narrow 1.2km Siq canyon gorge as Al-Khazneh emerges",
      "Stand before the 40-meter carved rose sandstone facade of The Treasury",
      "Climb the 800 stone mountain steps to Ad Deir (The Monastery)",
      "Experience Petra by Night illuminated by over 1,500 candles"
    ],
    famousPlaces: [
      "Al-Khazneh (The Treasury)",
      "The Siq",
      "Ad Deir (The Monastery)",
      "Royal Tombs",
      "Great Temple",
      "High Place of Sacrifice",
      "Little Petra"
    ],
    imageQuery: "petra jordan travel"
  }
];

export const CATEGORIES = [
  "All",
  "Wonder of the World",
  "Culture",
  "Romance",
  "Landmark",
  "City",
  "Coastal",
  "Nature",
  "Adventure",
  "Mountains",
  "Island",
  "Heritage",
  "Food",
  "Relaxation"
];
