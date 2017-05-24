export const GET_EVENTS = 'GET_EVENTS';
export const ADD_EVENTS = 'ADD_EVENTS';
export const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';
export const EVENT_REGISTERED = 'EVENT_REGISTERED';
export const EVENT_LIKED = 'EVENT_LIKED';
export const EVENT_COMMENTED = 'EVENT_COMMENTED';

export const getEventsAction = (events) => {
  return {
    type: GET_EVENTS,
    events,
  };
};

export const addEventsAction = (events) => {
  return {
    type: ADD_EVENTS,
    events,
  };
};

export const getEventDetailAction = (event) => {
  return {
    type: GET_EVENT_DETAIL,
    event,
  };
};

export const eventRegisteredAction = (user) => {
  return {
    type: EVENT_REGISTERED,
    user,
  };
};

export const eventLikedAction = (user) => {
  return {
    type: EVENT_LIKED,
    user,
  };
};

export const eventCommentedAction = (comment) => {
  return {
    type: EVENT_COMMENTED,
    comment,
  };
};
