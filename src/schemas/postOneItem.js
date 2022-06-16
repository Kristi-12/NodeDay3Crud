const products = require('./products')
const postOne = {
    schema: {
        body: {
            type: "object",
            properties: {
                product: { type: 'string' },
                color: { type: 'string' },
                price: { type: 'integer' }
            },

        },
        response: {
            201: products
        },
    }
}

module.exports = postOne