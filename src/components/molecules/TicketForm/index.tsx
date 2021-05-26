import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert/Alert';
import classNames from 'classnames';
import {Field} from 'formik';
import {FormikProps} from 'formik/dist/types';
import {Select as FormikSelect, TextField as FormikTextField} from 'formik-material-ui';
import React, {memo, useCallback, useRef} from 'react';

import useDashboard from '../../../hooks/useDashboard';
import useMergeClasses from '../../../hooks/useMergeClasses';
import IUser from '../../../models/IUser';
import {OverrideClassesProp} from '../../../utils/styling-utils';
import ProgressButton from '../../atoms/ProgressButton';
import UserAvatar from '../../atoms/UserAvatar';
import useFetchUsers from './hooks/useFetchUsers';
import useStyles from './misc/styles';
import * as utils from './misc/utils';

interface IFormProps {
  isSubmitting: boolean;
  status: any;
  classes?: OverrideClassesProp<typeof useStyles>;
  edit: boolean;
}

const statusTypes = [
  {id: 1, name: 'NEW'},
  {id: 2, name: 'PROCESSING'},
  {id: 3, name: 'BLOCKED'},
  {id: 4, name: 'CLOSED'},
];

function TicketForm(props: IFormProps) {
  const formikRef = useRef<FormikProps<typeof utils.formInitialValues>>(null);
  const classes = useMergeClasses(useStyles(props), props.classes);
  const {isSubmitting, status, edit} = props;
  const {user: currentUser} = useDashboard();
  const handleSnackbarClose = useCallback(() => {
    formikRef.current && formikRef.current.setStatus();
  }, [formikRef]);
  const users: IUser[] = useFetchUsers();

  return (
    <>
      <Field
        data-testid='title'
        component={FormikTextField}
        variant={'outlined'}
        name={'title'}
        label={'Title'}
        fullWidth
        className={classes.formField}
        classes={{
          root: classes.textField_root,
        }}
      />
      {currentUser.role !== 'USER' && (
        <FormControl variant='outlined' className={classes.formSelect} data-testid='dropdown'>
          <InputLabel>Assigne</InputLabel>
          <Field component={FormikSelect} label='Assigne' name='assigned'>
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {users.map((user: IUser) => (
              <MenuItem key={user.id} value={user.id}>
                <ListItem component={'span'} className={classes.assigneListItem}>
                  <ListItemAvatar>
                    <UserAvatar user={user} />
                  </ListItemAvatar>
                  <ListItemText primary={`${user.name} ${user.surname}`} />
                </ListItem>
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      )}

      <Field
        data-testid='desc-field'
        component={FormikTextField}
        variant={'outlined'}
        name={'description'}
        label={'Description'}
        fullWidth
        className={classes.formField}
        multiline
        rows={4}
      />
      {edit && (
        <FormControl
          variant='outlined'
          className={classNames(classes.formSelect, classes.selectMargin)}
          data-testid='edit-user'
        >
          <InputLabel>Status</InputLabel>
          <Field component={FormikSelect} label='Status' name='status'>
            {statusTypes.map((status) => (
              <MenuItem key={status.id} value={status.id}>
                <ListItem component={'span'} className={classes.assigneListItem}>
                  <ListItemText primary={`${status.name}`} />
                </ListItem>
              </MenuItem>
            ))}
          </Field>
        </FormControl>
      )}
      <ProgressButton
        data-testid='button'
        fullWidth
        type={'submit'}
        color={'primary'}
        variant={'contained'}
        inProgress={isSubmitting}
        className={classNames(classes.formField, classes.submitBtn)}
      >
        Send
      </ProgressButton>

      <Snackbar
        open={status === 'error'}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        className={classes.Snackbar}
      >
        <Alert onClose={handleSnackbarClose} severity='error'>
          There was an unknown error ⚡
        </Alert>
      </Snackbar>
    </>
  );
}

export default memo(TicketForm);
