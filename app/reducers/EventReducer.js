import _ from 'lodash';
import { GET_EVENTS, GET_EVENT_DETAIL } from '../actions/EventActions';

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return _.merge({}, state, action.events);
    case GET_EVENT_DETAIL:
      const eventId = action.event.id;
      const event = {};
      event[eventId] = action.event;
      return _.merge({}, state, event);

    default:
      return state;
  }
};

export default eventReducer;
