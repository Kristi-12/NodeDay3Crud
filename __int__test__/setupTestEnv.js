const { build } = require("../src/app")

const createTableSQL =
    "CREATE TABLE IF NOT EXISTS products (id SERIAL ,product VARCHAR(200),color VARCHAR(200), price INT, gross_amount NUMERIC, net_amount NUMERIC, excluded_vat_amount NUMERIC, PRIMARY KEY(id)); ";
const clearTableSQL = "DROP TABLE products";

const insertTempProductsSQL = "INSERT INTO products (product , color ,price ,gross_amount,net_amount,excluded_vat_amount) VALUES ($1 , $2, $3 , $4 ,$5 ,$6)";


module.exports = function setupTestEnv() {
    const app = build({ logger: true }, {},
        { connectionString: 'postgres://postgres:postgres@localhost:5432/postgres_test' })

    beforeAll(async () => {
        await app.ready()
        // await app.pg.query(createTableSQL)
        // await app.pg.query(clearTableSQL)
    })

    beforeEach(async () => {
        await app.pg.query(createTableSQL)
        await app.pg.query(insertTempProductsSQL, ["smartphone", "yellow", 432, 20, 16.67, 3.33])
    })

    afterEach(async () => {
        await app.pg.query(clearTableSQL)
    })

    afterAll(async () => {
        app.close()
    })

    return app
}