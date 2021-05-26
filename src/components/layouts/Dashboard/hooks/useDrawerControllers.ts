import {Theme, useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

export interface IDrawerControlls {
  drawerOpen: boolean;
  onDrawerToggle: () => void;
  onDrawerOpen: (e: any) => void;
  onDrawerClose: (e: any) => void;
}

export default function useDrawerControlls(): IDrawerControlls {
  const theme: Theme = useTheme();
  const isMediaMdUpDown: boolean = useMediaQuery(theme.breakpoints.up('md'));
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [initialAction, setInitialAction] = useState<boolean>(false);

  const onDrawerToggle = useCallback(() => setDrawerOpen(!drawerOpen), [setDrawerOpen, drawerOpen]);
  const onDrawerToggleByEvent = useCallback((event: React.KeyboardEvent | React.MouseEvent, open: boolean) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  }, []);
  const onDrawerOpen = useCallback((e) => onDrawerToggleByEvent(e, true), [onDrawerToggleByEvent]);
  const onDrawerClose = useCallback((e) => onDrawerToggleByEvent(e, false), [onDrawerToggleByEvent]);

  useEffect(() => {
    if (isMediaMdUpDown && !initialAction) {
      setDrawerOpen(true);
      setInitialAction(true);
    }
  }, [isMediaMdUpDown, initialAction, setDrawerOpen, setInitialAction]);

  return useMemo(() => ({drawerOpen, onDrawerToggle, onDrawerToggleByEvent, onDrawerOpen, onDrawerClose}), [
    drawerOpen,
    onDrawerClose,
    onDrawerOpen,
    onDrawerToggle,
    onDrawerToggleByEvent,
  ]);
}
