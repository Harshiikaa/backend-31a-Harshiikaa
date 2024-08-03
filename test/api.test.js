const request = require('supertest')
const app = require('../index')

describe('API Testings', () => {

    /////////////////// USER ///////////////////////////////////////////////////
    //1. TESTING USER CREATE
    it('POST /api/user/create |  Response with valid JSON', async () => {
        const response = await request(app).post('/api/user/create').send({
            firstName: "User",
            lastName: "User",
            phoneNumber: "1234567890",
            email: "heheuser@gmail.com",
            password: "user"
        })
        expect(response.statusCode).toBe(200)
    }, 40000)

    //2. TESTING USER LOGIN
    it('POST /api/user/login |  Response with valid JSON', async () => {
        const response = await request(app).post('/api/user/login').send({
            email: "user@gmail.com",
            password: "user"
        })
        expect(response.statusCode).toBe(200)
    }, 40000);

    //3. TESTING USER UPDATE
    it('PUT /api/user/updateUser/65e2f7498d3dd610cce4b9c4 |  Response with valid JSON', async () => {
        const response = await request(app).put('/api/user/updateUser/65e2f7498d3dd610cce4b9c4').send({
            firstName: "UserBahadur",
            lastName: "Shrestha",
            phoneNumber: 1234567890,
            email: "user22@gmail.com",

        })
        expect(response.statusCode).toBe(200)
    }, 40000);


    //4. TESTING USER DELETE
    it('DELETE /api/user/deleteUser/65e2f7498d3dd610cce4b9c4 |  Response with valid JSON', async () => {
        const response = await request(app).delete('/api/user/deleteUser/65e2f7498d3dd610cce4b9c4').send({
        })
        expect(response.statusCode).toBe(200)
    }, 40000);


    /////////////////// PRODUCTS ///////////////////////////////////////////////////

    //5. TESTING PRODUCT CREATE
    it('POST /api/product/createProduct |  Response with valid JSON', async () => {
        const response = await request(app).post('/api/product/createProduct').send({
            productName: "Sweater",
            productPrice: 10000,
            productDescription: "Very Nice",
            productCategory: "Pottery and Ceramics",
            sellerID: "65b39ac07ef9089d676500d9",
            productImage: "https://res.cloudinary.com/dixaughoi/image/upload/v1709174515/products/jaqh3nbrw1tlvmrgclju.jpg"
        })
        expect(response.statusCode).toBe(200)
    }, 40000);

    //6.FAILED TESTING PRODUCT FETCH
    it('GET /api/product/getSingleProduct/65dfefbe16d7a55b27414450 |  Response with valid JSON', async () => {
        const response = await request(app).get('/api/product/getSingleProduct/65dfefbe16d7a55b27414450').send({

        })
        expect(response.statusCode).toBe(200)
    }, 40000);

    //7. TESTING PRODUCT UPDATE
    it('PUT /api/product/updateProduct/65dfefbe16d7a55b27414450 |  Response with valid JSON', async () => {
        const response = await request(app).put('/api/product/updateProduct/65dfefbe16d7a55b27414450').send({
            productName: "Sweater",
            productPrice: 10000,
            productDescription: "Very Nice",
            productCategory: "Pottery and Ceramics",
            productImage: "https://res.cloudinary.com/dixaughoi/image/upload/v1709174515/products/jaqh3nbrw1tlvmrgclju.jpg"
        })
        expect(response.statusCode).toBe(200)
    }, 40000);

    //8. TESTING PRODUCT DELETE
    it('DELETE /api/product/deleteProduct/65dfefbe16d7a55b27414450 |  Response with valid JSON', async () => {
        const response = await request(app).delete('/api/product/deleteProduct/65dfefbe16d7a55b27414450').send({

        })
        expect(response.statusCode).toBe(200)
    }, 40000);

    //9. FAILED TEST UPDATE PRODUCT
    it('PUT /api/product/updateProduct/65dfefbe16d7a55b27414450 | Response with valid JSON', async () => {
        const response = await request(app).put('/api/product/updateProduct/65dfefbe16d7a55b27414450').send({
            productName: "Sweater",
            productPrice: 10000,
            productDescription: "Very Nice",
            productCategory: "Pottery and Ceramics",
            productImage: "https://res.cloudinary.com/dixaughoi/image/upload/v1709174515/products/jaqh3nbrw1tlvmrgclju.jpg"
        });
        expect(response.body.someProperty).toBe(500);
    }, 40000);

        //10. FAILED TEST DELETE PRODUCT
    it('DELETE /api/product/deleteProduct/65dfefbe16d7a55b27414450 | Response with valid JSON', async () => {
        const response = await request(app).delete('/api/product/deleteProduct/65dfefbe16d7a55b27414450').send({});
        expect(response.body.someProperty).toBe(404);
    }, 40000);





})