import { useEffect, useState } from 'react';

/**
 * Custom hook that provides the current browser window size.
 *
 * @returns {{ width: number | undefined, height: number | undefined }}
 * An object with `width` and `height` properties representing
 * the width and height of the browser window, respectively.
 */
export function useWindowSize() {
  const isClient = typeof window === 'object';
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return false;
    }
    function handleResize() {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowSize;
}
