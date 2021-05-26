import * as yup from 'yup';

import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../../models/ISuccessResponse';
import {validationSchema as userValidation} from '../../../../../../../models/IUser';

export const formValidationSchema = yup.object().strict(true).shape({
  name: yup.string().trim().required(),
  surname: yup.string().trim().required(),
  email: yup.string().email().trim().required(),
  accountType: yup.number().integer().positive(),
});

export interface ISubmitUserResponse extends ISuccessResponse {
  user: IUserValues;
}

export const submitUserValidationSchema = successResponseValidationSchema.shape({
  user: userValidation,
});

export function validateSubmitUserResponse(data: unknown): asserts data is ISubmitUserResponse {
  submitUserValidationSchema.validateSync(data, {strict: true, stripUnknown: true});
}

export interface IUserValues {
  email: string;
  password: string;
  name: string;
  surname: string;
  accountType: number;
  role: number;
}

export const formInitialValues: IUserValues = {email: '', password: '', name: '', surname: '', accountType: 3, role: 1};

export interface IRole {
  id: number;
  name: string;
}

export const roles: Array<IRole> = [
  {
    id: 1,
    name: 'ADMIN',
  },
  {
    id: 2,
    name: 'MOD',
  },
  {
    id: 3,
    name: 'USER',
  },
];
