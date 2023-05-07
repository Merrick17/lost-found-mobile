import { getApi, postApi, updateApi } from "../../utils/apiMethods";
import { GET_ALL_USERS, SEARCH_USER, SET_SELECTED_USER } from "./actionTypes";
import { updateUser } from "./auth.actions";

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
const createUserApi = (body: any, token: string, toast: any) => async (dispatch: any) => {
  let result = await postApi("users/create", body);
  if (result) {
    dispatch(getAllUsersApi(token));
  } else {
    toast.show("Une erreur est servenu", {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      offset: 30,
      animationType: "zoom-in",
    });
  }
};
const updateUserApi = (body: any, token: string, toast: any) => async (dispatch: any) => {
  const config = {
    headers: {
      "access-token": token
    }
  };
  let result = await updateApi("users/update/profile", body, config);

  if (result) {
    console.log("RESULT", result)
    updateUser(result["updatedUser"])
    dispatch(getAllUsersApi(token));
  } else {
    toast.show("Une erreur est servenu", {
      type: "danger",
      placement: "bottom",
      duration: 4000,
      offset: 30,
      animationType: "zoom-in",
    });
  }
};

export { getAllUsersApi, createUserApi, updateUserApi };
