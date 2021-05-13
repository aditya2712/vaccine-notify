

function auth(req, res, next)  {
    const otpToken = req.cookies.otpToken
    console.log(otpToken);
    next();
}

module.exports = auth;
