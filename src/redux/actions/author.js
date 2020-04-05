import {APP_URL, Get} from '../../config/config';

export const getAuthor = (pageNumber) => {
    return {
        type: 'GET_AUTHOR',
        payload: Get(APP_URL.concat('/authors?page=' + pageNumber))
    }
}