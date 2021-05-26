import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formHeader: {
      display: 'flex',
      flexFlow: 'column nowrap',
    },
    iconsToolbar: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-end',
      margin: '0 -8px',
    },
    toolbarIcon: {
      margin: 8,
    },
    title: {
      marginRight: 'auto',
      marginBottom: '10px',
    },
    iconSize: {
      fontSize: '24px',
      cursor: 'pointer',
      color: 'white',
    },
    commentsBlock: {
      display: 'flex',
      flexFlow: 'column nowrap',
      margin: theme.spacing(4, 0),
    },
    commentWrapper: {
      width: '100%',
      margin: theme.spacing(2, 0),
      [theme.breakpoints.up('lg')]: {
        width: '55%',
      },
    },
    commentWrapperAlt: {
      alignSelf: 'flex-end',
    },
    comment: {
      backgroundColor: theme.palette.action.hover,
    },
  })
);

export default useStyles;
