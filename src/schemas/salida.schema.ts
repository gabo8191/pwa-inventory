import { z } from 'zod';

export const salidaSchema = z.object({
  cliente: z.string().min(1, 'Cliente requerido'),
  producto: z.string().min(1, 'Producto requerido'),
  placa: z.string().min(1, 'Placa requerida'),
  pesoNeto: z.number().positive('Peso inválido'),
  evidencia: z.any().optional(),
  nota: z.string().optional(),
});

export type SalidaSchema = typeof salidaSchema;
