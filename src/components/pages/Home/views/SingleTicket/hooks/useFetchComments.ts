import {useCallback, useEffect, useState} from 'react';

import DirectAPI from '../../../../../../mechanisms/DirectAPI';
import ErrorReporting from '../../../../../../mechanisms/ErrorReporting';
import IComment from '../../../../../../models/IComment';
import {IResponse, validateResponse} from '../misc/use-fetch-comments-utils';
import {IParams} from '../misc/utils';

export default function useFetchTicket(
  params: IParams
): [comments: IComment[], addComment: (newComment: IComment) => void, removeComment: (commentId: number) => void] {
  const [comments, setComments] = useState<IComment[]>([]);

  const addComment = useCallback(
    (newComment: IComment) => {
      const newComments = comments.slice();
      newComments.push(newComment);
      setComments(newComments);
    },
    [comments, setComments]
  );

  const removeComment = useCallback(
    (commentId: number) => {
      const newComments = comments.slice();
      newComments.splice(
        comments.findIndex((comment: IComment) => comment.id === commentId),
        1
      );
      setComments(newComments);
    },
    [comments, setComments]
  );

  const fetchTicket = useCallback(async () => {
    try {
      const response = await DirectAPI.get<IResponse | unknown>('/tickets/' + params.id + '/comments');
      const data: unknown | IResponse = response.data;

      validateResponse(data);
      setComments(data.comments);
    } catch (e) {
      ErrorReporting.captureError(e);
    }
  }, [params.id]);

  //Fetch single ticket
  useEffect(() => {
    fetchTicket();
  }, [fetchTicket]);

  return [comments, addComment, removeComment];
}
