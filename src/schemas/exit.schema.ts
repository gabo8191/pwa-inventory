import { z } from 'zod';

export const exitSchema = z.object({
  client: z.string().min(1, 'Cliente requerido'),
  destinationYard: z.string().min(1, 'Patio de destino requerido'),
  product: z.string().min(1, 'Producto requerido'),
  exitRemission: z.string().min(1, 'Remisión de salida requerida'),
  vehiclePlate: z.string().min(1, 'Placa requerida'),
  transportCompany: z.string().min(1, 'Transportadora requerida'),
  netWeight: z.number().positive('Peso debe ser mayor a 0'),
  observations: z.string().optional(),
});

export type ExitSchema = typeof exitSchema;
export type ExitInput = z.infer<typeof exitSchema>;
