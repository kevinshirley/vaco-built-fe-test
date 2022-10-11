import type { NextApiRequest, NextApiResponse } from 'next'
import { TwitterApi } from 'twitter-api-v2'
import moment from 'moment'
import { sum } from 'ramda'

// const TWITTER_API_KEY = 'E6WAPEBCrUdTb7n2hNxtT28gM'
// const TWITTER_API_KEY_SECRET = 'XGlyIJrhcXU88TsSPdRI4nco9DlmRsgFiJ8fvQeLeQn5CZa7jU'
// const TWITTER_ACCESS_TOKEN = '1105415397157859328-K6SwUczvURH7begRoi55fpm2lCArf1'
// const TWITTER_ACCESS_TOKEN_SECRET = 'DXBsWmtVqDCYIH45cHp1e04NLGRAQgS4aSBAyV3eqB4Sz'
const TWITTER_BEARER_TOKEN = 'AAAAAAAAAAAAAAAAAAAAAPv5gQEAAAAAui2EB9eQyNN34e9z%2Bgbfn8g61hI%3DQuNtizKEbWXGeiiCXMOknbte3ibncnMVROfPBPmiNUq2LegUJd'

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<number>
) => {
  try {
    const parsed = JSON.parse(req.body);
    const { symbol } = parsed;

    const twitterClient = new TwitterApi(TWITTER_BEARER_TOKEN);

    const socialCount = await twitterClient.v2.tweetCountRecent(symbol);

    const todayStockSocialCount = socialCount.data.filter((tweet: any) => moment(tweet).isSame(tweet.end, 'day')).map((tweet: any) => tweet.tweet_count);

    res.status(200).json(sum(todayStockSocialCount));
  } catch(error) {
    console.log({ error });
    res.status(400).json(0);
  }
}

export default handler;
