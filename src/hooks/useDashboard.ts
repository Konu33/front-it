import {useContext} from 'react';

import {DashboardContext, IDashboardData} from '../contexts/DashboardContext';

export default function useDashboard(): IDashboardData {
  return useContext(DashboardContext);
}
