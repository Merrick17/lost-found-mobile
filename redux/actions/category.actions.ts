import { deleteApi, getApi } from '../../utils/apiMethods';
import { GET_CATEGORY_LIST, SET_SELECTED_CATEGORY } from './actionTypes';

const getCategoryList = (token: string) => async (disptach: any) => {
  try {
    const config = {
      headers: {
        'access-token': token,
      },
    };
    const response = await getApi('category', config);
    console.log("Result", response);
    if (response) {
      // console.log("Result", response);
      disptach({
        type: GET_CATEGORY_LIST,
        payload: response.result,
      });
    }
  } catch (error) {}
};
const deleteCategoryApi =
  (id: string, token: string) => async (disptach: any) => {
    try {
      const config = {
        headers: {
          'access-token': token,
        },
      };
      const response = await deleteApi(`category/${id}`, config);
      if (response.success) {
        disptach(getCategoryList(token));
      }
    } catch (error) {}
  };
const setSelectedCateg = (data: any) => {
  return {
    type: SET_SELECTED_CATEGORY,
    payload: data,
  };
};

export { getCategoryList, deleteCategoryApi, setSelectedCateg };

