import {Dispatch, useReducer} from 'react';

import IPayloadAction from '../../../../../../models/IPayloadAction';
import IUser from '../../../../../../models/IUser';

export type LoadingState = 'loading' | 'success' | 'error';

export interface ILocalStateFulfilled {
  status: Extract<LoadingState, 'success'>;
  user: IUser | null;
}
export interface ILocalStateUnfulfilled {
  status: Exclude<LoadingState, 'success'>;
}
export type ILocalState = ILocalStateFulfilled | ILocalStateUnfulfilled;
export type Action = IPayloadAction<'fulfillState', IUser> | IPayloadAction<'rejectState'>;

const defaultState: ILocalState = {status: 'loading'};

function reducer(state: ILocalState, action: Action): ILocalState {
  switch (action.type) {
    case 'fulfillState':
      return {
        status: 'success',
        user: action.payload,
      };
    case 'rejectState':
      return {
        status: 'error',
      };
    default:
      throw new Error('Unknown action type');
  }
}

export default function useLocalState(): [ILocalState, Dispatch<Action>] {
  return useReducer(reducer, defaultState);
}
