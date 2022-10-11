import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty, isNil } from 'ramda';
import moment from 'moment';
import { selectMarketNews } from '../../store/selectors/news';

interface INews {
  id: number;
  title: string;
  text: string;
  timestamp: string;
}

const BEM_BLOCK = 'c-market-news';

function MarketNewsContainer() {
  const marketNews: INews[] = useSelector(selectMarketNews);
  console.log({ marketNews });

  return (
    <>
      {!isEmpty(marketNews) && !isNil(marketNews) && (
        <div className={BEM_BLOCK}>
          <div className={`${BEM_BLOCK}__list`}>
            {marketNews.map((news: INews) => {
              const dateObject = new Date(news.timestamp)
              const published = moment(dateObject).format('LLL');

              return (
                <a
                  className={`${BEM_BLOCK}__news-anchor`}
                  // href={news.url}
                  key={news.id}
                  target='_blank'
                  rel="noreferrer"
                >
                  <div className={`${BEM_BLOCK}__news`}>
                    <h2>{news.title}</h2>
                    <h5>Published: {published}</h5>
                    <p dangerouslySetInnerHTML={{ __html: news.text }}></p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default MarketNewsContainer;
