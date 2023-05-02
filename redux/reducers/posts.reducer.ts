import { GET_POST_LIST, SEARCH_POST, SET_SELECTED_POST } from "../actions/actionTypes";

const postInitState = {
    baseList: [],
    editList: [],
    selectedPost: null
}
const postReducer = (state = postInitState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST_LIST:
            return { ...state, baseList: payload, editList: payload }
        case SEARCH_POST:
            return state
        case SET_SELECTED_POST:
            return { ...state, selectedPost: payload }

        default:
            return state
    }
}
export default postReducer