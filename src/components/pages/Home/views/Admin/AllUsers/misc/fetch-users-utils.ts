import {array, number, object} from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../../models/ISuccessResponse';
import IUser, {validationSchema as userValidation} from '../../../../../../../models/IUser';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';

export type IResponse = ISuccessResponse & {users: IUser[]; meta: {total: number}};

export const validtionSchema = successResponseValidationSchema.shape({
  users: array().of(userValidation),
  meta: object().required().shape({
    total: number().required().integer(),
  }),
});

export function validateResponse(response: unknown): asserts response is IResponse {
  validtionSchema.validateSync(response);
}

export const defaultUsersPool: IItemsPool<IUser> = {
  items: [],
  meta: {
    total: 0,
  },
};
