'use strict'

const express = require('express')
const authRouter = express.Router()
const User = require('../models/user').User
const Promise = require('bluebird')
const co = Promise.coroutine

const router = () => {
  authRouter.route('/signUp')
    .post(co(function * (req, res, next) {
      const user = yield User.findOneAsync({
        email: req.body.formEmail
      })

      if (user) {
        return res.send('User já existe!')
      }

      const newUser = new User({
        firstName: req.body.formFirstName,
        lastName: req.body.formLastName,
        email: req.body.formEmail,
        password: req.body.formPassword
      })

      const createdUser = yield User.createAsync(newUser)

      req.login(createdUser, () => {
        res.redirect('/auth/profile')
      })
    }))
  authRouter.route('/profile')
    .get((req, res) => {
      res.json(req.user)
    })

  return authRouter
}

module.exports = exports = router
