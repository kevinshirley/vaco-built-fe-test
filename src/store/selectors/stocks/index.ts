import * as R from 'ramda';

export const selectStockSymbols: any = R.pathOr([], [
  'stocks',
]);
