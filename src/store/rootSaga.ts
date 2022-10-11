import { all } from 'redux-saga/effects';
import 'isomorphic-unfetch';
import { 
  watchGetCompanyProfile,
  watchGetStockSymbols,
  watchSymbolInputResults,
  watchStockMarketNews,
} from '../store/sagas/stocks';

function* rootSaga() {
  yield all([
    watchGetCompanyProfile(),
    watchGetStockSymbols(),
    watchSymbolInputResults(),
    watchStockMarketNews(),
  ]);
}

export default rootSaga;
