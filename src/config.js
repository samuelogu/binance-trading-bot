const dotenv = require('dotenv');
dotenv.config();
module.exports = {
    binance_key: process.env.BINANCE_KEY,
    binance_secrete: process.env.BINANCE_SECRETE,
    mongo_user: process.env.MONGO_USER,
    mongo_password: process.env.MONGO_PASSWORD,
    stopLoss: 0.14,
    totalAmount: 100,
    tradeAmount: 12,
    totalOrders: 10,
    profitPercentage: 0.3,
    withdrawAdress: process.env.WITHDRAW_ADDRESS,
    tradePair: "BNBUSDT",
    tradeAgainst: "USDT",
    symbol: "BNB",
    decimalPlaces: 4
};