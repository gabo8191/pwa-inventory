import React, { useCallback, useEffect, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

// Extend Window interface to include the BeforeInstallPromptEvent
declare global {
  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent;
  }
  interface Navigator {
    standalone?: boolean;
  }
}

export const InstallFab: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isInstallable, setIsInstallable] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  // Check if app is already installed
  const checkIfInstalled = useCallback(() => {
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as Navigator).standalone === true ||
      document.referrer.includes('android-app://');

    setIsInstalled(isStandalone);
    return isStandalone;
  }, []);

  // Detect platform
  const getPlatform = useCallback(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('android')) return 'android';
    if (userAgent.includes('iphone') || userAgent.includes('ipad'))
      return 'ios';
    if (userAgent.includes('mac')) return 'macos';
    if (userAgent.includes('win')) return 'windows';
    return 'desktop';
  }, []);

  useEffect(() => {
    // Check if already installed
    if (checkIfInstalled()) {
      return;
    }

    const handleBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      console.log('[PWA] beforeinstallprompt event fired');
      e.preventDefault();
      setDeferredPrompt(e);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      console.log('[PWA] App was installed');
      setIsInstalled(true);
      setDeferredPrompt(null);
      setIsInstallable(false);
    };

    // Add event listeners
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // For iOS, check if it's a valid PWA environment
    const platform = getPlatform();
    if (platform === 'ios') {
      // On iOS, show install button if not in standalone mode and in Safari
      const isInSafari = /^((?!chrome|android).)*safari/i.test(
        navigator.userAgent,
      );
      setIsInstallable(isInSafari && !checkIfInstalled());
    } else if (platform === 'android') {
      // For Android, set installable to true if not already installed
      // The beforeinstallprompt event might fire later
      setIsInstallable(!checkIfInstalled());
    } else {
      // For desktop, check if service worker is supported
      setIsInstallable('serviceWorker' in navigator && !checkIfInstalled());
    }

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt,
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [checkIfInstalled, getPlatform]);

  const handleInstall = async () => {
    if (deferredPrompt) {
      // Use native install prompt if available
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        console.log('[PWA] User choice:', choiceResult.outcome);

        if (choiceResult.outcome === 'accepted') {
          setDeferredPrompt(null);
          setIsInstallable(false);
        }
      } catch (error) {
        console.error('[PWA] Install prompt failed:', error);
        showManualInstructions();
      }
    } else {
      // Show manual instructions
      showManualInstructions();
    }
  };

  const showManualInstructions = () => {
    setShowInstructions(true);
  };

  const getInstructions = () => {
    const platform = getPlatform();

    switch (platform) {
      case 'ios':
        return {
          title: 'Instalar en iOS',
          steps: [
            '1. Toca el botón "Compartir" (↗) en Safari',
            '2. Selecciona "Añadir a pantalla de inicio"',
            '3. Toca "Añadir" para instalar la app',
          ],
        };
      case 'android':
        return {
          title: 'Instalar en Android',
          steps: [
            '1. Toca el menú (⋮) en Chrome',
            '2. Selecciona "Instalar aplicación" o "Añadir a pantalla de inicio"',
            '3. Toca "Instalar" para completar',
          ],
        };
      default:
        return {
          title: 'Instalar en PC',
          steps: [
            '1. Busca el ícono de instalación (⊞) en la barra de direcciones',
            '2. Haz clic en el ícono de instalación',
            '3. Selecciona "Instalar" en el diálogo que aparece',
          ],
        };
    }
  };

  // Don't show if installed
  if (isInstalled) {
    return null;
  }

  // Don't show if not installable (unless we want to show instructions)
  if (!isInstallable && !showInstructions) {
    return null;
  }

  return (
    <>
      {/* Install FAB */}
      <button
        onClick={handleInstall}
        className='fixed bottom-4 right-4 bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-50 flex items-center gap-2 font-medium'
        aria-label='Instalar aplicación'
      >
        <svg
          className='w-5 h-5'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
          />
        </svg>
        <span className='hidden sm:inline'>INSTALAR</span>
      </button>

      {/* Instructions Modal */}
      {showInstructions && (
        <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full'>
            <div className='flex justify-between items-center mb-4'>
              <h3 className='text-lg font-semibold text-gray-900'>
                {getInstructions().title}
              </h3>
              <button
                onClick={() => setShowInstructions(false)}
                className='text-gray-400 hover:text-gray-600'
                aria-label='Cerrar'
              >
                <svg
                  className='w-6 h-6'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>

            <div className='space-y-3'>
              {getInstructions().steps.map((step, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <div className='w-6 h-6 bg-cyan-100 text-cyan-600 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0'>
                    {index + 1}
                  </div>
                  <p className='text-gray-700'>{step}</p>
                </div>
              ))}
            </div>

            <div className='mt-6 flex justify-end'>
              <button
                onClick={() => setShowInstructions(false)}
                className='px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors'
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
