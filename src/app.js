const fastify = require('fastify');
const fastify_swagger = require('@fastify/swagger')
const fastifyPostgres = require('@fastify/postgres')

const { productsRoute } = require('./route/route')
const { ProductRoute_v2 } = require('./route/v2/Products')

const build = (opts = {}, optsSwagger = {}, optsPostgres = {}) => {
    const app = fastify(opts)
    app.register(fastifyPostgres, optsPostgres)
    app.register(fastify_swagger, optsSwagger)
    app.register(productsRoute, { prefix: '/v1' })
    app.register(ProductRoute_v2, { prefix: '/v2' })

    return app
}

module.exports = { build }