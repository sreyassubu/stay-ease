if(process.env.NODE_ENV!= "production"){
    require("dotenv").config();
}
const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const {checkLogin, isOwner, validateListing} = require("../middlewears.js");
const listingController = require("../Controllers/listing.js");
const multer = require("multer");
const {cloudinary, storage} = require("../cloudConfig.js");
const upload = multer({storage});

router
    .route("/")
    .get(asyncWrap(listingController.index))
    .post(checkLogin, upload.single("listing[image]"),validateListing, asyncWrap(listingController.createListing));

//new form
router.get("/new", checkLogin, listingController.newListingForm);

//Country route
router.get("/country",asyncWrap(listingController.countrySearch));

router
    .route("/:id")
    .get(asyncWrap(listingController.showListing))
    .put(checkLogin, isOwner, upload.single("listing[image]"), validateListing, asyncWrap(listingController.updateListing))
    .delete(checkLogin, isOwner, asyncWrap(listingController.deleteListing));

//Edit route
router.get("/:id/edit", checkLogin, isOwner, asyncWrap(listingController.editListingForm));

//Category route
router.get("/category/:category", asyncWrap(listingController.categoriseListing));




module.exports = router;
