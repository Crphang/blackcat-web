import React from 'react';
import CommentsTab from './CommentsTab';
import FaceRow from './FaceRow';

const ParticipantsDetail = ({ event }) => {
  return (
    <div className="participantsDetailWrapper">
      <FaceRow users={event.participants} type="Going" />
      <hr />
      <FaceRow users={event.likes} type="Likes" />
      <hr />
      <CommentsTab comments={event.comments} />
    </div>
  );
};

export default ParticipantsDetail;
