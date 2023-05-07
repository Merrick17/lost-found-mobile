import { GET_ITEM_LIST, SEARCH_ITEM, SET_SELECTED_ITEM } from "../actions/actionTypes";

const itemInitState = {
    baseList: [],
    editList: [],
    selectedPost: null
}
const itemReducer = (state = itemInitState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_ITEM_LIST:
            return { ...state, baseList: payload, editList: payload }
        case SEARCH_ITEM:
            return state
        case SET_SELECTED_ITEM:
            return { ...state, selectedPost: payload }

        default:
            return state
    }
}
export default itemReducer