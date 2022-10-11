import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toUpper, isEmpty, isNil } from 'ramda';
import cx from 'classnames';
import { useAction } from '../../store/hooks';
import * as actions from '../../store/actions';
import { selectStockCompanyProfile } from '../../store/selectors/stock';
import { selectSearchInputResults } from '../../store/selectors/stock';
import Search from '../common/search';
import Button from '../common/button';
import { round } from '../../utils/number';
import {
  UPWARD_ARROW_ICON,
  DOWNWARD_ARROW_ICON,
  TWITTER_ICON,
  SPACING,
} from '../common/icons';
import StockChart from '../common/chart';
import stockRecommendation from '../../utils/stock-recommendation';

interface IStockQuote {
  c: number;
  d: number;
  dp: number;
  h: number;
  l: number;
  o: number;
  pc: number;
}

interface IStockCompanyProfile {
  country?: string;
  currency?: string;
  exchange?: string;
  finnhubIndustry?: string;
  ipo?: string;
  logo?: string;
  marketCapitalization?: number;
  name?: string;
  phone?: string;
  shareOutstanding?: number;
  ticker?: string;
  weburl?: string;
  quote?: IStockQuote;
  socialCount?: number;
}

interface ISymbolItem {
  cik_str: number;
  ticker: string;
  title: string;
}

enum IStockRecommendationValue {
  BUY = 'Buy',
  HOLD = 'Hold',
  SELL = 'Sell',
}

const BEM_BLOCK = 'c-home';

