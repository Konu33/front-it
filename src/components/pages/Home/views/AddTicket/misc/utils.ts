import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../models/ISuccessResponse';
import ITicket, {validationSchema as ticketValidationSchema} from '../../../../../../models/ITicket';

export interface ISubmitTicketResponse extends ISuccessResponse {
  ticket: ITicket;
}

export const submitTicketValidationSchema = successResponseValidationSchema.shape({
  ticket: ticketValidationSchema,
});

export function validateSubmitTicketResponse(data: unknown): asserts data is ISubmitTicketResponse {
  submitTicketValidationSchema.validateSync(data, {strict: true, stripUnknown: true});
}
