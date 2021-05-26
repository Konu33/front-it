import {object, ref, string} from 'yup';

export default interface IFormValues {
  newPassword: string;
  repeatNewPassword: string;
}

export const initialValues: IFormValues = {
  newPassword: '',
  repeatNewPassword: '',
};

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;

export const validationSchema = object()
  .required()
  .shape({
    newPassword: string()
      .label('New password')
      .trim()
      .min(8)
      .max(255)
      .matches(passwordRegex, 'Password is not strong enough')
      .required(),
    repeatNewPassword: string()
      .label('Repeated password')
      .required()
      .oneOf([ref('newPassword')]),
  });
