import { z } from 'zod';

export const entrySchema = z.object({
  remissionNumber: z.string().min(1, 'Número de remisión requerido'),
  provider: z.string().min(1, 'Proveedor requerido'),
  originYard: z.string().min(1, 'Patio de origen requerido'),
  rawMaterial: z.string().min(1, 'Materia prima requerida'),
  vehiclePlate: z.string().min(1, 'Placa requerida'),
  transportCompany: z.string().min(1, 'Transportadora requerida'),
  netWeight: z.number().positive('Peso debe ser mayor a 0'),
  evidence: z.array(z.any()).optional(),
  observations: z.string().optional(),
});

export type EntrySchema = typeof entrySchema;
export type EntryInput = z.infer<typeof entrySchema>;
