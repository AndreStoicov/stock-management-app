'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    default: ''
  },
  lastName: {
    type: String,
    required: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    default: ''
  },
  password: {
    type: String,
    required: true,
    unique: true,
    default: ''
  }
})

const User = mongoose.model('User', userSchema)
Promise.promisifyAll(User)
Promise.promisifyAll(User.prototype)

exports.User = User
