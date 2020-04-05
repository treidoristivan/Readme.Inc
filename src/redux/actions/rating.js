import { APP_URL, Get, Post, Patch, Delete } from '../../config/config';


export const getRatingByIdBook = (data, token) => {
    console.log(data, token)
    return {
        type: 'GET_MY_RATING_BY_ID_BOOK',
        payload: Post(APP_URL.concat('/rating'), token, data)
    }
}

export const postRatingByIdBook = (data, token) => {
    return {
        type: 'POST_MY_RATING_BY_ID_BOOK',
        payload: Post(APP_URL.concat('/rating/add'), token, data)
    }
}

export const updateRatingByIdBook = (data, token) => {
    return {
        type: 'UPDATE_MY_RATING_BY_ID_BOOK',
        payload: Patch(APP_URL.concat('/rating'), token, data)
    }
}

