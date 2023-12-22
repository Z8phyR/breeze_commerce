const request = require("supertest");
const app = require("../../server/app");
const { expect } = require("chai");

const { Product } = require("../../database/database");
let productId;

before((done) => {
  // Create a new product and save the ID for use in tests
  const newProduct = new Product({
    name: "Initial Test Product",
    description: "This is the initial test product",
    price: 10.99,
    quantity: 20,
  });

  newProduct
    .save()
    .then((product) => {
      productId = product._id.toString();
      done();
    })
    .catch((err) => done(err));
});

describe("POST /products/post", function () {
  it("responds with json and creates a new product", function (done) {
    request(app)
      .post("/products/post")
      .send({
        name: "Test Product",
        description: "This is a test product",
        price: 9.99,
        quantity: 15,
      })
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        expect(res.body.name).to.equal("Test Product");
        expect(res.body).to.have.property("_id");
        done();
      });
  });
});

describe("GET /products", function () {
  it("responds with json containing a list of all products", function (done) {
    request(app)
      .get("/products")
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("GET /products/:productId", function () {
  it("responds with json containing a single product", function (done) {
    request(app)
      .get("/products/" + productId)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("PUT /products/:productId", function () {
  it("responds with json containing an updated product", function (done) {
    request(app)
      .put("/products/" + productId)
      .send({
        name: "Updated Test Product",
        description: "This is an updated test product",
        price: 9.99,
        quantity: 15,
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

describe("DELETE /products/:productId", function () {
  it("responds with json containing a deleted product", function (done) {
    request(app)
      .delete("/products/" + productId)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});
