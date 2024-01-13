const { Order, Product } = require('../database/database');

const resolvers = {
    hello: () => {
        return 'Hello World';
    },
    orders: async ({ userId }) => {
        const orders = await Order.find({ userId });
        const products = await Product.find({ _id: { $in: orders.map(order => order.productId) } });
        return orders.map(order => {
            return {
                ...order._doc,
                products: products.filter(product => product._id.toString() === order.productId.toString())
            }
        })
    }
}

module.exports = resolvers;