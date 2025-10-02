import React from 'react';
import type { IconType } from 'react-icons';

interface ReadOnlyFieldProps {
  label: string;
  value: string;
  icon?: IconType;
  placeholder?: string;
  className?: string;
}

export const ReadOnlyField: React.FC<ReadOnlyFieldProps> = ({
  label,
  value,
  icon: Icon,
  placeholder = 'No disponible',
  className = '',
}) => {
  return (
    <div className={className}>
      <label className='text-sm md:text-base font-medium text-slate-700 mb-2 block'>
        {Icon && <Icon className='inline mr-2 text-slate-500' />}
        {label}
      </label>
      <div className='w-full px-3 md:px-4 py-2 md:py-3 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 text-sm md:text-base min-h-[2.5rem] md:min-h-[3rem] flex items-center'>
        {value || <span className='text-slate-400 italic'>{placeholder}</span>}
      </div>
    </div>
  );
};
