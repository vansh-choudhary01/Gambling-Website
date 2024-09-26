const { user: User } = require("../db.js");

module.exports.loginPage = async (req, res) => {
    let wrong = false;
    await res.render("LoginPage/index.ejs", { wrong });
}

module.exports.signupPage = async (req, res) => {
    let wrong = false;
    await res.render("SignUpPage/index.ejs", { wrong });
}

module.exports.login = async (req, res) => {
    let { _id } = req.user;
    let user = await User.findById(_id);
    console.log(user);
    res.render("Main/index.ejs", { id : _id, user });
}

module.exports.user = async (req, res) => {
    let { _id } = req.user;
    let user = await User.findById(_id);
    console.log(user);
    res.render("Main/index.ejs", { id : _id, user });
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, password, conform } = req.body;
        if (!username || !password) throw Error("Wrong account");
        if (password != conform) {
            let wrong = true;
            return res.render("SignUpPage/index.ejs", { wrong });
        }

        let user = new User({ username });
        let registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) next(err);
            res.redirect(`/user`);
        })
    } catch(e) {
        console.log(e);
        let wrong = true;
        res.render("SignUpPage/index.ejs", { wrong });
    }
}

module.exports.logout = async (req, res, next) => {
    req.logout((e) => {
        if(e) return next(e);
        res.redirect('/login');
    })
}