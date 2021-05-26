import Avatar from '@material-ui/core/Avatar';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert/Alert';
import classNames from 'classnames';
import {Field, Formik} from 'formik';
import {FormikProps} from 'formik/dist/types';
import {TextField as FormikTextField} from 'formik-material-ui';
import React, {memo, MutableRefObject, useCallback, useRef} from 'react';

import IUser from '../../../../../../../models/IUser';
import ProgressButton from '../../../../../../atoms/ProgressButton';
import useFormSubmit from './hooks/useFormSubmit';
import useInitialValues from './hooks/useInitialValues';
import useStyles from './hooks/useStyles';
import IFormValues, {validationSchema as formValidation} from './types/IFormValues';

export interface IUserInfoCardProps {
  user: IUser;
  className?: string;
}

function UserInfoCard(props: IUserInfoCardProps) {
  const {className, user} = props;
  const formikRef: MutableRefObject<FormikProps<IFormValues> | null> = useRef(null);
  const classes = useStyles();
  const initialValues: IFormValues = useInitialValues(user);
  const handleSubmitForm = useFormSubmit();

  const handleSnackbarClose = useCallback(() => {
    formikRef.current && formikRef.current.setStatus('idle');
  }, [formikRef]);

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitForm}
        validationSchema={formValidation}
        innerRef={formikRef}
      >
        {({handleSubmit, isSubmitting, status}) => (
          <>
            <Grow in style={{transformOrigin: '0 0 0'}}>
              <Paper elevation={4} className={classNames(classes.root, className)}>
                <Avatar className={classes.avatar}>
                  <Typography variant={'h2'}>{user.name[0]}</Typography>
                </Avatar>
                <form onSubmit={handleSubmit} className={classes.form}>
                  <Tooltip title={'Email cannot be modified.'}>
                    <TextField
                      label={'Email'}
                      name={'email'}
                      autoComplete={'email'}
                      defaultValue={user.email}
                      className={classes.textField}
                      disabled
                    />
                  </Tooltip>
                  <Field
                    component={FormikTextField}
                    label={'First name'}
                    name={'name'}
                    autoComplete={'given-name'}
                    disabled={isSubmitting}
                    className={classes.textField}
                  />
                  <Field
                    component={FormikTextField}
                    label={'Family name'}
                    name={'surname'}
                    autoComplete={'family-name'}
                    disabled={isSubmitting}
                    className={classes.textField}
                  />

                  <ProgressButton
                    inProgress={isSubmitting}
                    disabled={isSubmitting}
                    className={classes.submitButton}
                    variant={'contained'}
                    type={'submit'}
                    fullWidth
                  >
                    Update
                  </ProgressButton>
                </form>
              </Paper>
            </Grow>

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
          </>
        )}
      </Formik>
    </>
  );
}

export default memo(UserInfoCard);
