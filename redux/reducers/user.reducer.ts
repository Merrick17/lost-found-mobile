import { GET_ALL_USERS, SEARCH_USER, SET_SELECTED_USER } from "../actions/actionTypes";

const usersInitState = {
  baseList: [],
  editList: [],
  selectedUser: null
};

const UserReducer = (state = usersInitState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case GET_ALL_USERS:
      return { ...state, baseList: payload, editList: payload };
    case SEARCH_USER:
      return {
        ...state,
        editList:
          payload == ""
            ? state.baseList
            : state.baseList.filter((elm: any) => elm.firstName.includes(payload)),
      };
    case SET_SELECTED_USER:
      return { ...state, selectedUser: payload }

    default:
      return state;
  }
};
export default UserReducer;
