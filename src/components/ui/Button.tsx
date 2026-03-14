import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'black' | 'green-outline';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-lime text-black border-2 border-lime hover:bg-black hover:text-white hover:border-black focus:bg-lime focus:ring-2 focus:ring-black active:bg-purple-dark active:border-purple-dark active:text-white disabled:bg-transparent disabled:text-gray-400 disabled:border-transparent',
  secondary:
    'bg-transparent text-white border-2 border-lime hover:bg-lime hover:text-black focus:border-lime active:bg-lime active:text-black disabled:border-gray-400 disabled:text-gray-400',
  black:
    'bg-black text-white border-2 border-black hover:bg-lime hover:text-black hover:border-black focus:bg-lime focus:text-black focus:ring-black active:bg-lime active:text-black active:ring-black disabled:bg-transparent disabled:text-gray-400 disabled:border-transparent',
  'green-outline':
    'bg-lime text-black border-2 border-black hover:bg-black hover:text-white hover:border-black focus:bg-black focus:text-white active:bg-black active:text-white disabled:bg-transparent disabled:text-gray-400 disabled:border-gray-400 disabled:border-transparent',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      className={`
        inline-flex items-center justify-center
        font-bold cursor-pointer
        transition-all duration-200
        disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};
