import _ from 'lodash';
import { GET_EVENTS, GET_EVENT_DETAIL, EVENT_LIKED, EVENT_REGISTERED, EVENT_COMMENTED } from '../actions/EventActions';

function customizer(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

const eventReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_EVENTS:
      return _.merge({}, state, action.events);
    case GET_EVENT_DETAIL:
      const eventId = action.event.id;
      const event = {};
      event[eventId] = action.event;
      return _.merge({}, state, event);
    case EVENT_LIKED:
      return _.mergeWith({}, state, action.user, customizer);
    case EVENT_REGISTERED:
      return _.mergeWith({}, state, action.user, customizer);
    case EVENT_COMMENTED:
      return _.mergeWith({}, state, action.comment, customizer);
    default:
      return state;
  }
};

export default eventReducer;
