const User = require("../models/user");

//Signup form
module.exports.signUpForm = (req,res)=>{
    res.render("users/signup.ejs");
}

//Signup user
module.exports.signUpUser = async(req,res)=>{
    try{
        let {username, email, password} = req.body;
        console.log(username);
        let newUser = new User({
            email:email,
            username:username
            });
        let registeredUser = await User.register(newUser,password);
        console.log(registeredUser);
        req.login(registeredUser, (err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to wanderlust");
            res.redirect("/listings");
        })} catch(e){
            req.flash("error",e.message);
            res.redirect("/users/signup");
        }
    }

//Login form
module.exports.loginForm = (req,res)=>{
    res.render("users/login.ejs");
}

//Login user
module.exports.loginUser = async(req,res)=>{
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

//Log out user
module.exports.logOutUser = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        } 
    });
    req.flash("success","Successfully logged out");
    res.redirect("/listings");
}