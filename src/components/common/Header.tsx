import React from 'react';
import { FaSignOutAlt } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Show logout button on dashboard pages
  const isLoggedIn =
    location.pathname.includes('/dashboard') ||
    location.pathname.includes('/conductor-dashboard') ||
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
      <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
        <a href='/' className='flex items-center gap-3 group'>
          <div className='h-10 w-10 rounded-lg overflow-hidden bg-green-50 flex items-center justify-center group-hover:scale-105 transition-transform'>
            <img
              src='/home.png'
              alt='MATERIALES DE LA SABANA'
              className='h-8 w-8 object-contain'
            />
          </div>
          <div className='flex flex-col'>
            <h1 className='text-green-700 font-bold text-sm leading-tight group-hover:text-green-600 transition-colors'>
              MATERIALES DE LA SABANA
            </h1>
            <span className='text-green-600 text-xs opacity-80'>
              Sistema de Gestión
            </span>
          </div>
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
