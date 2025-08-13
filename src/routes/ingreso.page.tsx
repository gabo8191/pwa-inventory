import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  FaArrowLeft,
  FaBuilding,
  FaQrcode,
  FaTruck,
  FaWeight,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Skeleton } from '../components/common/Skeleton';
import { EvidenceUpload } from '../components/forms/EvidenceUpload';
import { Button, Card, Input, PageContainer, Select } from '../components/ui';
import { ingresoSchema } from '../schemas/ingreso.schema';
import type { IngresoFormData } from '../types/forms';

const PROVIDERS = [
  { value: 'proveedor-1', label: 'Proveedor 1' },
  { value: 'proveedor-2', label: 'Proveedor 2' },
  { value: 'proveedor-3', label: 'Proveedor 3' },
];

export const IngresoPage: React.FC = () => {
  const navigate = useNavigate();
  const [cameraOpen, setCameraOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<IngresoFormData>({
    resolver: zodResolver(ingresoSchema),
    defaultValues: {
      proveedor: '',
      materiaPrima: '',
      placa: '',
      pesoNeto: 0,
      nota: '',
    },
  });

  const watchedProvider = watch('proveedor');

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  const onSubmit: SubmitHandler<IngresoFormData> = (data) => {
    console.log('Ingreso submit', data, selectedFile);
    toast.success('✅ Ingreso registrado exitosamente');
    reset();
    setSelectedFile(null);
  };

  return (
    <PageContainer gradient='green'>
      {/* Back Button and Header */}
      <div className='mb-6'>
        <Button
          variant='ghost'
          icon={FaArrowLeft}
          onClick={() => navigate('/dashboard')}
          className='mb-4'
        >
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

        {/* QR Scanner Button */}
        <div className='text-center'>
          <Button
            variant='primary'
            icon={FaQrcode}
            onClick={() => setCameraOpen(true)}
          >
            Activar escáner QR
          </Button>
        </div>
      </div>

      {/* QR Scanner */}
      {cameraOpen && (
        <Card className='mb-6' padding='md'>
          <div className='h-40 md:h-48 rounded-lg border-2 border-dashed border-slate-300 bg-slate-50 flex flex-col items-center justify-center text-slate-500 mb-4'>
            <FaQrcode className='text-2xl md:text-3xl mb-2' />
            <span className='text-sm md:text-base font-medium mb-1'>
              Escáner QR Activo
            </span>
            <span className='text-xs md:text-sm text-center px-4'>
              Enfoca el código QR para cargar los datos
            </span>
          </div>
          <div className='text-right'>
            <Button variant='secondary' onClick={() => setCameraOpen(false)}>
              Cerrar
            </Button>
          </div>
        </Card>
      )}

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
              {/* Provider Select */}
              <Select
                label='Proveedor'
                icon={FaBuilding}
                options={PROVIDERS}
                placeholder='Selecciona un proveedor...'
                value={watchedProvider}
                onChange={(e) => setValue('proveedor', e.target.value)}
                error={errors.proveedor?.message}
              />

              {/* Materia Prima */}
              <Input
                label='Materia Prima'
                icon={FaTruck}
                placeholder='Ej: Arroz integral, Quinua blanca...'
                error={errors.materiaPrima?.message}
                {...register('materiaPrima')}
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
                placeholder='Agrega observaciones sobre el ingreso, condición de la carga, etc...'
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
                variant='success'
                fullWidth
                loading={isSubmitting}
              >
                {isSubmitting ? 'Guardando...' : 'Registrar Ingreso'}
              </Button>
            </div>
          </form>
        )}
      </Card>
    </PageContainer>
  );
};
