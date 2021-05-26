import {number, object, string} from 'yup';

export enum Role {
  ALL = 'ALL',
  ADMIN = 'ADMIN',
  MOD = 'MOD',
  USER = 'USER',
}

export const allUserRoles: string[] = Object.values(Role);

export const userRoleColorMap = new Map<Role, string>([
  [Role.USER, '#2196f3'],
  [Role.MOD, '#ff9800'],
  [Role.ADMIN, '#4caf50'],
]);

export default interface IUser {
  id: number; // 1
  name: string; // Jan
  surname: string; // Kowalski
  email: string; // jan.kowalski@gmail.com
  role: Role; // ADMIN
  iconColor: string; // #04ff00
}

export const validationSchema = object()
  .required()
  .shape({
    id: number().required().positive().integer(),
    name: string().required(),
    surname: string().required(),
    email: string().required(),
    role: string().required().oneOf(['ADMIN', 'MOD', 'USER']),
    iconColor: string().required(),
  });
