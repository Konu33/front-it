import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography';
import React, {memo} from 'react';

import UserSvg from '../../../assets/svg/undraw_businessman_97x4.svg';
import useMergeClasses from '../../../hooks/useMergeClasses';
import {OverrideClassesProp} from '../../../utils/styling-utils';
import UserAvatar from '../../atoms/UserAvatar';
import {ILocalState} from '../../pages/Home/views/SingleUser/hooks/useLocalState';
import useStyles from './styles';

interface ISingleUserProps {
  classes?: OverrideClassesProp<typeof useStyles>;
  state: ILocalState;
}

function SingleUserCard(props: ISingleUserProps) {
  const classes = useMergeClasses(useStyles(props), props.classes);
  const {state} = props;

  return (
    <Card className={classes.card} data-testid='card'>
      <img src={UserSvg} className={classes.svgImg} alt='user' data-testid='img' />

      <CardContent className={classes.cardContent}>
        {state.status === 'success' ? (
          state.user !== null ? (
            <>
              <List className={classes.list}>
                <ListSubheader className={classes.listSubheader}>
                  <UserAvatar user={state.user} data-testid='avatar' className={classes.avatar} />
                  <Typography variant={'h5'} data-testid='name'>
                    {state.user.name} {state.user.surname}
                  </Typography>
                </ListSubheader>
                <ListItem>
                  <ListItemText primary={'Email'} data-testid='email' secondary={state.user.email} />
                </ListItem>
                <ListItem>
                  <ListItemText primary={'Role'} data-testid='role' secondary={state.user.role} />
                </ListItem>
              </List>
            </>
          ) : (
            <Typography variant={'h5'} color='error' data-testid='role'>
              Not found user with specified ID
            </Typography>
          )
        ) : (
          <CircularProgress size={100} color={'secondary'} className={classes.spinner} />
        )}
      </CardContent>
    </Card>
  );
}

export default memo(SingleUserCard);
