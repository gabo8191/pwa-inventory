import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type {
  IApiError,
  IFormSubmissionResponse,
  IResearchFormData,
} from '../types/research-form.types';

class ResearchFormService {
  private readonly apiBaseUrl: string;
  private readonly apiEndpoint: string;

  constructor() {
    this.apiBaseUrl = 'http://localhost:3005';
    this.apiEndpoint = '/api/research-info';
  }

  async submitResearchForm(
    formData: IResearchFormData,
  ): Promise<IFormSubmissionResponse> {
    try {
      const response: AxiosResponse<IFormSubmissionResponse> = await axios.post(
        `${this.apiBaseUrl}${this.apiEndpoint}`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 10000, // 10 seconds timeout
        },
      );

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const apiError: IApiError = {
          message: error.response?.data?.message || 'Network error occurred',
          status: error.response?.status || 500,
          details: error.response?.data?.details || error.message,
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
      await axios.get(`${this.apiBaseUrl}/health`, { timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }
}

export const researchFormService = new ResearchFormService();
