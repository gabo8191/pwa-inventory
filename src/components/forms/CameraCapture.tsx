import React, { useCallback, useRef, useState } from 'react';
import { FaCamera, FaCheck, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Webcam from 'react-webcam';

interface CameraCaptureProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (file: File) => void;
}

export const CameraCapture: React.FC<CameraCaptureProps> = ({
  isOpen,
  onClose,
  onCapture,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: 'environment', // Cámara trasera en móviles
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      setCapturedImage(imageSrc);
    }
  }, [webcamRef]);

  const confirmCapture = useCallback(() => {
    if (capturedImage) {
      // Convertir base64 a File
      fetch(capturedImage)
        .then((res) => res.blob())
        .then((blob) => {
          const file = new File([blob], `foto-${Date.now()}.jpg`, {
            type: 'image/jpeg',
          });
          onCapture(file);
          setCapturedImage(null);
          onClose();
          toast.success('📸 Foto capturada exitosamente');
        })
        .catch(() => {
          toast.error('Error al procesar la foto');
        });
    }
  }, [capturedImage, onCapture, onClose]);

  const retakePhoto = useCallback(() => {
    setCapturedImage(null);
  }, []);

  const handleClose = useCallback(() => {
    setCapturedImage(null);
    onClose();
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black z-50 flex flex-col'>
      {/* Header */}
      <div className='flex justify-between items-center p-4 bg-black bg-opacity-50'>
        <h3 className='text-white text-lg font-semibold'>
          {capturedImage ? 'Vista Previa' : 'Tomar Foto'}
        </h3>
        <button
          onClick={handleClose}
          className='w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors'
        >
          <FaTimes />
        </button>
      </div>

      {/* Camera/Preview Area */}
      <div className='flex-1 flex items-center justify-center p-4'>
        {capturedImage ? (
          <img
            src={capturedImage}
            alt='Foto capturada'
            className='max-w-full max-h-full object-contain rounded-lg'
          />
        ) : (
          <div className='w-full max-w-2xl aspect-video'>
            <Webcam
              ref={webcamRef}
              audio={false}
              screenshotFormat='image/jpeg'
              videoConstraints={videoConstraints}
              className='w-full h-full object-cover rounded-lg'
              onUserMediaError={() => {
                toast.error('No se pudo acceder a la cámara');
                onClose();
              }}
            />
          </div>
        )}
      </div>

      {/* Controls */}
      <div className='p-6 bg-black bg-opacity-50'>
        {capturedImage ? (
          <div className='flex gap-4 justify-center'>
            <button
              onClick={retakePhoto}
              className='flex-1 max-w-xs py-3 px-6 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors flex items-center justify-center gap-2'
            >
              <FaCamera />
              Tomar Otra
            </button>
            <button
              onClick={confirmCapture}
              className='flex-1 max-w-xs py-3 px-6 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2'
            >
              <FaCheck />
              Usar Esta Foto
            </button>
          </div>
        ) : (
          <div className='flex justify-center'>
            <button
              onClick={capture}
              className='w-20 h-20 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg'
            >
              <div className='w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center'>
                <FaCamera className='text-gray-600 text-xl' />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
