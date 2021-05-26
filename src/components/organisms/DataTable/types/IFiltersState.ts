import ITableItem from './ITableItem';

type IFiltersState<I extends ITableItem> = Partial<Record<keyof I, string>>;

export default IFiltersState;
