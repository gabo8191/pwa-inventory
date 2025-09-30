import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  FaArrowLeft,
  FaBoxes,
  FaBuilding,
  FaMapMarkerAlt,
  FaShippingFast,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Skeleton } from '../../components/common/Skeleton';
import { EvidenceUpload } from '../../components/forms/EvidenceUpload';
import {
  Button,
  Card,
  Input,
  PageContainer,
  Select,
} from '../../components/ui';
import { despachoVentaSchema } from '../../schemas/despacho-venta.schema';
import type { DespachoVentaFormData } from '../../types/forms';

const CLIENTES = [
  { value: 'cliente-1', label: 'Cliente 1' },
  { value: 'cliente-2', label: 'Cliente 2' },
  { value: 'cliente-3', label: 'Cliente 3' },
];

export const DespachoVentaPage: React.FC = () => {
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
  } = useForm<DespachoVentaFormData>({
    resolver: zodResolver(despachoVentaSchema),
    defaultValues: {
      numeroOrden: '',
      cliente: '',
      destino: '',
      productos: '',
      observaciones: '',
    },
  });

  const watchedCliente = watch('cliente');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const onSubmit: SubmitHandler<DespachoVentaFormData> = (data) => {
    console.log('Despacho venta submit', data, selectedFile);
    toast.success('✅ Despacho registrado exitosamente');
    reset();
    setSelectedFile(null);
  };

  return (
    <PageContainer gradient='green'>
      {/* Back Button and Header */}
      <div className='mb-6'>
        <Button
          variant='ghost'
          onClick={() => navigate('/conductor-dashboard')}
          className='mb-4'
        >
          <FaArrowLeft className='mr-2' />
          Volver al panel
        </Button>

        <div className='text-center mb-6'>
          <div className='w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-green-600 rounded-full flex items-center justify-center shadow-xl'>
            <FaShippingFast className='text-white text-xl md:text-2xl' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
            Despacho de Venta
          </h1>
          <p className='text-slate-600 text-base md:text-lg'>
            Gestiona el despacho de productos vendidos
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
              {/* Número de Orden */}
              <Input
                label='Número de Orden'
                icon={FaShippingFast}
                placeholder='Ej: ORD-2024-001, VNT-1234...'
                error={errors.numeroOrden?.message}
                {...register('numeroOrden')}
              />

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

              {/* Destino */}
              <Input
                label='Destino'
                icon={FaMapMarkerAlt}
                placeholder='Ej: Lima, Cusco, Arequipa...'
                error={errors.destino?.message}
                {...register('destino')}
              />

              {/* Productos */}
              <Input
                label='Productos'
                icon={FaBoxes}
                placeholder='Ej: Quinua 50kg, Arroz 100kg...'
                error={errors.productos?.message}
                {...register('productos')}
              />
            </div>

            {/* Evidence Upload */}
            <EvidenceUpload
              onFileSelect={setSelectedFile}
              error={errors.evidencia?.message}
            />

            {/* Observaciones */}
            <div>
              <label className='text-sm md:text-base font-medium text-slate-700 mb-2 block'>
                Observaciones del despacho
              </label>
              <textarea
                rows={3}
                placeholder='Agrega observaciones sobre el despacho, condiciones de entrega, horarios especiales, etc...'
                className='w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base'
                {...register('observaciones')}
              />
              {errors.observaciones && (
                <p className='text-red-600 text-xs md:text-sm mt-1 flex items-center gap-1'>
                  <span className='text-red-500'>⚠</span>
                  {errors.observaciones.message}
                </p>
              )}
            </div>

            {/* Submit Buttons */}
            <div className='flex flex-col md:flex-row gap-4 pt-4'>
              <Button
                type='button'
                variant='secondary'
                fullWidth
                onClick={() => navigate('/conductor-dashboard')}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                variant='primary'
                fullWidth
                loading={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Despacho'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </PageContainer>
  );
};
