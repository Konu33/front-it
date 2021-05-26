import {cleanup, render, screen} from '@testing-library/react';
import React from 'react';

import App from '../components/other/App';

describe('Whole app', () => {
  afterEach(cleanup);

  test('redirects unauthorized to sign-in page', () => {
    render(<App />);
    const textElement = screen.getByText(/Sign in/);
    expect(textElement).toBeInTheDocument();
  });
});
