// ============================================
// EXIT PAGE TYPES (Yard Operator - Salida)
// ============================================

export interface ExitFormData {
  client: string;
  destinationYard: string;
  product: string;
  exitRemission: string;
  vehiclePlate: string;
  transportCompany: string;
  netWeight: number;
  observations?: string;
}

export interface ClientData {
  value: string;
  label: string;
  destinationYard: string;
}

export interface ProductData {
  value: string;
  label: string;
}

export interface QRScanData {
  vehiclePlate: string;
  transportCompany: string;
}
