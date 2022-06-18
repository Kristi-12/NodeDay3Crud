const { default: fastify } = require("fastify")

const vatCalculator = require('../../utils/vatCalculator')

const products = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        product: { type: 'string' },
        color: { type: 'string' },
        price: { type: 'integer' },
        gross_amount: {
            type: 'number'
        }
    }

}


const postOne = {
    schema: {
        body: {
            type: "object",
            properties: {
                product: { type: 'string' },
                color: { type: 'string' },
                price: { type: 'integer' },
                gross_amount: { type: 'number' }
            },

        },
        response: {
            201: products
        },
    }
}


const ProductRoute_v2 = async (fastify, options, done) => {

    //GET ALL PRODUCTS
    fastify.get('/', async (request, reply) => {
        try {
            const { rows } = await fastify.pg.query("SELECT * FROM products");
            reply.send(rows)
        }
        catch (error) {
            reply.send(error)
        }
    })

    //GET ONE PRODUCT
    fastify.get('/:id', async (request, reply) => {
        try {
            const { id } = request.params
            const { rows } = await fastify.pg.query("SELECT * FROM products WHERE id=$1", [id]);
            reply.send(rows[0])
        }
        catch {
            reply.send(error)
        }
    })

    // POST OR ADD A NEW PRODUCT
    fastify.post('/', postOne, async (request, reply) => {

        try {
            const client = await fastify.pg.connect();
            const { product, color, price, gross_amount } = request.body
            const netAmount = vatCalculator.calculateNetAmount(gross_amount)
            const vatAmount = vatCalculator.calculateVAT(netAmount)
            const { rows } = await fastify.pg.query("INSERT INTO products(product , color ,price , gross_amount , net_amount , excluded_vat_amount) VALUES ($1, $2, $3 ,$4 ,$5, $6) RETURNING *",
                [product, color, price, gross_amount, netAmount, vatAmount]
            );

            reply.code(201).send(rows[0]);
        }

        catch (error) {
            reply.send(error)
        } finally {
            client.release();
        }
    })

    //UPDATE ONE PRODUCT
    fastify.put('/:id', async (request, reply) => {
        try {
            const { id } = request.params
            const { product, color, price } = request.body
            const { rows } = await fastify.pg.query("UPDATE products SET product=$1, color=$2 ,price=$3 WHERE id=$4 RETURNING *",
                [product, color, price, id]);

            reply.send(rows[0])
        } catch (error) {
            reply.send(error)
        }
    })

    //DELETE ONE PRODUCT
    fastify.delete('/:id', async (request, reply) => {
        try {
            const { id } = request.params
            await fastify.pg.query("DELETE FROM products WHERE id=$1", [id]);
            reply.send(`Product with id: ${id} has been deleted`)
        } catch (error) {
            reply.send(error)
        }
    })



    done();
}

module.exports = { ProductRoute_v2 }