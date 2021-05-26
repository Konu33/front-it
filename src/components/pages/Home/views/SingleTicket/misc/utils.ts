import * as yup from 'yup';

export interface IParams {
  [key: string]: number | unknown;
}

export interface ISubmitParams {
  set: (comment: string) => void;
}
export interface IFormValues {
  description: string;
}

export const initialValues = {description: ''};

export const validationSchema = yup.object().required().shape({
  description: yup.string().required(),
});
