import {useMemo} from 'react';

import ITicket from '../../../../../../../models/ITicket';
import IUser from '../../../../../../../models/IUser';
import IItemsPool from '../../../../../../organisms/DataTable/types/IItemsPool';
import {IUsersPool} from '../misc/fetch-users-utils';
import ILinkedTicket from '../types/ILinkedTicket';

export default function useLinkedTicketsPool(
  ticketsPool: IItemsPool<ITicket>,
  usersPool: IUsersPool
): IItemsPool<ILinkedTicket> {
  return useMemo(
    () => ({
      items: ticketsPool.items.map((ticket: ITicket) => ({
        ...ticket,
        createdBy: usersPool.users.find((user: IUser) => user.id === ticket.createdBy) as IUser,
        assignedTo:
          ticket.assignedTo !== null
            ? usersPool.users.find((user: IUser) => user.id === ticket.assignedTo) ?? null
            : null,
      })),
      meta: ticketsPool.meta,
    }),
    [ticketsPool, usersPool]
  );
}
