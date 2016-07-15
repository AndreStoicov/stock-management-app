'use strict'

const Brand = require('../models/brand').Brand
const Promise = require('bluebird')
const co = Promise.coroutine

const brandController = (nav) => {
  const middleware = (req, res, next) => {
    if (!req.user) {
      res.redirect('/falhouBrand')
    }
    next()
  }

  const getIndex = co(function * (req, res, next) {
    const brands = yield Brand.findAsync()
    res.render('brands/index', {
      title: 'Marcas',
      navBar: nav,
      brands: brands
    })
  })

  return {
    getIndex: getIndex,
    middleware: middleware
  }
}

module.exports = brandController
