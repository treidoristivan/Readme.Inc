const initialState = {
    count: 0,
    data: [],
    itemDetail: {},
    isLoading: false,
    isError: false,
    isSuccess: true
}

const book = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_POPULAR_BOOKS_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'GET_POPULAR_BOOKS_REJECTED':
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'GET_POPULAR_BOOKS_FULFILLED':
            return {
                ...state,
                count: action.payload.data.data.count,
                data: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'GET_BOOKS_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'GET_BOOKS_REJECTED':
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'GET_BOOKS_FULFILLED':
            return {
                ...state,
                count: action.payload.data.data.count,
                data: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'GET_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'GET_BOOK_REJECTED':
            return {
                ...state,
                data: [],
                itemDetail: {},
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'GET_BOOK_FULFILLED':
            return {
                ...state,
                itemDetail: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'GET_BOOKS_BY_GENRE_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'GET_BOOKS_BY_GENRE_REJECTED':
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'GET_BOOKS_BY_GENRE_FULFILLED':
            return {
                ...state,
                itemDetail: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'GET_BOOKS_BY_AUTHOR_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'GET_BOOKS_BY_AUTHOR_REJECTED':
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'GET_BOOKS_BY_AUTHOR_FULFILLED':
            return {
                ...state,
                itemDetail: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'POST_REVIEW_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'POST_REVIEW_REJECTED':
            return {
                ...state,
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'POST_REVIEW_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        default:
            return state
    }
}

export default book