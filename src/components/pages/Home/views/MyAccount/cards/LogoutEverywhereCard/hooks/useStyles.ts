import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(5, 3),
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        maxWidth: 480,
      },
    },
    button: {
      margin: theme.spacing(2, 'auto', 0, 'auto'),
      minWidth: 200,
    },
    Snackbar: {
      width: '100%',
    },
  })
);

export default useStyles;
