/**
 * Travelia Gemini AI Travel Assistant & Itinerary Service
 * Integrates Google's official @google/genai SDK for real-time conversational guidance & structured day-by-day itinerary planning.
 */

import { GoogleGenAI } from '@google/genai';
import { DESTINATIONS } from '../data/destinations';
import { PLACES } from '../data/places';

/**
 * Builds system instruction prompt for conversational chatbot
 */
function buildSystemInstruction(destination) {
  let contextDetails = "";
  if (destination) {
    contextDetails = `
CURRENT DESTINATION CONTEXT:
- Destination: ${destination.name}, ${destination.country} (${destination.region})
- Description: ${destination.description}
- Best Time to Visit: ${destination.bestTimeToVisit}
- Language: ${destination.language} | Currency: ${destination.currency} | Timezone: ${destination.timezone}
- Key Highlights: ${destination.highlights ? destination.highlights.join(', ') : 'N/A'}
- Famous Landmarks: ${destination.famousPlaces ? destination.famousPlaces.join(', ') : 'N/A'}
`;
  }

  return `You are Travelia's official AI Travel Assistant. You provide friendly, expert, concise, and practical travel guidance to visitors.

${contextDetails}

GUIDELINES:
1. Always keep your advice relevant to the current destination when provided. If the user asks "How many days should I spend here?" or "What should I see first?", assume "here" refers to ${destination ? destination.name : 'the selected destination'}.
2. Provide clear, structured Markdown responses using bold headings, bullet points, and numbered lists where appropriate.
3. Prioritize duration advice, must-see places, best visiting seasons, 3-day trip plans, and local travel tips.
4. Keep answers engaging and concise (aim for 2-4 structured paragraphs or bullet points). Avoid overwhelming walls of text.
5. If asked about weather, remind them to check the real-time weather card above for live telemetry.`;
}

/**
 * Smart zero-config fallback generator for conversational chatbot
 */
function generateContextualFallback(userMessage, destination) {
  const query = userMessage.toLowerCase();
  const destName = destination ? destination.name : 'this destination';
  const country = destination ? destination.country : '';

  if (query.includes('how many days') || query.includes('duration') || query.includes('how long')) {
    return `### Recommended Duration for ${destName}

**3 to 4 days** is the ideal duration to truly experience ${destName}${country ? `, ${country}` : ''}.

* **Day 1–2:** Explore core landmarks including ${destination?.famousPlaces?.[0] || 'top city attractions'} and ${destination?.famousPlaces?.[1] || 'historic sites'}.
* **Day 3:** Dive into local culture, indulge in authentic dining, and visit ${destination?.famousPlaces?.[2] || 'surrounding spots'}.
* **Day 4 (Optional):** Take a relaxing day trip or discover hidden neighborhood markets.`;
  }

  if (query.includes('see') || query.includes('landmark') || query.includes('famous') || query.includes('must-see')) {
    const placesList = destination?.famousPlaces
      ? destination.famousPlaces.map((p) => `* **${p}** — A must-visit destination highlight.`).join('\n')
      : `* **Top Landmarks** — Explore historic monuments and cultural streets.`;

    return `### Must-See Attractions in ${destName}

Here are the top places you shouldn't miss:

${placesList}

> **Travel Tip:** Visit early in the morning to beat the crowds and enjoy the best lighting for photos!`;
  }

  if (query.includes('when') || query.includes('season') || query.includes('best time')) {
    return `### Best Time to Visit ${destName}

The optimal window for visiting ${destName} is **${destination?.bestTimeToVisit || 'Spring & Autumn'}**.

* **Weather:** Pleasant temperatures for walking tours and outdoor sightseeing.
* **Crowds:** Moderate visitor density compared to peak summer months.
* **Local Highlights:** Enjoy seasonal festivals, local culinary markets, and vibrant outdoor scenery.`;
  }

  if (query.includes('3 day') || query.includes('itinerary') || query.includes('plan')) {
    return `### 3-Day Express Itinerary for ${destName}

* **Day 1: Classic Landmarks** — Start at ${destination?.famousPlaces?.[0] || 'the main square'}, take an introductory city tour, and enjoy a traditional dinner.
* **Day 2: Culture & Cuisine** — Visit ${destination?.famousPlaces?.[1] || 'museums and galleries'}, followed by sunset views at ${destination?.famousPlaces?.[2] || 'a local panoramic spot'}.
* **Day 3: Hidden Gems & Shopping** — Wander local artisan markets, visit historic cafes, and soak in the vibrant atmosphere.`;
  }

  return `### Exploring ${destName} with Travelia

${destName}${country ? `, ${country}` : ''} is a remarkable travel destination known for its rich culture, breathtaking scenery, and unforgettable experiences.

* **Best Season:** ${destination?.bestTimeToVisit || 'Spring to Autumn'}
* **Highlights:** ${destination?.highlights ? destination.highlights.slice(0, 2).join(', ') : 'Cultural sights and natural beauty'}
* **Famous Spot:** ${destination?.famousPlaces?.[0] || 'Iconic landmarks'}

Feel free to ask me for a **3-day itinerary**, **must-see places**, or **family travel advice**!`;
}

/**
 * Send conversation message to Gemini AI SDK
 */
