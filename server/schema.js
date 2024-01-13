const { buildSchema } = require('graphql');

const schema = buildSchema(`

    type Query {
        hello: String
        orders(userId: String!): [Order]
    }
    type Order {
        _id: ID!
        userId: String!
        products: [Product]
        total: Float!
        date: String!
    }
    type Product {
        _id: ID!
        name: String!
        price: Float!
        description: String!
        category: String!
        image: String!
        quantity: Int!
    }
`);

module.exports = schema;
