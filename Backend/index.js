const express = require("express");
const app = express();
const path = require("path");
// const mongoose = require('mongoose');
// const User = require("./db.js");

const route = require("./route.js");

app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());

// app.get("/", (req, res) => {
//     res.redirect("/user");                                                        
// })

app.use("/user", route);

app.listen(8080);