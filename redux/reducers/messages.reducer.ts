import { GET_CONVERSATION_LIST, SET_SELECTED_CONVERSATION } from "../actions/actionTypes";

const messagesInitState = {
    conversationList: [],
    selectedConversation: null
}

const messagesReducer = (state = messagesInitState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSATION_LIST:
            return { ...state, conversationList: payload }
        case SET_SELECTED_CONVERSATION:
            return { ...state, selectedConversation: payload }

        default:
            return state
    }
}
export default messagesReducer