import { useCallback, useEffect, useState } from 'react';

export default function useAsync<FunctionReturn, Params extends unknown[]>({
  asyncFunction,
  setter,
  enableLogs = false,
}: {
  asyncFunction: (...params: Params) => Promise<FunctionReturn>;
  setter?: (newValue: FunctionReturn) => void;
  enableLogs?: boolean;
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
      enableLogs && console.log('executing async function');
      try {
        setLoading(true);
        setError(undefined);
        const response = await asyncFunction(...params);
        enableLogs && console.log('received response', response);
        updateState(response);
      } catch (err) {
        enableLogs && console.log('error in async execution', err);
        setError(err);
      } finally {
        setLoading(false);
      }
      enableLogs && console.log('finished executing async function');
    },
    [asyncFunction],
  );

  useEffect(() => {
    enableLogs && console.log('useAsync updated', { value, loading, error });
  });

  return [execute, loading, value, error];
}
