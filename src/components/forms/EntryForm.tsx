import { zodResolver } from '@hookform/resolvers/zod';
import React, { useEffect, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import {
  FaBuilding,
  FaFileAlt,
  FaIndustry,
  FaTruck,
  FaWeight,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { entrySchema } from '../../schemas/entry.schema';
import type {
  EntryFormData,
  ProviderData,
  QRScanData,
  RawMaterialData,
} from '../../types/entry.types';
import { Button, Input, ReadOnlyField, Select } from '../ui';
import { MultipleEvidenceUpload } from './MultipleEvidenceUpload';
import { QRScanner } from './QRScanner';

interface EntryFormProps {
  onSubmit: (data: EntryFormData, evidence: File[]) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Datos de prueba
const PROVIDERS: ProviderData[] = [
  {
    value: 'proveedor-1',
    label: 'Agrícola San José S.A.S',
    originYard: 'Patio Norte - Bodega A1',
  },
  {
    value: 'proveedor-2',
    label: 'Cereales del Valle Ltda',
    originYard: 'Patio Sur - Bodega B2',
  },
  {
    value: 'proveedor-3',
    label: 'Distribuidora Andina S.A',
    originYard: 'Patio Este - Bodega C3',
  },
];

const RAW_MATERIALS: RawMaterialData[] = [
  { value: 'arroz-integral', label: 'Arroz Integral' },
  { value: 'quinua-blanca', label: 'Quinua Blanca' },
  { value: 'avena-hojuelas', label: 'Avena en Hojuelas' },
  { value: 'trigo-duro', label: 'Trigo Duro' },
  { value: 'cebada-perlada', label: 'Cebada Perlada' },
  { value: 'maiz-amarillo', label: 'Maíz Amarillo' },
];

export const EntryForm: React.FC<EntryFormProps> = ({
  onSubmit,
  onCancel,
  isLoading = false,
}) => {
  const [qrScannerOpen, setQrScannerOpen] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [remissionCounter, setRemissionCounter] = useState(1);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm<EntryFormData>({
    resolver: zodResolver(entrySchema),
    defaultValues: {
      remissionNumber: `MAT${String(remissionCounter).padStart(6, '0')}`,
      provider: '',
      originYard: '',
      rawMaterial: '',
      vehiclePlate: '',
      transportCompany: '',
      netWeight: 0,
      observations: '',
    },
  });

  const watchedProvider = watch('provider');

  // Actualizar patio de origen cuando cambia el proveedor
  useEffect(() => {
    const selectedProvider = PROVIDERS.find((p) => p.value === watchedProvider);
    if (selectedProvider) {
      setValue('originYard', selectedProvider.originYard);
    } else {
      setValue('originYard', '');
    }
  }, [watchedProvider, setValue]);

  // Generar nuevo número de remisión
  useEffect(() => {
    const newRemission = `MAT${String(remissionCounter).padStart(6, '0')}`;
    setValue('remissionNumber', newRemission);
  }, [remissionCounter, setValue]);

  const handleQRScan = (data: QRScanData) => {
    setValue('vehiclePlate', data.vehiclePlate);
    setValue('transportCompany', data.transportCompany);
    toast.success('✅ Datos del QR cargados correctamente');
  };

  const handleFormSubmit: SubmitHandler<EntryFormData> = (data) => {
    onSubmit(data, evidenceFiles);
    // Incrementar contador para próxima remisión
    setRemissionCounter((prev) => prev + 1);
    reset();
    setEvidenceFiles([]);
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
          {/* Número de Remisión */}
          <ReadOnlyField
            label='Número de Remisión'
            icon={FaFileAlt}
            value={watch('remissionNumber')}
            placeholder='Se genera automáticamente'
          />

          {/* Proveedor */}
          <Select
            label='Proveedor'
            icon={FaBuilding}
            options={PROVIDERS}
            placeholder='Selecciona un proveedor...'
            value={watchedProvider}
            onChange={(e) => setValue('provider', e.target.value)}
            error={errors.provider?.message}
          />

          {/* Patio de Origen */}
          <ReadOnlyField
            label='Patio de Origen'
            icon={FaIndustry}
            value={watch('originYard')}
            placeholder='Se carga al seleccionar proveedor'
          />

          {/* Materia Prima */}
          <Select
            label='Materia Prima'
            icon={FaTruck}
            options={RAW_MATERIALS}
            placeholder='Selecciona materia prima...'
            value={watch('rawMaterial')}
            onChange={(e) => setValue('rawMaterial', e.target.value)}
            error={errors.rawMaterial?.message}
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

        {/* Evidence Upload */}
        <MultipleEvidenceUpload
          onFilesChange={setEvidenceFiles}
          error={errors.evidence?.message}
          maxFiles={5}
        />

        {/* Observaciones */}
        <div>
          <label className='text-sm md:text-base font-medium text-slate-700 mb-2 block'>
            Observaciones adicionales
          </label>
          <textarea
            rows={3}
            placeholder='Agrega observaciones sobre el ingreso, condición de la carga, etc...'
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
            variant='primary'
            fullWidth
            loading={isSubmitting}
          >
            {isSubmitting ? 'Guardando...' : 'Registrar Ingreso'}
          </Button>
        </div>
      </form>
    </div>
  );
};
