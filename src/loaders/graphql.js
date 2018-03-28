'use strict'

const path = require('path')
const fs = require('fs')
const Helpers = use('Helpers')
const Config = use('Config')

module.exports = (location) => fs.readFileSync(path.join(
  Helpers.appRoot(), 
  Config.get('grapple.types'),
  (location.replace(/(.graphql$)/gi, '')) + '.graphql'
), 'utf8').toString()