import { USER_LOGIN } from '../actions/UserActions';

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return Object.assign({}, state, action.user);

    default:
      return state;
  }
};

export default userReducer;
