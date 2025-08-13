import React, { useEffect, useState } from 'react';

export const OfflineIndicator: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const update = () => setIsOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className='fixed top-2 left-2 right-2 z-50 bg-yellow-500 text-black rounded-md px-4 py-2 text-sm shadow-md'>
      <strong>Sin conexión</strong> · Los datos se guardarán localmente
    </div>
  );
};
