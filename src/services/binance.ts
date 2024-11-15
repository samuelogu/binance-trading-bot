import Binance from 'binance-api-node';
import config from '../config';

const client = Binance({
    apiKey: process.env.BINANCE_API_KEY,
    apiSecret: process.env.BINANCE_API_SECRET,
});

export function getCandlestickStream(symbol: string, interval: string, onCandle: (candle: any) => void) {
    client.ws.candles(symbol, interval, onCandle);
}

export async function getHistoricalCandles(symbol: string, interval: any, limit: number = 50) {
    return await client.candles({ symbol, interval, limit });
}

export default client;
