import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

/**
 * Input component with all states: default, error, disabled, loading
 */
const Input = ({
  label,
  error,
  helperText,
  icon: Icon,
  type = 'text',
  disabled = false,
  required = false,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;

  const baseStyles = 'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1';
  
  const stateStyles = error
    ? 'border-semantic-error bg-semantic-error-bg text-semantic-error focus:border-semantic-error focus:ring-semantic-error'
    : 'border-semantic-border-light bg-white hover:border-semantic-border-medium focus:border-brand-primary';

  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed bg-semantic-bg-secondary'
    : '';

  const iconPadding = Icon ? 'pl-11' : '';
  const passwordPadding = isPassword ? 'pr-11' : '';

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-semantic-text-primary">
          {label}
          {required && <span className="text-semantic-error ml-1">*</span>}
        </label>
      )}

      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className={`h-5 w-5 ${error ? 'text-semantic-error' : 'text-semantic-text-muted'}`} />
          </div>
        )}

        <input
          type={inputType}
          disabled={disabled}
          className={`${baseStyles} ${stateStyles} ${disabledStyles} ${iconPadding} ${passwordPadding} ${className}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-semantic-text-muted hover:text-semantic-text-primary transition-colors"
            tabIndex={-1}
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        )}
      </div>

      {error && (
        <div id={`${props.id}-error`} className="flex items-center gap-1 text-semantic-error text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${props.id}-helper`} className="text-sm text-semantic-text-tertiary">
          {helperText}
        </p>
      )}
    </div>
  );
};

/**
 * Textarea component
 */
export const Textarea = ({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  rows = 4,
  className = '',
  containerClassName = '',
  ...props
}) => {
  const baseStyles = 'w-full px-4 py-3 border-2 rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 resize-none';
  
  const stateStyles = error
    ? 'border-semantic-error bg-semantic-error-bg text-semantic-error focus:border-semantic-error focus:ring-semantic-error'
    : 'border-semantic-border-light bg-white hover:border-semantic-border-medium focus:border-brand-primary';

  const disabledStyles = disabled
    ? 'opacity-60 cursor-not-allowed bg-semantic-bg-secondary'
    : '';

  return (
    <div className={`space-y-2 ${containerClassName}`}>
      {label && (
        <label className="block text-sm font-medium text-semantic-text-primary">
          {label}
          {required && <span className="text-semantic-error ml-1">*</span>}
        </label>
      )}

      <textarea
        rows={rows}
        disabled={disabled}
        className={`${baseStyles} ${stateStyles} ${disabledStyles} ${className}`}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error ? `${props.id}-error` : helperText ? `${props.id}-helper` : undefined}
        {...props}
      />

      {error && (
        <div id={`${props.id}-error`} className="flex items-center gap-1 text-semantic-error text-sm">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {helperText && !error && (
        <p id={`${props.id}-helper`} className="text-sm text-semantic-text-tertiary">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
