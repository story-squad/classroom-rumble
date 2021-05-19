import { MutableRefObject, useCallback, useEffect, useRef } from 'react';

const useClickOutside = <ElementType extends HTMLDivElement = HTMLDivElement>({
  isActive = true,
  onClick,
}: {
  isActive?: boolean;
  onClick: () => void;
}): MutableRefObject<ElementType | null> | null => {
  const componentRef = useRef<ElementType>(null);

  const preventClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener('mousedown', onClick);
      document.addEventListener('touchstart', onClick);

      return () => {
        document.removeEventListener('mousedown', onClick);
        document.removeEventListener('touchstart', onClick);
      };
    }
  }, [isActive, onClick]);

  useEffect(() => {
    if (componentRef && componentRef.current) {
      const place = componentRef.current;
      place.addEventListener('mousedown', preventClick);
      place.addEventListener('touchstart', preventClick);

      return () => {
        place.removeEventListener('mousedown', preventClick);
        place.removeEventListener('touchstart', preventClick);
      };
    }
  }, [componentRef, componentRef.current, preventClick]);

  return componentRef ?? null;
};

export default useClickOutside;
