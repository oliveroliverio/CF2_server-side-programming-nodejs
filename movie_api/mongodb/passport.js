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
            usernameField: 'username',
            passwordField: 'password',
        },
        async (username, password, callback) => {
            console.log(`Attempting login for username: ${username}`);
            try {
                const user = await User.findOne({ username: username });

                if (!user) {
                    console.log('User not found');
                    return callback(null, false, {
                        message: 'Incorrect username or password.',
                    });
                }

                const isValid = await user.validatePassword(password);
                if (!isValid) {
                    console.log('Invalid password');
                    return callback(null, false, {
                        message: 'Incorrect username or password.',
                    });
                }

                console.log('Login successful');
                return callback(null, user);
            } catch (error) {
                console.error('Login error:', error);
                return callback(error);
            }
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