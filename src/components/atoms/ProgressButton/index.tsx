import Button, {ButtonProps} from '@material-ui/core/Button';
import CircularProgress, {CircularProgressProps} from '@material-ui/core/CircularProgress';
import {green} from '@material-ui/core/colors';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import classNames from 'classnames';
import React, {DetailedHTMLProps, forwardRef, HTMLAttributes, memo} from 'react';

import useMergeClasses from '../../../hooks/useMergeClasses';
import {OverrideClassesProp} from '../../../utils/styling-utils';

export interface IProgressButtonProps extends Omit<ButtonProps, 'classes' | 'className'> {
  classes?: OverrideClassesProp<typeof useStyles>;
  className?: string;
  inProgress?: boolean;
  WrapperProps?: Partial<DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>>;
  ButtonProps?: Partial<ButtonProps>;
  CircularProgressProps?: Partial<CircularProgressProps>;
}

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      position: 'relative',
    },
    circularProgress: {
      color: green[500],
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: -18,
      marginLeft: -18,
    },
  })
);

const ProgressButton = forwardRef<HTMLSpanElement, IProgressButtonProps>((props: IProgressButtonProps, ref) => {
  const {
    classes: externalClasses,
    className,
    inProgress = false,
    WrapperProps,
    ButtonProps,
    CircularProgressProps,
    ...restOfProps
  } = props;
  const classes = useMergeClasses(useStyles(props), externalClasses);

  return (
    <span ref={ref} className={classNames(classes.root, className)} {...WrapperProps}>
      <Button disabled={inProgress} {...restOfProps} {...ButtonProps} />
      {inProgress && <CircularProgress size={36} className={classes.circularProgress} {...CircularProgressProps} />}
    </span>
  );
});

export default memo(ProgressButton);
