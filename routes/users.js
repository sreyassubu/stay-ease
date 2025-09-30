const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirect} = require("../middlewears.js");
const userController = require("../Controllers/users.js");

router
    .route("/signup")
    .get(userController.signUpForm)
    .post(asyncWrap(userController.signUpUser));

router
    .route("/login")
    .get(userController.loginForm)
    .post(saveRedirect, 
        passport.authenticate("local",{failureRedirect:"/users/login", failureFlash:true}), 
        asyncWrap(userController.loginUser));

router.get("/logout",userController.logOutUser);


module.exports = router;