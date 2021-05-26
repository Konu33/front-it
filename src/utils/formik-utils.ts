import {FormikTouched} from 'formik';

export function isAnyFieldTouched<V extends object = object>(touched: FormikTouched<V>): boolean {
  let fieldName: keyof typeof touched;

  for (fieldName in touched) {
    if (touched[fieldName] === true) return true;
  }

  return false;
}
