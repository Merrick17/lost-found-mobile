import { deleteApi, getApi, postApi } from '../../utils/apiMethods';
import { GET_ITEM_LIST } from './actionTypes';

const createItemApi = (token: string, body: any) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token,
                'Content-Type': 'multipart/form-data'
            },
        };
        let result = await postApi('items/create', body, config);
        dispatch(getAllItemsApi(token))

    } catch (error) {
        console.log("Error", error)
    }
};
const getAllItemsApi = (token: string) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token
            },
        };
        let response = await getApi('items', config);

        if (response) {
            dispatch(getAllItems(response))
        }
    } catch (error) {

    }
}
const getAllItems = (data: any) => {
    return {
        type: GET_ITEM_LIST,
        payload: data
    }
}
const deleteItemApi = (id: string, token: string) => async (dispatch: any) => {
    try {
        const config = {
            headers: {
                'access-token': token
            },
        };
        let response = await deleteApi(`items/${id}`, config);

        if (response) {
            dispatch(getAllItemsApi(response))
        }
    } catch (error) {

    }
}
export { createItemApi, getAllItemsApi, deleteItemApi };

