import React from 'react';
import type { IconType } from 'react-icons';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: IconType;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  fullWidth = false,
  loading = false,
  className = '',
  children,
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl focus:ring-cyan-500',
    secondary:
      'bg-slate-200 hover:bg-slate-300 text-slate-700 shadow-sm hover:shadow-md focus:ring-slate-500',
    success:
      'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white shadow-lg hover:shadow-xl focus:ring-emerald-500',
    danger:
      'bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white shadow-lg hover:shadow-xl focus:ring-red-500',
    ghost:
      'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-800 focus:ring-slate-500',
  };

  const sizes = {
    sm: 'h-8 px-3 text-sm gap-1.5',
    md: 'h-10 md:h-11 px-4 md:px-6 text-sm md:text-base gap-2',
    lg: 'h-12 md:h-14 px-6 md:px-8 text-base md:text-lg gap-2.5',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass =
    disabled || loading ? 'opacity-50 cursor-not-allowed' : '';

  const iconSize =
    size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-lg' : 'text-sm';

  return (
    <button
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <div className='animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent' />
      )}
      {Icon && iconPosition === 'left' && !loading && (
        <Icon className={iconSize} />
      )}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && !loading && (
        <Icon className={iconSize} />
      )}
    </button>
  );
};
