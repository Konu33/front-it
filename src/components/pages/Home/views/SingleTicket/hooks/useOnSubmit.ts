import {FormikHelpers} from 'formik/dist/types';
import {useCallback} from 'react';

import DirectAPI from '../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../mechanisms/ErrorReporting';
import {isBadRequestResponse} from '../../../../../../models/IBadRequestResponse';
import IComment from '../../../../../../models/IComment';
import {isAxiosError} from '../../../../../../utils/axios-utils';
import {validateResponse} from '../misc/submit-utils';
import * as utils from '../misc/utils';
import {IParams} from '../misc/utils';

enum SendError {
  CREATE_ERROR = 'Blad podczas dodawania',
}

export default function useOnSubmit(params: IParams, addComment: (newComment: IComment) => void) {
  return useCallback(
    async (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => {
      try {
        const commentModel = {
          content: values.description,
        };
        const {data} = await DirectAPI.post('/tickets/' + params.id + '/comments', {data: commentModel});
        validateResponse(data);
        addComment(data.comment);
        helpers.resetForm();
        helpers.setSubmitting(false);
      } catch (e: unknown) {
        if (isAxiosError(e) && e.response && e.response.status === 400 && isBadRequestResponse(e.response.data)) {
          switch (e.response.data.message) {
            case SendError.CREATE_ERROR: {
              helpers.setFieldError('description', 'Blad podczas dodawania komentarza');
              return;
            }
          }
        }

        ErrorReporting.captureError(e);
        helpers.setStatus('error');
      }
    },
    [params, addComment]
  );
}
