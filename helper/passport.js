/**
 * @description : using passport strategy for social login
 */
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});
/**
 * @description : it will use credentials of google api console for social login
 */
passport.use(new GoogleStrategy({
    clientID: process.env.Client_ID,
    clientSecret: process.env.Client_secret,
    callbackURL: process.env.callbackURL
},
    (accessToken, refreshToken, profile, done) => {
        let tokenDetails = {
            profile,
            token: accessToken
        };
        return done(null, tokenDetails);
    }
));