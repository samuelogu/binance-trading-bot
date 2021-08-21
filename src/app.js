const { BinanceRest, BinanceWS } = require('binance');
const { binance_key, binance_secrete } = require("./config");

// connect to mongodb and redis
require('./connectors/redis')
require('./connectors/mongodb')

const ws = new BinanceWS();
const price = 1234;

ws.onTicker('BNBUSDT', data => {
    const price = data.currentClose;
    console.log(price);
})

    // (async () => {
    //     binance.futuresMiniTickerStream( miniTicker => {
    //         console.info( miniTicker );
    //     } );
    // })().catch(err => {
    //     console.error(err);
    // });


