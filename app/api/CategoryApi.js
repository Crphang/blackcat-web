import 'whatwg-fetch';

import Constants from '../Constants';
import { getCategoriesAction } from '../actions/CategoryActions';

const getCategories = () => {
  return (dispatch, getState) => {
    const accessToken = getState().user.access_token;
    fetch(Constants.HOST +
      '/category/get_categories', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': accessToken,
        },
      })
    .then((response) => {
      response.json()
      .then((body) => {
        dispatch(getCategoriesAction(body));
      });
    });
  };
};

export default getCategories;
