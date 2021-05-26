import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import classNames from 'classnames';
import React, {ReactNode} from 'react';

import useMergeClasses from '../../../hooks/useMergeClasses';
import {OverrideClassesProp} from '../../../utils/styling-utils';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexFlow: 'column nowrap',
      backgroundColor: theme.palette.background.default,
    },
  })
);

export interface IMainFrameProps {
  children: ReactNode;
  className?: string;
  classes?: OverrideClassesProp<typeof useStyles>;
}

function MainFrame(props: IMainFrameProps) {
  const {children, className} = props;
  const classes = useMergeClasses(useStyles(props), props.classes);

  return <main className={classNames(classes.root, className)}>{children}</main>;
}

export default MainFrame;
