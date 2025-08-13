import type { AxiosResponse } from 'axios';
import { isAxiosError } from 'axios';
import { http } from '../lib/http';
import type {
  IApiError,
  IFormSubmissionResponse,
  IResearchFormData,
} from '../types/research-form.types';

class ResearchFormService {
  private readonly apiEndpoint: string;

  constructor() {
    this.apiEndpoint = '/api/research-info';
  }

  async submitResearchForm(
    formData: IResearchFormData,
  ): Promise<IFormSubmissionResponse> {
    try {
      const response: AxiosResponse<IFormSubmissionResponse> = await http.post(
        this.apiEndpoint,
        formData,
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        const apiError: IApiError = {
          message: error.response?.data?.message || 'Network error occurred',
          status: error.response?.status || 500,
          details:
            (error.response?.data as unknown as { details?: string })
              ?.details || error.message,
        };
        throw apiError;
      }

      throw {
        message: 'An unexpected error occurred',
        status: 500,
        details: 'Unknown error during form submission',
      } as IApiError;
    }
  }

  async checkConnection(): Promise<boolean> {
    try {
      await http.get('/health', { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

export const researchFormService = new ResearchFormService();
