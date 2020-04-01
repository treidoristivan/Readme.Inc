import {APP_URL, Get} from '../../config/config';

export const getAuthor = () => {
    return {
        type: 'GET_AUTHOR',
        payload: Get(APP_URL.concat('/author'))
    }
}