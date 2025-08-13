import React from 'react';
import { FaCubes, FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Show logout button on dashboard pages
  const isLoggedIn =
    location.pathname.includes('/dashboard') ||
    location.pathname.includes('/ingreso') ||
    location.pathname.includes('/salida') ||
    location.pathname.includes('/traslados') ||
    location.pathname.includes('/despacho-venta') ||
    location.pathname.includes('/recepcion-ingreso');

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className='sticky top-0 z-40 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60'>
      <div className='container mx-auto px-4 h-14 flex items-center justify-between'>
        <a href='/' className='flex items-center gap-2 group'>
          <div className='h-6 w-6 rounded-md bg-cyan-500/15 grid place-items-center text-cyan-600 group-hover:scale-105 transition-transform'>
            <FaCubes className='h-3.5 w-3.5' />
          </div>
          <h1 className='text-cyan-700 font-bold tracking-wide group-hover:text-cyan-600 transition-colors'>
            TotalDev
          </h1>
        </a>

        <div className='flex items-center gap-3'>
          <span className='hidden [display-mode:standalone]:block text-xs text-slate-500'>
            Modo App
          </span>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className='inline-flex items-center gap-2 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-all duration-200'
            >
              <FaSignOutAlt className='text-xs' />
              <span className='hidden sm:inline'>Cerrar Sesión</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
