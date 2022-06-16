const getAllItems = require('../schemas/getAllItems')
const getOneItem = require('../schemas/getOneItem')
const postOneItem = require('../schemas/postOneItem')
const deleteOneItem = require('../schemas/deleteOneItem')
const updateOneItem = require('../schemas/updateOneItem')
let Products = require('../Products')

const productsRoute = (fastify, options, done) => {


    fastify.get('/', getAllItems, function (request, reply) {
        const products = Products
        reply.send(products)
    })

    fastify.get('/:id', getOneItem, function (request, reply) {
        const { id } = request.params
        const products = Products.find((item) => item.id === id)
        reply.send(products)
    })

    fastify.post('/', postOneItem, function (request, reply) {
        const { product, color, price } = request.body
        const products = { id: String(Products.length + 1), product, color, price }
        Products.push(products)
        reply.code(201).send(products)
    })

    fastify.delete('/:id', deleteOneItem, function (request, reply) {
        const { id } = request.params
        Products = Products.filter((item) => item.id !== id)
        reply.send(`Product ${id} got deleted`)

    })

    fastify.put('/:id', updateOneItem, function (request, reply) {
        const { id } = request.params
        const { product, color, price } = request.body
        const products = Products.find((products) => products.id === id)
        products.product = product
        products.color = color
        products.price = price

        reply.send(products)
    })


    done()
}

module.exports = { productsRoute }