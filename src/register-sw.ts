import { registerSW, type RegisterSWOptions } from 'virtual:pwa-register';

export function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) return;

  const options: RegisterSWOptions = {
    immediate: true,
    onRegistered(registration) {
      if (registration) {
        console.info('[PWA] Service Worker registered:', registration.scope);
      }
    },
    onRegisterError(error: Error) {
      console.error('[PWA] Service Worker registration failed:', error);
    },
    onOfflineReady() {
      console.info('[PWA] App is ready to work offline');
    },
    onNeedRefresh() {
      console.info('[PWA] New content available, will update on reload');
    },
  };

  registerSW(options);
}
