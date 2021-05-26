import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {PopoverProps} from '@material-ui/core/Popover';
import {AccountCircle as AccountIcon, ExitToApp as LogoutIcon} from '@material-ui/icons';
import React, {useCallback, useState} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import LogoutDialog from '../LogoutDialog';

export interface IProfileMenuProps {
  handleClose: () => void;
  anchorEl: PopoverProps['anchorEl'];
}

function ProfileMenu(props: IProfileMenuProps) {
  const {handleClose, anchorEl} = props;
  const [logoutDialogOpen, setLogoutDialogOpen] = useState<boolean>(false);

  const handleLogoutClick = useCallback(() => {
    handleClose();
    setLogoutDialogOpen(true);
  }, [handleClose, setLogoutDialogOpen]);

  const handleLogoutDialogClose = useCallback(() => {
    setLogoutDialogOpen(false);
  }, [setLogoutDialogOpen]);

  return (
    <>
      <Menu
        id='profile-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <MenuItem key={0} component={RouterLink} to={'/home/my-account'} onClick={handleClose} button>
          <ListItemIcon>
            <AccountIcon fontSize={'small'} />
          </ListItemIcon>
          <ListItemText primary={'My account'} />
        </MenuItem>
        <MenuItem key={1} onClick={handleLogoutClick} button>
          <ListItemIcon>
            <LogoutIcon fontSize={'small'} />
          </ListItemIcon>
          <ListItemText primary={'Logout'} />
        </MenuItem>
      </Menu>

      <LogoutDialog open={logoutDialogOpen} onClose={handleLogoutDialogClose} />
    </>
  );
}

export default ProfileMenu;
