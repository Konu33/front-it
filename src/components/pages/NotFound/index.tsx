import React, {memo} from 'react';
import {Redirect} from 'react-router-dom';

function NotFound() {
  return <Redirect to={'/home'} />;
}

export default memo(NotFound);
