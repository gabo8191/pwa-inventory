import React from 'react';
import type { IconType } from 'react-icons';
import { FaChevronDown } from 'react-icons/fa';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  icon?: IconType;
  error?: string;
  options: SelectOption[];
  placeholder?: string;
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  label,
  icon: Icon,
  error,
  options,
  placeholder = 'Selecciona una opción...',
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;

  const baseSelectClasses = 'w-full h-10 md:h-11 pl-3 md:pl-4 pr-8 md:pr-10 rounded-lg bg-white border text-slate-800 appearance-none outline-none transition-all duration-200 text-sm md:text-base';
  const normalState = 'border-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-transparent';
  const errorState = 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-transparent';

  const selectClasses = `${baseSelectClasses} ${error ? errorState : normalState} ${Icon ? 'pl-10 md:pl-11' : ''}`;
  const widthClass = fullWidth ? 'w-full' : '';

  return (
    <div className={`${widthClass} ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-xs md:text-sm font-medium text-slate-700 flex items-center gap-2 mb-2">
          {Icon && <Icon className="text-slate-500 text-xs md:text-sm" />}
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          className={selectClasses}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {Icon && !label && (
          <Icon className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 text-sm md:text-base" />
        )}
        <FaChevronDown className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-slate-400 pointer-events-none text-xs md:text-sm" />
      </div>
      {error && (
        <p className="text-red-600 text-xs md:text-sm mt-1 flex items-center gap-1">
          <span className="text-red-500">⚠</span>
          {error}
        </p>
      )}
    </div>
  );
};
