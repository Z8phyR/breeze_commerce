const mongoose = require("./connect");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  quantity: Number,
});


const userSchema = new mongoose.Schema({
  username: String,
  firstName: String,
  lastName: String,
  email: String,
  password: String,
});

const orderSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      productId: String,
      quantity: Number,
    },
  ],
  totalPrice: Number,
});

const reviewSchema = new mongoose.Schema({
  productId: String,
  userId: String,
  review: String,
  rating: Number,
});

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);
const Order = mongoose.model("Order", orderSchema);
const Review = mongoose.model("Review", reviewSchema);

module.exports = {
  Product,
  User,
  Order,
  Review,
};
