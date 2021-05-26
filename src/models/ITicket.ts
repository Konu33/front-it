import {number, object, string} from 'yup';

import {ID_Validation} from '../utils/yup-utils';

export enum TicketStatus {
  ALL = 0,
  NEW = 1,
  PROCESSING = 2,
  BLOCKED = 3,
  CLOSED = 4,
}

export const ticketStatusColorMap = new Map<TicketStatus, string>([
  [1, '#2196f3'],
  [2, '#ff9800'],
  [3, '#4caf50'],
  [4, '#f44336'],
  [5, '#dc004e'],
]);

export default interface ITicket {
  id: number;
  title: string;
  description: string;
  createdBy: number; // user id
  addDate: string; // ID usera w formacie: 11-01-2021 20:50:03
  assignedTo: null | number; // ID usera lub null jeśli nie przypisany
  status: TicketStatus; // np. 'NEW'
}

export const allTicketStatuses: string[] = Object.values(TicketStatus).filter(
  (val: TicketStatus | string) => !parseInt(val as string) && val !== 0
) as string[];

const phpDateFormatRegexp = /^\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{1,2}:\d{1,2}$/;

export const validationSchema = object()
  .required()
  .shape({
    id: ID_Validation.required(),
    title: string().required(),
    description: string().nullable(false).defined(),
    createdBy: ID_Validation.required(),
    addDate: string().required().matches(phpDateFormatRegexp),
    assignedTo: number()
      .nullable(true) /*.required()*/
      .positive()
      .integer(),
    status: number()
      .required()
      .positive()
      .integer()
      .oneOf(Object.values(TicketStatus).filter((val: TicketStatus | string) => parseInt(val as string)) as number[]),
  });
