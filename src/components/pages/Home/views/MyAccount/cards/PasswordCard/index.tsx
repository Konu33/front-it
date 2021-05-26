import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Alert from '@material-ui/lab/Alert/Alert';
import classNames from 'classnames';
import {Field, Formik} from 'formik';
import {FormikProps} from 'formik/dist/types';
import {TextField as FormikTextField} from 'formik-material-ui';
import React, {memo, MutableRefObject, useCallback, useRef} from 'react';

import IUser from '../../../../../../../models/IUser';
import ProgressButton from '../../../../../../atoms/ProgressButton';
import useFormSubmit from './hooks/useFormSubmit';
import useStyles from './hooks/useStyles';
import IFormValues, {initialValues, validationSchema as formValidation} from './types/IFormValues';

export interface IPasswordCardProps {
  user: IUser;
  className?: string;
}

function PasswordCard(props: IPasswordCardProps) {
  const {className} = props;
  const formikRef: MutableRefObject<FormikProps<IFormValues> | null> = useRef(null);
  const classes = useStyles();
  const handleFormSubmit = useFormSubmit();

  const handleSnackbarClose = useCallback(() => {
    formikRef.current && formikRef.current.setStatus('idle');
  }, [formikRef]);

  return (
    <Formik<IFormValues>
      initialValues={initialValues}
      onSubmit={handleFormSubmit}
      validationSchema={formValidation}
      innerRef={formikRef}
    >
      {({handleSubmit, isSubmitting, status}) => (
        <Grow in style={{transformOrigin: '0 0 0'}} timeout={1000}>
          <Paper elevation={4} className={classNames(classes.root, className)}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>

            <form onSubmit={handleSubmit} className={classes.form}>
              <Field
                component={FormikTextField}
                label={'New password'}
                name={'newPassword'}
                type={'password'}
                autoComplete={'new-password'}
                className={classes.textField}
              />
              <Field
                component={FormikTextField}
                label={'Repeat new password'}
                name={'repeatNewPassword'}
                type={'password'}
                autoComplete={'new-password'}
                className={classes.textField}
              />

              <ProgressButton
                inProgress={isSubmitting}
                disabled={/*!formTouched || */ isSubmitting}
                className={classes.submitButton}
                variant={'contained'}
                type={'submit'}
                fullWidth
              >
                Change
              </ProgressButton>
            </form>

            <Snackbar
              open={status === 'error'}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              className={classes.snackbar}
            >
              <Alert onClose={handleSnackbarClose} severity='error'>
                There was an unknown error ⚡
              </Alert>
            </Snackbar>

            <Snackbar
              open={status === 'success'}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              className={classes.snackbar}
            >
              <Alert onClose={handleSnackbarClose} severity='success'>
                Updated successfully
              </Alert>
            </Snackbar>
          </Paper>
        </Grow>
      )}
    </Formik>
  );
}

export default memo(PasswordCard);
