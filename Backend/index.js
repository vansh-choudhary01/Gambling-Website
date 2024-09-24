const express = require("express");
const ejsMate = require("ejs-mate");
const app = express();
const path = require("path");
const route = require("./route.js");

app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend")));
app.use(express.urlencoded({extended : true}));
app.use(express.json());
app.engine('ejs', ejsMate);

app.use("/", route);

app.listen(8080);