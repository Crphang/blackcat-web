export const USER_LOGIN = 'USER_LOGIN';
export const LIKE_EVENT = 'LIKE_EVENT';
export const REGISTER_EVENT = 'REGISTER_EVENT';

export const userLogin = (user) => {
  return {
    type: USER_LOGIN,
    user,
  };
};

export const likeEventAction = (event) => {
  return {
    type: LIKE_EVENT,
    event,
  };
};

export const registerEventAction = (event) => {
  return {
    type: REGISTER_EVENT,
    event,
  };
};
