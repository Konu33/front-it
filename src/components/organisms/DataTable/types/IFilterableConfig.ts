export interface ITextFilterable {
  type: 'text';
}
export interface INumericFilterable {
  type: 'numeric';
}
export interface ISelectFilterable {
  type: 'select';
  values: string[];
}

type IFilterableConfig = ITextFilterable | INumericFilterable | ISelectFilterable;

export default IFilterableConfig;
