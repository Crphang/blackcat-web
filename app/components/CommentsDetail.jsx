import React from 'react';

import CommentsTab from './CommentsTab';

const CommentsDetail = ({ event, commentEvent }) => {
  return (
    <div>
      <CommentsTab comments={event.comments} />
      <div>COMMENT HERE</div>
    </div>
  );
};

export default CommentsDetail;
