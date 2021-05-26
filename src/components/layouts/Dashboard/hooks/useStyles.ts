import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

import {DRAWER_WIDTH} from '../../../organisms/AppDrawer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexFlow: 'column nowrap',
      left: 0,
      width: '100%',
      transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeIn}`,
      minHeight: `calc(100vh - ${56 + 4}px)`,
      '@media (orientation: landscape)': {
        minHeight: `calc(100vh - ${48 + 4}px)`,
      },
      [theme.breakpoints.up('sm')]: {
        minHeight: `calc(100vh - ${64 + 4}px)`,
      },
    },
    rootDrawerOpen: {
      transition: `all ${theme.transitions.duration.shorter}ms ${theme.transitions.easing.easeOut}`,
      [theme.breakpoints.up('md')]: {
        left: DRAWER_WIDTH,
        width: `calc(100% - ${DRAWER_WIDTH}px)`,
      },
    },
    content: {
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap',
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        padding: theme.spacing(4),
      },
    },
  })
);

export default useStyles;
