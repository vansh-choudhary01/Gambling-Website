const User = require("./db.js");
const express = require("express");
const app = express();

const addUser = require("./container/add.js");
const checkUser = require("./container/login.js");
const bigSmall = require("./container/bigSmall.js");
const account = require("./container/account.js");
const user = require("./container/user.js");

function route() {
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
    app.get("/:id", user);
}

module.exports = route;