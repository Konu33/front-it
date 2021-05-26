import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import {FormikHelpers} from 'formik/dist/types';
import React, {memo, useCallback} from 'react';

import signInPageBackgroundSrc from '../../../assets/images/jpg/sign-in-page-background.jpeg';
import useLoginOperation from '../../../contexts/AuthContext/operations/useLoginOperation';
import ErrorReporting from '../../../mechanisms/ErrorReporting';
import {isBadRequestResponse} from '../../../models/IBadRequestResponse';
import {isAxiosError} from '../../../utils/axios-utils';
import AcrylicBackground from '../../atoms/AcrylicBackground';
import SignInForm from '../../organisms/SignInForm';
import * as utils from '../../organisms/SignInForm/utils';

enum SignInError {
  INVALID_CREDENTIALS = 'Podano nieprawidłowe dane logowania',
}

const useStyles = makeStyles((_theme: Theme) =>
  createStyles({
    root: {
      position: 'relative',
      width: '100vw',
      height: '100vh',
    },
    formWrapper: {
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'center',
      alignItems: 'center',
    },
  })
);

function SignIn() {
  const classes = useStyles();
  const loginOperation = useLoginOperation();

  const onSubmit = useCallback(
    async (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => {
      try {
        await loginOperation(values);
        /*
         * Nie trzeba nic więcej robić.
         * Po pomyślnym logownaiu zostaną zaktualizowane dane autoryzacji (`authData`).
         * Aktualizacja wymusi update contextu AuthContext.
         * Aktualizacji contextu wyrenderuje jeszcze raz routing.
         * Ad-hoc `PublicRoute` zajmie się przekierowaniem dalej.
         */
      } catch (e: unknown) {
        if (isAxiosError(e) && e.response && e.response.status === 400 && isBadRequestResponse(e.response.data)) {
          switch (e.response.data.message) {
            case SignInError.INVALID_CREDENTIALS: {
              helpers.setFieldError('email', 'Nieprawidłowy email lub hasło.');
              return;
            }
          }
        }

        ErrorReporting.captureError(e);
        helpers.setStatus('error');
      }
    },
    [loginOperation]
  );

  return (
    <AcrylicBackground imageSource={signInPageBackgroundSrc} blur={5} className={classes.root}>
      <div className={classes.formWrapper}>
        <SignInForm onSubmit={onSubmit} />
      </div>
    </AcrylicBackground>
  );
}

export default memo(SignIn);
