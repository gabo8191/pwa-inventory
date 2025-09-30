import React from 'react';
import {
  FaExchangeAlt,
  FaHardHat,
  FaSignInAlt,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { RoleDashboard } from '../../components/common/RoleDashboard';

export const YardOperatorDashboardPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <RoleDashboard
      gradient='green'
      headerIcon={<FaHardHat className='text-white text-2xl md:text-3xl' />}
      title='Panel de Operario'
      subtitle='Gestiona las operaciones de almacén'
      columns={3}
      statusPlacement='corner'
      statusVariant='dot'
      actions={[
        {
          title: 'Ingreso',
          description:
            'Registra la entrada de materias primas con evidencia fotográfica',
          icon: FaSignInAlt,
          color: 'green',
          onClick: () => navigate('/yard-operator/entry'),
        },
        {
          title: 'Salida',
          description:
            'Registra la salida de productos con detalles y documentación',
          icon: FaSignOutAlt,
          color: 'red',
          onClick: () => navigate('/yard-operator/exit'),
        },
        {
          title: 'Movimientos',
          description: 'Gestiona el movimiento de items entre diferentes áreas',
          icon: FaExchangeAlt,
          color: 'purple',
          onClick: () => navigate('/yard-operator/movements'),
        },
      ]}
    />
  );
};
