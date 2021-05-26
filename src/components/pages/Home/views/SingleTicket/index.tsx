import React, {memo} from 'react';
import {useParams} from 'react-router-dom';

import SingleTicketForm from '../../../../organisms/SingleTicketForm';
import useFetchComments from './hooks/useFetchComments';
import useFetchTicket from './hooks/useFetchTicket';
import useSubmitFn from './hooks/useOnSubmit';

function SingleTicket() {
  const params = useParams();
  const ticket = useFetchTicket(params);
  const [comments, addComment, removeComment] = useFetchComments(params);
  const onSubmit = useSubmitFn(params, addComment);

  return <SingleTicketForm onSubmit={onSubmit} comments={comments} ticket={ticket} removeComment={removeComment} />;
}

export default memo(SingleTicket);
