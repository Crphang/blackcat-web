import 'whatwg-fetch';

import CONSTANTS from '../Constants';
import { getEventsAction, getEventDetailAction } from '../actions/EventActions';
import { likeEventAction, registerEventAction } from '../actions/UserActions';

export const getEvents = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
    fetch(CONSTANTS.HOST + '/event/get_events', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
      },
    })
    .then((response) => {
      response.json()
      .then((body) => {
        dispatch(getEventsAction(body));
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
    const accessToken = getState().user.access_token;
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
          dispatch((likeEventAction(body)));
        }

        console.log(body.error);
      });
    });
  };
};

export const registerEvent = (eventId) => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
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
          console.log(body);
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
        console.log(body);
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