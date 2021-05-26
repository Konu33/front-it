import Avatar from '@material-ui/core/Avatar/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined';
import Alert from '@material-ui/lab/Alert/Alert';
import classNames from 'classnames';
import {Formik} from 'formik';
import {FormikHelpers, FormikProps} from 'formik/dist/types';
import React, {memo, useCallback, useRef} from 'react';

import useMergeClasses from '../../../hooks/useMergeClasses';
import {OverrideClassesProp} from '../../../utils/styling-utils';
import useStyles from './styles';
import * as utils from './utils';

export interface ISignInFormProps {
  onSubmit: (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => Promise<void>;
  classes?: OverrideClassesProp<typeof useStyles>;
}

function SignInForm(props: ISignInFormProps) {
  let {onSubmit: onFormSubmit} = props;
  const formikRef = useRef<FormikProps<typeof utils.initialValues>>(null);
  const classes = useMergeClasses(useStyles(props), props.classes);

  const handleSnackbarClose = useCallback(() => {
    formikRef.current && formikRef.current.setStatus('idle');
  }, [formikRef]);

  return (
    <Paper className={classes.paper} elevation={24}>
      <div className={classes.formWrapper}>
        <div className={classes.formHeader}>
          <Avatar className={classes.securityIcon}>
            <LockOpenOutlinedIcon />
          </Avatar>
          <Typography variant={'h5'}>Sign in</Typography>
        </div>

        <Formik
          initialValues={utils.initialValues}
          validationSchema={utils.validationSchema}
          onSubmit={onFormSubmit}
          innerRef={formikRef}
        >
          {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, status}) => (
            <form onSubmit={handleSubmit} className={classes?.form}>
              <TextField
                type={'email'}
                name={'email'}
                label={'Email'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
                error={Boolean(touched.email && errors.email)}
                helperText={errors.email}
                className={classes?.formField}
                classes={{
                  root: classes?.textField_root,
                }}
                fullWidth
              />
              <TextField
                type={'password'}
                name={'password'}
                label={'Your password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}
                error={Boolean(touched.password && errors.password)}
                helperText={errors.password}
                className={classes?.formField}
                fullWidth
              />

              <Button
                type={'submit'}
                color={'primary'}
                variant={'contained'}
                disabled={isSubmitting}
                className={classNames(classes?.formField, classes?.submitBtn)}
                classes={{
                  text: classes?.submitBtn_label,
                }}
              >
                Log in
              </Button>

              <Snackbar
                open={status === 'error'}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                className={classes?.errorSnackbar}
              >
                <Alert onClose={handleSnackbarClose} severity='error'>
                  There was an unknown error ⚡
                </Alert>
              </Snackbar>
            </form>
          )}
        </Formik>
      </div>
    </Paper>
  );
}

export default memo(SignInForm);
