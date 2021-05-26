import classNames from 'classnames';
import React, {memo, ReactNode, useContext} from 'react';

import {DashboardProvider} from '../../../contexts/DashboardContext';
import {ILoadingBarContextVal, LoadingBarContext} from '../../../contexts/LoadingBarContext';
import useUser from '../../../hooks/useUser';
import IUser from '../../../models/IUser';
import TopBarSpacer from '../../atoms/TopBarSpacer';
import TopBar from '../../molecules/TopBar';
import AppDrawer from '../../organisms/AppDrawer';
import useDrawerControlls, {IDrawerControlls} from './hooks/useDrawerControllers';
import useStyles from './hooks/useStyles';

export interface IDashboardProps {
  children: ReactNode;
}

function Dashboard(props: IDashboardProps) {
  const {children} = props;
  const classes = useStyles();
  const loadingBar: ILoadingBarContextVal = useContext(LoadingBarContext);
  const {drawerOpen, onDrawerToggle, onDrawerOpen, onDrawerClose}: IDrawerControlls = useDrawerControlls();
  const user: IUser | null = useUser();

  return (
    <>
      <TopBar
        title={'IT-Crowd'}
        isDrawerOpen={drawerOpen}
        toggleDrawer={onDrawerToggle}
        visibleProgress={loadingBar.isVisible()}
      />
      <TopBarSpacer />
      <AppDrawer open={drawerOpen} onOpen={onDrawerOpen} onClose={onDrawerClose} />
      <div className={classNames(classes.root, drawerOpen && classes.rootDrawerOpen)}>
        <div className={classes.content}>{user && <DashboardProvider user={user}>{children}</DashboardProvider>}</div>
      </div>
    </>
  );
}

export default memo(Dashboard);