function HomeContainer() {
  const getStockCompanyProfile = useAction(actions.stocks.getCompanyProfile);
  const resetStockCompanyProfile = useAction(actions.stocks.resetCompanyProfile);
  const onSymbolInputResults = useAction(actions.stocks.symbolInputResults);
  const resetSearchInputResults = useAction(actions.stocks.resetSearchInputResults);

  const stockCompanyProfile: IStockCompanyProfile = useSelector(selectStockCompanyProfile);
  const searchInputResults: ISymbolItem[] = useSelector(selectSearchInputResults);

  const [symbolInput, setSymbolInput] = useState('');
  const [isStockQuotePositive, setIsStockQuotePositive] = useState(false);
  const [stockDateSelected, setStockDateSelected] = useState('10D');
  const [recommendation, setRecommendation] = useState('10D');

  useEffect(() => {
    if (stockCompanyProfile && stockCompanyProfile.quote) {
      const stockQuote = stockCompanyProfile.quote;

      if (stockQuote.d > 0) {
        setIsStockQuotePositive(true);
      } else {
        setIsStockQuotePositive(false);
      }
    }
  }, [stockCompanyProfile]);

  useEffect(() => {
    if (stockCompanyProfile && !isNil(stockCompanyProfile.quote) && !isNil(stockCompanyProfile.socialCount)) {
      const stockRecommendationResult = stockRecommendation({
        price: stockCompanyProfile.quote.c,
        changeValue: stockCompanyProfile.quote.d,
        socialCount: stockCompanyProfile.socialCount,
      });

      setRecommendation(stockRecommendationResult);
    }
  }, [stockCompanyProfile]);

  useEffect(() => {
    if (isEmpty(symbolInput)) {
      resetSearchInputResults();
      resetStockCompanyProfile();
    }
  }, [symbolInput]);

  const stockQuoteClasses = cx({
    [`${BEM_BLOCK}__stock-quote-positive`]: isStockQuotePositive,
    [`${BEM_BLOCK}__stock-quote-negative`]: !isStockQuotePositive,
  });

  const stockRecommendationClasses = cx({
    [`${BEM_BLOCK}__stock-quote-positive`]: recommendation === IStockRecommendationValue.SELL,
  });

  const stockDateClasses = (value: string) => cx({
    [`${BEM_BLOCK}__stock-date--selected`]: value === stockDateSelected,
  }, [`${BEM_BLOCK}__stock-date`]);

  const onSearchChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const symbolToUpper = toUpper(e.target.value);
    setSymbolInput(symbolToUpper);
    onSymbolInputResults({ symbol: symbolToUpper });
  };

  const onSearchClick = (value: string) => {
    let searchValue;

    if (!isEmpty(value) && !isNil(value)) {
      searchValue = value;
    } else {
      searchValue = symbolInput;
    }

    if (!isEmpty(searchValue) && !isNil(searchValue)) {
      getStockCompanyProfile({ symbol: searchValue });
      resetSearchInputResults();
    }
  };

  const onSearchReset = () => {
    resetStockCompanyProfile();
    setSymbolInput('');
  };

  return (
    <div className={BEM_BLOCK} data-testid='home-component'>
      <div className={`${BEM_BLOCK}__search-stocks`}>
        <div className={`${BEM_BLOCK}__search-wrapper`}>
          <Search
            onChange={onSearchChanged}
            onReset={onSearchReset}
            placeholder='Search stocks'
            value={symbolInput}
          />
        </div>
        {!isEmpty(searchInputResults) && !isNil(searchInputResults) && (
          <div className={`${BEM_BLOCK}__search-input-results`}>
            {searchInputResults && searchInputResults.map((input: ISymbolItem, i: number) => (
              <Button
                key={i}
                className={`${BEM_BLOCK}__search-input-result`}
                onClick={() => onSearchClick(input.ticker)}
                dataTestid={`search-result`}
              >
                {input.ticker} - {input.title}
              </Button>
            ))}
          </div>
        )}
      </div>
      {isEmpty(stockCompanyProfile) && isEmpty(symbolInput) && (
        <div className={`${BEM_BLOCK}__no-input`}>
          <h3>Please enter a stock symbol to start</h3>
        </div>
      )}
      {!isEmpty(stockCompanyProfile) && !isNil(stockCompanyProfile) && (
        <div className={`${BEM_BLOCK}__stock-details`}>
          <div className={`${BEM_BLOCK}__detail ${BEM_BLOCK}__stock-name`}>
            <div className={`${BEM_BLOCK}__content`}>
              {stockCompanyProfile.ticker && (
                <h2>{stockCompanyProfile.ticker}</h2>
              )}
              {stockCompanyProfile.name && (
                <p>{stockCompanyProfile.name}</p>
              )}
              {stockCompanyProfile.exchange && (
                <p>{stockCompanyProfile.exchange}</p>
              )}
              {stockCompanyProfile.socialCount && (
                <p className={`${BEM_BLOCK}__social-mentions`}><span className={`${BEM_BLOCK}__twitter-icon`}>{TWITTER_ICON}</span>{SPACING}Twitter mentions (Today): {stockCompanyProfile.socialCount}</p>
              )}
            </div>
          </div>
          {stockCompanyProfile.logo && (
            <div className={`${BEM_BLOCK}__detail ${BEM_BLOCK}__stock-logo`}>
              <div className={`${BEM_BLOCK}__content`}>
                <img
                  src={stockCompanyProfile.logo}
                  alt={stockCompanyProfile.name}
                />
              </div>
            </div>
          )}
          {stockCompanyProfile.quote && (
            <div className={`${BEM_BLOCK}__detail ${BEM_BLOCK}__stock-price-details`}>
              <div className={`${BEM_BLOCK}__content`}>
                <h2>{round(stockCompanyProfile.quote.c)} {stockCompanyProfile.currency}</h2>
                <p className={stockQuoteClasses}>{round(stockCompanyProfile.quote.d)} ({round(stockCompanyProfile.quote.dp)}%)</p>
                <p className={stockQuoteClasses}>Today {isStockQuotePositive ? UPWARD_ARROW_ICON : DOWNWARD_ARROW_ICON}</p>
                {!isEmpty(recommendation) && !isNil(recommendation) && (
                  <p className={`${BEM_BLOCK}__recommendation`}>Recommendation:{SPACING}{SPACING}<span className={stockRecommendationClasses}>{recommendation}</span></p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
      {!isEmpty(stockCompanyProfile) && !isNil(stockCompanyProfile) && (
        <div className={`${BEM_BLOCK}__stock-dates`}>
          <Button className={stockDateClasses('1D')} onClick={() => setStockDateSelected('1D')}>1D</Button>
          <Button className={stockDateClasses('1D')} onClick={() => setStockDateSelected('5D')}>5D</Button>
          <Button className={stockDateClasses('1D')} onClick={() => setStockDateSelected('10D')}>10D</Button>
          <Button className={stockDateClasses('1D')} onClick={() => setStockDateSelected('1M')}>1M</Button>
          <Button className={stockDateClasses('1D')} onClick={() => setStockDateSelected('6M')}>6M</Button>
          <Button className={stockDateClasses('1D')} onClick={() => setStockDateSelected('YTD')}>YTD</Button>
        </div>
      )}
      {!isEmpty(stockCompanyProfile) && !isNil(stockCompanyProfile) && !isEmpty(stockCompanyProfile.quote) && !isNil(stockCompanyProfile.quote) && (
        <div className={`${BEM_BLOCK}__stock-chart`}>
          <StockChart quote={stockCompanyProfile.quote} name={stockCompanyProfile.name} />
        </div>
      )}
    </div>
  );
};

export default HomeContainer;
