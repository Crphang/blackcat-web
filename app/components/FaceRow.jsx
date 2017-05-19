import React from 'react';

import Constants from '../Constants';

import '../styles/FaceRow.scss';

const FaceRow = ({ users, type }) => {
  return (
    <div className="faceRow">
      <div className="left">

        {type === 'Going' &&
          <div>
            <img className="check-logo" src={Constants.STATIC + '/assets/check-outline.svg'} />
            <div className="faceText">{users && users.length} going</div>
          </div>
          }
        {type === 'Likes' &&
          <div>
            <img className="like-logo" src={Constants.STATIC + '/assets/like-outline.svg'} />
            <div className="faceText">{users && users.length} likes</div>
          </div>
        }
      </div>
      <div className="right">
        {users && users.map(user => <img key={user.id} className="userFace" src={Constants.STATIC + '/assets/orange-dp.jpg'} />)}
      </div>
    </div>
  );
};

export default FaceRow;
