import { APP_URL, Get, Post } from '../../config/config';

export const getPopularBooks = () => {
    return {
        type: 'GET_POPULAR_BOOKS',
        payload: Get(APP_URL.concat('/books/popular'), null)
    }
}

export const getBooks = (pageNumber, params) => {
    return {
        type: 'GET_BOOKS',
        payload: Get(APP_URL.concat(`/books/all?page=${pageNumber}` + params))
    }
}

export const getBook = (id) => {
    console.log('getBook')
    return {
        type: 'GET_BOOK',
        payload: Get(APP_URL.concat('/books/book/' + id))
    }
}

export const getBooksByGenre = (genreId) => {
    console.log('getBooksByGenre')
    return {
        type: 'GET_BOOKS_BY_GENRE',
        payload: Get(APP_URL.concat('/books/genre/' + genreId))
    }
}

export const getBooksByAuthor = (authorId) => {
    return {
        type: 'GET_BOOKS_BY_AUTHOR',
        payload: Get(APP_URL.concat('/books/author/' + authorId))
    }
}

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