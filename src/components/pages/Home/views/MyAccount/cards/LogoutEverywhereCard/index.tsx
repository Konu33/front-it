import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert/Alert';
import classNames from 'classnames';
import React, {memo, useCallback} from 'react';

import ProgressButton from '../../../../../../atoms/ProgressButton';
import useButtonClickHandler from './hooks/useButtonClickHandler';
import useStyles from './hooks/useStyles';

export interface ILogoutEverywhereCardProps {
  className?: string;
}

function LogoutEverywhereCard(props: ILogoutEverywhereCardProps) {
  const {className} = props;
  const classes = useStyles();
  const {logout, status, setStatus} = useButtonClickHandler();

  const onSnackbarClose = useCallback(() => {
    setStatus('idle');
  }, [setStatus]);

  return (
    <>
      <Grow in style={{transformOrigin: '0 0 0'}} timeout={1500}>
        <Paper elevation={4} className={classNames(classes.root, className)}>
          <Typography variant={'h6'}>Logout everywhere</Typography>
          <Typography variant={'body2'}>Will terminate all open sessions except this one.</Typography>
          <ProgressButton
            inProgress={status === 'loading'}
            onClick={logout}
            variant={'contained'}
            className={classes.button}
            fullWidth
          >
            Logout
          </ProgressButton>
        </Paper>
      </Grow>

      <Snackbar
        open={status === 'error'}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
        className={classes.Snackbar}
      >
        <Alert onClose={onSnackbarClose} severity='error'>
          There was an unknown error ⚡
        </Alert>
      </Snackbar>

      <Snackbar
        open={status === 'success'}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
        className={classes.Snackbar}
      >
        <Alert onClose={onSnackbarClose} severity='success'>
          Logged out successfully
        </Alert>
      </Snackbar>
    </>
  );
}

export default memo(LogoutEverywhereCard);
