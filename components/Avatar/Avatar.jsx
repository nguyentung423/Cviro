import { User } from 'lucide-react';

/**
 * Avatar component with gradient fallback
 * Replaces placeholder images with beautiful gradient avatars
 */
const Avatar = ({ 
  src, 
  alt = 'Avatar', 
  name = '', 
  size = 'md',
  className = '' 
}) => {
  const sizes = {
    xs: 'w-8 h-8 text-xs',
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-base',
    lg: 'w-20 h-20 text-lg',
    xl: 'w-24 h-24 text-xl',
    '2xl': 'w-32 h-32 text-2xl',
  };

  // Generate consistent color from name
  const getGradientFromName = (name) => {
    if (!name) return 'from-brand-primary to-brand-accent';
    
    const gradients = [
      'from-brand-primary to-brand-primary-light',
      'from-brand-accent to-brand-accent-light',
      'from-brand-secondary to-brand-secondary-light',
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500',
      'from-orange-500 to-yellow-500',
      'from-red-500 to-rose-500',
    ];
    
    const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return gradients[hash % gradients.length];
  };

  // Get initials from name
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
  };

  const sizeClass = sizes[size] || sizes.md;
  const gradient = getGradientFromName(name);
  const initials = getInitials(name);

  // If image src is provided
  if (src && !src.includes('placeholder')) {
    return (
      <div className={`${sizeClass} rounded-full overflow-hidden bg-gradient-to-br ${gradient} flex items-center justify-center ${className}`}>
        <img 
          src={src} 
          alt={alt}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            // Fallback to gradient with initials
            e.target.style.display = 'none';
            e.target.nextSibling.style.display = 'flex';
          }}
        />
        <div className="w-full h-full hidden items-center justify-center text-white font-heading font-bold">
          {initials}
        </div>
      </div>
    );
  }

  // Gradient avatar with initials
  return (
    <div 
      className={`${sizeClass} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-heading font-bold shadow-lg ${className}`}
      title={name || alt}
    >
      {initials}
    </div>
  );
};

export default Avatar;
