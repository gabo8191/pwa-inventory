import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { online } from '../../state/online';
import { InstallFab } from '../pwa/InstallFab';
import { Header } from './Header';
import { OfflineIndicator } from './OfflineIndicator';

export const Layout: React.FC = () => {
  const location = useLocation();
  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  React.useEffect(() => online.subscribe(setIsOnline), []);

  // Don't show header on login page
  const isLoginPage =
    location.pathname === '/' || location.pathname === '/login';

  return (
    <div className='min-h-screen bg-neutral-50 text-slate-900'>
      <OfflineIndicator />
      {!isLoginPage && <Header />}
      <main
        className={`${isLoginPage ? '' : 'pt-0'} ${
          !isOnline ? 'pointer-events-none opacity-60' : ''
        }`}
      >
        <Outlet />
      </main>
      <InstallFab />
    </div>
  );
};
