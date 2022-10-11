import { round } from './number';

interface IStockRecommendation {
  price: number;
  changeValue: number;
  socialCount: number;
  name?: string;
}

enum IStockRecommendationValue {
  BUY = 'Buy',
  HOLD = 'Hold',
  SELL = 'Sell',
}

const stockRecommendation = ({
  price,
  changeValue,
  socialCount,
}: IStockRecommendation): string => {
  try {
    const stockRecommendationCount = round((round(price % changeValue)) * socialCount);

    if (stockRecommendationCount >= 20) {
      return IStockRecommendationValue.BUY;
    } else if (stockRecommendationCount < 20 && stockRecommendationCount > 1) {
      return IStockRecommendationValue.HOLD;
    } else {
      return IStockRecommendationValue.SELL;
    }
  } catch (e) {
    console.log(`try/catch error in stockRecommendation: `, e);
    return '';
  }
};

export default stockRecommendation;
