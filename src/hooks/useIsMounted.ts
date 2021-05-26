import {useCallback, useEffect, useRef} from 'react';

export interface ICheckIsMountedFn {
  (): boolean;
}

const useIsMounted = (): ICheckIsMountedFn => {
  const ref = useRef<boolean>(false);

  useEffect(() => {
    ref.current = true;
    return () => {
      ref.current = false;
    };
  }, []);

  return useCallback(() => {
    return ref.current;
  }, [ref]);
};

export default useIsMounted;
