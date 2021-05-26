import TextField from '@material-ui/core/TextField';
import classNames from 'classnames';
import {Formik} from 'formik';
import {FormikHelpers, FormikProps} from 'formik/dist/types';
import React, {memo, useRef} from 'react';

import useMergeClasses from '../../../hooks/useMergeClasses';
import IComment from '../../../models/IComment';
import ITicket from '../../../models/ITicket';
import {OverrideClassesProp} from '../../../utils/styling-utils';
import ProgressButton from '../../atoms/ProgressButton';
import CommentsList from '../../molecules/CommentsList';
import useStyles from './styles';
import * as utils from './utils';

export interface ISingleTicketFormFormProps {
  onSubmit: (values: typeof utils.initialValues, helpers: FormikHelpers<typeof utils.initialValues>) => Promise<void>;
  classes?: OverrideClassesProp<typeof useStyles>;
  comments: IComment[];
  ticket: ITicket;
  removeComment: (commentId: number) => void;
}

function SingleTicketForm(props: ISingleTicketFormFormProps) {
  let {onSubmit: onFormSubmit, removeComment} = props;
  const formikRef = useRef<FormikProps<typeof utils.initialValues>>(null);
  const classes = useMergeClasses(useStyles(props), props.classes);
  const {comments, ticket} = props;

  return (
    <div className={classes.formWrapper}>
      <CommentsList comments={comments} ticket={ticket} removeComment={removeComment} />
      <Formik
        initialValues={utils.initialValues}
        validationSchema={utils.validationSchema}
        onSubmit={onFormSubmit}
        innerRef={formikRef}
      >
        {({values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting}) => (
          <form onSubmit={handleSubmit} className={classes?.form} data-testid='comments'>
            <TextField
              inputProps={{'data-testid': 'description'}}
              name={'description'}
              label={'Description'}
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.description}
              variant={'outlined'}
              error={Boolean(touched.description && errors.description)}
              className={classes?.formField}
              multiline
              rows={4}
              fullWidth
              disabled={isSubmitting}
            />

            <ProgressButton
              data-testid='button'
              type={'submit'}
              color={'primary'}
              variant={'contained'}
              inProgress={isSubmitting}
              className={classNames(classes?.formField, classes?.submitBtn)}
              ButtonProps={{
                classes: {
                  text: classes?.submitBtn_label,
                },
              }}
            >
              Add Comment
            </ProgressButton>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default memo(SingleTicketForm);
