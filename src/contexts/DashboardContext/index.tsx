import {createContext, memo, ReactNode} from 'react';

import IUser from '../../models/IUser';

export interface IDashboardData {
  user: IUser;
}
export interface IDashboardProviderProps extends IDashboardData {
  children: ReactNode;
}

export const DashboardContext = createContext<IDashboardData>(
  {} as IDashboardData /* Temporary solution to silent TS */
);

export const DashboardProvider = memo(function (props: IDashboardProviderProps) {
  const {children, user} = props;

  return <DashboardContext.Provider value={{user}}>{children}</DashboardContext.Provider>;
});
