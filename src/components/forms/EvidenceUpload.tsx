import React, { useCallback, useState } from 'react';
import { FaCamera, FaImage, FaTimes, FaUpload } from 'react-icons/fa';
import { useMobileDetect } from '../../hooks/use-mobile-detect.hook';

interface EvidenceUploadProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
  className?: string;
}

export const EvidenceUpload: React.FC<EvidenceUploadProps> = ({
  onFileSelect,
  error,
  className = '',
}) => {
  const isMobile = useMobileDetect();
  const [isDragOver, setIsDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = useCallback(
    (file: File | null) => {
      setSelectedFile(file);
      onFileSelect(file);

      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => setPreview(e.target?.result as string);
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }
    },
    [onFileSelect],
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
          handleFileSelect(file);
        }
      }
    },
    [handleFileSelect],
  );

  const clearFile = () => {
    handleFileSelect(null);
  };

  if (isMobile) {
    return (
      <div className={className}>
        <label className='text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2 mb-2'>
          <FaCamera className='text-slate-500 text-xs md:text-sm' />
          Evidencia fotográfica
        </label>

        {preview ? (
          <div className='relative'>
            <img
              src={preview}
              alt='Evidencia'
              className='w-full h-40 md:h-48 object-cover rounded-lg md:rounded-xl border border-slate-300'
            />
            <button
              onClick={clearFile}
              className='absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors'
            >
              <FaTimes size={10} className='md:text-xs' />
            </button>
          </div>
        ) : (
          <label className='block w-full h-40 md:h-48 rounded-lg md:rounded-xl border-2 border-dashed border-cyan-300 bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 cursor-pointer transition-all duration-300 group'>
            <div className='h-full flex flex-col items-center justify-center gap-2 md:gap-3 p-4'>
              <div className='w-12 h-12 md:w-16 md:h-16 bg-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <FaCamera className='text-white text-base md:text-xl' />
              </div>
              <div className='text-center'>
                <p className='text-base md:text-lg font-semibold text-slate-800 mb-1'>
                  Tomar Foto
                </p>
                <p className='text-xs md:text-sm text-slate-600'>
                  Toca para abrir la cámara
                </p>
              </div>
            </div>
            <input
              type='file'
              accept='image/*'
              capture='environment'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </label>
        )}

        {error && (
          <p className='text-red-600 text-xs md:text-sm mt-1 md:mt-2 flex items-center gap-1'>
            <span className='text-red-500'>⚠</span>
            {error}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className={className}>
      <label className='text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2 mb-2'>
        <FaImage className='text-slate-500 text-xs md:text-sm' />
        Evidencia fotográfica
      </label>

      {preview ? (
        <div className='relative'>
          <img
            src={preview}
            alt='Evidencia'
            className='w-full h-40 md:h-48 object-cover rounded-lg md:rounded-xl border border-slate-300'
          />
          <button
            onClick={clearFile}
            className='absolute top-2 right-2 w-7 h-7 md:w-8 md:h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors'
          >
            <FaTimes size={10} className='md:text-xs' />
          </button>
          <div className='absolute bottom-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs md:text-sm max-w-[200px] truncate'>
            {selectedFile?.name}
          </div>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`w-full h-40 md:h-48 rounded-lg md:rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer ${
            isDragOver
              ? 'border-cyan-500 bg-cyan-50'
              : 'border-slate-300 bg-gradient-to-br from-slate-50 to-gray-50 hover:from-slate-100 hover:to-gray-100'
          }`}
        >
          <label className='h-full cursor-pointer'>
            <div className='h-full flex flex-col items-center justify-center gap-3 md:gap-4 p-4'>
              <div
                className={`w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isDragOver
                    ? 'bg-cyan-500 scale-110'
                    : 'bg-slate-400 hover:bg-slate-500'
                }`}
              >
                <FaUpload className='text-white text-base md:text-xl' />
              </div>
              <div className='text-center'>
                <p className='text-base md:text-lg font-semibold text-slate-800 mb-1'>
                  {isDragOver ? 'Suelta la imagen aquí' : 'Arrastra y suelta'}
                </p>
                <p className='text-xs md:text-sm text-slate-600 mb-2'>
                  o haz clic para seleccionar
                </p>
                <p className='text-xs text-slate-500'>
                  JPG, PNG, WEBP (máx. 10MB)
                </p>
              </div>
            </div>
            <input
              type='file'
              accept='image/*'
              className='hidden'
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileSelect(file);
              }}
            />
          </label>
        </div>
      )}

      {error && (
        <p className='text-red-600 text-xs md:text-sm mt-1 md:mt-2 flex items-center gap-1'>
          <span className='text-red-500'>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};
