import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  FaBoxOpen,
  FaBuilding,
  FaFileAlt,
  FaIndustry,
  FaTruck,
  FaWeight,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { exitSchema } from '../../schemas/exit.schema';
import type {
  ClientData,
  ExitFormData,
  ProductData,
  QRScanData,
} from '../../types/exit.types';
import { Button, Input, ReadOnlyField, Select } from '../ui';
import { QRScanner } from './QRScanner';

interface ExitFormProps {
  onSubmit: (data: ExitFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Datos de prueba
const CLIENTS: ClientData[] = [
  {
    value: 'cliente-1',
    label: 'Distribuidora Nacional S.A.S',
    destinationYard: 'Patio Central - Zona A',
  },
  {
    value: 'cliente-2',
    label: 'Comercializadora del Sur Ltda',
    destinationYard: 'Patio Sur - Zona B',
  },
  {
    value: 'cliente-3',
    label: 'Alimentos Premium S.A',
    destinationYard: 'Patio Norte - Zona C',
  },
];

const PRODUCTS: ProductData[] = [
  { value: 'harina-trigo', label: 'Harina de Trigo' },
  { value: 'aceite-vegetal', label: 'Aceite Vegetal' },
  { value: 'arroz-procesado', label: 'Arroz Procesado' },
  { value: 'quinua-procesada', label: 'Quinua Procesada' },
  { value: 'avena-procesada', label: 'Avena Procesada' },
  { value: 'productos-mixtos', label: 'Productos Mixtos' },
];

export const ExitForm: React.FC<ExitFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [remissionCounter, setRemissionCounter] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<ExitFormData>({
    resolver: zodResolver(exitSchema),
    defaultValues: {
      client: '',
      destinationYard: '',
      product: '',
      exitRemission: `MAT${String(remissionCounter).padStart(6, '0')}`,
      vehiclePlate: '',
      transportCompany: '',
      netWeight: 0,
      observations: '',
    },
  });

  const watchedClient = watch('client');

  // Actualizar patio de destino cuando cambia el cliente
  useEffect(() => {
    const selectedClient = CLIENTS.find((c) => c.value === watchedClient);
    if (selectedClient) {
      setValue('destinationYard', selectedClient.destinationYard);
    } else {
      setValue('destinationYard', '');
    }
  }, [watchedClient, setValue]);

  // Generar nuevo número de remisión
  useEffect(() => {
    const newRemission = `MAT${String(remissionCounter).padStart(6, '0')}`;
    setValue('exitRemission', newRemission);
  }, [remissionCounter, setValue]);

  const handleQRScan = (data: QRScanData) => {
    setValue('vehiclePlate', data.vehiclePlate);
    setValue('transportCompany', data.transportCompany);
    toast.success('✅ Datos del QR cargados correctamente');
  };

  const handleFormSubmit: SubmitHandler<ExitFormData> = (data) => {
    onSubmit(data);
    // Incrementar contador para próxima remisión
    setRemissionCounter((prev) => prev + 1);
    reset();
  };

  const convertToKilos = (tons: number): number => {
    return tons * 1000;
  };

  if (isLoading) {
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className='h-16 md:h-20 bg-slate-200 animate-pulse rounded-lg'
          />
        ))}
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* QR Scanner */}
      <QRScanner
        isOpen={qrScannerOpen}
        onClose={() => setQrScannerOpen(false)}
        onScan={handleQRScan}
      />

      {/* QR Scanner Button */}
      <div className='text-center'>
        <Button
          type='button'
          variant='primary'
          onClick={() => setQrScannerOpen(true)}
        >
          <FaFileAlt className='mr-2' />
          Escanear QR
        </Button>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
          {/* Cliente */}
          <Select
            label='Cliente'
            icon={FaBuilding}
            options={CLIENTS}
            placeholder='Selecciona un cliente...'
            value={watchedClient}
            onChange={(e) => setValue('client', e.target.value)}
            error={errors.client?.message}
          />

          {/* Patio de Destino */}
          <ReadOnlyField
            label='Patio de Destino'
            icon={FaIndustry}
            value={watch('destinationYard')}
            placeholder='Se carga al seleccionar cliente'
          />

          {/* Producto */}
          <Select
            label='Producto'
            icon={FaBoxOpen}
            options={PRODUCTS}
            placeholder='Selecciona producto...'
            value={watch('product')}
            onChange={(e) => setValue('product', e.target.value)}
            error={errors.product?.message}
          />

          {/* Remisión de Salida */}
          <ReadOnlyField
            label='Remisión de Salida'
            icon={FaFileAlt}
            value={watch('exitRemission')}
            placeholder='Se genera automáticamente'
          />

          {/* Placa del Vehículo */}
          <ReadOnlyField
            label='Placa del Vehículo'
            icon={FaTruck}
            value={watch('vehiclePlate')}
            placeholder='Se carga desde código QR'
          />

          {/* Transportadora */}
          <ReadOnlyField
            label='Transportadora'
            icon={FaBuilding}
            value={watch('transportCompany')}
            placeholder='Se carga desde código QR'
          />

          {/* Peso Neto en Toneladas */}
          <div className='md:col-span-2'>
            <Input
              label='Peso Neto (Toneladas)'
              icon={FaWeight}
              type='number'
              step='0.001'
              placeholder='Ej: 1.500, 2.750...'
              error={errors.netWeight?.message}
              onChange={(e) => {
                const tons = Number(e.target.value);
                setValue('netWeight', convertToKilos(tons));
              }}
            />
            {watch('netWeight') > 0 && (
              <p className='text-xs text-slate-500 mt-1'>
                Equivale a {watch('netWeight').toLocaleString()} kg
              </p>
            )}
          </div>
        </div>

        {/* Observaciones */}
        <div>
          <label className='text-sm md:text-base font-medium text-slate-700 mb-2 block'>
            Observaciones adicionales
          </label>
          <textarea
            rows={3}
            placeholder='Agrega observaciones sobre la salida, destino, condiciones especiales, etc...'
            className='w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-white border border-slate-300 text-slate-800 placeholder-slate-400 outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 resize-none text-sm md:text-base'
            {...register('observations')}
          />
          {errors.observations && (
            <p className='text-red-600 text-xs md:text-sm mt-1 flex items-center gap-1'>
              <span className='text-red-500'>⚠</span>
              {errors.observations.message}
            </p>
          )}
        </div>

        {/* Submit Buttons */}
        <div className='flex flex-col md:flex-row gap-4 pt-4'>
          <Button
            type='button'
            variant='secondary'
            fullWidth
            onClick={onCancel}
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
    </div>
  );
};
