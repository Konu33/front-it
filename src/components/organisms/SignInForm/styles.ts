import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {},
    formWrapper: {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(1, 6),
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
      width: '100%',
      margin: theme.spacing(4, 'auto', 2, 'auto'),
      paddingLeft: theme.spacing(4),
      paddingRight: theme.spacing(4),
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
