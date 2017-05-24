export const GET_CATEGORIES = 'GET_CATEGORIES';

export const getCategoriesAction = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories,
  };
};
