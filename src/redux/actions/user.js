import { APP_URL, Get, Post, Patch, Delete } from '../../config/config';



export const getMyFavoriteBook = (token) => {
    return {
        type: 'GET_MY_FAVORITE_BOOK',
        payload: Get(APP_URL.concat('/users/my-favorite-book'), token)
    }
}

export const postMyFavoriteBook = (data, token) => {
    return {
        type: 'POST_MY_FAVORITE_BOOK',
        payload: Post(APP_URL.concat('/users/my-favorite-book'), token, data)
    }
}

export const deleteMyFavoriteBook = (data, token) => {
    return {
        type: 'DELETE_MY_FAVORITE_BOOK',
        payload: Delete(APP_URL.concat('/users/my-favorite-book'), token, data)
    }
}



