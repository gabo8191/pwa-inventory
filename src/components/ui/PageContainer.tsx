import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  gradient?: 'blue' | 'green' | 'purple' | 'orange' | 'none';
  fullHeight?: boolean;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  className = '',
  gradient = 'blue',
  fullHeight = true,
}) => {
  const gradients = {
    blue: 'bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100',
    green: 'bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-100',
    purple: 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100',
    orange: 'bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-100',
    none: 'bg-slate-50',
  };

  const heightClass = fullHeight ? 'min-h-screen' : '';

  return (
    <div className={`${heightClass} ${gradients[gradient]} -mt-6 ${className}`}>
      <div className='px-3 py-4 md:px-4 md:py-6 lg:px-6 lg:py-8 pt-8 md:pt-10'>
        {children}
      </div>
    </div>
  );
};
