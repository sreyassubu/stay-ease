const Review = require("../models/review");
const Listing = require("../models/listings")

//Post review
module.exports.postReview = async(req,res,next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    let review = new Review({...req.body.review,author:req.user._id});
    await review.save();
    listing.reviews.push(review);
    await listing.save();
    req.flash("success","New review created");
    res.redirect(`/listings/${id}`);
}

//Delete review
module.exports.deleteReview = async(req,res)=>{
    let {id, reviewId} = req.params;
    await Review.findByIdAndDelete(reviewId);
    await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}});
    req.flash("success","Review deleted");
    res.redirect(`/listings/${id}`);
}