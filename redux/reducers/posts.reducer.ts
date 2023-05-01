import { GET_POST_LIST, SEARCH_POST } from "../actions/actionTypes";

const postInitState = {
    baseList: [],
    editList: []
}
const postReducer = (state = postInitState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_POST_LIST:
            return { ...state, baseList: payload, editList: payload }
        case SEARCH_POST:
            return state

        default:
            return state
    }
}
export default postReducer