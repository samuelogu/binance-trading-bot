import { calculateRSI, calculateMovingAverage } from './indicators';

export async function checkBuySellSignal(candles: any[], rsiThreshold: number = 30): Promise<string | null> {
    const prices = candles.map((c) => parseFloat(c.close));
    const rsi = calculateRSI(prices);
    const shortMA = calculateMovingAverage(prices, 50);
    const longMA = calculateMovingAverage(prices, 200);

    if (shortMA > longMA && rsi < rsiThreshold) {
        return 'BUY';
    } else if (shortMA < longMA && rsi > 100 - rsiThreshold) {
        return 'SELL';
    }
    return null;
}
