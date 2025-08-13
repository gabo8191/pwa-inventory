// Types for TypeScript
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
}

declare global {
  interface Navigator {
    standalone?: boolean;
  }
}

export class PWAUtils {
  private static installPrompt: BeforeInstallPromptEvent | null = null;

  static async registerServiceWorker(): Promise<boolean> {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.register('/sw.js', {
          scope: '/',
        });

        console.log('SW registered: ', registration);

        // Update available
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (
                newWorker.state === 'installed' &&
                navigator.serviceWorker.controller
              ) {
                console.log(
                  'New content is available and will be used when all tabs for this page are closed.',
                );
                // Show update notification
                this.showUpdateNotification();
              }
            });
          }
        });

        return true;
      } catch (error) {
        console.log('SW registration failed: ', error);
        return false;
      }
    }
    return false;
  }

  static setupInstallPrompt(): void {
    window.addEventListener('beforeinstallprompt', (e: Event) => {
      e.preventDefault();
      this.installPrompt = e as BeforeInstallPromptEvent;
      this.showInstallButton();
    });

    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed');
      this.hideInstallButton();
    });
  }

  static async promptInstall(): Promise<boolean> {
    if (!this.installPrompt) {
      return false;
    }

    try {
      this.installPrompt.prompt();
      const result = await this.installPrompt.userChoice;

      if (result.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        return true;
      } else {
        console.log('User dismissed the install prompt');
        return false;
      }
    } catch (error) {
      console.error('Error during install prompt:', error);
      return false;
    } finally {
      this.installPrompt = null;
    }
  }

  static isInstalled(): boolean {
    return (
      window.matchMedia('(display-mode: standalone)').matches ||
      navigator.standalone === true
    );
  }

  static isOnline(): boolean {
    return navigator.onLine;
  }

  static getStorageUsage(): Promise<StorageEstimate | null> {
    if ('storage' in navigator && 'estimate' in navigator.storage) {
      return navigator.storage.estimate();
    }
    return Promise.resolve(null);
  }

  private static showInstallButton(): void {
    // Create and show install button
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.style.display = 'block';
    }
  }

  private static hideInstallButton(): void {
    const installBtn = document.getElementById('install-button');
    if (installBtn) {
      installBtn.style.display = 'none';
    }
  }

  private static showUpdateNotification(): void {
    // Show update notification to user
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('App Update Available', {
        body: 'A new version is available. Refresh to update.',
        icon: '/pwa-192x192.png',
      });
    }
  }
}
