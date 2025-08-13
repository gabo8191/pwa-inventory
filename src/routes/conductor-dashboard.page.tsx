import React from 'react';
import { FaClipboardCheck, FaShippingFast, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ActionCard, PageContainer } from '../components/ui';

export const ConductorDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <PageContainer gradient='purple'>
      {/* Header */}
      <div className='mb-8 text-center'>
        <div className='w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl'>
          <FaTruck className='text-white text-2xl md:text-3xl' />
        </div>
        <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
          Panel de Conductor
        </h1>
        <p className='text-slate-600 text-base md:text-lg'>
          Gestiona tus operaciones de transporte
        </p>
      </div>

      {/* Action Cards Grid */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto'>
        <ActionCard
          title='Despacho de Venta'
          description='Gestiona el despacho de productos vendidos y confirma las entregas'
          icon={FaShippingFast}
          color='green'
          onClick={() => navigate('/despacho-venta')}
        />

        <ActionCard
          title='Recepción de Ingreso'
          description='Confirma la recepción de materias primas y productos entrantes'
          icon={FaClipboardCheck}
          color='green'
          onClick={() => navigate('/recepcion-ingreso')}
        />
      </div>
    </PageContainer>
  );
};
