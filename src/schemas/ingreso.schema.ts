import { z } from 'zod';

export const ingresoSchema = z.object({
  proveedor: z.string().min(1, 'Proveedor requerido'),
  materiaPrima: z.string().min(1, 'Materia prima requerida'),
  placa: z.string().min(1, 'Placa requerida'),
  pesoNeto: z.number().positive('Peso inválido'),
  evidencia: z.any().optional(),
  nota: z.string().optional(),
});

export type IngresoSchema = typeof ingresoSchema;
export type IngresoInput = z.infer<typeof ingresoSchema>;
