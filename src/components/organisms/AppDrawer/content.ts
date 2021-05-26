import {
  AddCircle as AddUser,
  ListOutlined as MyTicketsIcon,
  PeopleAlt as AllUsersIcon,
  PlaylistAddOutlined as AddTicketIcon,
  SvgIconComponent,
  ViewList as AllTicketsIcon,
} from '@material-ui/icons';

import {Role} from '../../../models/IUser';

export interface IDrawerList {
  visibleFor: Role[];
  elements: IDrawerElement[];
}

export interface IDrawerElement {
  label: string;
  link: string;
  icon: SvgIconComponent;
}

const content: IDrawerList[] = [
  {
    visibleFor: [Role.USER, Role.MOD, Role.ADMIN],
    elements: [
      {label: 'My tickets', icon: MyTicketsIcon, link: '/home/my-tickets'},
      {label: 'Add ticket', icon: AddTicketIcon, link: '/home/add-ticket'},
    ],
  },
  {
    visibleFor: [Role.MOD, Role.ADMIN],
    elements: [{label: 'All tickets', icon: AllTicketsIcon, link: '/home/mod/tickets'}],
  },
  {
    visibleFor: [Role.ADMIN],
    elements: [
      {label: 'All users', icon: AllUsersIcon, link: '/home/admin/users'},
      {label: 'Add user', icon: AddUser, link: '/home/admin/users/add-new'},
    ],
  },
];

export default content;
