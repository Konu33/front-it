import IItemsPool from './IItemsPool';
import ITableItem from './ITableItem';

export type ITableStatus = 'idle' | 'loading' | 'error';

export default interface ITableData<I extends ITableItem> {
  status: ITableStatus;
  itemsPool: IItemsPool<I>;
}
