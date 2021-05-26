import {array, number, object} from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../../models/ISuccessResponse';
import IUser, {validationSchema as userValidationSchema} from '../../../../../../../models/IUser';

export interface IUsersPool {
  users: IUser[];
  meta: {
    total: number;
  };
}

export type IResponse = ISuccessResponse & {users: IUser[]; meta: {total: number}};

export const validtionSchema = successResponseValidationSchema.shape({
  users: array().of(userValidationSchema),
  meta: object().required().shape({
    total: number().required().integer(),
  }),
});

export function validateResponse(response: unknown): asserts response is IResponse {
  validtionSchema.validateSync(response);
}

export const defaultUsersPool: IUsersPool = {
  users: [],
  meta: {
    total: 0,
  },
};

export function calculateMissingUsersIds(usersPool: IUsersPool, usersIds: number[]): number[] {
  const missingUsersIds: number[] = [];

  loop1: for (const userId of usersIds) {
    for (const user of usersPool.users) {
      if (user.id === userId) break loop1;
    }
    missingUsersIds.push(userId);
  }

  return missingUsersIds;
}
