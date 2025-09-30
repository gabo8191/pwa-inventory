import { z } from 'zod';

export const authSchema = z.object({
  username: z.string().min(1, 'Usuario requerido'),
  password: z.string().min(1, 'Contraseña requerida'),
});

export type AuthSchema = typeof authSchema;
export type AuthInput = z.infer<typeof authSchema>;
