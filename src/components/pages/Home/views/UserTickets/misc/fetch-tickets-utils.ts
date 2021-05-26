import {array, number, object} from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../models/ISuccessResponse';
import {validationSchema as ticketValidationSchema} from '../../../../../../models/ITicket';
import IItemsPool from '../../../../../organisms/DataTable/types/IItemsPool';
import {validationSchema as userValidationSchema} from '../types/ISimplifiedUser';
import IUserTicket from '../types/IUserTicket';

export type IResponse = ISuccessResponse & {tickets: IUserTicket[]; meta: {total: number}};

export const validtionSchema = successResponseValidationSchema.shape({
  tickets: array().of(
    ticketValidationSchema.shape({
      createdBy: userValidationSchema,
      assignedTo: userValidationSchema.nullable(true).notRequired(),
    })
  ),
  meta: object().required().shape({
    total: number().required().integer(),
  }),
});

export function validateResponse(response: unknown): asserts response is IResponse {
  validtionSchema.validateSync(response);
}

export const defaultTicketsPool: IItemsPool<IUserTicket> = {
  items: [],
  meta: {
    total: 0,
  },
};
