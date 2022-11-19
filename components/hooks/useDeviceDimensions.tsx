import { useState, useEffect } from 'react';

export const useDeviceWidth = () => {
  const [deviceWidth, setDeviceWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );
  useEffect(() => {
    function handleResize() {
      setDeviceWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return deviceWidth;
};
