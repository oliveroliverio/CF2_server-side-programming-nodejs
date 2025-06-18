const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/User');
const passportJWT = require('passport-jwt');

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

// Load environment variables
require('dotenv').config();

passport.use(
    new LocalStrategy(
        {
            usernameField: 'Username',
            passwordField: 'Password',
        },
        async (username, password, callback) => {
            console.log(`${username} ${password}`);
            await User.findOne({ Username: username })
                .then((user) => {
                    if (!user) {
                        console.log('incorrect username');
                        return callback(null, false, {
                            message: 'Incorrect username or password.',
                        });
                    }
                    console.log('finished');
                    return callback(null, user);
                })
                .catch((error) => {
                    if (error) {
                        console.log(error);
                        return callback(error);
                    }
                });
        }
    )
);

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET || 'your_jwt_secret'
}, async (jwtPayload, callback) => {
    return await User.findById(jwtPayload._id)
        .then((user) => {
            return callback(null, user);
        })
        .catch((error) => {
            return callback(error)
        });
}));