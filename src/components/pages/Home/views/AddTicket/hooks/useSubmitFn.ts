import {FormikHelpers} from 'formik/dist/types';
import {useCallback} from 'react';
import {useHistory} from 'react-router';

import DirectAPI from '../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../mechanisms/ErrorReporting';
import {isBadRequestResponse} from '../../../../../../models/IBadRequestResponse';
import {isAxiosError} from '../../../../../../utils/axios-utils';
import * as utils from '../../../../../organisms/AddTicketForm/utils';
import {validateSubmitTicketResponse} from '../misc/utils';

interface INewTicket {
  title: string;
  description: string;
  addDate: string;
  statusId: number;
  assignedTo: number;
}

enum SendError {
  CREATE_ERROR = 'Taki ticket juz istnieje',
}

export default function useSubmitFn() {
  const history = useHistory();

  return useCallback(
    async (values: typeof utils.formInitialValues, helpers: FormikHelpers<typeof utils.formInitialValues>) => {
      try {
        const ticketModel: INewTicket = {
          title: values.title,
          description: values.description,
          addDate: new Date().toISOString().split('T')[0].toString(),
          statusId: 1,
          assignedTo: values.assigned,
        };
        const {data} = await DirectAPI.post('/tickets', {data: ticketModel});
        validateSubmitTicketResponse(data);
        // Na ten moment ten route nie istnieje, ale będzie istniał ;)
        history.push(`/home/tickets/${data.ticket.id}`);
      } catch (e: unknown) {
        if (isAxiosError(e) && e.response && e.response.status === 400 && isBadRequestResponse(e.response.data)) {
          switch (e.response.data.message) {
            case SendError.CREATE_ERROR: {
              helpers.setFieldError('title', 'Taki ticket już istnieje');
              return;
            }
          }
        }
        ErrorReporting.captureError(e);
        helpers.setStatus('error');
      }
    },
    [history]
  );
}
