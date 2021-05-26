import React, {memo} from 'react';
import {useParams} from 'react-router-dom';

import SingleUserCard from '../../../../organisms/SingleUserCard';
import useFetchUser from './hooks/useFetchUser';

function SingleUser() {
  const params = useParams();
  const state = useFetchUser(params);
  return <SingleUserCard state={state} />;
}

export default memo(SingleUser);
