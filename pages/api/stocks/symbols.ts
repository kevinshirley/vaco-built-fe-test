import type { NextApiRequest, NextApiResponse } from 'next';
import { symbols } from '../../../src/store/constants/stock-symbols';

interface ISymbolItem {
  cik_str: number;
  ticker: string;
  title: string;
}

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<ISymbolItem[]>
) {
  try {
    const symbolItems: ISymbolItem[] = Object.values(symbols[0]).map((item) => item);
    res.status(200).json(symbolItems);
  } catch(error) {
    console.log({ error });
    res.status(400).json([]);
  }
}
