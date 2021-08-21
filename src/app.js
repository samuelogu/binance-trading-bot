const app = require('express')();
var https = require('https');

const io = require('socket.io')(https);
var port = process.env.PORT || 3000;
const config = require('./config');

const function_ = require('./functions');




const binance = require('./binance');

const tradeController = require('./controllers/trade');
let Trade = new tradeController();



/*setInterval( function () {

    binance.rest.prices(config.tradePair, (error, ticker) => {

        if (!error) {
            let price = Trade.price(ticker.BNBUSDT);
            Trade.check(price);
            // Trade.profit(947802536, price);
        }

    });

}, 5000);*/




// var price = 13.143;
// Trade.sell(price);



io.on('connection', function(socket){


    socket.on('price', function(msg){
        console.log(msg);
    });


});


