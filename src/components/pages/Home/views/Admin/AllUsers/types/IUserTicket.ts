import ITicket from '../../../../../../../models/ITicket';
import ISimplifiedUser from './ISimplifiedUser';

type IUserTicket = Omit<ITicket, 'createdBy' | 'assignedTo'> & {
  createdBy: ISimplifiedUser;
  assignedTo: ISimplifiedUser | null;
};

export default IUserTicket;
