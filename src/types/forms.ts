export interface IngresoFormData {
  proveedor: string;
  materiaPrima: string;
  placa: string;
  pesoNeto: number;
  evidencia?: FileList;
  nota?: string;
}

export interface SalidaFormData {
  cliente: string;
  producto: string;
  placa: string;
  pesoNeto: number;
  evidencia?: FileList;
  nota?: string;
}

export interface AuthFormData {
  username: string;
  password: string;
}

export interface DespachoVentaFormData {
  numeroOrden: string;
  cliente: string;
  destino: string;
  productos: string;
  evidencia?: FileList;
  observaciones?: string;
}

export interface RecepcionIngresoFormData {
  proveedor: string;
  numeroGuia: string;
  conductor: string;
  placa: string;
  pesoRecibido: number;
  evidencia?: FileList;
  observaciones?: string;
}
