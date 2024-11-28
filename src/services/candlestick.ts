
export function isHammer(candle): boolean {
    const bodySize = Math.abs(candle.close - candle.open);
    const lowerShadow = candle.open < candle.close
        ? candle.open - candle.low
        : candle.close - candle.low;
    const upperShadow = candle.high - Math.max(candle.open, candle.close);
    return lowerShadow > 2 * bodySize && upperShadow < bodySize;
}

export function isInvertedHammer(candle): boolean {
    const bodySize = Math.abs(candle.close - candle.open);
    const lowerShadow = candle.open < candle.close
        ? candle.open - candle.low
        : candle.close - candle.low;
    const upperShadow = candle.high - Math.max(candle.open, candle.close);
    return upperShadow > 2 * bodySize && lowerShadow < bodySize;
}

export function isDoji(candle): boolean {
    const bodySize = Math.abs(candle.close - candle.open);
    return bodySize < (candle.high - candle.low) * 0.1; // Body is less than 10% of range
}

export function isBullishEngulfing(previousCandle, currentCandle): boolean {
    return previousCandle.close < previousCandle.open &&
        currentCandle.close > currentCandle.open &&
        currentCandle.close > previousCandle.open &&
        currentCandle.open < previousCandle.close;
}

export function isBearishEngulfing(previousCandle, currentCandle): boolean {
    return previousCandle.close > previousCandle.open &&
        currentCandle.close < currentCandle.open &&
        currentCandle.open > previousCandle.close &&
        currentCandle.close < previousCandle.open;
}

export function isShootingStar(candle): boolean {
    const bodySize = Math.abs(candle.close - candle.open);
    const lowerShadow = candle.open < candle.close
        ? candle.open - candle.low
        : candle.close - candle.low;
    const upperShadow = candle.high - Math.max(candle.open, candle.close);
    return upperShadow > 2 * bodySize && lowerShadow < bodySize;
}