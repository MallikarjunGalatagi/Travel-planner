import React, { useState, useEffect } from 'react';
import { fetchImageByQuery } from '../services/imageApi';
import { Camera } from 'lucide-react';

export default function ImageWithFallback({
  query,
  alt,
  className = "w-full h-full object-cover",
  fallbackUrl = "/assets/hero-poster.jpg",
  showCredit = false,
  ...props
}) {
  const [imageData, setImageData] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    let isMounted = true;
    setIsFetching(true);
    setImageLoaded(false);
    setImageError(false);

    fetchImageByQuery(query)
      .then((data) => {
        if (isMounted) {
          setImageData(data);
          setIsFetching(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.warn('Image fetch failed for query:', query, err);
          setImageError(true);
          setIsFetching(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  const displayUrl = imageError || !imageData ? fallbackUrl : imageData.url;
  const displayAlt = alt || imageData?.alt || query || "Travel destination image";

  return (
    <div className="relative w-full h-full overflow-hidden bg-slate-950">
      {/* 1. SKELETON SHIMMER LOADING PLACEHOLDER */}
      {(isFetching || (!imageLoaded && !imageError)) && (
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 animate-pulse z-0" />
      )}

      {/* 2. MAIN DYNAMIC IMAGE */}
      <img
        {...props}
        src={displayUrl}
        alt={displayAlt}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        className={`${className} transition-opacity duration-700 ease-out relative z-10 ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
      />

      {/* 3. OPTIONAL SUBTLE PHOTOGRAPHER CREDIT BADGE */}
      {showCredit && imageData?.photographer && imageLoaded && !imageError && (
        <div className="absolute bottom-2 right-2 z-20 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] text-slate-300 flex items-center gap-1 opacity-80 hover:opacity-100 transition-opacity">
          <Camera className="w-3 h-3 text-amber-400" />
          <span>{imageData.photographer}</span>
        </div>
      )}
    </div>
  );
}
