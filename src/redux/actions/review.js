import { APP_URL, Get, Post, Patch, Delete } from '../../config/config';


export const getReviewByIdBook = (idBook, token) => {
    return {
        type: 'GET_REVIEWS_BY_ID_BOOK',
        payload: Get(APP_URL.concat('/review'), token, idBook)
    }
}

export const postReviewByIdBook = (data, token) => {
    return {
        type: 'POST_REVIEWS_BY_ID_BOOK',
        payload: Post(APP_URL.concat('/review'), token, data)
    }
}

export const updateReviewByIdBook = (data, token) => {
    return {
        type: 'UPDATE_REVIEWS_BY_ID_BOOK',
        payload: Patch(APP_URL.concat('/review'), token, data)
    }
}

export const deleteReviewByIdBook = (idBook, token) => {
    return {
        type: 'DELETE_REVIEWS_BY_ID_BOOK',
        payload: Patch(APP_URL.concat('/review'), token, idBook)
    }
}


// export const getBook = (id) => {
//     console.log('getBook')
//     return {
//         type: 'GET_BOOK',
//         payload: Get(APP_URL.concat('/books/book/' + id))
//     }
// }

// export const getBooksByGenre = (genreId) => {
//     console.log('getBooksByGenre')
//     return {
//         type: 'GET_BOOKS_BY_GENRE',
//         payload: Get(APP_URL.concat('/books/genre/' + genreId))
//     }
// }

// export const getBooksByAuthor = (authorId) => {
//     return {
//         type: 'GET_BOOKS_BY_AUTHOR',
//         payload: Get(APP_URL.concat('/books/author/' + authorId))
//     }
// }

// export const getLastOrdered = (jwt, ids) => {
//     return {
//         type: 'GET_LAST_ORDERED',
//         payload: Post(APP_URL.concat('/order/item'), jwt, {ids})
//     }
// }

// export const postReview = (jwt, data) => {
//     return {
//         type: 'POST_REVIEW',
//         payload: Post(APP_URL.concat('/review'), jwt, data)
//     }
// }