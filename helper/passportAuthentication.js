class Oauth {
    isLoggedIn = (req, res, next) => {
        if (req.user.token) {

            next()
        } else {
            const response = {};
            response.success = false
            response.message = "Token error in Google O-Auth"
            return res.sendStatus(401).send(response);
        }
    };
}
module.exports = new Oauth();