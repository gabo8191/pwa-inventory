import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  rounded?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  shadow = 'md',
  border = true,
  rounded = 'md'
}) => {
  const baseClasses = 'bg-white';

  const paddings = {
    none: '',
    sm: 'p-2 md:p-3',
    md: 'p-3 md:p-4 lg:p-6',
    lg: 'p-4 md:p-6 lg:p-8'
  };

  const shadows = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-lg',
    lg: 'shadow-xl'
  };

  const rounds = {
    none: '',
    sm: 'rounded-md',
    md: 'rounded-lg md:rounded-xl',
    lg: 'rounded-xl md:rounded-2xl'
  };

  const borderClass = border ? 'border border-slate-200' : '';

  return (
    <div className={`${baseClasses} ${paddings[padding]} ${shadows[shadow]} ${rounds[rounded]} ${borderClass} ${className}`}>
      {children}
    </div>
  );
};
