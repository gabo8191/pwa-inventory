import React from 'react';
import { FaClipboardCheck, FaShippingFast, FaTruck } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RoleDashboard } from '../../components/common/RoleDashboard';

export const DriverDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RoleDashboard
      gradient='purple'
      headerIcon={<FaTruck className='text-white text-2xl md:text-3xl' />}
      title='Panel de Conductor'
      subtitle='Gestiona tus operaciones de transporte'
      statusPlacement='corner'
      statusVariant='dot'
      columns={2}
      actions={[
        {
          title: 'Despacho de Venta',
          description:
            'Gestiona el despacho de productos vendidos y confirma las entregas',
          icon: FaShippingFast,
          color: 'green',
          onClick: () => navigate('/driver/dispatch'),
        },
        {
          title: 'Recepción de Ingreso',
          description:
            'Confirma la recepción de materias primas y productos entrantes',
          icon: FaClipboardCheck,
          color: 'green',
          onClick: () => navigate('/driver/reception'),
        },
      ]}
    />
  );
};
