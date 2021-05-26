import Avatar, {AvatarProps} from '@material-ui/core/Avatar';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import React, {memo} from 'react';

import IUser from '../../../models/IUser';

export interface IUserAvatarProps extends AvatarProps {
  user: Pick<IUser, 'name' | 'iconColor'>;
}

const useStyles = makeStyles(() =>
  createStyles({
    avatar: (props: IUserAvatarProps) => ({
      backgroundColor: props.user.iconColor,
    }),
  })
);

function UserAvatar(props: IUserAvatarProps) {
  const {user, className, ...AvatarProps} = props;
  const classes = useStyles(props);

  return (
    <Avatar {...AvatarProps} className={classNames(classes.avatar, className)}>
      {user.name[0].toUpperCase()}
    </Avatar>
  );
}

export default memo(UserAvatar);
