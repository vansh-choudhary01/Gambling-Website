const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const User = require("./db.js");

app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
    res.redirect("/login");                                                        
})

app.get("/login", (req, res) => {
    res.render("LoginPage/index.ejs");
})

app.get("/signUp", (req, res) => {
    res.render("SignUpPage/index.ejs");
})

app.post("/game", (req, res) => {
    res.render("Main/index.ejs");
})

app.listen(8080);