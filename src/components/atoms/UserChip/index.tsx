import Chip, {ChipProps} from '@material-ui/core/Chip';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo} from 'react';

import IUser from '../../../models/IUser';
import UserAvatar from '../UserAvatar';

export interface IUserChipProps extends ChipProps {
  user: Pick<IUser, 'name' | 'surname' | 'iconColor'>;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip_avatar: {
      color: `${theme.palette.common.white}!important`,
    },
  })
);

function UserChip(props: IUserChipProps) {
  const {user, ...ChipProps} = props;
  const classes = useStyles();

  return (
    <Chip
      variant={'outlined'}
      avatar={<UserAvatar user={user} />}
      label={`${user.name} ${user.surname}`}
      classes={{
        avatar: classes.chip_avatar,
      }}
      {...ChipProps}
    />
  );
}

export default memo(UserChip);
