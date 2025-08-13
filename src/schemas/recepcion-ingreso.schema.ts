import { z } from 'zod';

export const recepcionIngresoSchema = z.object({
  proveedor: z.string().min(1, 'Proveedor requerido'),
  numeroGuia: z.string().min(1, 'Número de guía requerido'),
  conductor: z.string().min(1, 'Conductor requerido'),
  placa: z.string().min(1, 'Placa requerida'),
  pesoRecibido: z.number().positive('Peso inválido'),
  evidencia: z.any().optional(),
  observaciones: z.string().optional(),
});

export type RecepcionIngresoSchema = typeof recepcionIngresoSchema;
