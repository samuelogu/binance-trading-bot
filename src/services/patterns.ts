export function isHammer(candle: any): boolean {
    const bodySize = Math.abs(candle.close - candle.open);
    const lowerShadow = candle.low < candle.open ? candle.open - candle.low : candle.close - candle.low;
    const upperShadow = candle.high - Math.max(candle.open, candle.close);
    return lowerShadow > 2 * bodySize && upperShadow < bodySize;
}

// Add other patterns here
