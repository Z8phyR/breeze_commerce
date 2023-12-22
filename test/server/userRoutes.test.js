const request = require("supertest");
const app = require("../../server/app");
const { expect } = require("chai");

const { User } = require("../../database/database");
let userId;

before((done) => {
  // Create a new user and save the ID for use in tests
  const newUser = new User({
    name: "Initial Test User",
    email: "test@user.com",
    password: "password",
  });

  newUser
    .save()
    .then((user) => {
      userId = user._id.toString();
      done();
    })
    .catch((err) => done(err));
});

// Test for Creating a New User
describe("POST /users/register", function () {
  it("responds with json and creates a new user", function (done) {
    request(app).post("/users/register").send({
      name: "Test User",
      email: "test@user.com",
      password: "password",
    })
    .expect("Content-Type", /json/)
    // expect password to be hashed
    .expect((res) => {
        expect(res.body.password).to.not.equal("password");
    })
    .expect(200, done);
  });
});

// Test for Reading a User
describe("GET /users", function () {
  it("responds with json containing the user by userId", function (done) {
    request(app)
      .get("/users/" + userId)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test for Updating a User
describe("PUT /users/:userId", function () {
  it("responds with json containing the updated user", function (done) {
    request(app)
      .put("/users/" + userId)
      .send({
        name: "Updated User",
        email: "test@user.com",
        password: "password",
      })
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});

// Test for Deleting a User
describe("DELETE /users/:userId", function () {
  it("responds with json containing the deleted user", function (done) {
    request(app)
      .delete("/users/" + userId)
      .expect("Content-Type", /json/)
      .expect(200, done);
  });
});


// Test for a user login
describe("POST /users/login", function () {
  it("responds with json containing the user", function (done) {
    request(app)
      .post("/users/login")
      .send({
        email: "test@user.com",
        password: "password",
        })
        .expect("Content-Type", /json/)
        // expect a token to be returned
        .expect((res) => {
          expect(res.body.token).to.not.be.null;
        })

        .expect(200, done);
    });
    });

// Test for a user logout
describe("POST /users/logout", function () {
  it("responds with json containing the user", function (done) {
    request(app)
      .post("/users/logout")
      .send({
        email: "test@user.com",
        password: "password",
        })
        .expect("Content-Type", /json/)
        .expect(200, done);
    }   );
    }   );

