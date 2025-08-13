import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaHardHat, FaLock, FaTruck, FaUser } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../components/ui';
import { authSchema } from '../schemas/auth.schema';
import type { AuthFormData } from '../types/forms';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'operador' | 'conductor'>(
    'operador',
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
    defaultValues: { username: '', password: '' },
  });

  const onSubmit = async (data: AuthFormData) => {
    await new Promise((r) => setTimeout(r, 800));

    if (userType === 'operador') {
      const isValid =
        data.username === 'operador' && data.password === 'pass123';
      if (isValid) {
        toast.success('¡Bienvenido, Operario!');
        navigate('/dashboard');
        return;
      }
    } else {
      const isValid =
        data.username === 'conductor' && data.password === 'pass123';
      if (isValid) {
        toast.success('¡Bienvenido, Conductor!');
        navigate('/conductor-dashboard');
        return;
      }
    }

    toast.error('Credenciales inválidas');
  };

  return (
    <div className='fixed inset-0 bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 flex flex-col'>
      {/* Header Section */}
      <div className='flex-1 flex flex-col justify-center px-4 py-8 md:px-6 lg:px-8'>
        <div className='w-full max-w-sm mx-auto'>
          {/* Logo and Title */}
          <div className='text-center mb-8 md:mb-12'>
            <h1 className='text-4xl md:text-5xl font-bold text-slate-800 mb-4'>
              TotalDev PWA
            </h1>
            <p className='text-slate-600 text-lg md:text-xl mb-2'>
              Sistema de Gestión{' '}
              {userType === 'operador' ? 'Operacional' : 'de Transporte'}
            </p>
            <div className='w-16 h-1 bg-gradient-to-r from-cyan-600 to-blue-600 mx-auto rounded-full'></div>
          </div>

          {/* User Type Selector */}
          <div className='mb-8'>
            <div className='flex bg-white rounded-2xl p-1.5 shadow-lg border border-slate-200'>
              <button
                type='button'
                onClick={() => setUserType('operador')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  userType === 'operador'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FaHardHat className='inline mr-2 text-lg' />
                Operario
              </button>
              <button
                type='button'
                onClick={() => setUserType('conductor')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                  userType === 'conductor'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <FaTruck className='inline mr-2 text-lg' />
                Conductor
              </button>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='space-y-4'>
              <div>
                <label className='text-sm font-medium text-slate-700 flex items-center gap-2 mb-2'>
                  <FaUser className='text-slate-500' />
                  Usuario
                </label>
                <div className='relative'>
                  <input
                    placeholder={`Ingresa: ${userType}`}
                    className='w-full h-12 px-4 pl-11 rounded-xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200'
                    autoComplete='username'
                    {...register('username')}
                  />
                  <FaUser className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none' />
                </div>
                {errors.username && (
                  <p className='text-red-600 text-sm mt-2 flex items-center gap-1'>
                    <span className='text-red-500'>⚠</span>
                    {errors.username.message}
                  </p>
                )}
              </div>

              <div>
                <label className='text-sm font-medium text-slate-700 flex items-center gap-2 mb-2'>
                  <FaLock className='text-slate-500' />
                  Contraseña
                </label>
                <div className='relative'>
                  <input
                    placeholder='Ingresa: pass123'
                    type='password'
                    className='w-full h-12 px-4 pl-11 rounded-xl bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200'
                    autoComplete='current-password'
                    {...register('password')}
                  />
                  <FaLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none' />
                </div>
                {errors.password && (
                  <p className='text-red-600 text-sm mt-2 flex items-center gap-1'>
                    <span className='text-red-500'>⚠</span>
                    {errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <Button
              type='submit'
              variant='primary'
              size='lg'
              fullWidth
              loading={isSubmitting}
              className='mt-8'
            >
              Iniciar Sesión
            </Button>
          </form>
        </div>
      </div>

      {/* Demo Credentials Footer */}
      <div className='px-4 pb-6 md:px-6 lg:px-8'>
        <div className='max-w-sm mx-auto bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg'>
          <p className='text-xs font-medium text-slate-600 mb-2 text-center'>
            Credenciales de prueba:
          </p>
          <div className='text-center space-y-1 text-xs text-slate-500'>
            <p>
              <strong>Operario:</strong> operario / pass123
            </p>
            <p>
              <strong>Conductor:</strong> conductor / pass123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
