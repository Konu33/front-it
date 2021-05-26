import AppBar from '@material-ui/core/AppBar';
import Fade from '@material-ui/core/Fade';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Link from '@material-ui/core/Link';
import {createStyles, Theme, useTheme} from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import OpenMenuIcon from '@material-ui/icons/Menu';
import CloseMenuIcon from '@material-ui/icons/MenuOpenOutlined';
import SettingsIcon from '@material-ui/icons/Settings';
import React, {memo} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import useUser from '../../../hooks/useUser';
import IUser from '../../../models/IUser';
import ProfileMenu from '../ProfileMenu';

export interface ITopBarProps {
  title: string;
  isDrawerOpen: boolean;
  toggleDrawer?: () => void;
  visibleProgress?: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      backgroundColor: theme.palette.primary.dark,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    middleSpacer: {
      flex: 1,
    },
    userName: {
      marginRight: 16,
    },
    menuIcon_root: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
      },
    },
  })
);

function TopBar(props: ITopBarProps) {
  const [menuAnchorEl, setMenuAnchorEl] = React.useState<null | HTMLElement>(null);
  const classes = useStyles();
  const {title, isDrawerOpen, toggleDrawer, visibleProgress} = props;
  const user: IUser | null = useUser();
  const theme: Theme = useTheme();
  const isMediaMdUp: boolean = useMediaQuery(theme.breakpoints.up('sm'));

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar position={'fixed'} className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='menu'
            onClick={toggleDrawer}
          >
            {isDrawerOpen ? <CloseMenuIcon /> : <OpenMenuIcon />}
          </IconButton>
          <Link variant={'h6'} noWrap color={'inherit'} component={RouterLink} to={'/home'}>
            {title}
          </Link>
          <div className={classes.middleSpacer} />

          {isMediaMdUp && (
            <Fade in={user !== null}>
              <Typography variant={'h6'} className={classes.userName}>
                {user?.name}
              </Typography>
            </Fade>
          )}

          <IconButton
            aria-label={'account of current user'}
            aria-controls={'menu-appbar'}
            aria-haspopup={'true'}
            onClick={handleMenuClick}
            color={'inherit'}
            classes={{
              root: classes.menuIcon_root,
            }}
          >
            <SettingsIcon />
          </IconButton>
        </Toolbar>

        <LinearProgress color={'secondary'} style={{visibility: visibleProgress ? 'visible' : 'hidden'}} />
      </AppBar>

      <ProfileMenu anchorEl={menuAnchorEl} handleClose={handleMenuClose} />
    </>
  );
}

export default memo(TopBar);
