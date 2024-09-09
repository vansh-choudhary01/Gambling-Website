const User = require("./db.js");
const express = require("express");
const app = express();

const path = require("path");


const addUser = require("./container/add.js");
const checkUser = require("./container/login.js");
const bigSmall = require("./container/bigSmall.js");
const account = require("./container/account.js");
const user = require("./container/user.js");

app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/user/login");                                                        
})

app.get("/user/login", (req, res) => {
    let wrong = false;
    res.render("LoginPage/index.ejs", {wrong});
})

app.get("/user/signUp", (req, res) => {
    let wrong = false;
    res.render("SignUpPage/index.ejs", {wrong});
})

app.get("/user/game", checkUser);
app.post("/user/game", addUser);
app.post("/user/colors/:id", bigSmall);
app.get("/user/account/:id", account);
app.get("/user/:id", user);

module.exports = app;
