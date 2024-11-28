import Binance from 'binance-api-node';
import { calculateIndicators } from './indicators';
import { executeStrategy } from './strategies';

const client = Binance();

// Fetch historical market data
export async function fetchHistoricalData(
    symbol: string,
    interval: any,
    limit: number
) {
    const candles = await client.candles({
        symbol,
        interval,
        limit,
    });

    return candles.map((c) => ({
        time: c.openTime,
        open: parseFloat(c.open),
        high: parseFloat(c.high),
        low: parseFloat(c.low),
        close: parseFloat(c.close),
        volume: parseFloat(c.volume),
    }));
}

// Perform backtesting
export async function backtest(symbol: string, interval: string, initialBalance: number) {
    const historicalData = await fetchHistoricalData(symbol, interval, 1000); // Adjust limit as needed
    let balance = initialBalance;
    let position = 0;
    let buyPrice = 0;
    let trades = 0;

    const smaPeriod = 10; // Example period
    const indicatorsPeriod = Math.max(smaPeriod, 12, 26); // Adjust for the longest required period

    for (let i = indicatorsPeriod - 1; i < historicalData.length; i++) {
        const relevantData = historicalData.slice(0, i + 1); // Data up to current candle
        const indicators = calculateIndicators(relevantData.map(c => c.close));

        const currentCandle = historicalData[i];
        const action = executeStrategy(indicators, currentCandle, buyPrice);

        if (action === 'BUY' && balance > 0) {
            const price = currentCandle.close;
            position = balance / price;
            balance = 0; // Invest entire balance
            buyPrice = price; // Record buy price
            trades++;
            console.log(`[BUY] Price: ${price}, Position: ${position}`);
        } else if (action === 'SELL' && position > 0) {
            const price = currentCandle.close;
            balance = position * price;
            position = 0; // Sell entire position
            buyPrice = 0; // Reset buy price
            trades++;
            console.log(`[SELL] Price: ${price}, Balance: ${balance}`);
        }
    }

    console.log(`Final Balance: ${balance}`);
    return { finalBalance: balance, trades };
}


// Calculate performance metrics
export function calculateMetrics(
    initialBalance: number,
    finalBalance: number,
    trades: number
) {
    const profit = finalBalance - initialBalance;
    const roi = ((profit / initialBalance) * 100).toFixed(2) + '%';
    const avgProfitPerTrade =
        trades > 0 ? (profit / trades).toFixed(2) : 'NaN';

    return {
        profit,
        roi,
        avgProfitPerTrade,
        trades,
    };
}
