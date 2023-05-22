import {getApi, postApi} from '../../utils/apiMethods';
import {GET_CONVERSATION_LIST, SET_SELECTED_CONVERSATION} from './actionTypes';

const createConversationApi =
  (token: string, body: any, userId: string) => async (dispatch: any) => {
    console.log("Body",body); 
    try {
      const config = {
        headers: {
          'access-token': token,
        },
      };
      let result = await postApi('conversations', body, config);
      console.log("Result",result); 
      dispatch(setSelectedConversation(result));
      dispatch(getAllConversationsApi(token, userId));
    } catch (error) {
      console.log('Error', error);
    }
  };
const updateCoversationApi =
  (token: string, conversationId: string) => async (dispatch: any) => {
    const config = {
      headers: {
        'access-token': token,
      },
    };

    let result = await getApi(`conversations/conv/${conversationId}`, config);

    dispatch(setSelectedConversation(result));
  };
const createMessageApi =
  (token: string, conversationId: string, body: any) =>
  async (dispatch: any) => {
    try {
      const config = {
        headers: {
          'access-token': token,
        },
      };
      const result = await postApi(
        `conversations/${conversationId}/messages`,
        body,
        config,
      );
      if (result) {
        //dispatch(getAllConversationsApi(token, body.sender));
      }
    } catch (error) {}
  };

const getAllConversationsApi =
  (token: string, userId: string) => async (dispatch: any) => {
    try {
      const config = {
        headers: {
          'access-token': token,
        },
      };
      let response = await getApi(`conversations/${userId}`, config);

      if (response) {
        dispatch(getAllConversations(response));
      }
    } catch (error) {}
  };
const getAllConversations = (data: any) => {
  return {
    type: GET_CONVERSATION_LIST,
    payload: data,
  };
};
const setSelectedConversation = (data: any) => {
  return {
    type: SET_SELECTED_CONVERSATION,
    payload: data,
  };
};
export {
  createConversationApi,
  getAllConversationsApi,
  createMessageApi,
  updateCoversationApi,
  setSelectedConversation,
};
