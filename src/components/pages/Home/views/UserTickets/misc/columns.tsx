import Chip from '@material-ui/core/Chip';

import {allTicketStatuses, TicketStatus, ticketStatusColorMap} from '../../../../../../models/ITicket';
import UserChip from '../../../../../atoms/UserChip';
import IColumn from '../../../../../organisms/DataTable/types/IColumn';
import IUserTicket from '../types/IUserTicket';

const columns: IColumn<IUserTicket>[] = [
  {
    id: 'id',
    label: 'ID',
    width: 60,
    align: 'left',
    sortable: true,
    filterable: {type: 'numeric'},
  },
  {id: 'title', label: 'Title', filterable: {type: 'text'}, sortable: true},
  {
    id: 'addDate',
    label: 'Added on',
    width: 120,
    sortable: true,
    format: (ticket: IUserTicket) => ticket.addDate.split(' ')[0],
  },
  {
    id: 'status',
    label: 'Status',
    width: 160,
    sortable: true,
    filterable: {type: 'select', values: allTicketStatuses},
    format: (ticket: IUserTicket) => (
      <Chip
        variant={'default'}
        size={'small'}
        label={TicketStatus[ticket.status]}
        style={{
          width: '100%',
          cursor: 'inherit',
          backgroundColor: ticketStatusColorMap.get(ticket.status),
          color: 'white',
        }}
      />
    ),
  },
  {
    id: 'assignedTo',
    label: 'Assigned to',
    width: 120,
    align: 'center',
    format: (ticket: IUserTicket) =>
      ticket.assignedTo && (
        <UserChip
          user={ticket.assignedTo}
          label={`${ticket.assignedTo.name} ${ticket.assignedTo.surname}`}
          style={{width: '100%', cursor: 'inherit'}}
        />
      ),
  },
];

export default columns;
