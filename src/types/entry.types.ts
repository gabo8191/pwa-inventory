// ============================================
// ENTRY PAGE TYPES (Yard Operator - Ingreso)
// ============================================

export interface EntryFormData {
  remissionNumber: string;
  provider: string;
  originYard: string;
  rawMaterial: string;
  vehiclePlate: string;
  transportCompany: string;
  netWeight: number;
  evidence?: File[];
  observations?: string;
}

export interface QRScanData {
  vehiclePlate: string;
  transportCompany: string;
}

export interface ProviderData {
  value: string;
  label: string;
  originYard: string;
}

export interface RawMaterialData {
  value: string;
  label: string;
}
