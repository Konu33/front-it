import ITicket from '../../../../../../../models/ITicket';
import IUser from '../../../../../../../models/IUser';

type ILinkedTicket = Omit<ITicket, 'createdBy' | 'assignedTo'> & {
  createdBy: IUser;
  assignedTo: IUser | null;
};

export default ILinkedTicket;
