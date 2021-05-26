import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo} from 'react';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      minHeight: 56 + 4,
      '@media (orientation: landscape)': {
        minHeight: 48 + 4,
      },
      [theme.breakpoints.up('sm')]: {
        minHeight: 64 + 4,
      },
    },
  })
);

function TopBarSpacer() {
  const classes = useStyles();

  return <div className={classes.root} />;
}

export default memo(TopBarSpacer);
