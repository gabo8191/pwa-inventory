export interface ApiErrorShape {
  message: string;
  status: number;
  details?: string | Record<string, unknown>;
}

export interface ApiSuccess<T> {
  data: T;
}

export type ApiResult<T> = ApiSuccess<T>;