export async function sendMessageToGemini(history = [], userMessage = '', destination = null) {
  if (!userMessage || userMessage.trim() === '') {
    throw new Error('Message prompt cannot be empty.');
  }

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const systemInstruction = buildSystemInstruction(destination);

      const contents = history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text || msg.parts?.[0]?.text || '' }]
      }));

      contents.push({
        role: 'user',
        parts: [{ text: userMessage }]
      });

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: contents,
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 1000
        }
      });

      if (response && response.text) {
        return response.text;
      }
    } catch (err) {
      console.warn('Gemini API call failed, using intelligent travel response engine:', err);
    }
  }

  await new Promise((resolve) => setTimeout(resolve, 800));
  return generateContextualFallback(userMessage, destination);
}

/**
 * Generates a mock structured itinerary based on destination dataset when no API key is set
 */
function generateMockStructuredItinerary(preferences) {
  const { destinationName, durationDays = 3, style = 'Balanced', travelerType = 'Couple', interests = [] } = preferences;

  const destObj = DESTINATIONS.find(
    (d) => d.name.toLowerCase() === (destinationName || '').toLowerCase()
  ) || DESTINATIONS[0];

  const destPlaces = PLACES.filter((p) => p.destinationId === destObj.id);

  const days = [];
  const totalDays = Math.min(Math.max(parseInt(durationDays, 10) || 3, 1), 7);

  for (let d = 1; d <= totalDays; d++) {
    const p1 = destPlaces[(d - 1) * 2 % destPlaces.length] || { name: 'Historic City Center', shortDescription: 'Explore charming historic streets.' };
    const p2 = destPlaces[((d - 1) * 2 + 1) % destPlaces.length] || { name: 'Panoramic Viewpoint', shortDescription: 'Enjoy breathtaking city views.' };

    days.push({
      day: d,
      title: d === 1 ? `Classic ${destObj.name} Highlights` : d === 2 ? 'Cultural Heritage & Local Gastronomy' : d === 3 ? 'Hidden Gems & Panoramic Views' : `Exploring Surrounding ${destObj.region} Wonders`,
      theme: d === 1 ? 'Iconic Landmarks' : d === 2 ? 'Culture & Culinary' : 'Nature & Discovery',
      activities: [
        {
          time: 'Morning (09:00 AM)',
          title: p1.name,
          description: p1.shortDescription || `Begin your morning at ${p1.name}, exploring iconic landmarks and photography spots.`
        },
        {
          time: 'Afternoon (02:00 PM)',
          title: `${destObj.name} Cultural District & Local Lunch`,
          description: `Enjoy an authentic ${destObj.country} meal followed by a guided stroll through historic neighborhood artisan shops.`
        },
        {
          time: 'Evening (07:00 PM)',
          title: p2.name,
          description: p2.shortDescription || `Conclude the day with sunset views at ${p2.name} and a memorable dinner.`
        }
      ]
    });
  }

  return {
    destination: `${destObj.name}, ${destObj.country}`,
    summary: `A personalized ${totalDays}-day ${style.toLowerCase()} itinerary tailored for ${travelerType.toLowerCase()} travelers interested in ${interests.length > 0 ? interests.join(', ') : 'sightseeing and culture'}.`,
    duration: totalDays,
    style: style,
    travelerType: travelerType,
    interests: interests,
    days: days
  };
}

/**
 * Generate Structured Day-by-Day Itinerary from Gemini API or Smart Fallback Engine
 * @param {Object} preferences { destinationName, durationDays, style, travelerType, interests }
 * @returns {Promise<Object>} Structured JSON itinerary object
 */
export async function generateStructuredItinerary(preferences) {
  const { destinationName, durationDays = 3, style = 'Balanced', travelerType = 'Couple', interests = [] } = preferences;

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    try {
      const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
      const prompt = `Create a structured ${durationDays}-day travel itinerary for ${destinationName}.
Travel Style: ${style}
Traveler Type: ${travelerType}
Interests: ${interests.join(', ')}

Return ONLY valid JSON conforming to this exact schema (do NOT include markdown conversational prose outside the JSON):
{
  "destination": "${destinationName}",
  "summary": "Short 2-sentence itinerary overview summary",
  "duration": ${durationDays},
  "style": "${style}",
  "travelerType": "${travelerType}",
  "interests": ${JSON.stringify(interests)},
  "days": [
    {
      "day": 1,
      "title": "Day 1 Title",
      "theme": "Theme Focus",
      "activities": [
        {
          "time": "Morning (09:00 AM)",
          "title": "Activity Name",
          "description": "Activity detail description"
        },
        {
          "time": "Afternoon (02:00 PM)",
          "title": "Activity Name",
          "description": "Activity detail description"
        },
        {
          "time": "Evening (07:00 PM)",
          "title": "Activity Name",
          "description": "Activity detail description"
        }
      ]
    }
  ]
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          responseMimeType: 'application/json',
          temperature: 0.7
        }
      });

      if (response && response.text) {
        let jsonText = response.text.trim();
        // Remove markdown code block fences if present
        if (jsonText.startsWith('```')) {
          jsonText = jsonText.replace(/^```(json)?\n?/, '').replace(/\n?```$/, '').trim();
        }
        const parsed = JSON.parse(jsonText);
        if (parsed && parsed.days && parsed.days.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Gemini Structured Itinerary generation failed, using smart fallback engine:', err);
    }
  }

  // Artificial natural loading delay for smooth UX transition
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return generateMockStructuredItinerary(preferences);
}
