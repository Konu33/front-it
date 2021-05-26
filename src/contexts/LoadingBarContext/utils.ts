import {ILoadingBarContextVal} from './index';

const dummyFn = () => {
  console.warn('LoadingBarContext is not initialized yet!');
  return false;
};

export const defaultContextVal: ILoadingBarContextVal = {
  show: dummyFn,
  hide: dummyFn,
  isVisible: dummyFn,
};
