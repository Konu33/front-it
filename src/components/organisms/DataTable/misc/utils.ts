import {OrderDirection} from '../types/ISortState';

export function toggleOrderDirection(orderDirection: OrderDirection) {
  return orderDirection === OrderDirection.ASC ? OrderDirection.DESC : OrderDirection.ASC;
}
