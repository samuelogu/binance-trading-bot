export function calculateMovingAverage(prices: number[], period: number): number {
    const sum = prices.slice(-period).reduce((a, b) => a + b, 0);
    return sum / period;
}

export function calculateRSI(prices: number[]): number {
    const gains = [];
    const losses = [];
    for (let i = 1; i < prices.length; i++) {
        const diff = prices[i] - prices[i - 1];
        diff >= 0 ? gains.push(diff) : losses.push(Math.abs(diff));
    }
    const avgGain = gains.reduce((a, b) => a + b, 0) / gains.length;
    const avgLoss = losses.reduce((a, b) => a + b, 0) / losses.length;
    const rs = avgGain / avgLoss;
    return 100 - (100 / (1 + rs));
}
