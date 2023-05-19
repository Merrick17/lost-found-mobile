import { deleteApi, getApi, postApi, updateApi } from '../../utils/apiMethods';
import { GET_POST_LIST } from './actionTypes';

const createPostApi = (token: string, body: any) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token,
                'Content-Type': 'multipart/form-data',
            },
        };
        let result = await postApi('annonce/create', body, config);
        dispatch(getAllPostsApi(token));
    } catch (error) {
        console.log('Error', error);
    }
};
const updatePostApi = (token: string, id: string, body: any) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token,
            },
        };
        let result = await updateApi(`annonce/${id}`, body, config);
        dispatch(getAllPostsApi(token));
    } catch (error) {
        console.log('Error', error);
    }
};
const getAllPostsApi = (token: string) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token,
            },
        };
        let response = await getApi('annonce', config);
        if (response && response.success) {
            dispatch(getAllPosts(response.result));
        }
    } catch (error) { }
};
const getAllPosts = (data: any) => {
    return {
        type: GET_POST_LIST,
        payload: data,
    };
};
export const markPostAsFound =
    (postId: string, token: string) => async (dispatch: any) => {
        try {
            const config = {
                headers: {
                    'access-token': token,
                },
            };
            let result = await updateApi(`annonce/found/${postId}`, null, config);
            console.log('Result FOUND', result);
            if (result) {
                dispatch(getAllPostsApi(token));
            }
        } catch (error) { }
    };
const getAllPostsByUser = (token: string) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token,
            },
        };
        let response = await getApi('annonce/created', config);
        if (response && response.success) {
            dispatch(getAllPosts(response.result));
        }
    } catch (error) { }
};
const deletePostApi =
    (token: string, postId: string) => async (dispatch: any) => {
        try {
            const config = {
                headers: {
                    'access-token': token,
                },
            };
            let response = await deleteApi(`annonce/${postId}`, config);
            if (response) {
                dispatch(getAllPostsByUser(token));
            }
        } catch (error) { }
    };
export { createPostApi, getAllPostsApi, getAllPostsByUser, deletePostApi, updatePostApi };
