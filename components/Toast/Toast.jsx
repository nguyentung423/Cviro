import { X, CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';
import { useEffect } from 'react';

/**
 * Toast notification component
 */
const Toast = ({
  type = 'info',
  title,
  message,
  onClose,
  autoClose = true,
  duration = 5000,
}) => {
  const types = {
    success: {
      icon: CheckCircle,
      bg: 'bg-semantic-success-bg',
      border: 'border-semantic-success',
      text: 'text-green-800',
      iconColor: 'text-semantic-success',
    },
    error: {
      icon: XCircle,
      bg: 'bg-semantic-error-bg',
      border: 'border-semantic-error',
      text: 'text-red-800',
      iconColor: 'text-semantic-error',
    },
    warning: {
      icon: AlertCircle,
      bg: 'bg-semantic-warning-bg',
      border: 'border-semantic-warning',
      text: 'text-amber-800',
      iconColor: 'text-semantic-warning',
    },
    info: {
      icon: Info,
      bg: 'bg-semantic-info-bg',
      border: 'border-semantic-info',
      text: 'text-blue-800',
      iconColor: 'text-semantic-info',
    },
  };

  const config = types[type] || types.info;
  const Icon = config.icon;

  useEffect(() => {
    if (autoClose && onClose) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  return (
    <div className={`${config.bg} ${config.border} border-l-4 rounded-lg p-4 shadow-lg max-w-md animate-slide-in-right`}>
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={`font-semibold ${config.text} mb-1`}>
              {title}
            </h4>
          )}
          {message && (
            <p className={`text-sm ${config.text}`}>
              {message}
            </p>
          )}
        </div>
        
        {onClose && (
          <button
            onClick={onClose}
            className={`${config.text} hover:opacity-70 transition-opacity flex-shrink-0`}
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

/**
 * Toast container for managing multiple toasts
 */
export const ToastContainer = ({ toasts = [], onRemove }) => {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          {...toast}
          onClose={() => onRemove(toast.id)}
        />
      ))}
    </div>
  );
};

export default Toast;
