import React, { useEffect } from 'react';

/**
 * Runs callback, when ref is rendered and user clicks elsewhere.
 * @param ref {React.RefObject} - ref
 * @param handleOutsideClick {() => void} callback
 * @return {void}
 */
export function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement>,
  handleOutsideClick: () => void,
  handleInsideClick?: (isOpen: boolean) => void
) {
  useEffect(() => {
    function handleDropdownClose(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleOutsideClick();
      } else if (
        ref.current?.contains(event.target as Node) &&
        handleInsideClick
      ) {
        handleInsideClick(true);
      }
    }
    document.addEventListener('mousedown', handleDropdownClose);
    return () => {
      document.removeEventListener('mousedown', handleDropdownClose);
    };
  });
}
