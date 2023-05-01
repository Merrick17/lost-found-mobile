import {
  GET_CATEGORY_LIST,
  SET_SELECTED_CATEGORY
} from "../actions/actionTypes";

const categoryInitState = {
  editList: [],
  baseList: [],
  selectedCategory: null
};
const CategoryReducer = (state = categoryInitState, action:any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_CATEGORY_LIST:
      return { ...state, editList: payload, baseList: payload };

    case SET_SELECTED_CATEGORY:
      return { ...state, selectedCategory: payload };

    default:
      return state;
  }
};

export default CategoryReducer;
