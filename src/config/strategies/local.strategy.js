const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('../../models/user').User
const Promise = require('bluebird')
const co = Promise.coroutine

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'formLoginEmail',
    passwordField: 'formLoginPassword'
  }, co(function * (email, password, done) {
    const user = yield User.findOneAsync({ email: email, password: password })

    if (!user) {
      return done(null, false, {message: 'Wrong Email or Bad Password!'})
    }

    done(null, user)
  })
  ))
}
