import 'whatwg-fetch';
import { push } from 'react-router-redux';

import CONSTANTS from '../Constants';
import { userLogin } from '../actions/UserActions';

import Cookies from 'js-cookie'; 

export const login = (username, password) => {
  return (dispatch) => {
    fetch(CONSTANTS.HOST + '/user/login', {
      method: 'POST',
      credentials: 'include',
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
      .then((body) => {
        if ('error' in body) {
          console.log('HANDLE ERROR');
        } else {
          const csrfToken = body['X-CSRFToken'];
          Cookies.set('csrfToken', csrfToken);
          const user = body;
          delete user['X-CSRFToken'];
          console.log(user);
          dispatch(userLogin(user));
          dispatch(push('/'));
        }
      });
    });
  };
};

export const logout = () => {

};

