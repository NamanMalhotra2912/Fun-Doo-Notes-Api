class Oauth {
    isLoggedIn = (req, res, next) => {
        if (req.user.token) {

            next()
        } else {
            res.sendStatus(401);
        }
    };
}
module.exports = new Oauth();