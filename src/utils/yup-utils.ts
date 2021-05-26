import {number, ValidationError} from 'yup';

export function getValidationErrorMessage(e: unknown): string {
  return e instanceof ValidationError ? e.message : 'unknown valiation error';
}

export const ID_Validation = number().positive().integer();
