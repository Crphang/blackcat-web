import React from 'react';
import CommentRow from './CommentRow';

import '../styles/CommentsTab.scss';

const CommentsTab = ({ comments }) => {
  return (
    <div className="commentsTab">
      {comments && comments.map(comment => <CommentRow comment={comment} />)}
    </div>
  );
};

export default CommentsTab;
