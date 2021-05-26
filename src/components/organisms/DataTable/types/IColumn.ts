import {TableCellProps} from '@material-ui/core/TableCell';
import {ReactNode} from 'react';

import IFilterableConfig from './IFilterableConfig';
import ITableItem from './ITableItem';

export default interface IColumn<I extends ITableItem> {
  id: keyof I;
  label: string;
  width?: number;
  align?: TableCellProps['align'];
  sortable?: boolean;
  filterable?: IFilterableConfig;
  format?: (item: I) => ReactNode;
}
