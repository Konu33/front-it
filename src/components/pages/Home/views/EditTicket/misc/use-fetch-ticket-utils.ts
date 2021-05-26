import * as yup from 'yup';

import ISuccessResponse from '../../../../../../models/ISuccessResponse';
import ITicket, {validationSchema as ticketValidationSchema} from '../../../../../../models/ITicket';

export type IFetchTicketReponse = {
  ticket: ITicket;
};

export type IResponse = ISuccessResponse & IFetchTicketReponse;

export const responseValidationSchema = yup.object().required().shape({
  status: yup.boolean().required().isTrue(),
  message: yup.string().required(),
  ticket: ticketValidationSchema,
});

export function validateResponse(response: unknown): asserts response is IFetchTicketReponse {
  responseValidationSchema.validateSync(response);
}
