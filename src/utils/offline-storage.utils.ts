import type { IResearchFormData } from '../types/research-form.types';

const STORAGE_KEY = 'research_form_offline_data';
const FORM_DRAFTS_KEY = 'research_form_drafts';
const MAX_STORAGE_ITEMS = 50; // Límite de formularios guardados offline

// Define the stored form data type
type StoredFormData = IResearchFormData & {
  savedAt: string;
  id: string;
  status: 'pending' | 'syncing' | 'failed';
  attempts: number;
};

type FailedFormData = IResearchFormData & {
  savedAt: string;
  id: string;
  status: 'failed';
  attempts: number;
};

export class OfflineStorageUtils {
  // Save form data for offline submission
  static saveFormData(formData: IResearchFormData): void {
    try {
      const existingData = this.getStoredFormData();
      const timestamp = new Date().toISOString();
      const dataWithTimestamp: StoredFormData = {
        ...formData,
        savedAt: timestamp,
        id: `form_${Date.now()}`,
        status: 'pending',
        attempts: 0,
      };

      // Limit the number of stored items to prevent storage overflow
      let updatedData = [...existingData, dataWithTimestamp];
      if (updatedData.length > MAX_STORAGE_ITEMS) {
        // Remove oldest items
        updatedData = updatedData.slice(-MAX_STORAGE_ITEMS);
        console.warn(
          `Límite de almacenamiento alcanzado. Se eliminaron los elementos más antiguos.`,
        );
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
      console.log('Datos del formulario guardados offline exitosamente');
    } catch (error) {
      console.error('Error guardando datos offline:', error);
      this.handleStorageError(error);
    }
  }

  // Get all stored form data
  static getStoredFormData(): StoredFormData[] {
    try {
      const storedData = localStorage.getItem(STORAGE_KEY);
      return storedData ? JSON.parse(storedData) : [];
    } catch (error) {
      console.error('Error recuperando datos almacenados:', error);
      return [];
    }
  }

  // Remove specific form data by ID
  static removeStoredFormData(id: string): void {
    try {
      const existingData = this.getStoredFormData();
      const filteredData = existingData.filter((item) => item.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
      console.log(`Formulario ${id} eliminado del almacenamiento offline`);
    } catch (error) {
      console.error('Error eliminando datos almacenados:', error);
    }
  }

  // Update the status of a form submission
  static updateFormStatus(
    id: string,
    status: 'pending' | 'syncing' | 'failed',
  ): void {
    try {
      const existingData = this.getStoredFormData();
      const updatedData = existingData.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status,
            attempts: status === 'failed' ? item.attempts + 1 : item.attempts,
            lastAttempt: new Date().toISOString(),
          };
        }
        return item;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error actualizando estado del formulario:', error);
    }
  }

  // Get failed submissions for retry
  static getFailedSubmissions(): FailedFormData[] {
    return this.getStoredFormData().filter(
      (item): item is FailedFormData => item.status === 'failed',
    );
  }

  // Clear all stored data
  static clearAllStoredData(): void {
    try {
      const pendingCount = this.getStoredFormData().length;
      const draftExists = this.getDraft() !== null;

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(FORM_DRAFTS_KEY);

      console.log(
        `Eliminados ${pendingCount} formularios pendientes y ${
          draftExists ? '1' : '0'
        } borrador`,
      );
    } catch (error) {
      console.error('Error limpiando datos almacenados:', error);
    }
  }

