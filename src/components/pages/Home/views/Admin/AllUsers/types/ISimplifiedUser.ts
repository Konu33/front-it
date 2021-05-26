import IUser, {validationSchema as userValidationSchema} from '../../../../../../../models/IUser';

export const validationSchema = userValidationSchema.pick(['name', 'surname', 'iconColor']);

type ISimplifiedUser = Pick<IUser, 'name' | 'surname' | 'iconColor'>;

export default ISimplifiedUser;
