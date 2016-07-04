'use strict'

const express = require('express')
let app = express()

let Port = process.env.Port || 8000

const navBar = [{
  Link: '/',
  Text: 'Home'
}, {
  Link: '/brands',
  Text: 'Marcas'
}, {
  Link: '/providers',
  Text: 'Fornecedores'
}, {
  Link: '/products',
  Text: 'Produtos'
}, {
  Link: '/orders',
  Text: 'Pedidos'
}]

const brandsRouter = require('./src/routes/brandRoutes')(navBar)

app.use(express.static('public'))
app.set('views', './src/views')
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Controle de estoque Polar'
  })
})

app.use('/brands', brandsRouter)

app.listen(Port, (params) => {
  console.log('Listening on Port: ' + Port)
})
