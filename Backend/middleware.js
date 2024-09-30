module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()) {
        return res.redirect('/login');
    }
    next();
}

module.exports.isAdmin = (req, res, next) => {
    if(req.user.email == process.env.ADMIN_EMAIL) {
        return next();
    }
    next("Access Denied");
}