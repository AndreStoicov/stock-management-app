'use strict'

const express = require('express')
const brandsRouter = express.Router()

const router = (nav) => {
  brandsRouter.route('/')
    .get((req, res) => {
      res.render('brands/index', {
        title: 'Marcas',
        navBar: nav
      })
    })

  return brandsRouter
}

module.exports = exports = router