  // Clear only failed submissions
  static clearFailedSubmissions(): void {
    try {
      const existingData = this.getStoredFormData();
      const filteredData = existingData.filter(
        (item) => item.status !== 'failed',
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));

      const removedCount = existingData.length - filteredData.length;
      console.log(`Eliminados ${removedCount} envíos fallidos`);
    } catch (error) {
      console.error('Error limpiando envíos fallidos:', error);
    }
  }

  // Save draft with compression for large data
  static saveDraft(formData: Partial<IResearchFormData>): void {
    try {
      const timestamp = new Date().toISOString();
      const draftData = {
        ...formData,
        lastSaved: timestamp,
        version: '1.0',
      };

      const serializedData = JSON.stringify(draftData);

      // Check if data is too large (localStorage has ~5MB limit)
      if (serializedData.length > 1024 * 1024) {
        // 1MB warning
        console.warn('Borrador muy grande, considere reducir el contenido');
      }

      localStorage.setItem(FORM_DRAFTS_KEY, serializedData);
      console.log('Borrador guardado exitosamente');
    } catch (error) {
      console.error('Error guardando borrador:', error);
      this.handleStorageError(error);
    }
  }

  // Get draft with version checking
  static getDraft(): Partial<IResearchFormData> | null {
    try {
      const draftData = localStorage.getItem(FORM_DRAFTS_KEY);
      if (!draftData) return null;

      const parsedDraft = JSON.parse(draftData);

      // Check if draft is too old (older than 7 days)
      if (parsedDraft.lastSaved) {
        const lastSaved = new Date(parsedDraft.lastSaved);
        const daysDiff =
          (Date.now() - lastSaved.getTime()) / (1000 * 3600 * 24);

        if (daysDiff > 7) {
          console.log('Borrador muy antiguo, eliminándolo');
          this.clearDraft();
          return null;
        }
      }

      return parsedDraft;
    } catch (error) {
      console.error('Error recuperando borrador:', error);
      // If draft is corrupted, clear it
      this.clearDraft();
      return null;
    }
  }

  // Clear draft
  static clearDraft(): void {
    try {
      localStorage.removeItem(FORM_DRAFTS_KEY);
      console.log('Borrador eliminado');
    } catch (error) {
      console.error('Error eliminando borrador:', error);
    }
  }

  // Check if localStorage is available and has space
  static isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  // Get storage usage statistics
  static getStorageStats(): {
    pendingForms: number;
    failedForms: number;
    hasDraft: boolean;
    totalSize: number;
    availableSpace: number;
  } {
    try {
      const storedData = this.getStoredFormData();
      const draft = this.getDraft();

      const pendingForms = storedData.filter(
        (item) => item.status === 'pending',
      ).length;
      const failedForms = storedData.filter(
        (item) => item.status === 'failed',
      ).length;

      // Calculate approximate storage size
      const formsSize = JSON.stringify(storedData).length;
      const draftSize = draft ? JSON.stringify(draft).length : 0;
      const totalSize = formsSize + draftSize;

      // Estimate available space (localStorage limit is usually ~5MB)
      const estimatedLimit = 5 * 1024 * 1024; // 5MB
      const availableSpace = Math.max(0, estimatedLimit - totalSize);

      return {
        pendingForms,
        failedForms,
        hasDraft: !!draft,
        totalSize,
        availableSpace,
      };
    } catch (error) {
      console.error('Error calculando estadísticas de almacenamiento:', error);
      return {
        pendingForms: 0,
        failedForms: 0,
        hasDraft: false,
        totalSize: 0,
        availableSpace: 0,
      };
    }
  }

  // Handle storage errors (like quota exceeded)
  private static handleStorageError(error: unknown): void {
    const storageError = error as Error & { name?: string; code?: number };

    if (
      storageError.name === 'QuotaExceededError' ||
      storageError.code === 22
    ) {
      console.warn(
        'Cuota de almacenamiento excedida. Limpiando datos antiguos...',
      );

      // Try to free up space by removing oldest failed submissions
      const failedSubmissions = this.getFailedSubmissions();
      if (failedSubmissions.length > 0) {
        // Remove oldest failed submissions
        const oldestFailed = failedSubmissions
          .sort(
            (a, b) =>
              new Date(a.savedAt).getTime() - new Date(b.savedAt).getTime(),
          )
          .slice(0, Math.ceil(failedSubmissions.length / 2));

        oldestFailed.forEach((item) => this.removeStoredFormData(item.id));

        alert(
          `Almacenamiento lleno. Se eliminaron ${oldestFailed.length} envíos fallidos antiguos.`,
        );
      } else {
        alert(
          'Almacenamiento lleno. Considere limpiar datos offline o enviar formularios pendientes.',
        );
      }
    }
  }

  // Export data for backup
  static exportData(): string {
    try {
      const data = {
        forms: this.getStoredFormData(),
        draft: this.getDraft(),
        exportDate: new Date().toISOString(),
        version: '1.0',
      };

      return JSON.stringify(data, null, 2);
    } catch (error) {
      console.error('Error exportando datos:', error);
      return '';
    }
  }

  // Import data from backup (use with caution)
  static importData(jsonData: string): boolean {
    try {
      const data = JSON.parse(jsonData);

      if (data.forms && Array.isArray(data.forms)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.forms));
      }

      if (data.draft) {
        localStorage.setItem(FORM_DRAFTS_KEY, JSON.stringify(data.draft));
      }

      console.log('Datos importados exitosamente');
      return true;
    } catch (error) {
      console.error('Error importando datos:', error);
      return false;
    }
  }
}
