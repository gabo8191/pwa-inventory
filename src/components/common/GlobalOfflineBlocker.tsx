import React from 'react';
import { online } from '../../state/online';

export const GlobalOfflineBlocker: React.FC = () => {
  const [isOnline, setIsOnline] = React.useState<boolean>(true);

  React.useEffect(() => {
    return online.subscribe(setIsOnline);
  }, []);

  if (isOnline) return null;

  return (
    <div className='fixed inset-0 z-[1100] flex items-center justify-center bg-black/50 p-6 text-center'>
      <div className='rounded-xl bg-white p-6 shadow-xl max-w-sm w-full'>
        <h2 className='text-lg font-semibold text-slate-800 mb-2'>
          Sin conexión
        </h2>
        <p className='text-slate-600'>
          No hay conexión a internet. Revisa tu red para continuar.
        </p>
      </div>
    </div>
  );
};
