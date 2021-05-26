import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formWrapper: {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(6, 'auto'),
      width: '100%',
      maxWidth: 630,
      height: '100%',
    },
    formHeader: {
      alignSelf: 'center',
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
    },
    form: {
      minWidth: 250,
    },
    securityIcon: {
      backgroundColor: theme.palette.secondary.dark,
      margin: theme.spacing(1),
    },
    formField: {
      display: 'block',
      margin: theme.spacing(2, 0),
    },
    title: {
      marginRight: 'auto',
      marginBottom: '10px',
    },
    textField_root: {
      '& input:-webkit-autofill': {
        '-webkit-text-fill-color': theme.palette.text.primary,
        transition: 'backgrounds-color 5000s ease-in-out 0s',
        '&:hover, &:focus, &:active': {
          '-webkit-text-fill-color': theme.palette.text.primary,
          transition: 'backgrounds-color 5000s ease-in-out 0s',
        },
      },
    },
    submitBtn: {
      width: '150px',
      marginLeft: 'auto',
      color: theme.palette.background.default,
    },
    submitBtn_label: {
      color: 'inherit',
    },
    errorSnackbar: {
      width: '100%',
    },
  })
);

export default useStyles;
