import { combineReducers } from 'redux';

import book from './Book';
import category from './Category';
import author from './Author';
import auth from './Auth';
import review from './Review';
import rating from './Rating';

const appReducer = combineReducers({
    book,
    category,
    author,
    auth,
    review,
    rating,
})

export default appReducer
