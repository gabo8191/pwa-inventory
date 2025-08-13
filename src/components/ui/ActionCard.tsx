import React from 'react';
import type { IconType } from 'react-icons';

interface ActionCardProps {
  title: string;
  description: string;
  icon: IconType;
  color?: 'blue' | 'green' | 'red' | 'purple' | 'orange';
  onClick: () => void;
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  title,
  description,
  icon: Icon,
  color = 'blue',
  onClick,
  className = '',
}) => {
  const colors = {
    blue: {
      gradient: 'from-cyan-500 to-blue-600',
      hover: 'from-cyan-600 to-blue-700',
      shadow: 'shadow-cyan-200',
      hoverShadow: 'hover:shadow-cyan-300',
    },
    green: {
      gradient: 'from-emerald-500 to-green-600',
      hover: 'from-emerald-600 to-green-700',
      shadow: 'shadow-emerald-200',
      hoverShadow: 'hover:shadow-emerald-300',
    },
    red: {
      gradient: 'from-rose-500 to-red-600',
      hover: 'from-rose-600 to-red-700',
      shadow: 'shadow-rose-200',
      hoverShadow: 'hover:shadow-rose-300',
    },
    purple: {
      gradient: 'from-indigo-500 to-purple-600',
      hover: 'from-indigo-600 to-purple-700',
      shadow: 'shadow-indigo-200',
      hoverShadow: 'hover:shadow-indigo-300',
    },
    orange: {
      gradient: 'from-orange-500 to-amber-600',
      hover: 'from-orange-600 to-amber-700',
      shadow: 'shadow-orange-200',
      hoverShadow: 'hover:shadow-orange-300',
    },
  };

  const colorScheme = colors[color];

  return (
    <button
      onClick={onClick}
      className={`group w-full bg-white rounded-xl md:rounded-2xl border border-slate-200 shadow-lg hover:shadow-xl ${colorScheme.hoverShadow} transition-all duration-300 overflow-hidden text-left ${className}`}
    >
      <div className='p-4 md:p-6 lg:p-8'>
        <div
          className={`w-14 h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-4 bg-gradient-to-br ${colorScheme.gradient} hover:${colorScheme.hover} rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg ${colorScheme.shadow}`}
        >
          <Icon className='text-white text-xl md:text-2xl lg:text-3xl' />
        </div>

        <div className='text-center'>
          <h3 className='text-lg md:text-xl lg:text-2xl font-bold text-slate-800 mb-2 md:mb-3'>
            {title}
          </h3>
          <p className='text-slate-600 text-sm md:text-base lg:text-lg leading-relaxed mb-4 lg:mb-6'>
            {description}
          </p>

          <div
            className={`inline-flex items-center gap-2 text-${
              color === 'blue' ? 'cyan' : color === 'red' ? 'rose' : color
            }-600 font-semibold text-sm md:text-base group-hover:gap-3 transition-all`}
          >
            <span>Comenzar</span>
            <Icon className='group-hover:translate-x-1 transition-transform text-sm md:text-base' />
          </div>
        </div>
      </div>
    </button>
  );
};
