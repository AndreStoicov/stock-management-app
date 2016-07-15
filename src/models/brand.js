'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Promise = require('bluebird')

const brandSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
    default: ''
  }
})

const Brand = mongoose.model('Brand', brandSchema)
Promise.promisifyAll(Brand)
Promise.promisifyAll(Brand.prototype)

exports.Brand = Brand
