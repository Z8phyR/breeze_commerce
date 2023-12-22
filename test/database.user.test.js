// Require the necessary models
const { User } = require("../database/database.js");
const { expect } = require("chai");


describe("[🔌️] User Database Operations", function () {
  
  // Test for Creating a New User
  it("should create a new user", function (done) {
    const newUser = new User({
      name: "Test User",
      email: "test@user.com",
      password: "password",

    });

    newUser
      .save()
      .then((user) => {
        expect(user._id).to.not.be.null;
        expect(user.name).to.equal("Test User");
        expect(user.email).to.equal("test@user.com");
        expect(user.password).to.equal("password");
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Reading a User
  it("should read a user", function (done) {
    const newUser = new User({
      name: "Test User",
      email: "test@user.com",
      password: "password",
    });

    newUser
      .save()
      .then((user) => {
        User.findById(user._id)
        expect(user._id).to.not.be.null;
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Updating a User
  it("should update a user", function (done) {
    const newUser = new User({
      name: "Test User",
      email: "test@user.com",
      password: "password",
    });

    newUser
      .save()
      .then((user) => {
        User.findByIdAndUpdate(user._id, {
          name: "Updated User",
          email: "test@user.com",
          password: "password",
        }, {new: true})
        .then((user) => {
          expect(user.name).to.equal("Updated User");
          done();
        })
        .catch((err) => done(err));
      });
  });

  // Test for Deleting a User

  it("should delete a user", function (done) {
    const newUser = new User({
      name: "Test User",
      email: "test@user.com",
      password: "password",
    });

    newUser
      .save()
      .then((user) => {
        return User.findByIdAndDelete(user._id)
        .then((user) => {
          expect(user).to.not.be.null;
          return User.findById(user._id)
        })
        .then((user) => {
          expect(user).to.be.null;
          done();
        })
        .catch((err) => done(err));
      });
    });


});
