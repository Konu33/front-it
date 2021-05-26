import {array, number, object} from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidation,
} from '../../../../../../models/ISuccessResponse';
import IUser, {validationSchema as userValidation} from '../../../../../../models/IUser';

export type IFetchUserReponse = {
  users: IUser[];
};

export type IResponse = ISuccessResponse & IFetchUserReponse;

export const validtionSchema = successResponseValidation.shape({
  users: array().of(userValidation),
  meta: object().required().shape({
    total: number().required().integer(),
  }),
});

export function validateResponse(response: unknown): asserts response is IFetchUserReponse {
  validtionSchema.validateSync(response);
}
