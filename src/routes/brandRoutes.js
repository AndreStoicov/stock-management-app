'use strict'

let express = require('express')
let brandsRouter = express.Router()

let router = (nav) => {
  brandsRouter.get('/', (req, res) => {
    res.render('brands/index', {
      title: 'Marcas',
      navBar: nav
    })
  })
}

module.exports = router
