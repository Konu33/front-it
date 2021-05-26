import * as yup from 'yup';

export interface IFormValues {
  title: string;
  description: string;
  assigned: number;
  status: number;
}

export const formInitialValues: IFormValues = {title: '', description: '', assigned: 0, status: 1};

export const formValidationSchema = yup.object().strict(true).shape({
  title: yup.string().trim().required(),
  description: yup.string().trim().required(),
  assigned: yup.number(),
  status: yup.number(),
});
