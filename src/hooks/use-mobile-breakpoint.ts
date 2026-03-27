import { useEffect, useState } from 'react';

const MOBILE_MEDIA_QUERY = '(max-width: 996px)';

function getMobileMatch(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }

  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
}

export function useMobileBreakpoint(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return;
    }

    const media = window.matchMedia(MOBILE_MEDIA_QUERY);
    const onChange = () => setIsMobile(media.matches);

    onChange();

    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', onChange);
      return () => media.removeEventListener('change', onChange);
    }

    media.addListener(onChange);
    return () => media.removeListener(onChange);
  }, []);

  return isMobile;
}

export { MOBILE_MEDIA_QUERY, getMobileMatch };
