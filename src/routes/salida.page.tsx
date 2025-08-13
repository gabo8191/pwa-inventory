import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  FaArrowLeft,
  FaBoxOpen,
  FaBuilding,
  FaTruck,
  FaWeight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Skeleton } from '../components/common/Skeleton';
import { EvidenceUpload } from '../components/forms/EvidenceUpload';
import { Button, Card, Input, PageContainer, Select } from '../components/ui';
import { salidaSchema } from '../schemas/salida.schema';
import type { SalidaFormData } from '../types/forms';

const CLIENTES = [
  { value: 'cliente-1', label: 'Cliente 1' },
  { value: 'cliente-2', label: 'Cliente 2' },
  { value: 'cliente-3', label: 'Cliente 3' },
];

export const SalidaPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<SalidaFormData>({
    resolver: zodResolver(salidaSchema),
    defaultValues: {
      cliente: '',
      producto: '',
      placa: '',
      pesoNeto: 0,
      nota: '',
    },
  });

  const watchedCliente = watch('cliente');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const onSubmit: SubmitHandler<SalidaFormData> = (data) => {
    console.log('Salida submit', data, selectedFile);
    toast.success('✅ Salida registrada exitosamente');
    reset();
    setSelectedFile(null);
  };

  return (
    <PageContainer gradient='orange'>
      {/* Back Button and Header */}
      <div className='mb-6'>
        <Button
          variant='ghost'
          onClick={() => navigate('/dashboard')}
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
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
              {/* Cliente Select */}
              <Select
                label='Cliente'
                icon={FaBuilding}
                options={CLIENTES}
                placeholder='Selecciona un cliente...'
                value={watchedCliente}
                onChange={(e) => setValue('cliente', e.target.value)}
                error={errors.cliente?.message}
              />

              {/* Producto */}
              <Input
                label='Producto'
                icon={FaBoxOpen}
                placeholder='Ej: Harina de trigo, Aceite vegetal...'
                error={errors.producto?.message}
                {...register('producto')}
              />

              {/* Placa */}
              <Input
                label='Placa del vehículo'
                icon={FaTruck}
                placeholder='Ej: ABC-123, XYZ-456...'
                style={{ textTransform: 'uppercase' }}
                error={errors.placa?.message}
                {...register('placa')}
              />

              {/* Peso Neto */}
              <Input
                label='Peso neto (kg)'
                icon={FaWeight}
                type='number'
                step='0.01'
                placeholder='Ej: 1500.50, 2750.25...'
                error={errors.pesoNeto?.message}
                onChange={(e) => setValue('pesoNeto', Number(e.target.value))}
              />
            </div>

            {/* Evidence Upload */}
            <EvidenceUpload
              onFileSelect={setSelectedFile}
              error={errors.evidencia?.message}
            />

            {/* Nota */}
            <div>
              <label className='text-sm md:text-base font-medium text-slate-700 mb-2 block'>
                Observaciones adicionales
              </label>
              <textarea
                rows={3}
                placeholder='Agrega observaciones sobre la salida, destino, condiciones especiales, etc...'
                className='w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base'
                {...register('nota')}
              />
              {errors.nota && (
                <p className='text-red-600 text-xs md:text-sm mt-1 flex items-center gap-1'>
                  <span className='text-red-500'>⚠</span>
                  {errors.nota.message}
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className='flex flex-col md:flex-row gap-4 pt-4'>
              <Button
                type='button'
                variant='secondary'
                fullWidth
                onClick={() => navigate('/dashboard')}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                variant='destructive'
                fullWidth
                loading={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Registrar Salida'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </PageContainer>
  );
};
