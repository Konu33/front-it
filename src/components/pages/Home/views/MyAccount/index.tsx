import {createStyles, makeStyles, Theme, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {memo} from 'react';

import useUser from '../../../../../hooks/useUser';
import IUser from '../../../../../models/IUser';
import LoadingBar from '../../../../atoms/LoadingBar';
import Adornment from './cards/Adornment';
import LogoutEverywhereCard from './cards/LogoutEverywhereCard';
import PasswordCard from './cards/PasswordCard';
import UserInfoCard from './cards/UserInfoCard';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        flexFlow: 'row wrap',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        maxWidth: 480 * 2.15,
        margin: 'auto',
      },
    },
    column: {
      display: 'flex',
      flexFlow: 'column nowrap',
      alignItems: 'center',
      width: '100%',
      [theme.breakpoints.up('lg')]: {
        width: '50%',
      },
    },
    card: {
      margin: theme.spacing(3, 0),
    },
  })
);

function MyAccount() {
  const classes = useStyles();
  const user: IUser | null = useUser();
  const theme: Theme = useTheme();
  const isMediaLgUp: boolean = useMediaQuery(theme.breakpoints.up('lg'));

  if (user)
    return (
      <div className={classes.root}>
        <div className={classes.column}>
          <UserInfoCard user={user} className={classes.card} />
          {isMediaLgUp && <Adornment className={classes.card} />}
        </div>
        <div className={classes.column}>
          <PasswordCard user={user} className={classes.card} />
          <LogoutEverywhereCard className={classes.card} />
        </div>
      </div>
    );
  else return <LoadingBar />;
}

export default memo(MyAccount);
