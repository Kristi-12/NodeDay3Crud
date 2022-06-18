const setupTestEnv = require('./setupTestEnv')

const app = setupTestEnv();

describe("Integration tests for CRUD operations to test postgres Database", () => {


    //POST TEST
    test("Should create a product via POST route", async () => {
        const product = {
            product: "SmartPhone Test",
            color: "Color Test",
            price: 432,
            gross_amount: 20
        }

        const response = await app.inject({
            method: "POST",
            url: "/v2/",
            payload: product
        })

        expect(response.statusCode).toBe(201)
        expect(response.json()).toMatchObject(product)
    })

    //GET ALL PRODUCTS

    test("Should get all product via GET route", async () => {

        const response = await app.inject({
            method: "GET",
            url: "/v2",
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject([{ color: "yellow", excluded_vat_amount: "3.33", gross_amount: "20", net_amount: "16.67", price: 432, product: "smartphone" }])
    })

    //GET ONE PRODUCT

    test("Should get one product via GET route", async () => {

        const response = await app.inject({
            method: "GET",
            url: "/v2/1",

        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject([{ color: "yellow", excluded_vat_amount: "3.33", gross_amount: "20", net_amount: "16.67", price: 432, product: "smartphone" }])
    })

    //UPDATE ONE PRODUCT

    test("Should update an product via PUT route", async () => {
        const product = {
            product: "Smartphone2",
            color: "yellow2",
            price: 433
        }

        const response = await app.inject({
            method: "PUT",
            url: "/v2/276",
            payload: product
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject(product)
    })


    //DELETE TEST
    test("Should delete a product by DELETE route", async () => {

        const response = await app.inject({
            method: "DELETE",
            url: "/v2/1",
        });

        expect(response.statusCode).toBe(200);
        expect(response).toMatchObject({
            body: "Product with id: 1 has been deleted",
        });
    });

    //GET ALL
    test("Should get all products via GET route", async () => {

        const response = await app.inject({
            method: "GET",
            url: "/v2",
        })

        expect(response.statusCode).toBe(200)
        expect(response.json()).toMatchObject([{ "color": "yellow", "excluded_vat_amount": "3.33", "gross_amount": "20", "net_amount": "16.67", "price": 432, "product": "smartphone" }])
    })




})