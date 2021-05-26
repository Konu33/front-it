import {cleanup, fireEvent, render, waitFor} from '@testing-library/react';
import React from 'react';

import SingleTicketForm from '../../../components/organisms/SingleTicketForm';

afterEach(cleanup);
const ticket = {
  id: 2,
  title: 'testtetowy',
  createdBy: 1,
  description: 'sdsdxxxxxxxxxxxxxxxx',
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

test('should render SingleTicketForm component', async () => {
  const {getByTestId} = render(<SingleTicketForm ticket={ticket} />);
  expect(getByTestId('comments')).toBeInTheDocument();
});

test('should render SingleTicketForm form', async () => {
  const {getByTestId} = render(<SingleTicketForm ticket={ticket} comments={comments} />);
  const input = getByTestId('description');
  expect(input).toBeInTheDocument();
  expect(getByTestId('button')).toBeInTheDocument();
});
test('should change descrpiton field on change', async () => {
  const {getByTestId, asFragment} = render(<SingleTicketForm ticket={ticket} comments={comments} />);
  const input = getByTestId('description');

  fireEvent.change(input, {
    target: {value: 'new content'},
  });

  let inputValue;
  await waitFor(() => {
    inputValue = input.value;
  });

  expect(inputValue).toBe('new content');
  expect(asFragment()).toMatchSnapshot();
});
