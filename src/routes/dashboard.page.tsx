import React from 'react';
import {
  FaExchangeAlt,
  FaHardHat,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionCard, PageContainer } from '../components/ui';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer gradient='green'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <div className='w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br from-emerald-600 to-green-600 rounded-full flex items-center justify-center shadow-2xl'>
          <FaHardHat className='text-white text-2xl md:text-3xl' />
        </div>
        <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
          Panel de Operario
        </h1>
        <p className='text-slate-600 text-base md:text-lg'>
          Gestiona las operaciones de almacén
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto'>
        <ActionCard
          title='Ingreso'
          description='Registra la entrada de materias primas con evidencia fotográfica'
          icon={FaSignInAlt}
          color='green'
          onClick={() => navigate('/ingreso')}
        />

        <ActionCard
          title='Salida'
          description='Registra la salida de productos con detalles y documentación'
          icon={FaSignOutAlt}
          color='red'
          onClick={() => navigate('/salida')}
        />

        <ActionCard
          title='Traslados'
          description='Gestiona el movimiento de items entre diferentes áreas'
          icon={FaExchangeAlt}
          color='purple'
          onClick={() => navigate('/traslados')}
        />
      </div>
    </PageContainer>
  );
};
