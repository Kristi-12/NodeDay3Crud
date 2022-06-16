const products = require('./products')
const deleteOne = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        },
    }
}


module.exports = deleteOne