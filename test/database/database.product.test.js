// Require the necessary models
const { Product } = require("../../database/database.js");
const { expect } = require("chai");

describe("[🔌️] Product Database Operations", function () {
  // Test for Creating a Product
  it("should create a new product", function (done) {
    const newProduct = new Product({
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      quantity: 100,
    });

    newProduct
      .save()
      .then((product) => {
        // console.log(product);
        // Assert that the new product has an _id property (indicating it was saved)
        expect(product._id).to.not.be.null;
        expect(product.name).to.equal("Test Product");
        expect(product.description).to.equal("This is a test product");
        expect(product.price).to.equal(9.99);
        expect(product.quantity).to.equal(100);
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Reading a Product

  it("should read a product", function (done) {
    const newProduct = new Product({
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      quantity: 100,
    });

    newProduct
      .save()
      .then((product) => {
        // console.log(product);
        //read a product
        Product.findById(product._id);
        expect(product._id).to.not.be.null;

        done();
      })
      .catch((err) => done(err));
  });

  // Test for Updating a Product
  it("should update a product", function (done) {
    const newProduct = new Product({
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      quantity: 100,
    });

    newProduct.save().then((product) => {
      // console.log(product);
      //update a product
      Product.findByIdAndUpdate(
        product._id,
        { name: "Test Product Updated" },
        { new: true }
      )
        .then((updatedProduct) => {
          // console.log(updatedProduct);
          expect(updatedProduct.name).to.equal("Test Product Updated");
          done();
        })
        .catch((err) => done(err));
    });
  });

  // Test for Deleting a Product
  it("should delete a product", function (done) {
    const newProduct = new Product({
      name: "Test Product",
      description: "This is a test product",
      price: 9.99,
      quantity: 100,
    });

    newProduct
      .save()
      .then((product) => {
        //delete a product
        return Product.findByIdAndDelete(product._id);
      })
      .then((deletedProduct) => {
        expect(deletedProduct).to.not.be.null;
        return Product.findById(deletedProduct._id);
      })
      .then((product) => {
        expect(product).to.be.null;
        done();
      })
      .catch((err) => done(err));
  });
});
