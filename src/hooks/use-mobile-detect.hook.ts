import { useEffect, useState } from 'react';

export const useMobileDetect = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkDevice = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      const touchDevice =
        'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const screenWidth = window.innerWidth <= 768;

      setIsMobile(mobileRegex.test(userAgent) || touchDevice || screenWidth);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  return isMobile;
};
