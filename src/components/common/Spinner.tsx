import React from 'react';

export const Spinner: React.FC<{ size?: number }> = ({ size = 24 }) => {
  return (
    <div
      className='inline-block animate-spin rounded-full border-2 border-white/20 border-t-white/80'
      style={{ width: size, height: size }}
    />
  );
};
