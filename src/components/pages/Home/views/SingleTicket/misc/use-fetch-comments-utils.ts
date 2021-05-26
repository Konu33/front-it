import * as yup from 'yup';

import IComment, {validateSchema as commentValidationSchema} from '../../../../../../models/IComment';
import ISuccessResponse from '../../../../../../models/ISuccessResponse';

export type IFetchCommentReponse = {
  comments: IComment[];
};

export type IResponse = ISuccessResponse & IFetchCommentReponse;

export const responseValidationSchema = yup
  .object()
  .required()
  .shape({
    status: yup.boolean().required().isTrue(),
    message: yup.string().required(),
    comments: yup.array().of(commentValidationSchema),
  });

export function validateResponse(response: unknown): asserts response is IFetchCommentReponse {
  responseValidationSchema.validateSync(response);
}
