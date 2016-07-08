const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

module.exports = () => {
  passport.use(new LocalStrategy({
    email: 'formEmail',
    password: 'formPassword'
  }, (email, password, done) => {
    console.log(email + '+' + password)
    var user = {
      email: email,
      password: password
    }
    done(null, user)
  }
  ))
}
