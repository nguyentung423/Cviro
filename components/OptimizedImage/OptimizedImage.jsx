import { useState } from 'react';
import { ImageOff } from 'lucide-react';

/**
 * Optimized Image component with lazy loading and fallback
 */
const OptimizedImage = ({ 
  src, 
  alt = '', 
  className = '',
  fallback = null,
  aspectRatio = 'auto',
  ...props 
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectRatios = {
    'square': 'aspect-square',
    '16/9': 'aspect-video',
    '4/3': 'aspect-[4/3]',
    '3/2': 'aspect-[3/2]',
    'auto': '',
  };

  const aspectClass = aspectRatios[aspectRatio] || '';

  if (error) {
    return (
      <div className={`bg-semantic-bg-tertiary flex items-center justify-center ${aspectClass} ${className}`}>
        {fallback || (
          <div className="text-center text-semantic-text-muted">
            <ImageOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">Image unavailable</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
      {/* Skeleton loader */}
      {!loaded && (
        <div className="absolute inset-0 bg-semantic-bg-tertiary animate-pulse" />
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        {...props}
      />
    </div>
  );
};

export default OptimizedImage;
