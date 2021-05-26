import * as yup from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../models/ISuccessResponse';
import ITicket, {validationSchema as ticketValidationSchema} from '../../../../../../models/ITicket';

export interface IFormValues {
  title: string;
  description: string;
  assigned: number;
  status: number;
}

export interface ITicketUpdate {
  name: string;
  description: string;
  assignedTo: number;
  statusId: number;
}
export const formInitialValues: IFormValues = {title: '', description: '', assigned: 0, status: 1};

export const formValidationSchema = yup.object().strict(true).shape({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  assigned: yup.number(),
  status: yup.number(),
});

export interface ISubmitTicketResponse extends ISuccessResponse {
  ticket: ITicket;
}

export const submitTicketValidationSchema = successResponseValidationSchema.shape({
  ticket: ticketValidationSchema,
});

export function validateSubmitTicketResponse(data: unknown): asserts data is ISubmitTicketResponse {
  submitTicketValidationSchema.validateSync(data, {strict: true, stripUnknown: true});
}

export interface IParams {
  [key: string]: number | unknown;
}
