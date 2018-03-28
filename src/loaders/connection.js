'use strict'

const path = require('path')
const Helpers = use('Helpers')
const Config = use('Config')

module.exports = (location) => {
  return require(path.join(Helpers.appRoot(), Config.get('grapple.connections'), location.replace(/(.js$)/gi, '')));
}