import { postApi } from "../../utils/apiMethods";
import { storeData } from "../../utils/localstorage";
import { LOGIN_SUCCESS } from "./actionTypes";

const handleAuthApi = (body: any, navigation: any) => async (dispatch: any) => {
    try {
        let result = await postApi("users/login", body);
        console.log("Result",result)
        if (result.success) {
            const { token, userId } = result;
            await storeData(token, 'token')
            dispatch(handleAuthUser(token, userId));
            navigation.navigate('Main')
        }else {

        }
    } catch (error) { }
};

const handleAuthUser = (token: string, userId: string) => {
    return {
        type: LOGIN_SUCCESS,
        payload: {
            token: token,
            user: userId
        }
    };
};
export { handleAuthApi };
