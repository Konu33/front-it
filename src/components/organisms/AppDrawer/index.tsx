import Divider from '@material-ui/core/Divider';
import Grow from '@material-ui/core/Grow';
import {ModalProps} from '@material-ui/core/Modal';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {memo} from 'react';

import useUser from '../../../hooks/useUser';
import IUser from '../../../models/IUser';
import TopBarSpacer from '../../atoms/TopBarSpacer';
import AppDrawerList from '../../molecules/AppDrawerList';
import content, {IDrawerList} from './content';

export interface IAppDrawerProps {
  open: ModalProps['open'];
  onOpen: React.ReactEventHandler<{}>;
  onClose: React.ReactEventHandler<{}>;
}

export const DRAWER_WIDTH = 240;

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    drawer: {
      width: DRAWER_WIDTH,
      flexShrink: 0,
    },
    drawer_paper: {
      width: DRAWER_WIDTH,
    },
    drawerContainer: {
      overflow: 'auto',
    },
  })
);

function AppDrawer(props: IAppDrawerProps) {
  const {open, onOpen, onClose} = props;
  const classes = useStyles();
  const theme: Theme = useTheme();
  const user: IUser | null = useUser();
  const isMediaSmDown: boolean = useMediaQuery(theme.breakpoints.down('sm'));
  const drawerLists: IDrawerList[] | null =
    user && content.filter((drawerList: IDrawerList) => drawerList.visibleFor.includes(user.role));

  return (
    <SwipeableDrawer
      style={{zIndex: theme.zIndex.drawer - 1}}
      className={classes.drawer}
      variant={isMediaSmDown ? 'temporary' : 'persistent'}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      classes={{
        paper: classes.drawer_paper,
      }}
    >
      <TopBarSpacer />
      <div className={classes.drawerContainer}>
        {drawerLists?.map((drawerList: IDrawerList, index: number) => (
          <Grow
            key={index}
            in
            style={{transformOrigin: '-50% 50% 0', transitionDelay: index * 100 + 'ms'}}
            timeout={theme.transitions.duration.short}
          >
            <div>
              <AppDrawerList elements={drawerList.elements} />
              {index + 1 < content.length && <Divider />}
            </div>
          </Grow>
        ))}
      </div>
    </SwipeableDrawer>
  );
}

export default memo(AppDrawer);
