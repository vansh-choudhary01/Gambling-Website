const express = require("express");
const app = express();
const path = require("path");
// const mongoose = require('mongoose');
// const User = require("./db.js");

const route = require("./route.js");



// app.get("/", (req, res) => {
//     res.redirect("/user");                                                        
// })

app.use("/", route);

app.listen(8080);