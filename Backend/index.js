const express = require("express");
const app = express();
const path = require("path");
// const mongoose = require('mongoose');
// const User = require("./db.js");
<<<<<<< HEAD
=======

const route = require("./route.js");
>>>>>>> de200f5 (for api prob)

const route = require("./route.js");

<<<<<<< HEAD


// app.get("/", (req, res) => {
//     res.redirect("/user");                                                        
// })

app.use("/", route);
=======
// app.get("/", (req, res) => {
//     res.redirect("/user");                                                        
// })

app.use("/user", route);
>>>>>>> de200f5 (for api prob)

app.listen(8080);