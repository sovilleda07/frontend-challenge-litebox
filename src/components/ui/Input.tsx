import { useState, type InputHTMLAttributes } from 'react';
import { Button } from './Button';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  buttonLabel?: string;
  onButtonClick?: () => void;
}

export const Input = ({
  label,
  error,
  helperText,
  buttonLabel,
  onButtonClick,
  className = '',
  disabled,
  value,
  onChange,
  placeholder,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const inputElement = (
    <div className="relative w-full">
      <div
        className={`
          flex flex-col bg-white border-2 outline-none transition-all duration-200 h-[58px]
          ${
            error
              ? 'border-error'
              : isFocused
                ? 'border-black shadow-[0_0_10px_rgba(123,97,255,0.8)]'
                : 'border-black'
          }
          ${disabled ? 'bg-gray-100 border-gray-light' : ''}
        `}
      >
        {label && isFocused && (
          <span className="px-4 pt-2 text-xs text-black leading-none">
            {label}
          </span>
        )}
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`
            w-full px-4 text-base bg-transparent outline-none flex-1
            placeholder:text-gray-400
            ${label && isFocused ? 'pb-0' : 'py-4'}
            ${
              disabled
                ? 'text-gray-400 cursor-not-allowed'
                : isFocused
                  ? 'text-purple-dark'
                  : 'text-black'
            }
            ${className}
          `}
          {...props}
        />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-1 w-full">
      {buttonLabel ? (
        <div className="flex flex-col md:flex-row items-stretch w-full gap-2">
          {inputElement}
          <Button
            variant={disabled ? 'secondary' : 'black'}
            onClick={onButtonClick}
            disabled={disabled}
            className="shrink-0 md:border-l-0 w-full md:w-auto"
          >
            {buttonLabel}
          </Button>
        </div>
      ) : (
        inputElement
      )}

      {error && <span className="text-error text-sm">{error}</span>}

      {helperText && !error && (
        <span className="text-gray-500 text-sm">{helperText}</span>
      )}
    </div>
  );
};
