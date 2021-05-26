import * as yup from 'yup';

export interface IFormValues {
  description: string;
}

const initialValues = {description: ''};

const validationSchema = yup.object().required().shape({
  description: yup.string().required(),
});

export {initialValues, validationSchema};
