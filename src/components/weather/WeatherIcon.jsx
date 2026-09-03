import React from 'react';
import { Sun, CloudSun, Cloud, CloudRain, CloudSnow, CloudLightning, CloudFog } from 'lucide-react';

export default function WeatherIcon({ iconType, className = "w-10 h-10 text-amber-400" }) {
  switch (iconType) {
    case 'sun':
      return <Sun className={`${className} text-amber-400`} />;
    case 'cloud-sun':
      return <CloudSun className={`${className} text-amber-300`} />;
    case 'cloud':
      return <Cloud className={`${className} text-slate-300`} />;
    case 'cloud-rain':
      return <CloudRain className={`${className} text-cyan-400`} />;
    case 'cloud-snow':
      return <CloudSnow className={`${className} text-sky-200`} />;
    case 'cloud-lightning':
      return <CloudLightning className={`${className} text-amber-400`} />;
    case 'cloud-fog':
      return <CloudFog className={`${className} text-slate-400`} />;
    default:
      return <CloudSun className={`${className} text-amber-300`} />;
  }
}
