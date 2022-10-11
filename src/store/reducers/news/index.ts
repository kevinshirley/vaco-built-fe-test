import { STOCKS } from '../../actions';

const StockMarketNewsReducer = (state = [], { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case STOCKS.SET_MARKET_NEWS:
      return payload;
    default:
      return state;
  }
}

export default StockMarketNewsReducer;
