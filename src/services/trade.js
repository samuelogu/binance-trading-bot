const binance = require('./binance');
const config = require('../config');

class Trade {

    constructor() {
        this.usd = 0;
        this.balance = 0;
    }

    quantity(num) {

        if (config.symbol === 'BTC') {
            return num.toString().match(/^-?\d+(?:\.\d{0,6})?/)[0];
        }

        if (config.symbol === 'BNB') {
            return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        }

    }

    price(num) {

        if (config.symbol === 'BTC') {
            return num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
        }

        if (config.symbol === 'BNB') {
            return num.toString().match(/^-?\d+(?:\.\d{0,4})?/)[0];
        }

    }



    calculate(price_, percentage, type) {

        var price = parseFloat(price_);

        let value = (percentage / 100) * price;
        let newPrice = 0;

        if (type === 'LOSS') {
            newPrice = price - parseFloat(value);
        }

        if (type === 'PROFIT') {
            newPrice = price + parseFloat(value);
        }

        return this.price(newPrice);
    }

    buy(price) {

        let quantity = this.quantity(this.get_usdt() / parseFloat(price));

        binance.rest.marketBuy(config.tradePair, quantity, (error, response) => {

            if (error) {
                let err = JSON.parse(error.body);

                if (err.msg === 'Account has insufficient balance for requested action.') {
                    this.sell(price);
                }
                // console.log('Error', err.msg);
                return false
            }

            console.log('Trading Price: ', price);
            console.log('New Trade Created');
            this.loss(price);

        });

    }

    get_balance() {

        binance.rest.balance((error, balances) => {


            if (!error) {

                if (config.symbol === 'BTC') {
                    this.balance = balances.BTC.available;
                }

                if (config.symbol === 'BNB') {
                    this.balance = balances.BNB.available;
                }

            }


        });

        return this.balance;

    }

    get_usdt() {

        binance.rest.balance((error, balances) => {

            if (!error) {

                this.usd = balances.USDT.available;

            }

        });

        return this.usd;

    }



    loss(price) {

        let type = "STOP_LOSS_LIMIT";
        let stopPrice = this.price(this.calculate(price, config.stopLoss, 'LOSS'));

        let quantity = this.quantity(this.get_balance());

        if (quantity <= 0) {
            console.log('Error:', 'No available balance');
            return false;
        }

        binance.rest.sell(config.tradePair, quantity, stopPrice, {stopPrice: stopPrice, type: type}, (error, response) => {

            if (error) {
                let err = JSON.parse(error.body);
                console.log('Error', err.msg);
                return false
            }

            console.log('Stop loss created at', stopPrice);

        });

    }

    profit(orderId, price) {

        console.log('Taking Profit');

        binance.rest.cancel(config.tradePair, orderId, (error, response, symbol) => {
            if (error) {
                let err = JSON.parse(error.body);
                console.log('Error', err.msg);
                return false
            }
            console.log('Stop loss order cancelled. OrderId: ', orderId);

            this.sell(price);

        });

    }

    sell(price) {

        let quantity = this.quantity(this.get_balance());

        if (quantity <= 0) {
            console.log('Error:', 'No available balance');
            return false;
        }

        binance.rest.marketSell(config.tradePair, quantity, (error, response) => {

            if (error) {
                let err = JSON.parse(error.body);
                console.log('Error', err.msg);
                return false
            }

            console.log('Profit made at', price);

        });

    }

    check(price) {

        binance.rest.openOrders(false, (error, openOrders) => {


            if (openOrders.length > 0 && openOrders[0].type === 'STOP_LOSS_LIMIT') {

                let profit = this.calculate(openOrders[0].price, config.profitPercentage, 'PROFIT');

                let orderId = openOrders[0].orderId;
                let quantity = this.quantity(openOrders[0].origQty);
                let stopPrice = this.price(this.calculate(openOrders[0].price, config.stopLoss, 'LOSS'));

                // let date = new Date().toLocaleTimeString();
                let date = Math.floor(Date.now() / 1000);

                console.log({
                    'orderId': orderId,
                    'Buy price': openOrders[0].price,
                    'Qty': quantity,
                    'Current price': price,
                    'Take profit': profit,
                    'Stop Loss Price': stopPrice,
                    'timestamp': date
                });

                if (price >= profit) {
                    this.profit(orderId, profit);
                }

            }else {
                this.buy(price);
            }

        });
    }
}

module.exports = Trade;
