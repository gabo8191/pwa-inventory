import React from 'react';
import { FaCogs, FaExchangeAlt, FaIndustry } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RoleDashboard } from '../../components/common/RoleDashboard';

export const MachineOperatorDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <RoleDashboard
      gradient='blue'
      headerIcon={<FaCogs className='text-white text-2xl md:text-3xl' />}
      title='Panel de Operador de Máquina'
      subtitle='Gestiona la producción y movimientos de materiales'
      statusPlacement='corner'
      statusVariant='dot'
      columns={2}
      actions={[
        {
          title: 'Producción',
          description: 'Registra y gestiona órdenes y avances de producción',
          icon: FaIndustry,
          color: 'green',
          onClick: () => navigate('/machine-operator/production'),
        },
        {
          title: 'Movimientos',
          description: 'Controla los movimientos de materiales y estados',
          icon: FaExchangeAlt,
          color: 'purple',
          onClick: () => navigate('/machine-operator/movements'),
        },
      ]}
    />
  );
};
