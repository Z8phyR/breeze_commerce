const request = require("supertest");
const app = require("../../server/app");
const { expect } = require("chai");
const bcrypt = require("bcryptjs");
const { User } = require("../../database/database");


// Test for Creating a New User
describe("POST /users/register", function () {
  it("responds with json and creates a new user", function (done) {
    request(app)
      .post("/users/register")
      .send({
        name: "Test User",
        email: "test@user.com",
        password: "password",
      })
      .expect("Content-Type", /json/)
      // expect password to be hashed
      .expect((res) => {
        expect(res.body.password).to.not.equal("password");
      })
      // expect a token to be returned
      .expect((res) => {
        expect(res.body.token).to.not.be.null;
      })
      // expect a user to be returned
      .expect((res) => {
        expect(res.body.user).to.not.be.null;
      })
      .expect(200, done);
  });
});

// Test for Reading a User
describe("GET /users", function () {
  it("reads the user by userID", function (done) {
    let userId;
    const newUser = new User({
        name: "Test User",
        email: "test@user.com",
        password: "password",
        });
    newUser.save().then((user) => {
        userId = user._id.toString();
    }).then(() => {

    request(app)
      .get("/users/" + userId)
      .expect("Content-Type", /json/)
      .expect((res) => {
        expect(res.body.name).to.equal("Test User");
        })
      .expect(200, done);
    });
  });
});

// Test for a user login
describe("POST /users/login", function () {
  it("should log the user in", function (done) {
    // create a new user
    const newUser = new User({
      name: "Test User",
      email: "test@user.com",
      password: bcrypt.hashSync("password", 10)
    }).save()
    // login with the new user
    .then(() => {

    request(app)
      .post("/users/login")
      .send({ email: "test@user.com", password: "password" })
      .expect("Content-Type", /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).to.have.property("token");
        done();
      });
  })
  .catch((err) => done(err));
})
});

// User Authentication Tests
describe("User Authentication Flow", function () {
    let token;
    let userId;

    before((done) => {
        // create a new user
        const newUser = new User({
            name: "Test User",
            email: "test@user.com",
            password: bcrypt.hashSync("password", 10)
        })
        newUser.save().then((user) => {
            userId = user._id.toString();
        })
        
        .then(() => {
            return request(app)
            .post("/users/login")
            .send({ email: "test@user.com", password: "password" })
        })
        .then((res) => {
            token = res.body.token;
            done();
        })
        .catch((err) => done(err));
    })

    it("should get the user profile", function (done) {
        console.log("test token: " + token);
        request(app)
            .get("/users/profile")
            .set("Authorization",  token)
            .expect("Content-Type", /json/)
            .expect(200, done);
        });

        
        it("should reject access with an invalid token", function (done) {
            request(app)
            .get("/users/profile")
            .set("Authorization", "Bearer wrongtoken")
            .expect("Content-Type", /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err);
                expect(res.body).to.have.property('message', 'Invalid Token');
                done();
            });
        });
        
        // Test for Updating a User
        it("should update the user", function (done) {
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
        
        
        // Test for Logging Out a User
        it("should log the user out", function (done) {
            request(app)
                .post("/users/logout")
                .set("Authorization", "Bearer " + token)
                .expect("Content-Type", /json/)
                .expect(200, done);
            });
    
        // Test for Deleting a User
          it("responds with json containing the deleted user", function (done) {
            request(app)
              .delete("/users/" + userId)
              .expect("Content-Type", /json/)
              .expect(200, done);
          });
    });
    



