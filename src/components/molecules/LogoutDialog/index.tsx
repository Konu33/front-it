import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {ModalProps} from '@material-ui/core/Modal';
import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {ExitToApp as LogoutIcon} from '@material-ui/icons';
import React, {memo, useCallback} from 'react';

import useLogoutOperation from '../../../contexts/AuthContext/operations/useLogoutOperation';
import ErrorReporting from '../../../mechanisms/ErrorReporting';

export interface ILogoutDialogProps {
  open: ModalProps['open'];
  onClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 4, 0, 4),
    },
    dialog__paper: {
      width: '100%',
      margin: 0,
      [theme.breakpoints.up('sm')]: {
        width: 'unset',
        margin: 'unset',
      },
    },
    title: {
      textAlign: 'center',
    },
    content: {
      padding: 0,
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    },
    actions: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      paddingBottom: theme.spacing(2),
    },
  })
);

function LogoutDialog(props: ILogoutDialogProps) {
  const {open, onClose} = props;
  const classes = useStyles();
  const logoutOperation = useLogoutOperation();
  const theme: Theme = useTheme();
  const isMediaXs = useMediaQuery(theme.breakpoints.down('xs'));

  const onBtnClick = useCallback(async () => {
    try {
      await logoutOperation();
      /*
       * Nie trzeba nic więcej robić.
       * Po pomyślnym wylogownaiu zostaną zaktualizowane dane autoryzacji (`authData`).
       * Aktualizacja wymusi update contextu AuthContext.
       * Aktualizacji contextu wyrenderuje jeszcze raz routing.
       * Ad-hoc `PrivateRoute` zajmie się przekierowaniem dalej.
       */
    } catch (e: unknown) {
      ErrorReporting.captureError(e);
      onClose();
    }
  }, [logoutOperation, onClose]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby='logout-dialog'
      className={classes.root}
      classes={{
        paper: classes.dialog__paper,
      }}
    >
      <DialogTitle id='logout-dialog-title' className={classes.title}>
        Czy na pewno chcesz się wylogować?
      </DialogTitle>
      {!isMediaXs && (
        <DialogContent id='logout-dialog-title' className={classes.content}>
          Wszelkie niezapisane zmiany zostaną utracone.
        </DialogContent>
      )}
      <DialogActions className={classes.actions}>
        <Button
          onClick={onBtnClick}
          color={'secondary'}
          variant={'outlined'}
          autoFocus
          startIcon={<LogoutIcon fontSize={'small'} />}
        >
          Wyloguj
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(LogoutDialog);
