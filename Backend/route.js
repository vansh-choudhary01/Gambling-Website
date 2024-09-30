const express = require("express");
const router = express.Router();
const passport = require('passport');

const wrapAsync = require("../utils/wrapAsync.js");
const {bet} = require("./controllers/bet.js");
const { bigSmall, account, route,  deposit, withdrow, activity, promotion,   } = require("./controllers/page.js");
const { loginPage, user, login, signUp, signupPage, logout, Admin } = require("./controllers/user.js");
const {qrPayment, updateBankPage, bankInfo, emailOtp} = require("./controllers/payment.js")
const { isLoggedIn, isAdmin } = require("./middleware.js");

router.post("/admin", isLoggedIn,isAdmin, wrapAsync(Admin));
router.get("/", wrapAsync(route));
router.get("/login", wrapAsync(loginPage));
router.get("/signUp", wrapAsync(signupPage));
router.post("/emailotp", wrapAsync(emailOtp));

// footer nav pages
router.get("/user/account",isLoggedIn, wrapAsync(account));
router.get("/user/deposit",isLoggedIn, wrapAsync(deposit));
router.get("/user/withdrow",isLoggedIn, wrapAsync(withdrow));
router.get("/user/activity",isLoggedIn, wrapAsync(activity));
router.get("/user/promotion",isLoggedIn,isAdmin , wrapAsync(promotion));

router.post("/login", passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), wrapAsync(login));
router.post("/signUp",wrapAsync(signUp));
router.get("/logout",isLoggedIn,wrapAsync(logout));
router.get("/user/colors",isLoggedIn, wrapAsync(bigSmall));
router.get("/user/bet",isLoggedIn, wrapAsync(bet));
router.get("/user",isLoggedIn, wrapAsync(user));

//deposit and withdrow
router.get("/updateBank", isLoggedIn, wrapAsync(updateBankPage));
router.post("/bankinfo", isLoggedIn, wrapAsync(bankInfo));
router.get("/qrpayment", isLoggedIn, wrapAsync(qrPayment));

router.use("*", (req, res, next) => next("Page not found"));
router.use((err,req, res, next) => res.render("error.ejs", {err}));
module.exports = router;