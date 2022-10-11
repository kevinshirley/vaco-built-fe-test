import * as R from 'ramda';

export const selectMarketNews: any = R.pathOr([], [
  'marketNews',
]);
