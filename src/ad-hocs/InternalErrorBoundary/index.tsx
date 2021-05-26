import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {ErrorInfo, PureComponent, ReactNode} from 'react';

import ErrorReporting from '../../mechanisms/ErrorReporting';

export interface IInternalErrorBoundaryProps {
  children: ReactNode;
}

interface IState {
  error: boolean;
}

export default class InternalErrorBoundary extends PureComponent<IInternalErrorBoundaryProps, IState> {
  state = {
    error: false,
  };

  static getDerivedStateFromError(_error: unknown) {
    return {error: true};
  }

  componentDidCatch(error: unknown, errorInfo: ErrorInfo) {
    ErrorReporting.captureError(error, {errorInfo});
  }

  render() {
    const {children} = this.props;

    if (this.state.error)
      return (
        <Grid container justify={'center'} alignItems={'center'}>
          <Grid item>
            <Typography>Wystąpił nieznany błąd..</Typography>
          </Grid>
        </Grid>
      );
    else return children;
  }
}
