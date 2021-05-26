import IconButton from '@material-ui/core/IconButton';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FilterListIcon from '@material-ui/icons/FilterList';
import classNames from 'classnames';
import React, {memo, useCallback, useState} from 'react';

import useMergeClasses from '../../../../hooks/useMergeClasses';
import {OverrideClassesProp} from '../../../../utils/styling-utils';
import IColumn from '../types/IColumn';
import IFiltersState from '../types/IFiltersState';
import ITableItem from '../types/ITableItem';
import FiltersDialog from './FiltersDialog';

export interface IDataTableToolbar<I extends ITableItem> {
  columns: IColumn<I>[];
  title: string;
  className?: string;
  classes?: OverrideClassesProp<typeof useStyles>;
  filtersState: IFiltersState<I>;
  onFiltersChange: (newFilters: Partial<IFiltersState<I>>) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
      backgroundColor: '#FAFAFA',
    },
    title: {
      flex: '1 1 100%',
    },
  })
);

function DataTableToolbar<I extends ITableItem>(props: IDataTableToolbar<I>) {
  const {className, classes: _classes, columns, title, filtersState, onFiltersChange} = props;
  const classes = useMergeClasses(useStyles(props), _classes);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const handleDialogOpen = useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);
  const handleDialogClose = useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  return (
    <>
      <Toolbar className={classNames(classes.root, className)}>
        <Typography className={classes.title} variant={'h6'} id={'tableTitle'} component={'div'}>
          {title}
        </Typography>

        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list' onClick={handleDialogOpen}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </Toolbar>

      <FiltersDialog<I>
        columns={columns}
        open={dialogOpen}
        handleClose={handleDialogClose}
        filtersState={filtersState}
        onFiltersChange={onFiltersChange}
      />
    </>
  );
}

export default memo(DataTableToolbar) as typeof DataTableToolbar;
