'use strict'

const path = require('path')
const Helpers = use('Helpers')
const Config = use('Config')

module.exports = (location) => require(path.join(
  Helpers.appRoot(),
  Config.get('grapple.resolvers'),
  location.replace(/(.js$)/gi, ''))
)