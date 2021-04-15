import { useCallback, useEffect } from 'react';

const useKeyPress = ({
  key,
  action,
}: {
  key: string;
  action: () => void;
}): void => {
  const callActionIfKeyMatches = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === key) action();
    },
    [key, action],
  );
  useEffect(() => {
    document.addEventListener('keydown', callActionIfKeyMatches);
    return () =>
      document.removeEventListener('keydown', callActionIfKeyMatches);
  }, [callActionIfKeyMatches]);
};

export default useKeyPress;
