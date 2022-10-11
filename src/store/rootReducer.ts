import { combineReducers } from 'redux';

import stock from './reducers/stock';
import stocks from './reducers/stocks';
import marketNews from './reducers/news';

export default combineReducers({
  stock,
  stocks,
  marketNews,
});
