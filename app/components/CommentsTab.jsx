import React from 'react';
import CommentRow from './CommentRow';

import '../styles/CommentsTab.scss';

const CommentsTab = ({ comments, type, action }) => {
  return (
    <div className="commentsTab">
      {comments && comments.map(comment => <CommentRow comment={comment} type={type} action={action} />)}
    </div>
  );
};

export default CommentsTab;
