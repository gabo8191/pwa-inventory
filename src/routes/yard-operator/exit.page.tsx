import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Skeleton } from '../../components/common/Skeleton';
import { ExitForm } from '../../components/forms/ExitForm';
import { Button, Card, PageContainer } from '../../components/ui';
import type { ExitFormData } from '../../types/exit.types';

export const SalidaPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleFormSubmit = (data: ExitFormData) => {
    console.log('Salida submit', data);
    toast.success('✅ Salida registrada exitosamente');
  };

  const handleCancel = () => {
    navigate('/yard-operator/dashboard');
  };

  return (
    <PageContainer gradient='orange'>
      {/* Back Button and Header */}
      <div className='mb-6'>
        <Button
          variant='ghost'
          onClick={() => navigate('/yard-operator/dashboard')}
          className='mb-4'
        >
          <FaArrowLeft className='mr-2' />
          Volver al panel
        </Button>

        <div className='text-center mb-6'>
          <div className='w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-rose-500 to-red-600 rounded-full flex items-center justify-center shadow-xl'>
            <FaBoxOpen className='text-white text-xl md:text-2xl' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
            Registro de Salida
          </h1>
          <p className='text-slate-600 text-base md:text-lg'>
            Registra la salida de productos
          </p>
        </div>
      </div>

      {/* Form */}
      <Card padding='md' className='mb-6'>
        {isLoading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Skeleton className='h-16 md:h-20' />
            <Skeleton className='h-16 md:h-20' />
            <Skeleton className='h-16 md:h-20' />
            <Skeleton className='h-16 md:h-20' />
            <Skeleton className='h-20 md:h-24 md:col-span-2' />
            <Skeleton className='h-40 md:h-48 md:col-span-2' />
          </div>
        ) : (
          <ExitForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}
      </Card>
    </PageContainer>
  );
};
