import {TicketStatus} from '../../../../../../../models/ITicket';
import IFiltersState from '../../../../../../organisms/DataTable/types/IFiltersState';
import ISortState, {OrderDirection} from '../../../../../../organisms/DataTable/types/ISortState';
import ILinkedTicket from '../types/ILinkedTicket';

export const defaultSortState: ISortState<ILinkedTicket> = {orderBy: 'id', orderDirection: OrderDirection.DESC};

export const defaultFiltersState: IFiltersState<ILinkedTicket> = {
  id: '',
  title: '',
  status: TicketStatus[TicketStatus.ALL] as keyof typeof TicketStatus,
};
