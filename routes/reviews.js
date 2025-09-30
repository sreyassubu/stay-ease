const express = require("express");
const router = express.Router({mergeParams:true});
const asyncWrap = require("../utils/wrapAsync.js");
const {validateReview, checkLogin, isReviewAuthor} = require("../middlewears.js");
const reviewController = require("../Controllers/reviews.js");

//Post route
router.post("/",checkLogin, validateReview,asyncWrap(reviewController.postReview));

//Delete route
router.delete("/:reviewId",checkLogin,isReviewAuthor, asyncWrap(reviewController.deleteReview));

module.exports = router;