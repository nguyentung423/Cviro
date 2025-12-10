/**
 * Skeleton component for loading placeholders
 */
const Skeleton = ({ 
  variant = 'text',
  width = '100%',
  height,
  className = '',
  count = 1,
  circle = false,
}) => {
  const baseStyles = 'animate-pulse bg-gradient-to-r from-semantic-bg-tertiary via-semantic-bg-secondary to-semantic-bg-tertiary bg-[length:200%_100%]';
  
  const variants = {
    text: 'h-4 rounded',
    title: 'h-8 rounded',
    button: 'h-12 rounded-xl',
    avatar: 'rounded-full',
    card: 'h-48 rounded-2xl',
    thumbnail: 'aspect-video rounded-lg',
  };

  const variantClass = variants[variant] || variants.text;
  const circleClass = circle ? 'rounded-full' : '';

  const skeletonStyle = {
    width: width,
    height: height,
  };

  const skeletons = Array.from({ length: count }, (_, i) => (
    <div
      key={i}
      className={`${baseStyles} ${variantClass} ${circleClass} ${className}`}
      style={skeletonStyle}
    />
  ));

  return count > 1 ? <div className="space-y-3">{skeletons}</div> : skeletons[0];
};

/**
 * Pre-built skeleton patterns
 */
export const SkeletonCard = () => (
  <div className="bg-white rounded-2xl border border-semantic-border-light p-6 space-y-4">
    <Skeleton variant="thumbnail" />
    <Skeleton variant="title" width="80%" />
    <Skeleton variant="text" count={3} />
    <div className="flex gap-3">
      <Skeleton variant="avatar" width={48} height={48} circle />
      <div className="flex-1 space-y-2">
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  </div>
);

export const SkeletonList = ({ count = 3 }) => (
  <div className="space-y-4">
    {Array.from({ length: count }, (_, i) => (
      <div key={i} className="flex items-center gap-4 bg-white p-4 rounded-xl border border-semantic-border-light">
        <Skeleton variant="avatar" width={64} height={64} circle />
        <div className="flex-1 space-y-2">
          <Skeleton variant="text" width="70%" />
          <Skeleton variant="text" width="50%" />
        </div>
        <Skeleton variant="button" width={100} />
      </div>
    ))}
  </div>
);

export const SkeletonTable = ({ rows = 5 }) => (
  <div className="space-y-3">
    <Skeleton variant="text" width="100%" height={48} />
    {Array.from({ length: rows }, (_, i) => (
      <Skeleton key={i} variant="text" width="100%" height={56} />
    ))}
  </div>
);

export default Skeleton;
