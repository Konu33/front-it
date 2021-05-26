import {createContext, ReactNode, useCallback, useMemo, useState} from 'react';

import * as utils from './utils';

export type SourceKey = string | number | Symbol;

export interface ILoadingBarContextVal {
  show: (sourceKey: SourceKey) => void;
  hide: (sourceKey: SourceKey) => void;
  isVisible: (sourceKey?: SourceKey) => boolean;
}

export const LoadingBarContext = createContext<ILoadingBarContextVal>(utils.defaultContextVal);

export const LoadingBarProvider = function (props: {children: ReactNode}) {
  const {children} = props;
  const [sources, setSources] = useState<Set<SourceKey>>(new Set());

  const showLoadingBar = useCallback(
    (sourceKey: SourceKey) => {
      if (sources.has(sourceKey)) return;

      const newSources = new Set(sources);
      newSources.add(sourceKey);
      setSources(newSources);
    },
    [sources, setSources]
  );

  const hideLoadingBar = useCallback(
    (sourceKey: SourceKey) => {
      if (!sources.has(sourceKey)) return;

      const newSources = new Set(sources);
      newSources.delete(sourceKey);
      setSources(newSources);
    },
    [sources, setSources]
  );

  const isBarVisible = useCallback(
    (sourceKey?: SourceKey) => {
      return sourceKey ? sources.has(sourceKey) : sources.size > 0;
    },
    [sources]
  );

  const value: ILoadingBarContextVal = useMemo(
    () => ({
      show: showLoadingBar,
      hide: hideLoadingBar,
      isVisible: isBarVisible,
    }),
    [showLoadingBar, hideLoadingBar, isBarVisible]
  );

  return <LoadingBarContext.Provider value={value}>{children}</LoadingBarContext.Provider>;
};
