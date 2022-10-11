import { STOCKS } from '../../actions';

const initialState = {
  companyProfile: {},
  searchInputResults: [],
};

const StockReducer = (state = initialState, { type, payload }: { type: string; payload: any }) => {
  switch (type) {
    case STOCKS.SET_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: {
          ...payload,
        },
      };
    case STOCKS.RESET_COMPANY_PROFILE:
      return {
        ...state,
        companyProfile: {},
        searchInputResults: [],
      };
    case STOCKS.SET_SEARCH_INPUT_RESULTS:
      return {
        ...state,
        searchInputResults: payload,
      };
    case STOCKS.RESET_SEARCH_INPUT_RESULTS:
      return {
        ...state,
        searchInputResults: [],
      };
    default:
      return state;
  }
}

export default StockReducer;
