import * as R from 'ramda';

export const selectStockCompanyProfile = R.pathOr({}, [
  'stock',
  'companyProfile',
]);

export const selectSearchInputResults = R.pathOr([], [
  'stock',
  'searchInputResults',
]);
