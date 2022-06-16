const products = require('./products')
const getOne = {
    schema: {
        response: {
            200: products
        },
    }
}


module.exports = getOne