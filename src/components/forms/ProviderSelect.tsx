import React from 'react';
import { FaBuilding, FaChevronDown } from 'react-icons/fa';

interface ProviderSelectProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  className?: string;
}

const PROVIDERS = ['Proveedor 1', 'Proveedor 2', 'Proveedor 3'];

export const ProviderSelect: React.FC<ProviderSelectProps> = ({
  value,
  onChange,
  error,
  className = '',
}) => {
  return (
    <div className={className}>
      <label className='text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2 mb-2'>
        <FaBuilding className='text-slate-500 text-xs md:text-sm' />
        Proveedor
      </label>
      <div className='relative'>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full h-10 md:h-11 lg:h-12 pl-3 lg:pl-4 pr-8 lg:pr-10 rounded-lg lg:rounded-xl bg-white border border-slate-300 text-slate-800 appearance-none outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 text-sm lg:text-base'
        >
          <option value=''>Selecciona un proveedor...</option>
          {PROVIDERS.map((provider) => (
            <option key={provider} value={provider}>
              {provider}
            </option>
          ))}
        </select>
        <FaChevronDown className='absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-xs md:text-sm' />
      </div>
      {error && (
        <p className='text-red-600 text-xs md:text-sm mt-1 md:mt-2 flex items-center gap-1'>
          <span className='text-red-500'>⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};
