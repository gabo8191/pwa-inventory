import React from 'react';
import type { IconType } from 'react-icons';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: IconType;
  error?: string;
  fullWidth?: boolean;
  variant?: 'default' | 'floating';
}

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  fullWidth = true,
  variant = 'default',
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

  const baseInputClasses =
    'w-full h-10 md:h-11 px-3 md:px-4 rounded-lg bg-white border text-slate-800 placeholder-slate-400 outline-none transition-all duration-200 text-sm md:text-base';
  const normalState =
    'border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent';
  const errorState =
    'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent';

  const inputClasses = `${baseInputClasses} ${
    error ? errorState : normalState
  } ${Icon ? 'pl-10 md:pl-11' : ''}`;
  const widthClass = fullWidth ? 'w-full' : '';

  if (variant === 'floating') {
    return (
      <div className={`relative ${widthClass} ${className}`}>
        <input
          id={inputId}
          className={`${inputClasses} peer placeholder-transparent`}
          placeholder={label || ''}
          {...props}
        />
        {label && (
          <label
            htmlFor={inputId}
            className='absolute left-3 md:left-4 -top-2.5 bg-white px-2 text-xs md:text-sm font-medium text-slate-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate-400 peer-placeholder-shown:top-2.5 md:peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-xs md:peer-focus:text-sm peer-focus:text-cyan-600 peer-focus:bg-white'
          >
            {label}
          </label>
        )}
        {Icon && (
          <Icon className='absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm md:text-base' />
        )}
        {error && (
          <p className='text-red-600 text-xs md:text-sm mt-1 flex items-center gap-1'>
            <span className='text-red-500'>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className='text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2 mb-2'
        >
          {Icon && <Icon className='text-slate-500 text-xs md:text-sm' />}
          {label}
        </label>
      )}
      <div className='relative'>
        <input id={inputId} className={inputClasses} {...props} />
        {Icon && !label && (
          <Icon className='absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm md:text-base' />
        )}
      </div>
      {error && (
        <p className='text-red-600 text-xs md:text-sm mt-1 flex items-center gap-1'>
          <span className='text-red-500'>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};
