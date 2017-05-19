export const GET_EVENTS = 'GET_EVENTS';
export const GET_EVENT_DETAIL = 'GET_EVENT_DETAIL';


export const getEventsAction = (events) => {
  return {
    type: GET_EVENTS,
    events,
  };
};

export const getEventDetailAction = (event) => {
  return {
    type: GET_EVENT_DETAIL,
    event,
  };
};
