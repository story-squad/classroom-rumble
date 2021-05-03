import { useCallback, useState } from 'react';

export default function useAsync<FunctionReturn, Params extends unknown[]>({
  asyncFunction,
  setter,
}: {
  asyncFunction: (...params: Params) => Promise<FunctionReturn>;
  setter?: (newValue: FunctionReturn) => void;
}): [
  execute: (...params: Params) => Promise<void>,
  loading: boolean,
  response: FunctionReturn | undefined,
  error: Error | undefined,
] {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<FunctionReturn>();
  const [error, setError] = useState<Error>();

  // If a custom state setter was defined in the function arguments, then use that,
  // else use the state setter from useState (setValue)
  const updateState = setter ?? setValue;

  const execute = useCallback(
    async (...params: Params) => {
      try {
        setLoading(true);
        setError(undefined);
        const response = await asyncFunction(...params);
        updateState(response);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [asyncFunction],
  );

  return [execute, loading, value, error];
}
