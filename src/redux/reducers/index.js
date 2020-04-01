import { combineReducers } from 'redux';

import book from './Book';
import category from './Category';
import author from './Author';
import auth from './Auth';

const appReducer = combineReducers({
    book,
    category,
    author,
    auth,
})

export default appReducer
