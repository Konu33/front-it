import {ITableStatus} from '../../../../../../organisms/DataTable/types/ITableData';

export function identifyTableStatus(...statuses: ITableStatus[]): ITableStatus {
  const isAnyStatusError: boolean = statuses.reduce(
    (isAnyError: boolean, status: ITableStatus) => (status === 'error' ? true : isAnyError),
    false
  );
  const isAnyStatusLoading: boolean = statuses.reduce(
    (isAnyLoading: boolean, status: ITableStatus) => (status === 'loading' ? true : isAnyLoading),
    false
  );

  if (isAnyStatusError) return 'error';
  else if (isAnyStatusLoading) return 'loading';
  else return 'idle';
}
