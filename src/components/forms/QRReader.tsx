import QrScanner from 'qr-scanner';
import React, { useEffect, useRef, useState } from 'react';
import { FaQrcode, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import type { QRScanData } from '../../types/entry.types';

interface QRReaderProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: QRScanData) => void;
}

export const QRReader: React.FC<QRReaderProps> = ({
  isOpen,
  onClose,
  onScan,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const qrScannerRef = useRef<QrScanner | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      // Inicializar el escáner QR
      qrScannerRef.current = new QrScanner(
        videoRef.current,
        (result) => {
          try {
            // Intentar parsear el resultado como JSON
            const qrData = JSON.parse(result.data);

            // Validar que tenga los campos necesarios
            if (qrData.vehiclePlate && qrData.transportCompany) {
              onScan({
                vehiclePlate: qrData.vehiclePlate,
                transportCompany: qrData.transportCompany,
              });
              toast.success('✅ Código QR leído correctamente');
              onClose();
            } else {
              toast.error('❌ Código QR no contiene datos válidos');
            }
          } catch {
            // Si no es JSON válido, usar datos de prueba
            toast.info('📱 Usando datos de prueba del QR');
            onScan({
              vehiclePlate: 'ABC-123',
              transportCompany: 'Transportes Unidos S.A.',
            });
            onClose();
          }
        },
        {
          preferredCamera: 'environment', // Cámara trasera
          highlightScanRegion: true,
          highlightCodeOutline: true,
        },
      );

      // Iniciar el escáner
      qrScannerRef.current
        .start()
        .then(() => {
          setIsScanning(true);
          toast.info('📷 Escáner QR activado - Enfoca el código');
        })
        .catch((error) => {
          console.error('Error starting QR scanner:', error);
          toast.error('No se pudo acceder a la cámara para el QR');
          onClose();
        });
    }

    return () => {
      // Limpiar el escáner al desmontar
      if (qrScannerRef.current) {
        qrScannerRef.current.stop();
        qrScannerRef.current.destroy();
        qrScannerRef.current = null;
      }
      setIsScanning(false);
    };
  }, [isOpen, onScan, onClose]);

  const handleClose = () => {
    if (qrScannerRef.current) {
      qrScannerRef.current.stop();
    }
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black z-50 flex flex-col'>
      {/* Header */}
      <div className='flex justify-between items-center p-4 bg-black bg-opacity-50'>
        <h3 className='text-white text-lg font-semibold flex items-center gap-2'>
          <FaQrcode />
          Escanear Código QR
        </h3>
        <button
          onClick={handleClose}
          className='w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors'
        >
          <FaTimes />
        </button>
      </div>

      {/* Scanner Area */}
      <div className='flex-1 flex items-center justify-center p-4'>
        <div className='w-full max-w-md aspect-square relative'>
          <video
            ref={videoRef}
            className='w-full h-full object-cover rounded-lg'
          />

          {/* Overlay con instrucciones */}
          <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
            <div className='w-64 h-64 border-2 border-white border-dashed rounded-lg flex items-center justify-center'>
              <div className='text-center text-white'>
                <FaQrcode className='text-4xl mb-2 mx-auto opacity-50' />
                <p className='text-sm font-medium'>Coloca el código QR aquí</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status */}
      <div className='p-4 bg-black bg-opacity-50 text-center'>
        <p className='text-white text-sm'>
          {isScanning ? '🔍 Buscando código QR...' : '📷 Iniciando cámara...'}
        </p>
        <p className='text-gray-300 text-xs mt-1'>
          Mantén el código QR dentro del área marcada
        </p>
      </div>
    </div>
  );
};
