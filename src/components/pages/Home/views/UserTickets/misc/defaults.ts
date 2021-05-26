import {TicketStatus} from '../../../../../../models/ITicket';
import IFiltersState from '../../../../../organisms/DataTable/types/IFiltersState';
import ISortState, {OrderDirection} from '../../../../../organisms/DataTable/types/ISortState';
import IUserTicket from '../types/IUserTicket';

export const defaultSortState: ISortState<IUserTicket> = {orderBy: 'id', orderDirection: OrderDirection.DESC};

export const defaultFiltersState: IFiltersState<IUserTicket> = {
  id: '',
  title: '',
  status: TicketStatus[TicketStatus.ALL] as keyof typeof TicketStatus,
};
