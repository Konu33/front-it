import {boolean, object, SchemaOf, string} from 'yup';

export default interface IBadRequestResponse {
  status: false;
  message: string;
}

export const validationSchema: SchemaOf<
  Omit<IBadRequestResponse, 'status'> & {status: boolean}
> = object().required().shape({
  status: boolean().required().isFalse(),
  message: string().required(),
});

export function validateBadRequestResponse(response: unknown): asserts response is IBadRequestResponse {
  validationSchema.validateSync(response, {strict: true});
}

export function isBadRequestResponse(response: unknown): response is IBadRequestResponse {
  return validationSchema.isValidSync(response, {strict: true});
}
