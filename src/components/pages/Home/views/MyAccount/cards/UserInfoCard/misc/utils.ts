import ISuccessResponse, {
  validationSchema as successResponseValidationSchema,
} from '../../../../../../../../models/ISuccessResponse';
import IUser, {validationSchema as userValidationSchema} from '../../../../../../../../models/IUser';

export interface IResponse extends ISuccessResponse {
  user: IUser;
}

export const validationSchema = successResponseValidationSchema.shape({
  user: userValidationSchema,
});

export function validateResponse(response: unknown): asserts response is IResponse {
  validationSchema.validateSync(response);
}
