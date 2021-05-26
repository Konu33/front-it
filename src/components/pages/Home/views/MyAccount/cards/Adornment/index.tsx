import Grow from '@material-ui/core/Grow';
import {createStyles, darken, makeStyles, Theme} from '@material-ui/core/styles';
import SettingsIcon from '@material-ui/icons/SettingsOutlined';
import classNames from 'classnames';
import React, {memo} from 'react';

export interface IAdornmentProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
    icon: {
      color: darken(theme.palette.background.paper, 0.4),
      fontSize: 100,
      animationName: '$iconRotation',
      animationDuration: theme.transitions.duration.complex + 'ms',
      animationFillMode: 'forwards',
      animationTimingFunction: theme.transitions.easing.easeOut,
    },
    '@keyframes iconRotation': {
      from: {
        transform: 'rotate(180deg)',
      },
      to: {
        transform: `rotate(${360}deg)`,
      },
    },
  })
);

function Adornment(props: IAdornmentProps) {
  const {className} = props;
  const classes = useStyles();

  return (
    <Grow in style={{transformOrigin: '0 0 0'}} timeout={500}>
      <div className={classNames(classes.root, className)}>
        <SettingsIcon color={'inherit'} className={classes.icon} />
      </div>
    </Grow>
  );
}

export default memo(Adornment);
