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
    <div className='fixed inset-0 bg-gradient-to-br from-green-50 via-emerald-50 to-lime-100 flex flex-col'>
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-md'>
          {/* Header */}
          <div className='text-center mb-8'>
            <div className='mb-6'>
              <img
                src='/home.png'
                alt='MATERIALES DE LA SABANA'
                className='h-16 w-16 mx-auto mb-4 object-contain'
              />
              <h1 className='text-2xl md:text-3xl font-bold text-green-800 mb-2'>
                MATERIALES DE LA SABANA
              </h1>
              <div className='w-16 h-1 bg-gradient-to-r from-green-600 to-emerald-600 mx-auto rounded-full'></div>
            </div>
          </div>

          {/* User Type Selector */}
          <div className='flex gap-2 mb-6'>
            <button
              type='button'
              onClick={() => setUserType('operador')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                userType === 'operador'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
              }`}
            >
              <FaHardHat className='inline mr-2' />
              Operario
            </button>
            <button
              type='button'
              onClick={() => setUserType('conductor')}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-200 ${
                userType === 'conductor'
                  ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                  : 'bg-white text-green-700 border border-green-200 hover:bg-green-50'
              }`}
            >
              <FaTruck className='inline mr-2' />
              Conductor
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaUser className='h-4 w-4 text-green-400' />
              </div>
              <input
                {...register('username')}
                type='text'
                placeholder='Usuario'
                className='w-full pl-10 pr-3 py-3 border border-green-200 rounded-xl bg-white/90 backdrop-blur placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
              />
              {errors.username && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.username.message}
                </p>
              )}
            </div>

            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <FaLock className='h-4 w-4 text-green-400' />
              </div>
              <input
                {...register('password')}
                type='password'
                placeholder='Contraseña'
                className='w-full pl-10 pr-3 py-3 border border-green-200 rounded-xl bg-white/90 backdrop-blur placeholder-slate-400 text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200'
              />
              {errors.password && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type='submit'
              variant='primary'
              className='w-full'
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          {/* Demo Credentials */}
          <div className='mt-6 p-4 bg-white/60 backdrop-blur rounded-xl border border-green-200'>
            <h3 className='font-semibold text-green-800 mb-2'>
              Credenciales de demostración:
            </h3>
            <div className='text-sm text-green-700 space-y-1'>
              <p>
                <strong>Operario:</strong> operador / pass123
              </p>
              <p>
                <strong>Conductor:</strong> conductor / pass123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
