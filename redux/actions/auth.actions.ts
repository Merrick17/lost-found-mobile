import { postApi } from '../../utils/apiMethods';
import { storeData } from '../../utils/localstorage';
import { LOGIN_SUCCESS, UPDATE_USER_PROFILE } from './actionTypes';

const handleAuthApi =
  (body: any, navigation: any, toast: any) => async (dispatch: any) => {
    try {
      let result = await postApi('users/login', body);
      console.log("Result",result)
      if (result.success) {
        const { token, userId, user } = result;
        if (user.role == "USER") {
          await storeData(token, 'token');
          dispatch(handleAuthUser(token, userId, user));
          navigation.navigate('Main');
        } else {
          toast.show('Adresse ou email inconnu', {
            type: 'danger',
            placement: 'bottom',
            duration: 4000,
            offset: 30,
            animationType: 'zoom-in',
          });
        }

      } else {
        toast.show('Adresse ou email inconnu', {
          type: 'danger',
          placement: 'bottom',
          duration: 4000,
          offset: 30,
          animationType: 'zoom-in',
        });
      }
    } catch (error) { 
      console.log("ERROR",error)
    }
  };

const handleAuthUser = (token: string, userId: string, user: any) => {
  return {
    type: LOGIN_SUCCESS,
    payload: {
      token: token,
      user: user,
    },
  };
};
const updateUser = (data: any) => {
  return {
    type: UPDATE_USER_PROFILE,
    payload: data,
  };
};
export { handleAuthApi, updateUser };
