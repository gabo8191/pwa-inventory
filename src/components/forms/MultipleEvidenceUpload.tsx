import React, { useCallback, useState } from 'react';
import { FaCamera, FaExpand, FaImage, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { CameraCapture } from './CameraCapture';

interface MultipleEvidenceUploadProps {
  onFilesChange: (files: File[]) => void;
  error?: string;
  className?: string;
  maxFiles?: number;
}

interface PhotoModalProps {
  isOpen: boolean;
  photoUrl: string;
  photoName: string;
  onClose: () => void;
}

// Modal para ver fotos en grande
const PhotoModal: React.FC<PhotoModalProps> = ({
  isOpen,
  photoUrl,
  photoName,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4'>
      <div className='relative max-w-4xl max-h-full'>
        <button
          onClick={onClose}
          className='absolute -top-4 -right-4 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10'
        >
          <FaTimes />
        </button>
        <img
          src={photoUrl}
          alt={photoName}
          className='max-w-full max-h-full object-contain rounded-lg'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 rounded-b-lg'>
          <p className='text-sm truncate'>{photoName}</p>
        </div>
      </div>
    </div>
  );
};

export const MultipleEvidenceUpload: React.FC<MultipleEvidenceUploadProps> = ({
  onFilesChange,
  error,
  className = '',
  maxFiles = 5,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [modalPhoto, setModalPhoto] = useState<{
    url: string;
    name: string;
  } | null>(null);
  const [cameraOpen, setCameraOpen] = useState(false);

  const handleCameraCapture = useCallback(
    (file: File) => {
      if (selectedFiles.length >= maxFiles) {
        toast.warning(`Solo puedes tomar máximo ${maxFiles} fotos`);
        return;
      }

      const updatedFiles = [...selectedFiles, file];
      setSelectedFiles(updatedFiles);
      onFilesChange(updatedFiles);

      // Generate preview for new file
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviews((prev) => [...prev, e.target?.result as string]);
      };
      reader.readAsDataURL(file);
    },
    [selectedFiles, onFilesChange, maxFiles],
  );

  const removeFile = useCallback(
    (index: number) => {
      const updatedFiles = selectedFiles.filter((_, i) => i !== index);
      const updatedPreviews = previews.filter((_, i) => i !== index);

      setSelectedFiles(updatedFiles);
      setPreviews(updatedPreviews);
      onFilesChange(updatedFiles);
      toast.info('Foto eliminada');
    },
    [selectedFiles, previews, onFilesChange],
  );

  const openPhotoModal = (index: number) => {
    setModalPhoto({
      url: previews[index],
      name: selectedFiles[index].name,
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDateTime = (date: Date): string => {
    return date.toLocaleString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const canAddMore = selectedFiles.length < maxFiles;

  return (
    <>
      <div className={className}>
        <label className='text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2 mb-3'>
          <FaCamera className='text-slate-500 text-xs md:text-sm' />
          Evidencia fotográfica ({selectedFiles.length}/{maxFiles})
        </label>

        {/* Botón para tomar foto */}
        {canAddMore && (
          <button
            type='button'
            onClick={() => setCameraOpen(true)}
            className='w-full p-4 border-2 border-dashed border-cyan-300 rounded-lg bg-gradient-to-br from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 transition-all duration-300 group mb-4'
          >
            <div className='flex items-center justify-center gap-3'>
              <div className='w-12 h-12 bg-cyan-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                <FaCamera className='text-white text-lg' />
              </div>
              <div className='text-left'>
                <p className='text-base font-semibold text-slate-800'>
                  {selectedFiles.length === 0
                    ? 'Tomar Primera Foto'
                    : 'Agregar Más Fotos'}
                </p>
                <p className='text-sm text-slate-600'>
                  Toca para abrir la cámara
                </p>
              </div>
            </div>
          </button>
        )}

        {/* Lista de fotos */}
        {selectedFiles.length > 0 && (
          <div className='space-y-3 mb-4'>
            <h4 className='text-sm font-medium text-slate-700'>
              Fotos capturadas:
            </h4>
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className='flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg hover:border-cyan-300 transition-colors'
              >
                {/* Icono de imagen */}
                <div className='w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0'>
                  <FaImage className='text-blue-600' />
                </div>

                {/* Información del archivo */}
                <div className='flex-1 min-w-0'>
                  <p className='text-sm font-medium text-slate-800 truncate'>
                    {file.name}
                  </p>
                  <div className='flex items-center gap-4 text-xs text-slate-500'>
                    <span>{formatFileSize(file.size)}</span>
                    <span>{formatDateTime(new Date(file.lastModified))}</span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className='flex items-center gap-2 flex-shrink-0'>
                  <button
                    type='button'
                    onClick={() => openPhotoModal(index)}
                    className='w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors'
                    title='Ver foto'
                  >
                    <FaExpand size={12} />
                  </button>
                  <button
                    type='button'
                    onClick={() => removeFile(index)}
                    className='w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors'
                    title='Eliminar foto'
                  >
                    <FaTimes size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Mensaje cuando se alcanza el límite */}
        {!canAddMore && (
          <div className='text-center p-4 bg-amber-50 border border-amber-200 rounded-lg'>
            <p className='text-amber-800 text-sm font-medium'>
              Has alcanzado el límite de {maxFiles} fotos
            </p>
            <p className='text-amber-600 text-xs mt-1'>
              Elimina alguna foto si deseas agregar una nueva
            </p>
          </div>
        )}

        {error && (
          <p className='text-red-600 text-xs md:text-sm mt-2 flex items-center gap-1'>
            <span className='text-red-500'>⚠</span>
            {error}
          </p>
        )}
      </div>

      {/* Cámara */}
      <CameraCapture
        isOpen={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* Modal para ver fotos en grande */}
      <PhotoModal
        isOpen={modalPhoto !== null}
        photoUrl={modalPhoto?.url || ''}
        photoName={modalPhoto?.name || ''}
        onClose={() => setModalPhoto(null)}
      />
    </>
  );
};
