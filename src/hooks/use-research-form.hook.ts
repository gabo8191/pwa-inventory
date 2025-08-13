import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { researchFormService } from '../services/research-form.service';
import type { IApiError } from '../types/research-form.types';
import { OfflineStorageUtils } from '../utils/offline-storage.utils';
import type { ResearchFormSchema } from '../utils/validation.schemas';
import { researchFormSchema } from '../utils/validation.schemas';

interface UseResearchFormReturn {
  form: ReturnType<typeof useForm<ResearchFormSchema>>;
  isSubmitting: boolean;
  submitError: string | null;
  isOnline: boolean;
  hasUnsavedChanges: boolean;
  pendingSubmissions: number;
  isSyncing: boolean;
  lastSyncTime: string | null;
  successfulSubmissions: number;
  successMessage: string | null;
  handleFormSubmit: (data: ResearchFormSchema) => Promise<void>;
  clearError: () => void;
  clearSuccessMessage: () => void;
  saveAsDraft: () => void;
  loadDraft: () => void;
  forceSyncOfflineData: () => Promise<void>;
  clearOfflineData: () => void;
  resetSuccessCounter: () => void;
}

export const useResearchForm = (): UseResearchFormReturn => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState<boolean>(false);
  const [pendingSubmissions, setPendingSubmissions] = useState<number>(0);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [successfulSubmissions, setSuccessfulSubmissions] = useState<number>(0);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const autoSaveTimeoutRef = useRef<number | undefined>(undefined);

  const form = useForm<ResearchFormSchema>({
    resolver: zodResolver(researchFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      phoneNumber: '',
      dateOfBirth: '',
      occupation: '',
      company: '',
      experience: '',
      education: '',
      researchArea: '',
      projectTitle: '',
      projectDescription: '',
      budget: '',
      preferredContactMethod: '',
      availabilityDate: '',
      additionalNotes: '',
    },
  });

  const { watch, reset, getValues } = form;

  // Update pending submissions count
  const updatePendingCount = useCallback(() => {
    const storedData = OfflineStorageUtils.getStoredFormData();
    setPendingSubmissions(storedData.length);
  }, []);

  const saveAsDraft = useCallback(() => {
    const formData = getValues();
    OfflineStorageUtils.saveDraft(formData);
    setHasUnsavedChanges(false);
    console.log('Draft saved successfully');
  }, [getValues]);

  // Watch for form changes to detect unsaved changes
  useEffect(() => {
    const subscription = watch((_, { name, type }) => {
      if (type === 'change' && name) {
        setHasUnsavedChanges(true);

        // Clear existing timeout
        if (autoSaveTimeoutRef.current) {
          clearTimeout(autoSaveTimeoutRef.current);
        }

        // Auto-save draft after 30 seconds of inactivity
        autoSaveTimeoutRef.current = setTimeout(() => {
          saveAsDraft();
        }, 30000);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [watch, saveAsDraft]);

  // Load draft on component mount and update pending count
  useEffect(() => {
    const draft = OfflineStorageUtils.getDraft();
    if (draft) {
      reset(draft as ResearchFormSchema);
      setHasUnsavedChanges(true);
    }
    updatePendingCount();
  }, [reset, updatePendingCount]);

  const handleFormSubmit = useCallback(
    async (data: ResearchFormSchema) => {
      setIsSubmitting(true);
      setSubmitError(null);
      setSuccessMessage(null);

      try {
        if (navigator.onLine) {
          // Online submission
          await researchFormService.submitResearchForm(data);
          reset();
          setHasUnsavedChanges(false);
          OfflineStorageUtils.clearDraft();
          setSuccessfulSubmissions((prev) => prev + 1);

          // Show success message but keep form available for next submission
          setSuccessMessage(
            '¡Formulario enviado exitosamente! Puedes enviar otro formulario.',
          );
        } else {
          // Offline - save for later submission
          OfflineStorageUtils.saveFormData(data);
          reset();
          setHasUnsavedChanges(false);
          OfflineStorageUtils.clearDraft();
          updatePendingCount();
          setSuccessMessage(
            'Sin conexión. Formulario guardado localmente y se enviará cuando tengas conexión.',
          );
        }
      } catch (error) {
        const apiError = error as IApiError;
        setSubmitError(apiError.message || 'Ocurrió un error inesperado');

        // Save to offline storage as backup
        OfflineStorageUtils.saveFormData(data);
        updatePendingCount();
      } finally {
        setIsSubmitting(false);
      }
    },
    [reset, updatePendingCount],
  );

  const clearError = useCallback(() => {
    setSubmitError(null);
  }, []);

  const clearSuccessMessage = useCallback(() => {
    setSuccessMessage(null);
  }, []);

  const loadDraft = useCallback(() => {
    const draft = OfflineStorageUtils.getDraft();
    if (draft) {
      reset(draft as ResearchFormSchema);
      setHasUnsavedChanges(true);
    }
  }, [reset]);

  const resetSuccessCounter = useCallback(() => {
    setSuccessfulSubmissions(0);
  }, []);

  // Force sync offline data manually
  const forceSyncOfflineData = useCallback(async () => {
    if (!navigator.onLine) {
      alert('No hay conexión a internet. Intenta más tarde.');
      return;
    }

    setIsSyncing(true);
    const storedData = OfflineStorageUtils.getStoredFormData();

    if (storedData.length === 0) {
      alert('No hay datos pendientes para sincronizar.');
      setIsSyncing(false);
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const data of storedData) {
      try {
        await researchFormService.submitResearchForm(data);
        OfflineStorageUtils.removeStoredFormData(data.id);
        successCount++;
        console.log(`Formulario ${data.id} sincronizado exitosamente`);
      } catch (error) {
        errorCount++;
        console.error(`Error sincronizando formulario ${data.id}:`, error);
      }
    }

    updatePendingCount();
    setLastSyncTime(new Date().toLocaleString());
    setIsSyncing(false);

    // Show result to user
    if (successCount > 0 && errorCount === 0) {
      alert(`✅ ${successCount} formulario(s) sincronizado(s) exitosamente.`);
    } else if (successCount > 0 && errorCount > 0) {
      alert(
        `⚠️ ${successCount} formulario(s) sincronizado(s), ${errorCount} fallaron.`,
      );
    } else {
      alert(
        `❌ No se pudo sincronizar ningún formulario. Verifica tu conexión.`,
      );
    }
  }, [updatePendingCount]);

  // Clear all offline data
  const clearOfflineData = useCallback(() => {
    const confirm = window.confirm(
      '¿Estás seguro de eliminar todos los datos guardados offline? Esta acción no se puede deshacer.',
    );

    if (confirm) {
      OfflineStorageUtils.clearAllStoredData();
      updatePendingCount();
      alert('Datos offline eliminados.');
    }
  }, [updatePendingCount]);

  // Listen for online/offline events and auto-sync
  const handleOnlineStatusChange = useCallback(async () => {
    const online = navigator.onLine;
    setIsOnline(online);

    // When coming back online, automatically try to sync offline data
    if (online) {
      const storedData = OfflineStorageUtils.getStoredFormData();

      if (storedData.length > 0) {
        console.log(
          `Conexión restaurada. Intentando sincronizar ${storedData.length} formulario(s) pendiente(s)...`,
        );
        setIsSyncing(true);

        let syncedCount = 0;

        for (const data of storedData) {
          try {
            await researchFormService.submitResearchForm(data);
            OfflineStorageUtils.removeStoredFormData(data.id);
            syncedCount++;
            console.log(`Auto-sincronizado: ${data.id}`);
          } catch (error) {
            console.error(`Error auto-sincronizando ${data.id}:`, error);
          }
        }

        updatePendingCount();
        setLastSyncTime(new Date().toLocaleString());
        setIsSyncing(false);

        if (syncedCount > 0) {
          // Show non-intrusive notification and update success counter
          setSuccessfulSubmissions((prev) => prev + syncedCount);
          console.log(
            `✅ ${syncedCount} formulario(s) sincronizado(s) automáticamente`,
          );
        }
      }
    }
  }, [updatePendingCount]);

  // Set up event listeners for online/offline detection
  useEffect(() => {
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, [handleOnlineStatusChange]);

  // Save draft before page unload
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        saveAsDraft();
        const message = 'Tienes cambios sin guardar. ¿Estás seguro de salir?';
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges, saveAsDraft]);

  // Auto-clear success message after 5 seconds
  useEffect(() => {
    if (successMessage) {
      const timeout = setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // 5 seconds

      return () => clearTimeout(timeout);
    }
  }, [successMessage]);

  return {
    form,
    isSubmitting,
    submitError,
    isOnline,
    hasUnsavedChanges,
    pendingSubmissions,
    isSyncing,
    lastSyncTime,
    successfulSubmissions,
    successMessage,
    handleFormSubmit,
    clearError,
    clearSuccessMessage,
    saveAsDraft,
    loadDraft,
    forceSyncOfflineData,
    clearOfflineData,
    resetSuccessCounter,
  };
};
