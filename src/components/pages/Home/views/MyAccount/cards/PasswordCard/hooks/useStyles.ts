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
    avatar: {
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      display: 'flex',
      flexFlow: 'column nowrap',
    },
    textField: {
      margin: theme.spacing(1, 'auto'),
      width: 250,
    },
    submitButton: {
      margin: theme.spacing(2, 'auto', 0, 'auto'),
      minWidth: 200,
    },
    snackbar: {
      width: '100%',
    },
  })
);

export default useStyles;
