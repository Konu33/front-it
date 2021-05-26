import React, {memo} from 'react';

import AddTicketForm from '../../../../organisms/AddTicketForm/index';
import useSubmitFn from './hooks/useSubmitFn';

function AddTicket() {
  const onSubmit = useSubmitFn();

  return <AddTicketForm onSubmit={onSubmit} />;
}

export default memo(AddTicket);
