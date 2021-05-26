import {useContext, useMemo, useState} from 'react';

import {ILoadingBarContextVal, LoadingBarContext, SourceKey} from '../contexts/LoadingBarContext';

export interface ILoadingBarControls {
  show: () => void;
  hide: () => void;
  isVisible: boolean;
}

export default function useLoadingBar(): ILoadingBarControls {
  const {show, hide, isVisible}: ILoadingBarContextVal = useContext(LoadingBarContext);
  const [sourceKey] = useState<SourceKey>(Symbol('LoadingBar'));

  return useMemo(
    () => ({
      show: () => show(sourceKey),
      hide: () => hide(sourceKey),
      isVisible: isVisible(sourceKey),
    }),
    [sourceKey, show, hide, isVisible]
  );
}
