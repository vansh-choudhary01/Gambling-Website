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
    req.flash("success", "login");
    res.redirect(`/user`);
}

module.exports.user = async (req, res) => {
    let { _id } = req.user;
    let user = await User.findById(_id);
    res.render("Main/index.ejs", { id: _id, user });
}

module.exports.signUp = async (req, res, next) => {
    try {
        let { username, email, password, conform } = req.body;
        if (!username || !password || !email) throw Error("Wrong account details");
        if (password != conform) {
            let wrong = true;
            return res.render("SignUpPage/index.ejs", { wrong });
        }

        let user = new User({ username, email });
        let registeredUser = await User.register(user, password);

        req.login(registeredUser, (err) => {
            if (err) next(err);
            req.flash("success", "signUp");
            res.redirect(`/user`);
        })
    } catch (e) {
        console.log(e);
        let wrong = true;
        res.render("SignUpPage/index.ejs", { wrong });
    }
}

module.exports.logout = async (req, res, next) => {
    req.logout((e) => {
        if (e) return next(e);
        res.redirect('/login');
    })
}

module.exports.Admin = async(req, res, next) => {
    let {amount, number : username, email} = req.body;
    amount = parseInt(amount);
    if(username) {
        let user = await User.findOne({username});
        if(!user) return res.redirect("/user/promotion");
        user.balance += amount;
        user.save();
    } else if (email) {
        let user = await User.findOne({email});
        if(!user) return res.redirect("/user/promotion");
        user.balance += amount;
        user.save();
    }
    req.flash("success", "Sent");
    res.redirect("/user/promotion");
}