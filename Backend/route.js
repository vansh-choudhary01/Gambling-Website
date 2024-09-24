const express = require("express");
const router = express.Router();

const bet = require("./container/bet.js");
const { login, signUp, bigSmall, account, user, route, loginPage, signupPage, deposit, withdrow, activity } = require("./container/page.js");

router.get("/", route);
router.get("/user/login", loginPage);
router.get("/user/signUp", signupPage);

// footer pages
router.get("/user/account/:id", account);
router.get("/user/deposit/:id", deposit);
router.get("/user/withdrow/:id", withdrow);
router.get("/user/activity/:id", activity);

router.get("/user/game", login);
router.post("/user/game", signUp);
router.get("/user/colors/:id", bigSmall);
router.get("/user/bet/:id", bet.bet);
router.get("/user/:id", user);
router.post("/api/data", bet.apiData);
module.exports = router;
