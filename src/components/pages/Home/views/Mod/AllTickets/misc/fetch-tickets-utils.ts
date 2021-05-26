import {array, number, object} from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../../models/ISuccessResponse';
import ITicket, {validationSchema as ticketValidationSchema} from '../../../../../../../models/ITicket';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';

export type IResponse = ISuccessResponse & {tickets: ITicket[]; meta: {total: number}};

export const validtionSchema = successResponseValidationSchema.shape({
  tickets: array().of(ticketValidationSchema),
  meta: object().required().shape({
    total: number().required().integer(),
  }),
});

export function validateResponse(response: unknown): asserts response is IResponse {
  validtionSchema.validateSync(response);
}

export const defaultTicketsPool: IItemsPool<ITicket> = {
  items: [],
  meta: {
    total: 0,
  },
};
