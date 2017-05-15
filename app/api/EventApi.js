import 'whatwg-fetch';

import CONSTANTS from '../Constants';
import { getEventsAction } from '../actions/EventActions';

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

export const getEvent = (id) => {

};
