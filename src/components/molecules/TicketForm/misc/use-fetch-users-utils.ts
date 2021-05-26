import * as yup from 'yup';

import ISuccessResponse from '../../../../models/ISuccessResponse';
import IUser, {validationSchema as userValidationSchema} from '../../../../models/IUser';

export type IFetchUsersReponse = {
  users: Array<IUser>;
};

export type IResponse = ISuccessResponse & IFetchUsersReponse;

export const responseValidationSchema = yup
  .object()
  .required()
  .shape({
    status: yup.boolean().required().isTrue(),
    message: yup.string().required(),
    users: yup.array().of(userValidationSchema),
  });

export function validateResponse(response: unknown): asserts response is IFetchUsersReponse {
  responseValidationSchema.validateSync(response);
}
