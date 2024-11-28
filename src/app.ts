/*import 'dotenv/config';
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

main().catch(error => log('error', error.message));*/
/*import 'dotenv/config';
import { backtest, calculateMetrics } from './services/backtest';

const MODE = process.env.MODE || 'LIVE'; // 'LIVE' or 'BACKTEST'

async function main() {
    if (MODE === 'BACKTEST') {
        const initialBalance = 100; // $100 initial balance
        const { finalBalance, trades } = await backtest('BTCUSDT', '1m', initialBalance);

        const metrics = calculateMetrics(initialBalance, finalBalance, trades);
        console.log('Backtesting Performance Metrics:', metrics);
    } else if (MODE === 'LIVE') {
        console.log('[INFO] Starting live trading mode...');
        // Add your live trading logic here
    } else {
        console.log('[ERROR] Invalid mode specified.');
    }
}

main().catch(err => console.error('[ERROR]', err));*/

import 'dotenv/config';
import Binance from 'binance-api-node';
import moment from 'moment';
import cron from 'node-cron';

// Initialize Binance client
const client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
});

type Candle = {
    open: number;
    close: number;
    high: number;
    low: number;
};

// Convert string values from Binance API to numbers for analysis
function parseCandle(rawCandle: any): Candle {
    return {
        open: parseFloat(rawCandle.open),
        close: parseFloat(rawCandle.close),
        high: parseFloat(rawCandle.high),
        low: parseFloat(rawCandle.low),
    };
}



// Function to fetch candles and analyze patterns
async function analyzePatterns(symbol: string = 'BTCUSDT', interval: any = '1h') {
    const candles = await client.candles({ symbol, interval });
    const previousCandle = parseCandle(candles[0]);
    const currentCandle = parseCandle(candles[1]);
    const time = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");

    if (isHammer(currentCandle)) {
        console.log('Hammer pattern detected', time);
    }
    if (isInvertedHammer(currentCandle)) {
        console.log('Inverted Hammer pattern detected', time);
    }
    if (isDoji(currentCandle)) {
        console.log('Doji pattern detected', time);
    }
    if (isBullishEngulfing(previousCandle, currentCandle)) {
        console.log('Bullish Engulfing pattern detected', time);
    }
    if (isBearishEngulfing(previousCandle, currentCandle)) {
        console.log('Bearish Engulfing pattern detected', time);
    }
    if (isShootingStar(currentCandle)) {
        console.log('Shooting Star pattern detected', time);
    }
}

// Run the analysis in a loop to get real-time updates
/*setInterval(() => {
    analyzePatterns();
}, 3600000);  // Runs every minute*/

const job = cron.schedule('* * * * *', () => {
    console.log('log');
    // analyzePatterns();
});

job.start();