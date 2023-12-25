const request = require("supertest");
const app = require("../../server/app");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");
const { Review } = require("../../database/database");    
const { User } = require("../../database/database");
const { Product } = require("../../database/database");
const { Order } = require("../../database/database");

// Test Order API
describe("Order API Tests", function () {
    let user, product, order;
    before(async function() {
        user = await User.create({
            name: "Test User",
            email: "test@user.com",
            password: "password",
        });
        product = await Product.create({
            name: "Test Product",
            description: "Test Description",
            price: 100,
        });
    }
    );
    it("should create a new order", async function () {
        const res = await request(app)
            .post("/orders/post")
            .send({
                userId: user._id,
                products: [{
                productId: product._id,
                quantity: 5
            }],
                totalPrice: 500,
            })
            .expect("Content-Type", /json/)
            .expect(200)
            expect(res.body).to.have.property('totalPrice', 500);
            expect(res.body.products[0]).to.include({ productId: product._id.toString(), quantity: 5 });
            order = res.body;   
        });
    it("should get a specific order", async function () {
        await request(app)
            .get("/orders/" + order._id)
            .expect(200)
        }
    );
    it("should update a specific order", async function () {
        await request(app)
            .put("/orders/" + order._id)
            .send({
                quantity: 4,
                total: 400,
            })
            .expect(200)
        }
    );
    it("should delete a specific order", async function () {
        await request(app)
            .delete("/orders/" + order._id)
            .expect(200)
        }
    );
    after(async function() {
        await User.deleteMany();
        await Product.deleteMany();
        await Order.deleteMany();
    });
}
);