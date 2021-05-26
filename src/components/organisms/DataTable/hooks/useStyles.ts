import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    container: {
      overflowY: 'auto',
      maxHeight: `calc(100vh - ${56 + 4 + 52 + 56}px)`,
      '@media (orientation: landscape)': {
        maxHeight: `calc(100vh - ${48 + 4 + 64 + 52 + 48}px)`,
      },
      [theme.breakpoints.up('sm')]: {
        maxHeight: `calc(100vh - ${64 + 4 + 64 + 52 + 64}px)`,
      },
    },
  })
);

export default useStyles;
