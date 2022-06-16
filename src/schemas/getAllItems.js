
const products = require('./products')
const getAll = {
    schema: {
        response: {
            200: {
                type: 'array',
                products: products
            },

        },
    }
}


module.exports = getAll