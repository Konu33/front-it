import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel from '@material-ui/core/InputLabel';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Snackbar from '@material-ui/core/Snackbar';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert/Alert';
import classNames from 'classnames';
import {Field, Formik} from 'formik';
import {FormikProps} from 'formik/dist/types';
import {Select as FormikSelect, TextField as FormikTextField} from 'formik-material-ui';
import React, {memo, useCallback, useRef} from 'react';

import useDashboard from '../../../../../../hooks/useDashboard';
import ProgressButton from '../../../../../atoms/ProgressButton';
import useStyles from './hooks/useStyles';
import useSubmitFn from './hooks/useSubmit';
import {formInitialValues, formValidationSchema, IRole, IUserValues, roles} from './misc/utils';

function AddNewUser() {
  const onFormSubmit = useSubmitFn();
  const formikRef = useRef<FormikProps<typeof formInitialValues>>(null);
  const classes = useStyles();
  const {user: currentUser} = useDashboard();

  const handleSnackbarClose = useCallback(() => {
    formikRef.current && formikRef.current.setStatus('idle');
  }, [formikRef]);

  return (
    <Formik<IUserValues>
      initialValues={formInitialValues}
      validationSchema={formValidationSchema}
      onSubmit={onFormSubmit}
      innerRef={formikRef}
    >
      {({handleSubmit, isSubmitting, status, touched, errors}) => (
        <>
          <div className={classes.formWrapper}>
            <div className={classes.formHeader}>
              <Typography variant={'h5'}>Add New User</Typography>
            </div>

            <form onSubmit={handleSubmit} className={classes.form}>
              <Field
                component={FormikTextField}
                name={'name'}
                label={'Name'}
                variant={'outlined'}
                className={classes.formField}
                classes={{
                  root: classes.textField_root,
                }}
                fullWidth
              />

              <Field
                component={FormikTextField}
                name={'surname'}
                label={'Surname'}
                variant={'outlined'}
                className={classes.formField}
                fullWidth
              />
              <Field
                component={FormikTextField}
                name={'password'}
                label={'Password'}
                type='password'
                variant={'outlined'}
                className={classes.formField}
                fullWidth
              />
              {currentUser.role !== roles[2].name && (
                <FormControl
                  variant='outlined'
                  className={classes.formSelect}
                  fullWidth
                  error={Boolean(touched.role && errors.role)}
                >
                  <InputLabel>Role</InputLabel>
                  <Field component={FormikSelect} label='Role' name='accountType'>
                    {roles.map((role: IRole) => (
                      <MenuItem key={role.id} value={role.id}>
                        <ListItem component={'span'} className={classes.assigneListItem}>
                          <ListItemText primary={`${role.name}`} />
                        </ListItem>
                      </MenuItem>
                    ))}
                  </Field>
                  {Boolean(touched.role && errors.role) && <FormHelperText>{errors.role}</FormHelperText>}
                </FormControl>
              )}
              <Field
                component={FormikTextField}
                name={'email'}
                label={'Email'}
                variant={'outlined'}
                className={classes.formField}
                fullWidth
              />

              <ProgressButton
                fullWidth
                type={'submit'}
                color={'primary'}
                variant={'contained'}
                inProgress={isSubmitting}
                className={classNames(classes.formField, classes.submitBtn)}
              >
                Create
              </ProgressButton>
            </form>
          </div>

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
      )}
    </Formik>
  );
}

export default memo(AddNewUser);
