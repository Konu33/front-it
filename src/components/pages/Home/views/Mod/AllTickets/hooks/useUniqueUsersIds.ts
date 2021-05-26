import {useMemo} from 'react';

import ITicket from '../../../../../../../models/ITicket';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';

export default function useUniqueUsersIds(ticketsPool: IItemsPool<ITicket>): number[] {
  return useMemo(() => {
    const tickets: ITicket[] = ticketsPool.items;
    const usersIdsSet = new Set<number>();

    for (const ticket of tickets) {
      usersIdsSet.add(ticket.createdBy);
      if (ticket.assignedTo) usersIdsSet.add(ticket.assignedTo);
    }

    return Array.from(usersIdsSet.values());
  }, [ticketsPool]);
}
