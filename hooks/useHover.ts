import React, { useEffect } from 'react';

export function useHover(
  ref: React.RefObject<HTMLElement>,
  handleMouseLeave: () => void,
  handleMouseEnter: (isOpen: boolean) => void
) {
  useEffect(() => {
    function handleTooltipClose(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleMouseLeave();
      } else if (ref.current?.contains(event.target as Node)) {
        handleMouseEnter(true);
      }
    }

    document.addEventListener('mouseenter', handleTooltipClose);

    return () => {
      document.removeEventListener('mouseenter', handleTooltipClose);
    };
  }, []);
}

export default useHover;
