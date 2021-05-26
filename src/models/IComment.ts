import * as yup from 'yup';

import {ID_Validation} from '../utils/yup-utils';
import IUser from './IUser';

type ICreatedBy = Pick<IUser, 'id' | 'name' | 'surname' | 'iconColor'>;

export default interface IComment {
  id: number;
  ticketId: number;
  content: string;
  addDate: string;
  createdBy: ICreatedBy;
}

export const validateSchema = yup.object().shape({
  id: ID_Validation.required(),
  ticketId: ID_Validation.required(),
  content: yup.string().required(),
  addDate: yup.string().required(),
  createdBy: yup.object().shape({
    name: yup.string().required(),
    surname: yup.string().required(),
    iconColor: yup.string().required(),
  }),
});
