const express = require("express");
const router = express.Router();
const passport = require('passport');

const wrapAsync = require("../utils/wrapAsync.js");
const {bet} = require("./container/bet.js");
const { bigSmall, account, route,  deposit, withdrow, activity } = require("./container/page.js");
const { loginPage, user, login, signUp, signupPage, logout, emailOtp } = require("./container/user.js");
const { isLoggedIn } = require("./middleware.js");

router.get("/", wrapAsync(route));
router.get("/login", wrapAsync(loginPage));
router.get("/signUp", wrapAsync(signupPage));
router.post("/emailotp", wrapAsync(emailOtp));

// footer pages
router.get("/user/account",isLoggedIn, wrapAsync(account));
router.get("/user/deposit",isLoggedIn, wrapAsync(deposit));
router.get("/user/withdrow",isLoggedIn, wrapAsync(withdrow));
router.get("/user/activity",isLoggedIn, wrapAsync(activity));

router.post("/login", passport.authenticate('local', {
        failureRedirect: '/login',
    }), wrapAsync(login));
router.post("/signUp",wrapAsync(signUp));
router.get("/logout",isLoggedIn,wrapAsync(logout));
router.get("/user/colors",isLoggedIn, wrapAsync(bigSmall));
router.get("/user/bet",isLoggedIn, wrapAsync(bet));
router.get("/user",isLoggedIn, wrapAsync(user));

router.use("*", (req, res, next) => next("Page not found"));
router.use((err,req, res, next) => res.render("error.ejs", {err}));
module.exports = router;