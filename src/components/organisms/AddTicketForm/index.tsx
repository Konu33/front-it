import Typography from '@material-ui/core/Typography';
import {Formik} from 'formik';
import {FormikHelpers, FormikProps} from 'formik/dist/types';
import React, {memo, useRef} from 'react';

import useMergeClasses from '../../../hooks/useMergeClasses';
import {OverrideClassesProp} from '../../../utils/styling-utils';
import TicketForm from '../../molecules/TicketForm/index';
import useStyles from './styles';
import * as utils from './utils';

export interface IAddTicketFormProps {
  onSubmit: (
    values: typeof utils.formInitialValues,
    helpers: FormikHelpers<typeof utils.formInitialValues>
  ) => Promise<void>;
  classes?: OverrideClassesProp<typeof useStyles>;
}

function AddTicketForm(props: IAddTicketFormProps) {
  let {onSubmit: onFormSubmit} = props;
  const formikRef = useRef<FormikProps<typeof utils.formInitialValues>>(null);
  const classes = useMergeClasses(useStyles(props), props.classes);

  return (
    <div className={classes.formWrapper}>
      <div className={classes.formHeader}>
        <Typography variant={'h5'} data-testid='title'>
          Add New Ticket
        </Typography>
      </div>

      <Formik
        initialValues={utils.formInitialValues}
        validationSchema={utils.formValidationSchema}
        onSubmit={onFormSubmit}
        innerRef={formikRef}
      >
        {({handleSubmit, isSubmitting, status}) => (
          <form onSubmit={handleSubmit} className={classes.form} data-testid='form'>
            <TicketForm isSubmitting={isSubmitting} classes={classes} status={status} edit={false} />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default memo(AddTicketForm);
