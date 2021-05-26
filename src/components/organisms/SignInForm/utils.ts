import * as yup from 'yup';

const initialValues = {email: '', password: ''};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
const validationSchema = yup
  .object()
  .strict(true)
  .shape({
    email: yup.string().trim().email().max(255).required(),
    password: yup.string().trim().max(255).required(),
  });

export {initialValues, passwordRegex, validationSchema};
