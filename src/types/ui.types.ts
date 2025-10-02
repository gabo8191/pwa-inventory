import type React from 'react';
import type { IconType } from 'react-icons';

export type GradientTone = 'blue' | 'green' | 'purple' | 'orange' | 'none';

export type ActionColor = 'green' | 'red' | 'purple' | 'blue' | 'orange';

export interface DashboardAction {
  title: string; // visible (ES)
  description: string; // visible (ES)
  icon: IconType;
  color: ActionColor;
  onClick: () => void;
}

export interface RoleDashboardProps {
  gradient: GradientTone;
  headerIcon: React.ReactNode;
  title: string; // visible (ES)
  subtitle: string; // visible (ES)
  actions: DashboardAction[];
  columns?: 2 | 3;
  showStatus?: boolean;
  statusPlacement?: 'inline' | 'corner';
  statusVariant?: 'badge' | 'dot';
}
