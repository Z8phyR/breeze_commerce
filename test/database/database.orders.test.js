const e = require("express");
const { Order } = require("../../database/database.js");
const { expect } = require("chai");

describe("[🔌️] Order Database Operations", function () {
  // Test for Creating an Order
  it("should create a new order", function (done) {
    const newOrder = new Order({
      userId: "1234",
      products: [
        {
          productId: "1234",
          quantity: 1,
        },
      ],
      totalPrice: 9.99,
    });

    newOrder
      .save()
      .then((order) => {
        expect(order._id).to.not.be.null;
        expect(order.userId).to.equal("1234");
        expect(order.products[0].productId).to.equal("1234");
        expect(order.products[0].quantity).to.equal(1);
        expect(order.totalPrice).to.equal(9.99);
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Reading an Order
  it("should read an order", function (done) {
    const newOrder = new Order({
      userId: "1234",
      products: [
        {
          productId: "1234",
          quantity: 1,
        },
      ],
      totalPrice: 9.99,
    });

    newOrder
      .save()
      .then((order) => {
        Order.findById(order._id);
        expect(order._id).to.not.be.null;
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Updating an Order
  it("should update an order", function (done) {
    const newOrder = new Order({
      userId: "1234",
      products: [
        {
          productId: "1234",
          quantity: 1,
        },
      ],
      totalPrice: 9.99,
    });

    newOrder
      .save()
      .then((order) => {
        Order.findByIdAndUpdate(
          order._id,
          {
            userId: "1234",
            products: [
              {
                productId: "1234",
                quantity: 1,
              },
            ],
            totalPrice: 9.99,
          },
          { new: true }
        );
        expect(order._id).to.not.be.null;
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Deleting an Order
  it("should delete an order", function (done) {
    const newOrder = new Order({
      userId: "1234",
      products: [
        {
          productId: "1234",
          quantity: 1,
        },
      ],
      totalPrice: 9.99,
    });

    newOrder
      .save()
      .then((order) => {
        Order.findByIdAndDelete(order._id)
          .then((order) => {
            expect(order).to.not.be.null;
            return Order.findById(order._id);
          })
          .then((order) => {
            expect(order).to.be.null;
            done();
          });
      })
      .catch((err) => done(err));
  });

  // end
});
