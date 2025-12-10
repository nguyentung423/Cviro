import Spinner from '@/components/Spinner/Spinner';

/**
 * Loading overlay component
 */
const LoadingOverlay = ({ 
  visible = false,
  message = 'Đang tải...',
  fullScreen = false,
  transparent = false,
}) => {
  if (!visible) return null;

  const containerClass = fullScreen 
    ? 'fixed inset-0 z-50' 
    : 'absolute inset-0';

  const bgClass = transparent
    ? 'bg-overlay-white-60 backdrop-blur-sm'
    : 'bg-white/90';

  return (
    <div className={`${containerClass} ${bgClass} flex items-center justify-center`}>
      <div className="text-center">
        <Spinner size="lg" className="text-brand-primary mx-auto mb-4" />
        {message && (
          <p className="text-semantic-text-secondary font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
