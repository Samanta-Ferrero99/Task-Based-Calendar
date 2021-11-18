const passport = require('passport');
const user = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');


module.exports = function () {
  passport.use(
    new LocalStrategy({usernameField: 'email', passwordField: 'password'}, (username, password, done) => {
      let email = username;
      user.findOne({ email: username }, (err, user) => {
        if (err) {
          console.log(email);
          return done(err);
        }
        if (!user) {
          console.log(email);
          console.log("NOT EX");
          return done(null, false, { message: `User with email ${username} does not exist.` });
        }
        bcrypt.compare(password, user.password).then(isMatch => {
          if (isMatch) {
            return done(null, user);
          // Password was not a match
          } else {
            return done(null, false, {
              message: 'Email or password is invalid.'
            });
          }
        });
      });
    })
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) =>
    user.findById(id).then((user) => done(null, user))
  );
};
