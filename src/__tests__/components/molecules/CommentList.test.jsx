import {cleanup, render, screen} from '@testing-library/react';
import React from 'react';

import Comments from '../../../components/molecules/CommentsList';

const ticket = {
  id: 2,
  title: 'testtetowy',
  createdBy: 1,
  description: 'testtest',
  addDate: '11-01-2021 19:31:07',
  status: 1,
  assignedTo: 3,
};
const comments = [
  {
    id: 1,
    ticketId: 1,
    content: 'test contetn',
    addDate: '21-01-2021 18:00:11',
    createdBy: {
      name: 'Jan',
      surname: 'Kowalski',
      iconColor: '#03A9F4',
    },
  },
  {
    id: 2,
    ticketId: 1,
    content: 'test',
    addDate: '21-01-2021 18:03:11',
    createdBy: {
      name: 'Piotr',
      surname: 'Nowak',
      iconColor: '#673AB7',
    },
  },
];

afterEach(cleanup);

describe('test comment List', () => {
  it('should render comments list correctly', () => {
    const {getByTestId, getByText} = render(<Comments comments={comments} ticket={ticket} />);
    expect(getByTestId('list-title')).toBeInTheDocument();
    expect(getByText('Comments')).toBeTruthy();
  });
  it('should render title correctly', () => {
    const {getByTestId} = render(<Comments comments={comments} ticket={ticket} />);
    expect(getByTestId('title')).toBeInTheDocument();
  });

  it('should render ticket description correctly', async () => {
    const {getByTestId} = render(<Comments comments={comments} ticket={ticket} />);

    expect(getByTestId('ticket-desc')).toBeInTheDocument();

    const item = await screen.findAllByText('testtest');
    expect(item).toHaveLength(1);
  });
});
