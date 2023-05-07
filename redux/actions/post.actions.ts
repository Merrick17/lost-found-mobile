import { getApi, postApi } from '../../utils/apiMethods';
import { GET_POST_LIST } from './actionTypes';

const createPostApi = (token: string, body: any) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token,
                'Content-Type': 'multipart/form-data'
            },
        };
        let result = await postApi('annonce/create', body, config);
        dispatch(getAllPostsApi(token))
      
    } catch (error) {
        console.log("Error", error)
    }
};
const getAllPostsApi = (token: string) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token
            },
        };
        let response = await getApi('annonce', config);
        if (response && response.success) {
            dispatch(getAllPosts(response.result))
        }
    } catch (error) {

    }
}
const getAllPosts = (data: any) => {
    return {
        type: GET_POST_LIST,
        payload: data
    }
}
export { createPostApi, getAllPostsApi };
