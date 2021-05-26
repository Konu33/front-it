import axios, {CancelTokenSource} from 'axios';
import {MutableRefObject, useCallback, useEffect, useRef} from 'react';

import DirectAPI from '../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../mechanisms/ErrorReporting';

export default function useDeleteCommentHandler(ticketId: number, removeComment: (commentId: number) => void) {
  const requestRef: MutableRefObject<CancelTokenSource | null> = useRef(null);

  const handler = useCallback(
    (commentId: number) => async () => {
      const request: CancelTokenSource | null = requestRef.current;
      if (request !== null) request.cancel();
      requestRef.current = axios.CancelToken.source();

      try {
        await DirectAPI.delete(`/tickets/${ticketId}/comments/${commentId}`, {
          cancelToken: requestRef.current.token,
        });
        removeComment(commentId);
      } catch (e: unknown) {
        ErrorReporting.captureError(e);
      }
    },
    [ticketId, removeComment]
  );

  useEffect(() => {
    const request: CancelTokenSource | null = requestRef.current;
    return () => {
      request !== null && request.cancel();
    };
  }, [requestRef]);

  return handler;
}
