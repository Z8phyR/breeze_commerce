const { Review } = require("../../database/database");
const { expect } = require("chai");

describe("[🔌️] Review Database Operations", function () {
  // Test for Creating a Review
  it("should create a new review", function (done) {
    const newReview = new Review({
      productId: "1234",
      userId: "1234",
      review: "This is a test review",
    });

    newReview
      .save()
      .then((review) => {
        expect(review._id).to.not.be.null;
        expect(review.productId).to.equal("1234");
        expect(review.userId).to.equal("1234");
        expect(review.review).to.equal("This is a test review");
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Reading a Review
  it("should read a review", function (done) {
    const newReview = new Review({
      productId: "1234",
      userId: "1234",
      review: "This is a test review",
    });

    newReview
      .save()
      .then((review) => {
        Review.findById(review._id);
        expect(review._id).to.not.be.null;
        done();
      })
      .catch((err) => done(err));
  });

  // Test for Updating a Review
  it("should update a review", function (done) {
    const newReview = new Review({
      productId: "1234",
      userId: "1234",
      review: "This is a test review",
    });

    newReview
      .save()
      .then((review) => {
        Review.findByIdAndUpdate(
          review._id,
          {
            productId: "1234",
            userId: "1234",
            review: "This is an updated test review",
          },
          { new: true }
        )
          .then((updatedReview) => {
            expect(updatedReview._id).to.not.be.null;
            expect(updatedReview.productId).to.equal("1234");
            expect(updatedReview.userId).to.equal("1234");
            expect(updatedReview.review).to.equal(
              "This is an updated test review"
            );
            done();
          })
          .catch((err) => done(err));
      })
      .catch((err) => done(err));
  });

  // Test for Deleting a Review
  it("should delete a review", function (done) {
    const newReview = new Review({
      productId: "1234",
      userId: "1234",
      review: "This is a test review",
    });

    newReview
      .save()
      .then((review) => {
        Review.findByIdAndDelete(review._id);
        expect(review._id).to.not.be.null;
        done();
      })
      .catch((err) => done(err));
  });
});
