import ITableItem from './ITableItem';

export default interface IItemsPool<I extends ITableItem> {
  items: I[];
  meta: {
    total: number;
  };
}
