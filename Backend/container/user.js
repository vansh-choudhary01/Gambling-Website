const { user: User } = require("../db.js");
const nodemailer = require('nodemailer');

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

const sendOTPEmail = async(email, otp) => {
    let transporter = nodemailer.createTransport({
        service : 'gmail', 
        auth : {
            user : process.env.ADMIN_EMAIL,
            pass : process.env.ADMIN_PASS,
        }
    });

    let mailOptions = {
        from : process.env.ADMIN_EMAIL,
        to : email,
        subject : 'OTP CODE FROM COLORO',
        text : `Hello I'm from coloro. \n Your otp is ${otp}`
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log("Error", e);
    }
}

module.exports.emailOtp = (req, res) => {
    let {email, otp} = req.body;
    console.log(req.body);
    sendOTPEmail(email, otp);
}