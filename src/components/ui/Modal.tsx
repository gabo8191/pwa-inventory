import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import type { IconType } from 'react-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  icon?: IconType;
  size?: 'sm' | 'md' | 'lg';
  showCloseButton?: boolean;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  icon: Icon,
  size = 'md',
  showCloseButton = true
}) => {
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg'
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      {/* Backdrop */}
      <div
        className='absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm'
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-2xl shadow-2xl ${sizes[size]} w-full max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-200`}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className='flex items-center justify-between p-4 md:p-6 border-b border-slate-200'>
            <div className='flex items-center gap-3'>
              {Icon && (
                <div className='w-10 h-10 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center'>
                  <Icon className='text-white text-lg' />
                </div>
              )}
              {title && (
                <h3 className='text-lg md:text-xl font-semibold text-slate-800'>
                  {title}
                </h3>
              )}
            </div>
            {showCloseButton && (
              <button
                onClick={onClose}
                className='p-2 hover:bg-slate-100 rounded-lg transition-colors'
              >
                <FaTimes className='text-slate-400 hover:text-slate-600' />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <div className='p-4 md:p-6 overflow-y-auto max-h-[calc(90vh-120px)]'>
          {children}
        </div>
      </div>
    </div>
  );
};
