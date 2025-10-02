import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Skeleton } from '../../components/common/Skeleton';
import { EntryForm } from '../../components/forms/EntryForm';
import { Button, Card, PageContainer } from '../../components/ui';
import type { EntryFormData } from '../../types/entry.types';

export const IngresoPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const handleFormSubmit = (data: EntryFormData, evidence: File[]) => {
    console.log('Ingreso submit', data, evidence);
    toast.success('✅ Ingreso registrado exitosamente');
  };

  const handleCancel = () => {
    navigate('/yard-operator/dashboard');
  };

  return (
    <PageContainer gradient='green'>
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
          <div className='w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl'>
            <FaTruck className='text-white text-xl md:text-2xl' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
            Registro de Ingreso
          </h1>
          <p className='text-slate-600 text-base md:text-lg'>
            Registra la entrada de materias primas
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
          <EntryForm
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        )}
      </Card>
    </PageContainer>
  );
};
