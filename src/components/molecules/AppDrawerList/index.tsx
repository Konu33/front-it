import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import React, {memo} from 'react';
import {Link as RouterLink} from 'react-router-dom';

import {IDrawerElement} from '../../organisms/AppDrawer/content';

export interface IAppDrawerListProps {
  elements: IDrawerElement[];
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0),
    },
  })
);

function AppDrawerList(props: IAppDrawerListProps) {
  const {elements} = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {elements.map(({icon: Icon, label, link}: IDrawerElement, index: number) => {
        return (
          <Link key={index} color={'textSecondary'} component={RouterLink} to={link}>
            <ListItem button>
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </Link>
        );
      })}
    </List>
  );
}

export default memo(AppDrawerList);
