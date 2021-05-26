import Typography from '@material-ui/core/Typography';
import {Formik} from 'formik';
import {FormikHelpers, FormikProps} from 'formik/dist/types';
import React, {memo, useMemo, useRef} from 'react';

import useMergeClasses from '../../../../../../hooks/useMergeClasses';
import ITicket from '../../../../../../models/ITicket';
import {OverrideClassesProp} from '../../../../../../utils/styling-utils';
import TicketForm from '../../../../../molecules/TicketForm/index';
import useStyles from '../misc/styles';
import {IFormValues} from '../misc/utils';
import * as utils from '../misc/utils';

export interface IAddTicketFormProps {
  onSubmit: (
    values: typeof utils.formInitialValues,
    helpers: FormikHelpers<typeof utils.formInitialValues>
  ) => Promise<void>;
  ticket: ITicket;
  classes?: OverrideClassesProp<typeof useStyles>;
}

function EditTicketForm(props: IAddTicketFormProps) {
  let {onSubmit: onFormSubmit, ticket} = props;
  const formikRef = useRef<FormikProps<typeof utils.formInitialValues>>(null);
  const classes = useMergeClasses(useStyles(props), props.classes);

  const TicketValues: IFormValues = useMemo(
    () =>
      ticket
        ? {
            title: ticket.title,
            description: ticket.description,
            assigned: ticket.assignedTo ? ticket.assignedTo : 1,
            status: ticket.status,
          }
        : {title: '', description: '', assigned: 0, status: 1},
    [ticket]
  );
  return (
    <div className={classes.formWrapper}>
      <div className={classes.formHeader}>
        <Typography variant={'h5'}>Edit Ticket</Typography>
      </div>

      <Formik
        initialValues={TicketValues}
        validationSchema={utils.formValidationSchema}
        enableReinitialize
        onSubmit={onFormSubmit}
        innerRef={formikRef}
      >
        {({handleSubmit, isSubmitting, status}) => (
          <form onSubmit={handleSubmit} className={classes.form}>
            <TicketForm isSubmitting={isSubmitting} classes={classes} status={status} edit />
          </form>
        )}
      </Formik>
    </div>
  );
}

export default memo(EditTicketForm);
