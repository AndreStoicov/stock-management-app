'use strict'

const express = require('express')
const authRouter = express.Router()
const passport = require('passport')

const router = () => {
  const userCtrl = require('../controllers/user')()

  authRouter.route('/signUp')
    .post(userCtrl.signUp)

  authRouter.route('/signIn')
    .post(passport.authenticate('local', {
      failureRedirect: '/'
    }), (req, res) => {
      res.redirect('/auth/profile')
    })

  authRouter.route('/profile')
    .all((req, res, next) => {
      if (!req.user) {
        res.redirect('/falhou')
      }
      next()
    })
    .get((req, res) => {
      console.log(req.user)
      res.redirect('/')
    })

  return authRouter
}

module.exports = exports = router
