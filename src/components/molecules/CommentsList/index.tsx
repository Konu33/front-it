import {ListItem, ListItemText} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import {Theme, useTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import classNames from 'classnames';
import React, {useCallback} from 'react';
import {useHistory} from 'react-router';

import useDashboard from '../../../hooks/useDashboard';
import useMergeClasses from '../../../hooks/useMergeClasses';
import IComment from '../../../models/IComment';
import ITicket from '../../../models/ITicket';
import {Role} from '../../../models/IUser';
import {OverrideClassesProp} from '../../../utils/styling-utils';
import UserAvatar from '../../atoms/UserAvatar';
import useDeleteCommentHandler from './hooks/useDeleteCommentHandler';
import useStyles from './styles';

export interface ICommentProps {
  classes?: OverrideClassesProp<typeof useStyles>;
  comments: IComment[];
  ticket: ITicket;
  removeComment: (commentId: number) => void;
}
export default function CommentsList(props: ICommentProps) {
  const theme: Theme = useTheme();
  const classes = useMergeClasses(useStyles(props), props.classes);
  const {comments, ticket, removeComment} = props;
  const history = useHistory();
  const moveToEdit = useCallback(() => {
    history.push('/home/tickets/' + ticket.id + '/edit');
  }, [history, ticket]);
  const {user} = useDashboard();
  const hasModerateRole = user.role === Role.MOD || user.role === Role.ADMIN;
  const generateDeleteCommentHandler = useDeleteCommentHandler(ticket.id, removeComment);

  return (
    <>
      <div className={classes.formHeader}>
        <div className={classes.iconsToolbar}>
          <IconButton
            onClick={moveToEdit}
            className={classes.toolbarIcon}
            style={{backgroundColor: theme.palette.primary.main}}
          >
            <EditIcon className={classes.iconSize} />
          </IconButton>
        </div>
        <Typography variant={'h5'} className={classes.title} data-testid='title'>
          {ticket.title}
        </Typography>
        <div data-testid='ticket-desc'>{ticket.description}</div>
      </div>

      <List className={classes.commentsBlock}>
        {comments.map((comment: IComment, index: number) => (
          <div key={index} className={classNames(classes.commentWrapper, index % 2 === 0 && classes.commentWrapperAlt)}>
            <ListItem className={classes.comment}>
              <ListItemIcon>
                <UserAvatar user={comment.createdBy} />
              </ListItemIcon>
              <ListItemText primary={comment.content} secondary={comment.addDate} />
              {(hasModerateRole || user.id === comment.createdBy.id) && (
                <ListItemSecondaryAction>
                  <IconButton onClick={generateDeleteCommentHandler(comment.id)} edge='end' aria-label='delete'>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              )}
            </ListItem>
          </div>
        ))}
      </List>
    </>
  );
}
