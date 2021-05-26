import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formWrapper: {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(6, 'auto'),
      width: '100%',
      minWidth: 250,
      maxWidth: 550,
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
      margin: theme.spacing(2, 'auto'),
    },
    formSelect: {
      width: '100%',
    },
    assigneListItem: {
      padding: 0,
    },
    Snackbar: {
      width: '100%',
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
      margin: 'auto',
    },
  })
);

export default useStyles;
