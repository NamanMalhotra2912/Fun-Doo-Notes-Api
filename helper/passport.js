const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser((user, done) => {
    // console.log("User here : ", user);
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

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
        console.log("Access token : ", accessToken);
        console.log("Profile details : ", profile);
        return done(null, tokenDetails);
    }
));