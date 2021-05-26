import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '-16px',
      [theme.breakpoints.up('sm')]: {
        margin: 0,
      },
    },
  })
);

export default useStyles;
