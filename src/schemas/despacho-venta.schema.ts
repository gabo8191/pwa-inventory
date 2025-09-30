import { z } from 'zod';

export const despachoVentaSchema = z.object({
  numeroOrden: z.string().min(1, 'Número de orden requerido'),
  cliente: z.string().min(1, 'Cliente requerido'),
  destino: z.string().min(1, 'Dirección de destino requerida'),
  productos: z.string().min(1, 'Productos requeridos'),
  evidencia: z.any().optional(),
  observaciones: z.string().optional(),
});

export type DespachoVentaSchema = typeof despachoVentaSchema;
export type DespachoVentaInput = z.infer<typeof despachoVentaSchema>;
