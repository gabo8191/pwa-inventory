export type UserRole = 'operador' | 'conductor' | string;

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message?: string;
  token?: string;
  role?: UserRole;
}
