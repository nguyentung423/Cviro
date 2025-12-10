import { AlertCircle, XCircle, RefreshCw } from 'lucide-react';
import Button from '@/components/Button/Button';

/**
 * Error State component with retry functionality
 */
const ErrorState = ({
  title = 'Đã xảy ra lỗi',
  message = 'Không thể tải dữ liệu. Vui lòng thử lại.',
  onRetry,
  type = 'error',
  className = '',
}) => {
  const types = {
    error: {
      icon: XCircle,
      iconColor: 'text-semantic-error',
      bgColor: 'bg-semantic-error-bg',
    },
    warning: {
      icon: AlertCircle,
      iconColor: 'text-semantic-warning',
      bgColor: 'bg-semantic-warning-bg',
    },
  };

  const config = types[type] || types.error;
  const Icon = config.icon;

  return (
    <div className={`flex flex-col items-center justify-center p-12 text-center ${className}`}>
      <div className={`${config.bgColor} rounded-full p-6 mb-6`}>
        <Icon className={`w-12 h-12 ${config.iconColor}`} />
      </div>
      
      <h3 className="text-xl font-heading font-bold text-semantic-text-primary mb-2">
        {title}
      </h3>
      
      <p className="text-semantic-text-secondary mb-6 max-w-md">
        {message}
      </p>
      
      {onRetry && (
        <Button
          variant="outline"
          onClick={onRetry}
          icon={RefreshCw}
        >
          Thử lại
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
