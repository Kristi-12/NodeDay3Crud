const fastify = require('fastify');
const fastify_swagger = require('@fastify/swagger')

const { productsRoute } = require('./route/route')

const build = (opts = {}, optsSwagger = {}) => {
    const app = fastify(opts)
    app.register(fastify_swagger, optsSwagger)
    app.register(productsRoute)
    return app
}

module.exports = { build }