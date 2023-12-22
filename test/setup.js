const mongoose = require("mongoose");
const config = require("../config");
const { expect } = require("chai");

// Clear specified collections before each test
beforeEach((done) => {
  // List all collections you want to clear before each test
  const collectionsToClear = ["users", "products", "orders", "reviews"];
  const clearPromises = collectionsToClear.map((collection) =>
    mongoose.connection.collection(collection).deleteMany({})
  );

  Promise.all(clearPromises)
    .then(() => done())
    .catch((error) => console.error("[❌️]Error clearing collections:", error));
});

// Add an after hook to disconnect from the DB once tests are done
after((done) => {
  mongoose
    .disconnect()
    .then(() => {
      console.log("[❎️] Disconnected from Test Database");
      done();
    })
    .catch((error) => console.error("[❌️]Disconnection error:", error));
});