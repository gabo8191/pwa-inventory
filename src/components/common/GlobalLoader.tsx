import React from 'react';
import { loading } from '../../state/loading';

export const GlobalLoader: React.FC = () => {
  const [count, setCount] = React.useState<number>(0);

  React.useEffect(() => {
    return loading.subscribe(setCount);
  }, []);

  if (count === 0) return null;

  return (
    <div className='pointer-events-none fixed inset-0 z-[1000] flex items-center justify-center bg-black/20 backdrop-blur-[1px]'>
      <div className='inline-block h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white/90' />
    </div>
  );
};
