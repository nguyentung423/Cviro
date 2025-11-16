import Spinner from '../Spinner/Spinner';

/**
 * Button component with all states: default, loading, disabled, variants
 */
const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-brand-primary hover:bg-brand-primary-hover text-white focus-visible:ring-brand-primary shadow-brand-primary hover:shadow-xl',
    secondary: 'bg-brand-secondary hover:bg-brand-secondary-hover text-white focus-visible:ring-brand-secondary',
    accent: 'bg-brand-accent hover:bg-brand-accent-hover text-semantic-text-primary focus-visible:ring-brand-accent',
    outline: 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white focus-visible:ring-brand-primary',
    ghost: 'text-brand-primary hover:bg-brand-primary/10 focus-visible:ring-brand-primary',
    danger: 'bg-semantic-error hover:bg-red-600 text-white focus-visible:ring-semantic-error',
  };

  const sizes = {
    xs: 'px-3 py-1.5 text-xs',
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
    xl: 'px-10 py-5 text-xl',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;
  const widthClass = fullWidth ? 'w-full' : '';

  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${widthClass} ${className}`}
      {...props}
    >
      {loading ? (
        <>
          <Spinner size="sm" className="text-current" />
          <span>Đang xử lý...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
        </>
      )}
    </button>
  );
};

export default Button;
