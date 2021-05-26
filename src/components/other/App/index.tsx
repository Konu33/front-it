import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import React from 'react';

import InternalErrorBoundary from '../../../ad-hocs/InternalErrorBoundary';
import lightTheme from '../../../assets/theme/light';
import {AuthProvider} from '../../../contexts/AuthContext';
import MainFrame from '../../layouts/MainFrame';
import Router from '../Router';

export default function App() {
  return (
    <InternalErrorBoundary>
      <CssBaseline />
      <ThemeProvider theme={lightTheme}>
        <AuthProvider>
          <MainFrame>
            <Router />
          </MainFrame>
        </AuthProvider>
      </ThemeProvider>
    </InternalErrorBoundary>
  );
}
