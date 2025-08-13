import React from 'react';

export const Skeleton: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-md bg-white/10 ${className}`}
    >
      <div className='absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent' />
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%);} }`}</style>
    </div>
  );
};
