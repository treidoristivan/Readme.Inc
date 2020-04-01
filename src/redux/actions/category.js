import {APP_URL, Get} from '../../config/config';

export const getCategories = () => {
    return {
        type: 'GET_CATEGORIES',
        payload: Get(APP_URL.concat('/category'))
    }
}