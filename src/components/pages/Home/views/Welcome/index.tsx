import Fade from '@material-ui/core/Fade';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import React, {memo} from 'react';

import unDrawSvg from '../../../../../assets/svg/undraw_Preparation_re_t0ce.svg';

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flex: 1,
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10%',
    },
    img: {
      height: '50vh',
      maxWidth: '100%',
    },
  })
);

function Welcome() {
  const classes = useStyles();

  return (
    <Fade in>
      <div className={classes.root}>
        <img src={unDrawSvg} alt={'kanban dashboard'} className={classes.img} />
      </div>
    </Fade>
  );
}

export default memo(Welcome);
