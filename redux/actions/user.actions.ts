import { getApi, postApi, updateApi } from "../../utils/apiMethods";
import { GET_ALL_USERS, SEARCH_USER, SET_SELECTED_USER } from "./actionTypes";

const getAllUsers = (data: any) => {
  return {
    type: GET_ALL_USERS,
    payload: data
  };
};

const getAllUsersApi = (token: string) => async (dispatch: any) => {
  const config = {
    headers: {
      "access-token": token
    }
  };
  const result = await getApi("users", config);
  //console.log("Result", result);
  if (result && result.success) {
    dispatch(getAllUsers(result.result));
  }
};
const createUserApi = (body: any, token: string) => async (dispatch: any) => {
  let result = await postApi("users/create", body);
  if (result) {
    dispatch(getAllUsersApi(token));
  }
};
const updateUserApi = (userId: string, body: any, token: string) => async (dispatch: any) => {
  const config = {
    headers: {
      "access-token": token
    }
  };
  let result = await updateApi("users/admin/update/" + userId, body, config);
  if (result) {
    dispatch(getAllUsersApi(token));
  }
};

export { getAllUsersApi, createUserApi, updateUserApi };
