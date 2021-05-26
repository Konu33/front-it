import CssBaseline from '@material-ui/core/CssBaseline';
import {ThemeProvider} from '@material-ui/core/styles';
import {cleanup, render, screen} from '@testing-library/react';
import React from 'react';
import {StaticRouter} from 'react-router';

import lightTheme from '../../../../assets/theme/light';
import MainFrame from '../../../../components/layouts/MainFrame';
import Home from '../../../../components/pages/Home';
import {AuthProvider} from '../../../../contexts/AuthContext';

describe('Home page', () => {
  afterEach(cleanup);

  test('renders navbar link', () => {
    render(
      <>
        <CssBaseline />
        <ThemeProvider theme={lightTheme}>
          <AuthProvider>
            <MainFrame>
              <StaticRouter>
                <Home />
              </StaticRouter>
            </MainFrame>
          </AuthProvider>
        </ThemeProvider>
      </>
    );
    const linkElement = screen.getByText(/IT-Crowd/i);
    expect(linkElement).toBeInTheDocument();
  });
});
