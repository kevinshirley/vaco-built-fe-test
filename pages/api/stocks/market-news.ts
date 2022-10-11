import type { NextApiRequest, NextApiResponse } from 'next'
const finnhub = require('finnhub');

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<[]>
) {
  console.log('stock market news api');
  try {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = 'cc5mnfiad3i9rj8sv1og';
    const finnhubClient = new finnhub.DefaultApi();

    finnhubClient.marketNews('general', {}, (error: any, data: any, response: any) => {
      res.status(200).json(data);
    });
  } catch(error) {
    console.log({ error });
    res.status(400).json([]);
  }
}
