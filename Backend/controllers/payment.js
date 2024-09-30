const { user: User } = require("../db.js");
const nodemailer = require('nodemailer');


module.exports.updateBankPage = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);
    res.render("updateBank.ejs", {user});
}

module.exports.bankInfo = async(req, res) => {
    let {_id} = req.user;
    let user = await User.findById(_id);
    user.bank = req.body;
    await user.save();
    res.redirect("/user/withdrow");
}

module.exports.qrPayment = async(req, res) => {
    let {amount} = req.query;
    if(!amount || amount < 500) {
        return res.redirect("/user/deposit");
    }
    res.render("qr.ejs", {amount});
}

const sendOTPEmail = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASS,
        }
    });

    let mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'OTP CODE FROM COLORO',
        text: `Hello I'm from coloro. \n Your otp is ${otp}`
    };

    try {
        console.log("OTP send");
        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log("Error", e);
    }
}

const sendPaymentEmail = async (utr, amount, username, email, balance) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASS,
        }
    });

    let mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: process.env.ADMIN_EMAIL,
        subject: "Payment Request",
        text: `User requested to deposit money. His account balance is ${balance}. \n He requested ${amount} to add, and utr is ${utr}, \n
                USER ID - \n mobile no. - ${username}, email Id - ${email}`,
    }

    if (!utr) {
        mailOptions.text = `User requested to withdraw his money. His account balance is ${balance}. \n He requested ${amount}, \n
                USER ID - \n mobile no. - ${username}, email Id - ${email}`
    }

    try {
        console.log("email send");
        await transporter.sendMail(mailOptions);
    } catch (e) {
        console.log("Error", e);
    }
}

module.exports.emailOtp = async (req, res) => {
    let { email, otp, utr, amount } = req.body;
    
    if (email && otp) {
        return sendOTPEmail(email, otp);
    }
    if (!utr && amount) {
        let { _id } = req.user;
        let user = await User.findById(_id);
        if (user.balance >= amount && amount >= 500) {
            user.balance -= amount;
            user.save();
        } else {
            return res.redirect("user/withdrow");
        }
        sendPaymentEmail(utr, amount, req.user.username, req.user.email, req.user.balance);
        return res.redirect("user/account");
    } else {
        sendPaymentEmail(utr, amount, req.user.username, req.user.email, req.user.balance);
        return res.redirect("/user/deposit");
    }
}