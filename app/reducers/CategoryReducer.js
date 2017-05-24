import { GET_CATEGORIES } from '../actions/CategoryActions';

const categoryReducer = (state = [], action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return Object.assign([], state, action.categories);
    default:
      return state;
  }
};

export default categoryReducer;
