import {FormikHelpers} from 'formik/dist/types';
import {useCallback} from 'react';
import {useHistory} from 'react-router';

import DirectAPI from '../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../mechanisms/ErrorReporting';
import {isBadRequestResponse} from '../../../../../../models/IBadRequestResponse';
import {isAxiosError} from '../../../../../../utils/axios-utils';
import * as utils from '../misc/utils';
import {IParams, ITicketUpdate, validateSubmitTicketResponse} from '../misc/utils';

enum SendError {
  CREATE_ERROR = 'Blad podczas edytowania',
}

export default function useSubmitFn(params: IParams) {
  const history = useHistory();

  return useCallback(
    async (
      values: typeof utils.formInitialValues,
      helpers: FormikHelpers<typeof utils.formInitialValues>
    ): Promise<void> => {
      try {
        const ticketModel: ITicketUpdate = {
          name: values.title,
          description: values.description,
          statusId: values.status,
          assignedTo: values.assigned,
        };
        const {data} = await DirectAPI.patch('/tickets/' + params.id, {data: ticketModel});
        validateSubmitTicketResponse(data);
        history.push(`/home/tickets/${params.id}`);
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
    [history, params.id]
  );
}
