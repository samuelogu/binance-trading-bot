const config = require('../config');
const api = require('binance');
const binanceRest = new api.BinanceRest({
    key: config.binance_key, // Get this from your account on binance.com
    secret: config.binance_secrete, // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 5000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
    handleDrift: false
    /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
     * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
     * binance's server time, calculating the difference with your own clock, and then reattempting
     * the request.
     */
});

const url = 'https://api.binance.com';

const binanceWS = new api.BinanceWS(true);

const rest = require('node-binance-api')().options({
    APIKEY: config.binance_key,
    APISECRET: config.binance_secrete,
    useServerTime: true // If you get timestamp errors, synchronize to server time at startup
});

module.exports = {
    api, binanceRest, binanceWS, url, rest

};
