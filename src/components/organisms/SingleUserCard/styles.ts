import {createStyles} from '@material-ui/core';
import {Theme} from '@material-ui/core/styles';
import makeStyles from '@material-ui/core/styles/makeStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      margin: 'auto',
      display: 'flex',
      flexFlow: 'column nowrap',
      [theme.breakpoints.up('lg')]: {
        flexFlow: 'row nowrap',
        width: '100%',
        maxWidth: 800,
      },
    },
    cardContent: {
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap',
      marginTop: 24,
      minWidth: 400,
    },
    list: {
      width: '100%',
    },
    listSubheader: {
      display: 'flex',
      flexFlow: 'row nowrap',
      alignItems: 'center',
    },
    avatar: {
      marginRight: 8,
    },
    svgImg: {
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: '50%',
      },
    },
    spinner: {
      justifySelf: 'center',
      alignSelf: 'center',
    },
  })
);

export default useStyles;
