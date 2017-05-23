import React from 'react';
import moment from 'moment';

import Constants from '../Constants';

const CommentRow = ({ comment, type, action }) => {
  const daysAgo = moment(comment.time * 1000).fromNow();
  return (
    <div className="commentRow">
      <img className="commenterImg" src={Constants.STATIC + '/assets/orange-dp.jpg'} />
      <div className="right">
        <div>
          <div className="commenter">{comment.user.name}</div>
          <div className="timeAgo">{daysAgo}</div>
          {type === 'Action' && <img className="reply" src={Constants.STATIC + '/assets/reply.svg'} onClick={() => action(comment.user)} /> }
        </div>
        <div className="description">
          {comment.comment}
        </div>
      </div>
    </div>
  );
};

export default CommentRow;
