import {object, string} from 'yup';

export default interface IFormValues {
  name: string;
  surname: string;
}

export const validationSchema = object().required().shape({
  name: string().required(),
  surname: string().required(),
});
