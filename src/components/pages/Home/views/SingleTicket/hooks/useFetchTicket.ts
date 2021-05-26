import {useCallback, useEffect, useState} from 'react';

import DirectAPI from '../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../mechanisms/ErrorReporting';
import ITicket from '../../../../../../models/ITicket';
import {IResponse, validateResponse} from '../misc/use-fetch-ticket-utils';
import {IParams} from '../misc/utils';

export default function useFetchTicket(params: IParams) {
  const [ticket, setTicket] = useState<ITicket>({
    id: 0,
    title: '',
    description: '',
    createdBy: 0,
    addDate: '',
    assignedTo: null,
    status: 0,
  });
  const fetchTicket = useCallback(async () => {
    try {
      const response = await DirectAPI.get<IResponse | unknown>('/tickets/' + params.id);
      const data: unknown | IResponse = response.data;
      validateResponse(data);
      setTicket(data.ticket);
    } catch (e) {
      ErrorReporting.captureError(e);
    }
  }, [params.id]);

  //Fetch single ticket
  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  return ticket;
}
