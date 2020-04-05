const initialState = {
    count: 0,
    data: [],
    itemDetail: {},
    isLoading: false,
    isError: false,
    isSuccess: true
}

const rating = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_MY_RATING_BY_ID_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'GET_MY_RATING_BY_ID_BOOK_REJECTED':
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'GET_MY_RATING_BY_ID_BOOK_FULFILLED':
            return {
                ...state,
                count: action.payload.data.data.count,
                data: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'POST_MY_RATING_BY_ID_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'POST_MY_RATING_BY_ID_BOOK_REJECTED':
            return {
                ...state,
                data: [],
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'POST_MY_RATING_BY_ID_BOOK_FULFILLED':
            return {
                ...state,
                data: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        case 'UPDATE_MY_RATING_BY_ID_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isError: false,
                isSuccess: false,
            }
        case 'UPDATE_MY_RATING_BY_ID_BOOK_REJECTED':
            return {
                ...state,
                data: [],
                itemDetail: {},
                isLoading: false,
                isError: true,
                isSuccess: false,
            }
        case 'UPDATE_MY_RATING_BY_ID_BOOK_FULFILLED':
            return {
                ...state,
                data: action.payload.data.data,
                isLoading: false,
                isError: false,
                isSuccess: action.payload.data.success,
            }

        default:
            return state
    }
}

export default rating