'use strict'

const User = require('../models/user').User
const Promise = require('bluebird')
const co = Promise.coroutine

const userController = () => {
  const signUp = co(function * (req, res, next) {
    try {
      const user = yield User.findOneAsync({
        email: req.body.formEmail
      })

      if (user) {
        return res.send('User já existe!')
      }
      let newUser = yield createUser(req)

      req.login(newUser, () => {
        res.redirect('/auth/profile')
      })
    } catch (error) {
      res.json(error)
    }
  })

  const createUser = co(function * (req) {
    try {
      const newUser = new User({
        firstName: req.body.formFirstName,
        lastName: req.body.formLastName,
        email: req.body.formEmail,
        password: req.body.formPassword
      })

      return yield User.createAsync(newUser)
    } catch (error) {
      return yield error
    }
  })

  return {
    signUp: signUp
  }
}

module.exports = userController
