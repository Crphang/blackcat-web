import 'whatwg-fetch';
import { push } from 'react-router-redux';

import CONSTANTS from '../Constants';
import { userLogin } from '../actions/UserActions';

export const login = (username, password) => {
  return (dispatch) => {
    fetch(CONSTANTS.HOST + '/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then((response) => {
      response.json()
      .then((user) => {
        if ('error' in user) {
          console.log('HANDLE ERROR');
        } else {
          dispatch(userLogin(user));
          dispatch(push('/'));
        }
      });
    });
  };
};

export const logout = () => {

};

