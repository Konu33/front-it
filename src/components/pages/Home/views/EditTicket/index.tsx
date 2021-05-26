import React from 'react';
import {useParams} from 'react-router-dom';

import EditTicketForm from './components/EditTicketForm';
import useFetchTicket from './hooks/useFetchTicket';
import useSubmit from './hooks/useSubmit';

export default function EditTicket() {
  const params = useParams();
  const onSubmit = useSubmit(params);
  const ticket = useFetchTicket(params);

  return (
    <div>
      <EditTicketForm onSubmit={onSubmit} ticket={ticket} />
    </div>
  );
}
