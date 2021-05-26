import {boolean, object, string} from 'yup';

export default interface ISuccessResponse<M extends string = string> {
  status: true;
  message: M;
}

export const validationSchema = object().required().shape({
  status: boolean().required().isTrue(),
  message: string().required(),
});
