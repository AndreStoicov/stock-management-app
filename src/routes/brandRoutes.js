'use strict'

const express = require('express')
const brandsRouter = express.Router()

const router = (nav) => {
  const brandCtrl = require('../controllers/brand')(nav)

  brandsRouter.use(brandCtrl.middleware)

  brandsRouter.route('/')
    .get(brandCtrl.getIndex)

  return brandsRouter
}

module.exports = exports = router
