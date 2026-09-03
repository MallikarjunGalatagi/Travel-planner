/**
 * Travelia Image Service
 * Abstracted image provider service prepared for external Image API integration.
 * Maps destinations and famous places to high-resolution Unsplash CDN assets with local fallback support.
 */

const DESTINATION_IMAGE_MAP = {
  "paris-france-eiffel-tower": "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
  "tokyo-japan-night-skyline": "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1200&auto=format&fit=crop",
  "amalfi-coast-positano-italy": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  "kyoto-japan-temple-pagoda": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "banff-lake-louise-canada": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  "santorini-greece-oia-domes": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",
  "rio-de-janeiro-brazil-christ": "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=1200&auto=format&fit=crop",
  "cape-town-south-africa-table-mountain": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",
  "swiss-alps-matterhorn-switzerland": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",
  "bali-indonesia-rice-terraces": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",
  "iceland-reykjavik-northern-lights": "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=1200&auto=format&fit=crop",
  "cairo-egypt-pyramids-giza": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop"
};

const PLACE_IMAGE_MAP = {
  // Paris places
  "paris-eiffel-tower": "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?q=80&w=1200&auto=format&fit=crop",
  "paris-louvre-museum": "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=1200&auto=format&fit=crop",
  "paris-arc-de-triomphe": "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=1200&auto=format&fit=crop",
  "paris-montmartre-sacre-coeur": "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=1200&auto=format&fit=crop",
  
  // Tokyo places
  "tokyo-shibuya-crossing": "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=1200&auto=format&fit=crop",
  "tokyo-sensoji-temple": "https://images.unsplash.com/photo-1583838573199-3172e2cfc216?q=80&w=1200&auto=format&fit=crop",
  "tokyo-skytree": "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1200&auto=format&fit=crop",

  // Amalfi Coast places
  "amalfi-positano": "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1200&auto=format&fit=crop",
  "amalfi-path-of-the-gods": "https://images.unsplash.com/photo-1555992828-ca4dbe41d294?q=80&w=1200&auto=format&fit=crop",

  // Kyoto places
  "kyoto-fushimi-inari": "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1200&auto=format&fit=crop",
  "kyoto-golden-pavilion": "https://images.unsplash.com/photo-1578637387939-43c525550085?q=80&w=1200&auto=format&fit=crop",

  // Banff places
  "banff-lake-louise": "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?q=80&w=1200&auto=format&fit=crop",
  "banff-moraine-lake": "https://images.unsplash.com/photo-1536700503339-1e4b06520771?q=80&w=1200&auto=format&fit=crop",

  // Santorini places
  "santorini-oia": "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?q=80&w=1200&auto=format&fit=crop",

  // Rio places
  "rio-christ-redeemer": "https://images.unsplash.com/photo-1516306580123-e6e52b1b7b5f?q=80&w=1200&auto=format&fit=crop",

  // Cape Town places
  "cape-town-table-mountain": "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=1200&auto=format&fit=crop",

  // Swiss Alps places
  "swiss-alps-matterhorn": "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1200&auto=format&fit=crop",

  // Bali places
  "bali-rice-terraces": "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1200&auto=format&fit=crop",

  // Reykjavik places
  "iceland-blue-lagoon": "https://images.unsplash.com/photo-1529963183134-61a90db47eaf?q=80&w=1200&auto=format&fit=crop",

  // Cairo places
  "cairo-giza-pyramids": "https://images.unsplash.com/photo-1503177119275-0aa32b3a9368?q=80&w=1200&auto=format&fit=crop"
};

const DEFAULT_FALLBACK_IMAGE = "/assets/hero-poster.jpg";

/**
 * Fetch primary destination image URL
 */
export function getDestinationImageUrl(destination) {
  if (!destination) return DEFAULT_FALLBACK_IMAGE;
  
  if (destination.imageKeyword && DESTINATION_IMAGE_MAP[destination.imageKeyword]) {
    return DESTINATION_IMAGE_MAP[destination.imageKeyword];
  }
  
  return DEFAULT_FALLBACK_IMAGE;
}

/**
 * Fetch hero/banner image URL for destination detail page
 */
export function getDestinationHeroImage(destination) {
  const primary = getDestinationImageUrl(destination);
  return primary.replace("w=1200", "w=1920");
}

/**
 * Fetch place image URL
 * @param {Object} place Place data object
 * @returns {string} High-res place image URL
 */
export function getPlaceImageUrl(place) {
  if (!place) return DEFAULT_FALLBACK_IMAGE;

  if (place.imageQuery && PLACE_IMAGE_MAP[place.imageQuery]) {
    return PLACE_IMAGE_MAP[place.imageQuery];
  }

  // Graceful fallback using general travel photo
  return DEFAULT_FALLBACK_IMAGE;
}
