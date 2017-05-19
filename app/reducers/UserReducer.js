import _ from 'lodash';
import { USER_LOGIN, LIKE_EVENT, REGISTER_EVENT } from '../actions/UserActions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, action.user);
    case LIKE_EVENT:
      const addedLikedEvents = {
        liked_events: {

        },
      };
      addedLikedEvents.liked_events[action.event.id] = action.event;
      return _.merge(state, addedLikedEvents);
    case REGISTER_EVENT:
      const addedParticipatingEvents = {
        participating_events: {

        },
      };
      addedParticipatingEvents.participating_events[action.event.id] = action.event;
      return _.merge(state, addedParticipatingEvents);
    default:
      return state;
  }
};

export default userReducer;
