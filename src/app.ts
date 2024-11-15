Created
import 'dotenv/config';
import { getCandlestickStream, getHistoricalCandles } from './services/binance';
import { checkBuySellSignal } from './services/strategies';
import { placeOrder } from './services/trade';
import { log } from './services/logger';

const SYMBOL = 'BTCUSDT';
const INTERVAL = '1m';

async function main() {
    const initialCandles = await getHistoricalCandles(SYMBOL, INTERVAL, 200);

    // Stream real-time candlesticks
    getCandlestickStream(SYMBOL, INTERVAL, async (newCandle) => {
        const candles = [...initialCandles, newCandle];
        const signal = await checkBuySellSignal(candles);

        if (signal === 'BUY') {
            console.log('BUY');
            // await placeOrder(SYMBOL, 'BUY', '0.001');
        } else if (signal === 'SELL') {
            console.log('SELL');
            // await placeOrder(SYMBOL, 'SELL', '0.001');
        }

        // Remove oldest candle for memory efficiency
        initialCandles.shift();
        initialCandles.push(newCandle);
    });
}

main().catch(error => log('error', error.message));
