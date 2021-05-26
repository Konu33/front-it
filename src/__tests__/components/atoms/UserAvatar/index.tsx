import {cleanup, render, screen} from '@testing-library/react';
import React from 'react';

import UserAvatar from '../../../../components/atoms/UserAvatar';
import IUser, {Role} from '../../../../models/IUser';

describe('UserAvatar component', () => {
  afterEach(cleanup);

  test('displays first letter of name', () => {
    const user: IUser = {
      id: 1,
      name: 'Test',
      surname: 'Also test',
      role: Role.USER,
      email: 'test@test.com',
      iconColor: 'blue',
    };

    render(<UserAvatar user={user} />);
    const firstLetterOfName = screen.getByText(/T/);
    expect(firstLetterOfName).toBeInTheDocument();
  });
});
