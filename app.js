'use strict'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const Port = process.env.Port || 8000

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

mongoose.connect('mongodb://localhost:27017/Polar')

const brandsRouter = require('./src/routes/brandRoutes')(navBar)
const authRouter = require('./src/routes/authRoutes')()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(session({
  secret: 'library'
}))

require('./src/config/passport')(app)

app.use('/brands', brandsRouter)
app.use('/auth', authRouter)

app.set('views', './src/views')
app.set('view engine', 'jade')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Controle de estoque Polar',
    navBar
  })
})

app.listen(Port, () => {
  console.log('Listening on Port: ' + Port)
})
