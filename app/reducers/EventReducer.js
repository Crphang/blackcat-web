import { GET_EVENTS, GET_EVENT_DETAIL } from '../actions/EventActions';

const eventReducer = (state = [], action) => {
  switch (action.type) {
    case GET_EVENTS:
      return Object.assign([], state, action.events);

    case GET_EVENT_DETAIL:
      return state;

    default:
      return state;
  }
};

export default eventReducer;
