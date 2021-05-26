import IComment, {validateSchema as commentValidation} from '../../../../../../models/IComment';
import ISuccessResponse, {validationSchema as responseValidation} from '../../../../../../models/ISuccessResponse';

export interface IResponse extends ISuccessResponse {
  comment: IComment;
}
export const validationSchema = responseValidation.shape({
  comment: commentValidation,
});
export function validateResponse(response: unknown): asserts response is IResponse {
  validationSchema.validateSync(response);
}
