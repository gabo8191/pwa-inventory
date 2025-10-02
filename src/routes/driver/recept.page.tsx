import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  FaArrowLeft,
  FaBuilding,
  FaClipboardCheck,
  FaIdCard,
  FaTruck,
  FaWeight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Skeleton } from '../../components/common/Skeleton';
//import { EvidenceUpload } from '../../components/forms/EvidenceUpload';
import {
  Button,
  Card,
  Input,
  PageContainer,
  Select,
} from '../../components/ui';
import { recepcionIngresoSchema } from '../../schemas/recepcion-ingreso.schema';
//import type { RecepcionIngresoFormData } from '../../types/forms';

const PROVEEDORES = [
  { value: 'proveedor-1', label: 'Proveedor 1' },
  { value: 'proveedor-2', label: 'Proveedor 2' },
  { value: 'proveedor-3', label: 'Proveedor 3' },
];

export const RecepcionIngresoPage: React.FC = () => {
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
  } = useForm(
    /*<RecepcionIngresoFormData>*/ {
      resolver: zodResolver(recepcionIngresoSchema),
      defaultValues: {
        proveedor: '',
        numeroGuia: '',
        conductor: '',
        placa: '',
        pesoRecibido: 0,
        observaciones: '',
      },
    },
  );

  const watchedProveedor = watch('proveedor');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log('Recepción ingreso submit', data, selectedFile);
    toast.success('✅ Recepción confirmada exitosamente');
    reset();
    setSelectedFile(null);
  };

  return (
    <PageContainer gradient='green'>
      {/* Back Button and Header */}
      <div className='mb-6'>
        <Button
          variant='ghost'
          onClick={() => navigate('/driver/dashboard')}
          className='mb-4'
        >
          <FaArrowLeft className='mr-2' />
          Volver al panel
        </Button>

        <div className='text-center mb-6'>
          <div className='w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center shadow-xl'>
            <FaClipboardCheck className='text-white text-xl md:text-2xl' />
          </div>
          <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
            Recepción de Ingreso
          </h1>
          <p className='text-slate-600 text-base md:text-lg'>
            Confirma la recepción de materias primas
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
              {/* Proveedor Select */}
              <Select
                label='Proveedor'
                icon={FaBuilding}
                options={PROVEEDORES}
                placeholder='Selecciona un proveedor...'
                value={watchedProveedor}
                onChange={(e) => setValue('proveedor', e.target.value)}
                error={errors.proveedor?.message}
              />

              {/* Número de Guía */}
              <Input
                label='Número de Guía'
                icon={FaIdCard}
                placeholder='Ej: GRE-2024-001, GR-1234...'
                error={errors.numeroGuia?.message}
                {...register('numeroGuia')}
              />

              {/* Conductor */}
              <Input
                label='Nombre del Conductor'
                icon={FaIdCard}
                placeholder='Ej: Juan Pérez, María García...'
                error={errors.conductor?.message}
                {...register('conductor')}
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

              {/* Peso Recibido */}
              <div className='md:col-span-2'>
                <Input
                  label='Peso recibido (kg)'
                  icon={FaWeight}
                  type='number'
                  step='0.01'
                  placeholder='Ej: 1500.50, 2750.25...'
                  error={errors.pesoRecibido?.message}
                  onChange={(e) =>
                    setValue('pesoRecibido', Number(e.target.value))
                  }
                />
              </div>
            </div>

            {/* Evidence Upload
            <EvidenceUpload
              onFileSelect={setSelectedFile}
              error={errors.evidencia?.message}
            />
            */}

            {/* Observaciones */}
            <div>
              <label className='text-sm md:text-base font-medium text-slate-700 mb-2 block'>
                Observaciones de la recepción
              </label>
              <textarea
                rows={3}
                placeholder='Agrega observaciones sobre la recepción, estado de la carga, diferencias encontradas, etc...'
                className='w-full h-32 md:h-40 p-3 border border-slate-300 rounded-lg bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base'
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
                onClick={() => navigate('/driver/dashboard')}
              >
                Cancelar
              </Button>
              <Button
                type='submit'
                variant='primary'
                fullWidth
                loading={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Confirmar Recepción'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </PageContainer>
  );
};
