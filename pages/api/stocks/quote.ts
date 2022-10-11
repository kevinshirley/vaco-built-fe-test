import type { NextApiRequest, NextApiResponse } from 'next'
const finnhub = require('finnhub');

type Data = {
  data: any
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data|{}>
) {
  try {
    const api_key = finnhub.ApiClient.instance.authentications['api_key'];
    api_key.apiKey = 'cc5mnfiad3i9rj8sv1og';
    const finnhubClient = new finnhub.DefaultApi();

    const parsed = JSON.parse(req.body);
    const { symbol } = parsed;

    finnhubClient.quote(symbol, (error: any, data: any, response: any) => {
      res.status(200).json(data);
    });
  } catch(error) {
    console.log({ error });
    res.status(400).json({});
  }
}
