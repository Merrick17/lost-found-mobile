import {
  GET_POST_LIST,
  GET_POST_LIST_FOUND,
  RESET_SEARCH,
  SEARCH_POST,
  SET_SELECTED_INDEX,
  SET_SELECTED_POST,
} from '../actions/actionTypes';

const postInitState = {
  baseList: [],
  editList: [],
  selectedPost: null,
  itemsIndex: 1,
  searched: false
};
const postReducer = (state = postInitState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_POST_LIST:
      ///console.log("I'm here in reducer", payload);
      return { ...state, baseList: payload, editList: payload };
    case GET_POST_LIST_FOUND:
      console.log("I'm here in reducer", payload);
      return { ...state, baseList: payload, editList: payload, searched: true };
    case RESET_SEARCH:
      return { ...state, searched: false }
    case SET_SELECTED_POST:
      return { ...state, selectedPost: payload };

    case SET_SELECTED_INDEX:
      return { ...state, itemsIndex: payload };
    case SEARCH_POST:
      console.log('PAYLOAD', payload);
      return {
        ...state,
        editList:
          payload == ''
            ? state.baseList
            : state.baseList.filter((elm: any) => {
              const regex = new RegExp(payload, 'i');
              return regex.test(elm.title) || regex.test(elm.description);
            }),
      };

    default:
      return state;
  }
};
export default postReducer;
