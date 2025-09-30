import React from 'react';
import { online } from '../../state/online';
import type { RoleDashboardProps } from '../../types/ui.types';
import { ActionCard, PageContainer } from '../ui';
export const RoleDashboard: React.FC<RoleDashboardProps> = ({
  gradient,
  headerIcon,
  title,
  subtitle,
  actions,
  columns = 2,
  showStatus = true,
  statusPlacement = 'inline',
  statusVariant = 'badge',
}) => {
  const gridCols = columns === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2';
  const headerGradient = React.useMemo(() => {
    const map: Record<RoleDashboardProps['gradient'], string> = {
      blue: 'from-sky-600 to-indigo-600',
      green: 'from-emerald-600 to-green-600',
      purple: 'from-purple-600 to-fuchsia-600',
      orange: 'from-amber-600 to-orange-600',
      none: 'from-slate-500 to-slate-600',
    };
    return map[gradient];
  }, [gradient]);

  const [isOnline, setIsOnline] = React.useState<boolean>(true);
  React.useEffect(() => online.subscribe(setIsOnline), []);

  return (
    <PageContainer gradient={gradient}>
      <div className='mb-8 text-center'>
        <div
          className={`w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br ${headerGradient} rounded-full flex items-center justify-center shadow-2xl`}
        >
          {headerIcon}
        </div>
        <h1 className='text-2xl md:text-3xl font-bold text-slate-800 mb-2'>
          {title}
        </h1>
        <p className='text-slate-600 text-base md:text-lg'>{subtitle}</p>
        {showStatus && statusPlacement === 'inline' && (
          <div className='mt-2 text-sm'>
            {statusVariant === 'badge' ? (
              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 ${
                  isOnline
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-rose-100 text-rose-700'
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
                {isOnline ? 'Conectado' : 'Sin conexión'}
              </span>
            ) : (
              <span
                className={`inline-flex items-center gap-2 text-slate-500`}
                title={isOnline ? 'Conectado' : 'Sin conexión'}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}
                />
              </span>
            )}
          </div>
        )}
      </div>

      {showStatus && statusPlacement === 'corner' && (
        <div className='absolute right-4 top-4 text-xs'>
          {statusVariant === 'badge' ? (
            <span
              className={`inline-flex items-center gap-1 rounded-full px-2 py-1 ${
                isOnline
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-rose-100 text-rose-700'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  isOnline ? 'bg-emerald-500' : 'bg-rose-500'
                }`}
              />
              {isOnline ? 'Conectado' : 'Sin conexión'}
            </span>
          ) : (
            <span
              className='inline-flex h-2 w-2 rounded-full'
              title={isOnline ? 'Conectado' : 'Sin conexión'}
              style={{
                backgroundColor: isOnline ? '#10b981' : '#f43f5e',
              }}
            />
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-1 ${gridCols} gap-4 md:gap-6 max-w-6xl mx-auto`}
      >
        {actions.map((a, idx) => (
          <ActionCard
            key={idx}
            title={a.title}
            description={a.description}
            icon={a.icon}
            color={a.color}
            onClick={a.onClick}
          />
        ))}
      </div>
    </PageContainer>
  );
};
