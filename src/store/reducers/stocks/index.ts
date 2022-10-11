import { STOCKS } from '../../actions';

const StocksReducer = (state = [], { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case STOCKS.SET_STOCK_SYMBOLS:
      return payload;
    default:
      return state;
  }
}

export default StocksReducer;
