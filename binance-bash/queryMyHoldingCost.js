const { Spot } = require("@binance/connector");
const argv = require('minimist')(process.argv.slice(2));
const config = require('./config.json')
const client = new Spot(config.apiKey, config.apiSecret);

const orderType = argv.type || 'ETHUSDT'

async function queryMyHoldingCost() {
    const fetchAllOrdersRes = await client.allOrders(orderType, {});

    let cost = 0, qty = 0;
    fetchAllOrdersRes.data.forEach(order => {
        if (order.symbol === orderType) {
            cost = cost + parseFloat(order.price) * parseFloat(order.executedQty);
            qty = qty + parseFloat(order.executedQty);
        }
    });

    const result = cost / qty

    client.logger.log(`your ${orderType} holding cost is ${result}`)
}

queryMyHoldingCost();