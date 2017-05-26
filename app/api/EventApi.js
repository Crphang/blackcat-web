import 'whatwg-fetch';
import moment from 'moment';
import Cookies from 'js-cookie';

import CONSTANTS from '../Constants';
import { getEventsAction, addEventsAction, getEventDetailAction, eventRegisteredAction, eventCommentedAction, eventLikedAction } from '../actions/EventActions';
import { likeEventAction, registerEventAction } from '../actions/UserActions';

const END_OF_TIME = 9999999999999;

export const getEvents = (page = 1, startDate = 0, endDate = END_OF_TIME, category = 'All') => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
    fetch(CONSTANTS.HOST +
      `/event/get_events?page_count=${page}&start_date=${startDate}&end_date=${endDate}&category=${category}`, {
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
        if (values.length > 1) {
          const lastEvent = values[values.length - 2];
          const lastPageCount = parseInt(lastEvent.page_count, 10);
          if (lastPageCount === 1) {
            dispatch(getEventsAction(body));
          } else {
            dispatch(addEventsAction((body)));
          }
        } else {
          dispatch(getEventsAction(body));
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
      credentials: 'include',
      headers: {
        'X-CSRFToken': Cookies.get('csrfToken'),
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
        'X-CSRFToken': Cookies.get('csrfToken'),
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
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Auth-Token': accessToken,
        'X-CSRFToken': Cookies.get('csrfToken'),
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

export const getStartDateEndDate = (durationString) => {
  const startOfToday = moment().hour(0).minutes(0).seconds(0).milliseconds(0);
  const startOfTomorrow = moment().date(moment().date() + 1).hour(0).minutes(0).seconds(0).milliseconds(0);
  const twoDaysLater = moment().date(moment().date() + 2).hour(0).minutes(0).seconds(0).milliseconds(0);
  const startOfThisWeek = moment().day(0).hour(0).minutes(0).seconds(0).milliseconds(0);
  const endOfThisWeek = moment().day(6).hour(0).minutes(0).seconds(0).milliseconds(0);
  const startOfMonth = moment().date(1).hour(0).minutes(0).seconds(0).milliseconds(0);
  const endOfMonth = moment().month(moment().month() + 1).date(1).hour(0).minutes(0).seconds(0).milliseconds(0);

  switch (durationString) {
    case 'ANYTIME':
      return [0, END_OF_TIME];
    case 'TODAY':
      return [startOfToday.valueOf(), startOfTomorrow.valueOf()];
    case 'TOMORROW':
      return [startOfTomorrow.valueOf(), twoDaysLater.valueOf()];
    case 'THIS WEEK':
      return [startOfThisWeek.valueOf(), endOfThisWeek.valueOf()];
    case 'THIS MONTH':
      return [startOfMonth.valueOf(), endOfMonth.valueOf()];
    case 'LATER':
      return [endOfMonth.valueOf(), END_OF_TIME];
    default:
      return [0, END_OF_TIME];
  }
};
