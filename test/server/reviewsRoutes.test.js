const request = require("supertest");
const app = require("../../server/app");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");
const { Review } = require("../../database/database");    
const { User } = require("../../database/database");
const { Product } = require("../../database/database");
const { Order } = require("../../database/database");

// Test for Creating a New Review

describe("Review API Tests", function () {
    let user, product, review;
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
    });

    it("should create a new review", async function () {
            const res = await request(app)
                .post("/reviews/post")
                .send({
                    userId: user._id,
                    productId: product._id,
                    rating: 5,
                    review: "Test Comment",
                })
                .expect("Content-Type", /json/)
                .expect(200)

                expect(res.body).to.include({rating: 5, review: "Test Comment"});
                review = res.body;   
            });
    it("should get a specific review", async function () {
        await request(app)
            .get("/reviews/" + review._id)
            .expect(200)
        });

    it("should update a specific review", async function () {
        await request(app)
            .put("/reviews/" + review._id)
            .send({
                rating: 4,
                review: "Updated Comment",
            })
            .expect(200)
        });
    
    it("should delete a specific review", async function () {
        await request(app)
            .delete("/reviews/" + review._id)
            .expect(200)
        });
    
    after(async function() {
        await User.deleteMany();
        await Product.deleteMany();
        await Review.deleteMany();
    });
    
});



