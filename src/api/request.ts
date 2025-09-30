import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios';
import { toast } from 'react-toastify';
import { env } from '../config/env';
import { auth } from '../state/auth';
import { loading } from '../state/loading';
import type { ApiErrorShape } from './types';

const createHttpClient = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: env.apiBaseUrl,
    timeout: 15000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    loading.increment();
    const token = auth.getToken();
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as Record<string, string>)[
        'Authorization'
      ] = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      loading.decrement();
      return response;
    },
    (error: AxiosError) => {
      loading.decrement();
      const status = error.response?.status ?? 0;
      const serverMessage =
        (error.response?.data as unknown as { message?: string })?.message ||
        error.message ||
        'Error de red';

      const detailsRaw = (
        error.response?.data as unknown as { details?: unknown }
      )?.details;
      const normalizedDetails: string | Record<string, unknown> | undefined =
        typeof detailsRaw === 'string' ||
        (detailsRaw !== null && typeof detailsRaw === 'object')
          ? (detailsRaw as string | Record<string, unknown>)
          : undefined;

      const apiError: ApiErrorShape = {
        message: serverMessage,
        status: status || 500,
        details: normalizedDetails,
      };

      if (status === 500 || status === 503) {
        toast.error('Error del servidor. Intenta más tarde.');
      } else if (status === 0) {
        toast.error('No hay conexión a internet.');
      } else if (status === 401) {
        toast.error('No autorizado. Inicia sesión nuevamente.');
      } else if (status === 403) {
        toast.error('Acceso denegado.');
      } else if (status === 404) {
        toast.error('Recurso no encontrado.');
      } else if (status === 400 || status === 422) {
        // dejar a la UI si desea un manejo específico de validaciones
      } else {
        toast.error(apiError.message);
      }

      return Promise.reject(apiError);
    },
  );

  return instance;
};

export const apiClient: AxiosInstance = createHttpClient();

export async function apiGet<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.get<T>(url, config);
  return res.data as T;
}

export async function apiPost<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.post<T>(url, body, config);
  return res.data as T;
}

export async function apiPut<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.put<T>(url, body, config);
  return res.data as T;
}

export async function apiPatch<T, B = unknown>(
  url: string,
  body?: B,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.patch<T>(url, body, config);
  return res.data as T;
}

export async function apiDelete<T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<T> {
  const res = await apiClient.delete<T>(url, config);
  return res.data as T;
}
