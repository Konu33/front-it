import {cleanup, render, screen} from '@testing-library/react';
import React from 'react';

import SingleUserCard from '../../../components/organisms/SingleUserCard';

afterEach(cleanup);

test('should render SingleUserCard component', async () => {
  const state = {
    status: 'success',
    user: {
      id: 1,
      name: 'Jan',
      surname: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      role: 'ADMIN',
      iconColor: '#03A9F4',
    },
  };
  const {getByTestId} = render(<SingleUserCard state={state} />);

  expect(getByTestId('card')).toBeInTheDocument();
  expect(getByTestId('img')).toBeInTheDocument();
  expect(screen.getByTestId('avatar')).toHaveTextContent('J');
  expect(screen.getByTestId('email')).toHaveTextContent('jan.kowalski@gmail.com');
  expect(screen.getByTestId('role')).toHaveTextContent('ADMIN');
});
