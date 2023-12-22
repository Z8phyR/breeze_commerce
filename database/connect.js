const mongoose = require("mongoose");
const config = require("../config");

const databaseType = process.env.NODE_ENV === "test" ? "Test" : "Production";

mongoose
  .connect(config.dbURI, {})
  .then(() =>
    console.log(`[✅️] Connected to  ${databaseType} Database Successfully`)
  )
  .catch((err) => console.error(err));

module.exports = mongoose;
