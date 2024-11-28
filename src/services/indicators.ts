// Calculate Simple Moving Average (SMA)
export function calculateMovingAverage(prices: number[], period: number): number {
    if (prices.length < period) {
        throw new Error(`Not enough data to calculate a ${period}-period SMA`);
    }
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
}

// Calculate Exponential Moving Average (EMA)
export function calculateEMA(prices: number[], period: number): number {
    if (prices.length < period) {
        throw new Error(`Not enough data to calculate a ${period}-period EMA`);
    }
    const multiplier = 2 / (period + 1);
    let ema = calculateMovingAverage(prices.slice(0, period), period); // Start with SMA for first EMA
    for (let i = period; i < prices.length; i++) {
        ema = (prices[i] - ema) * multiplier + ema;
    }
    return ema;
}

// Calculate Relative Strength Index (RSI)
export function calculateRSI(prices: number[], period = 14): number {
    if (prices.length < period + 1) {
        throw new Error(`Not enough data to calculate RSI`);
    }
    const gains: number[] = [];
    const losses: number[] = [];

    for (let i = 1; i <= period; i++) {
        const diff = prices[i] - prices[i - 1];
        if (diff >= 0) gains.push(diff);
        else losses.push(Math.abs(diff));
    }

    const avgGain = gains.reduce((a, b) => a + b, 0) / period;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / period;

    if (avgLoss === 0) return 100;
    const rs = avgGain / avgLoss;
    return 100 - 100 / (1 + rs);
}

// Calculate MACD
export function calculateMACD(
    prices: number[],
    fastPeriod = 12,
    slowPeriod = 26,
    signalPeriod = 9
): { macd: number; signal: number } {
    if (prices.length < slowPeriod + signalPeriod) {
        throw new Error(`Not enough data to calculate MACD`);
    }

    const fastEMA = calculateEMA(prices, fastPeriod);
    const slowEMA = calculateEMA(prices, slowPeriod);
    const macd = fastEMA - slowEMA;

    const macdValues = [];
    for (let i = slowPeriod; i < prices.length; i++) {
        macdValues.push(calculateEMA(prices.slice(0, i + 1), fastPeriod) - calculateEMA(prices.slice(0, i + 1), slowPeriod));
    }

    const signal = calculateEMA(macdValues, signalPeriod);

    return { macd, signal };
}

// Example of using the calculateIndicators function
export function calculateIndicators(prices: number[]): any {
    return {
        smaShort: calculateMovingAverage(prices, 10),
        smaLong: calculateMovingAverage(prices, 50),
        emaShort: calculateEMA(prices, 10),
        emaLong: calculateEMA(prices, 50),
        rsi: calculateRSI(prices, 14),
        macd: calculateMACD(prices),
    };
}
