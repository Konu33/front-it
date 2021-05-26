import ITableItem from './ITableItem';

export enum OrderDirection {
  ASC = 'asc',
  DESC = 'desc',
}

export default interface ISortState<I extends ITableItem> {
  orderBy: keyof I;
  orderDirection: OrderDirection;
}
