import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formWrapper: {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(6, 'auto'),
      width: 550,
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
  })
);

export default useStyles;
