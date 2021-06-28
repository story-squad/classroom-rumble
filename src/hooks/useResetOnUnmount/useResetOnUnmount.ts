import { useEffect } from 'react';
import { RecoilState, useRecoilCallback } from 'recoil';

const useResetOnUnmount = <DataType extends unknown>({
  recoil,
}: {
  recoil: RecoilState<DataType>[];
}): void => {
  const reset = useRecoilCallback<DataType[], void>(
    ({ reset }) =>
      () => {
        recoil.forEach(reset);
      },
    [recoil],
  );

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
};

export default useResetOnUnmount;
