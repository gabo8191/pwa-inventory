import type { LoginPayload, LoginResponse } from '../../types/auth.types';
import { apiPost } from '../request';

export const AuthApi = {
  login(payload: LoginPayload) {
    return apiPost<LoginResponse, LoginPayload>('auth/login', payload);
  },
  logout() {
    return Promise.resolve({ success: true } as LoginResponse);
  },
};
