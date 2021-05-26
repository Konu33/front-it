import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Slide from '@material-ui/core/Slide';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {TransitionProps} from '@material-ui/core/transitions';
import {Field, Formik, FormikHelpers} from 'formik';
import {Select as FormikSelect, TextField as FormikTextField} from 'formik-material-ui';
import React, {forwardRef, memo, ReactElement, useCallback, useMemo} from 'react';

import IColumn from '../types/IColumn';
import IFiltersState from '../types/IFiltersState';
import ITableItem from '../types/ITableItem';

export interface IFiltersDialogProps<I extends ITableItem> {
  columns: IColumn<I>[];
  open: boolean;
  handleClose: () => void;
  filtersState: IFiltersState<I>;
  onFiltersChange: (newFilters: Partial<IFiltersState<I>>) => void;
}
type IFormValues<I extends ITableItem> = IFiltersState<I>;
type IFilterableColumn<I extends ITableItem> = Omit<IColumn<I>, 'id' | 'filterable'> & {
  id: keyof IFiltersState<I>;
} & Required<Pick<IColumn<I>, 'filterable'>>;

const Transition = forwardRef(function Transition(
  props: TransitionProps & {children?: ReactElement},
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: 'flex',
      flexFlow: 'column nowrap',
      justifyContent: 'stretch',
    },
    field: {
      margin: theme.spacing(1, 'auto'),
    },
    submitBtn: {
      maxWidth: 250,
      margin: theme.spacing(2, 'auto'),
    },
  })
);

function FiltersDialog<I extends ITableItem>(props: IFiltersDialogProps<I>) {
  const classes = useStyles();
  const {columns, open, handleClose, filtersState, onFiltersChange} = props;

  const filterableColumns: IFilterableColumn<I>[] = useMemo(
    () => columns.filter((column: IColumn<I>) => column.filterable !== undefined) as IFilterableColumn<I>[],
    [columns]
  );

  const initialValues: IFormValues<I> = useMemo(() => {
    const filters = {...filtersState};

    return filters as IFormValues<I>;
  }, [filtersState]);

  const handleFormSubmit = useCallback(
    (values: IFormValues<I>, {setSubmitting}: FormikHelpers<IFormValues<I>>) => {
      const filters: IFiltersState<I> = {...values};
      onFiltersChange(filters);
      setSubmitting(false);
      handleClose();
    },
    [onFiltersChange, handleClose]
  );

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby='filters window'
      open={open}
      fullWidth
      maxWidth={'xs'}
      TransitionComponent={Transition}
    >
      <DialogTitle id='filters window'>Available filters:</DialogTitle>
      <Formik<IFormValues<I>> initialValues={initialValues} onSubmit={handleFormSubmit}>
        {({touched, errors, handleSubmit}) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <DialogContent>
              {filterableColumns.map((column: IFilterableColumn<I>, index: number) => {
                switch (column.filterable.type) {
                  case 'text':
                  case 'numeric': {
                    const isNumeric = column.filterable.type === 'numeric';
                    return (
                      <Field
                        key={index}
                        component={FormikTextField}
                        variant={'outlined'}
                        fullWidth
                        label={column.label}
                        name={column.id}
                        type={isNumeric ? 'number' : 'text'}
                        min={isNumeric ? 1 : undefined}
                        autoComplete={'off'}
                        InputLabelProps={{shrink: true}}
                        className={classes.field}
                      />
                    );
                  }
                  case 'select': {
                    return (
                      <FormControl
                        variant='outlined'
                        className={classes.field}
                        key={index}
                        fullWidth
                        error={Boolean(touched[column.id] && errors[column.id])}
                      >
                        <InputLabel htmlFor={`${column.id}-select`}>{column.label}</InputLabel>
                        <Field
                          component={FormikSelect}
                          id={`${column.id}-select`}
                          name={column.id}
                          autoComplete={'off'}
                          label={column.label}
                        >
                          {column.filterable.values.map((value: string, index: number) => (
                            <MenuItem key={index} value={value}>
                              {value}
                            </MenuItem>
                          ))}
                        </Field>
                        {Boolean(touched[column.id] && errors[column.id]) && (
                          <FormHelperText>{errors[column.id]}</FormHelperText>
                        )}
                      </FormControl>
                    );
                  }
                  default:
                    return null;
                }
              })}
            </DialogContent>

            <DialogActions>
              <Button variant={'outlined'} fullWidth className={classes.submitBtn} type={'submit'}>
                Apply
              </Button>
            </DialogActions>
          </form>
        )}
      </Formik>
    </Dialog>
  );
}

export default memo(FiltersDialog) as typeof FiltersDialog;
