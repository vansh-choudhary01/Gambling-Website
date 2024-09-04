const express = require("express");
const path = require("path");
const app = express();
const port = 8080;

app.set("views", path.join(__dirname, "../Frontend"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../Frontend")));

app.get("/", (req, res) => {
    res.redirect("/login");                                                        
})

app.get("/login", (req, res) => {
    res.render("LoginPage/index.ejs");
})

app.post("/login", (req, res) => {
    res.render("Main/index.ejs");
})

app.listen(8080);