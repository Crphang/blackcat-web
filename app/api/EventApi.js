import 'whatwg-fetch';

import CONSTANTS from '../Constants';
import { getEventsAction, addEventsAction, getEventDetailAction, eventRegisteredAction, eventCommentedAction, eventLikedAction } from '../actions/EventActions';
import { likeEventAction, registerEventAction } from '../actions/UserActions';

const END_OF_TIME = 9999999999;

export const getEvents = (page = 1, startDate = 0, endDate = END_OF_TIME) => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
    fetch(CONSTANTS.HOST +
      `/event/get_events?page_count=${page}&start_date=${startDate}&end_date=${endDate}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': accessToken,
        },
      })
    .then((response) => {
      response.json()
      .then((body) => {
        const values = Object.values(body);
        const lastEvent = values[values.length - 3];
        const lastPageCount = parseInt(lastEvent.page_count, 10);
        if (lastPageCount === 1) {
          dispatch(getEventsAction(body));
        } else {
          dispatch(addEventsAction((body)));
        }
      });
    });
  };
};

export const getEvent = (eventId) => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
    fetch(CONSTANTS.HOST + `/event/get?event_id=${eventId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    })
    .then((response) => {
      response.json()
      .then((body) => {
        dispatch(getEventDetailAction(body));
      });
    });
  };
};

export const likeEvent = (eventId) => {
  return (dispatch, getState) => {
    const user = getState().user;
    const accessToken = user.access_token;
    fetch(CONSTANTS.HOST + '/event/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      body: JSON.stringify({
        event_id: eventId,
      }),
    })
    .then((response) => {
      response.json()
      .then((body) => {
        if (body.error === undefined) {
          const newParticipant = {};
          newParticipant[body.id] = {
            likes: [],
          };
          newParticipant[body.id].likes.push(user);
          dispatch((eventLikedAction(newParticipant)));
          dispatch((likeEventAction(body)));
        }

        console.log(body.error);
      });
    });
  };
};

export const registerEvent = (eventId) => {
  return (dispatch, getState) => {
    const user = getState().user;
    const accessToken = user.access_token;
    fetch(CONSTANTS.HOST + '/event/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      body: JSON.stringify({
        event_id: eventId,
      }),
    })
    .then((response) => {
      response.json()
      .then((body) => {
        if (body.error === undefined) {
          const newParticipant = {};
          newParticipant[body.id] = {
            participants: [],
          };
          newParticipant[body.id].participants.push(user);
          dispatch((eventRegisteredAction(newParticipant)));
          dispatch((registerEventAction(body)));
        }

        console.log(body.error);
      });
    });
  };
};

export const commentEvent = (eventId, comment) => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
    fetch(CONSTANTS.HOST + '/event/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
      body: JSON.stringify({
        event_id: eventId,
        description: comment,
      }),
    })
    .then((response) => {
      response.json()
      .then((body) => {
        if (body.error === undefined) {
          const newComment = {};
          newComment[body.event_id] = {
            comments: [],
          };
          newComment[body.event_id].comments.push(body);
          console.log(newComment);
          dispatch(eventCommentedAction(newComment));
        }

        console.log(body.error);
      });
    });
  };
};

export const getShortMonth = (month) => {
  switch (month) {
    case 0:
      return 'JAN';
    case 1:
      return 'FEB';
    case 2:
      return 'MAR';
    case 3:
      return 'APR';
    case 4:
      return 'MAY';
    case 5:
      return 'JUN';
    case 6:
      return 'JUL';
    case 7:
      return 'AUG';
    case 8:
      return 'SEP';
    case 9:
      return 'OCT';
    case 10:
      return 'NOV';
    case 11:
      return 'DEC';
    default:
      return 'JAN';
  }
};