import React from 'react';
import type { QRScanData } from '../../types/entry.types';
import { QRReader } from './QRReader';

interface QRScannerProps {
  isOpen: boolean;
  onClose: () => void;
  onScan: (data: QRScanData) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({
  isOpen,
  onClose,
  onScan,
}) => {
  return <QRReader isOpen={isOpen} onClose={onClose} onScan={onScan} />;
};
