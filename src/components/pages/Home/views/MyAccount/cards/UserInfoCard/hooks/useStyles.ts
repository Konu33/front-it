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
      width: theme.spacing(12),
      height: theme.spacing(12),
      marginBottom: theme.spacing(2),
      backgroundColor: theme.palette.primary.light,
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
