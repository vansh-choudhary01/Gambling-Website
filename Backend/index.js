const express = require("express");
const path = require("path");
const app = express();
// const mongoose = require('mongoose');
// const User = require("./db.js");
const addUser = require("./container/add.js");
const checkUser = require("./container/login.js");
const bigSmall = require("./container/bigSmall.js");
const account = require("./container/account.js");

app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

app.get("/", (req, res) => {
    res.redirect("/login");                                                        
})

app.get("/login", (req, res) => {
    let wrong = false;
    res.render("LoginPage/index.ejs", {wrong});
})

app.get("/signUp", (req, res) => {
    let wrong = false;
    res.render("SignUpPage/index.ejs", {wrong});
})

app.get("/game", checkUser);
app.post("/game", addUser);
app.get("/colors", bigSmall);
app.get("/account", account);

app.listen(8080);