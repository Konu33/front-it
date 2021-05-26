import {memo, useEffect, useState} from 'react';

import useLoadingBar, {ILoadingBarControls} from '../../../hooks/useLoadingBar';
import usePrevious from '../../../hooks/usePrevious';

function LoadingBar() {
  const {show, hide}: ILoadingBarControls = useLoadingBar();
  const [visible, setVisible] = useState<boolean>(false);
  const prevVisible = usePrevious(visible);

  useEffect(() => {
    setVisible(true);
  }, [setVisible]);

  useEffect(() => {
    if (!prevVisible && visible) show();

    return () => {
      if (prevVisible && visible) hide();
    };
  }, [prevVisible, visible, show, hide]);

  return null;
}

export default memo(LoadingBar);
